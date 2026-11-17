import { createVoiceAudio } from '../lib/voice-provider.js';
import { getVoiceProtection } from '../lib/voice-protection.js';

const MAX_TEXT_CHARACTERS = 4000;
const MAX_BODY_BYTES = 40000;
const ALLOWED_VOICES = new Set(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']);

function getClientAddress(request) {
  const forwardedFor = request.headers['x-forwarded-for'];
  const clientAddress = typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : '';
  return clientAddress || 'unknown-client';
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, private');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Use POST to generate audio.' });
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response.status(413).json({ error: 'The request is too large.' });
  }

  const { text, voice, speed } = request.body || {};
  if (typeof text !== 'string' || !text.trim()) {
    return response.status(400).json({ error: 'Enter text before generating audio.' });
  }
  if (text.length > MAX_TEXT_CHARACTERS) {
    return response.status(413).json({ error: `Text must be ${MAX_TEXT_CHARACTERS.toLocaleString()} characters or fewer.` });
  }
  if (!ALLOWED_VOICES.has(voice)) {
    return response.status(400).json({ error: 'Choose one of the supported AI voices.' });
  }
  if (typeof speed !== 'number' || !Number.isFinite(speed) || speed < 0.5 || speed > 2) {
    return response.status(400).json({ error: 'Speech speed must be between 0.5 and 2.' });
  }

  const hasDeploymentGatewayAuth = Boolean(process.env.VERCEL && ['preview', 'production'].includes(process.env.VERCEL_ENV));
  if (!hasDeploymentGatewayAuth && !process.env.AI_GATEWAY_API_KEY) {
    return response.status(503).json({ error: 'Downloadable voice generation needs AI Gateway authentication. Add an AI_GATEWAY_API_KEY for local development, or use a Vercel deployment.' });
  }

  let allowance;
  try {
    allowance = await getVoiceProtection().consume({
      clientAddress: getClientAddress(request),
      characterCount: text.trim().length
    });
  } catch {
    return response.status(503).json({ error: 'Shared voice protection is temporarily unavailable. Please try again later.' });
  }

  if (!allowance.success) {
    const retryAfter = Math.max(1, Math.ceil((allowance.reset - Date.now()) / 1000));
    response.setHeader('Retry-After', String(retryAfter));
    return response.status(429).json({ error: 'Please wait before generating another voice.' });
  }

  const recordOutcome = (outcome) => allowance.recordOutcome(outcome).catch(() => {});
  let audio;
  try {
    audio = await createVoiceAudio({ text: text.trim(), voice, speed });
    if (!audio.bytes.byteLength || audio.contentType !== 'audio/mpeg' || audio.format !== 'mp3') {
      throw new Error('The speech provider returned an unsupported audio format.');
    }
  } catch {
    await recordOutcome('failed');
    return response.status(502).json({ error: 'Voice generation could not be completed. Check AI Gateway availability and try again.' });
  }

  await recordOutcome('succeeded');
  response.setHeader('Content-Type', audio.contentType);
  response.setHeader('Content-Length', String(audio.bytes.byteLength));
  response.setHeader('Content-Disposition', 'inline; filename="voiceover.mp3"');
  return response.status(200).send(Buffer.from(audio.bytes));
}
