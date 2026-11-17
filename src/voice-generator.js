import { createEspeak } from '@spelling-creator/spellophone/browser';
import { encodeWav } from '@spelling-creator/spellophone';

let enginePromise;

function getEngine() {
  if (!enginePromise) {
    enginePromise = createEspeak({ dataUrl: `${import.meta.env.BASE_URL}espeak-ng-data/` }).catch((error) => {
      enginePromise = undefined;
      throw error;
    });
  }

  return enginePromise;
}

export async function generateSpeechWav({ text, voice, rate, pitch, volume }) {
  const engine = await getEngine();
  const result = engine.synthesize(text, {
    voice,
    rate: Math.round(175 * rate),
    pitch: Math.round(50 * pitch),
    volume: Math.round(100 * volume),
    endPause: true,
  });
  const wav = encodeWav(result.samples, result.sampleRate);

  return new Blob([wav], { type: 'audio/wav' });
}
