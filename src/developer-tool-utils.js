const htmlEntities = {
  amp: '&',
  apos: "'",
  copy: '©',
  gt: '>',
  lt: '<',
  nbsp: '\u00a0',
  quot: '"',
  reg: '®',
  trade: '™'
};

export function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(String(value));
  let binary = '';

  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }

  return btoa(binary);
}

export function decodeBase64Utf8(value) {
  const normalized = String(value).replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.length % 4 === 1) {
    throw new Error('Enter valid Base64 text.');
  }

  const unpadded = normalized.replace(/=+$/, '');
  const padded = unpadded + '='.repeat((4 - (unpadded.length % 4)) % 4);
  let binary;

  try {
    binary = atob(padded);
  } catch {
    throw new Error('Enter valid Base64 text.');
  }

  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('The Base64 value does not contain valid UTF-8 text.');
  }
}

export function encodeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

export function decodeHtmlEntities(value) {
  return String(value).replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, token) => {
    if (token[0] !== '#') return htmlEntities[token.toLowerCase()] ?? entity;

    const hexadecimal = token[1]?.toLowerCase() === 'x';
    const codePoint = Number.parseInt(token.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
      return entity;
    }

    return String.fromCodePoint(codePoint);
  });
}

export function generateUuids(count = 1) {
  const amount = Number(count);
  if (!Number.isInteger(amount) || amount < 1 || amount > 100) {
    throw new Error('Choose a whole number from 1 to 100.');
  }

  const secureCrypto = globalThis.crypto;
  if (!secureCrypto?.randomUUID && !secureCrypto?.getRandomValues) {
    throw new Error('Secure random generation is unavailable in this browser.');
  }

  return Array.from({ length: amount }, () => {
    if (secureCrypto.randomUUID) return secureCrypto.randomUUID();

    const bytes = secureCrypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  });
}

export async function createSha256(value) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('SHA-256 is unavailable. Open this page over HTTPS and try again.');
  }

  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(value)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function timestampToIso(value, unit = 'seconds') {
  const timestamp = Number(value);
  if (!String(value).trim() || !Number.isFinite(timestamp)) {
    throw new Error('Enter a valid numeric timestamp.');
  }
  if (unit !== 'seconds' && unit !== 'milliseconds') {
    throw new Error('Choose seconds or milliseconds.');
  }

  const milliseconds = unit === 'seconds' ? timestamp * 1000 : timestamp;
  const date = new Date(milliseconds);
  if (!Number.isFinite(milliseconds) || Number.isNaN(date.getTime())) {
    throw new Error('That timestamp is outside the supported date range.');
  }

  return date.toISOString();
}

export function dateToTimestamps(value) {
  if (!String(value).trim()) throw new Error('Choose a date and time first.');

  const milliseconds = new Date(value).getTime();
  if (!Number.isFinite(milliseconds)) throw new Error('Enter a valid date and time.');

  return {
    seconds: Math.floor(milliseconds / 1000),
    milliseconds
  };
}
