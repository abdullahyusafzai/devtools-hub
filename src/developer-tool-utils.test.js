import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createSha256,
  dateToTimestamps,
  decodeBase64Utf8,
  decodeHtmlEntities,
  encodeBase64Utf8,
  encodeHtml,
  generateUuids,
  timestampToIso
} from './developer-tool-utils.js';

test('Base64 tools round-trip Unicode and accept unpadded URL-safe input', () => {
  const source = 'DevTools Hub — café ☀';
  assert.equal(decodeBase64Utf8(encodeBase64Utf8(source)), source);
  assert.equal(decodeBase64Utf8('SGVsbG8'), 'Hello');
  assert.equal(decodeBase64Utf8('Pz8'), '??');
  assert.equal(decodeBase64Utf8('Pz8-'), '??>');
});

test('Base64 decoder rejects malformed values and invalid UTF-8', () => {
  assert.throws(() => decodeBase64Utf8('no!base64'), /valid Base64/);
  assert.throws(() => decodeBase64Utf8('/w=='), /valid UTF-8/);
});

test('HTML tools encode special characters and decode common/numeric entities', () => {
  assert.equal(encodeHtml(`<tag title="a&b">'`), '&lt;tag title=&quot;a&amp;b&quot;&gt;&#39;');
  assert.equal(decodeHtmlEntities('&lt;A&gt; &#x1F680; &copy; &unknown;'), '<A> 🚀 © &unknown;');
});

test('UUID generator returns RFC 4122 version 4 values and validates count', () => {
  const values = generateUuids(3);
  assert.equal(values.length, 3);
  assert.equal(new Set(values).size, 3);
  for (const value of values) assert.match(value, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.throws(() => generateUuids(0), /1 to 100/);
});

test('SHA-256 matches the standard digest for a known input', async () => {
  assert.equal(await createSha256('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

test('Unix timestamp conversions support seconds, milliseconds, and invalid input', () => {
  assert.equal(timestampToIso('0', 'seconds'), '1970-01-01T00:00:00.000Z');
  assert.equal(timestampToIso('1000', 'milliseconds'), '1970-01-01T00:00:01.000Z');
  assert.deepEqual(dateToTimestamps('1970-01-01T00:00:01.250Z'), { seconds: 1, milliseconds: 1250 });
  assert.throws(() => timestampToIso('not-a-number'), /numeric timestamp/);
  assert.throws(() => dateToTimestamps(''), /Choose a date/);
});
