import { generateSpeech, gateway } from 'ai';

export async function createVoiceAudio({ text, voice, speed, signal }) {
  const result = await generateSpeech({
    model: gateway.speechModel('openai/tts-1'),
    text,
    voice,
    speed,
    outputFormat: 'mp3',
    maxRetries: 0,
    abortSignal: signal || AbortSignal.timeout(60_000)
  });

  return {
    bytes: result.audio.uint8Array,
    contentType: result.audio.mediaType,
    format: result.audio.format
  };
}
