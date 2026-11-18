import test from 'node:test';
import assert from 'node:assert/strict';
import { createTextDiff, decodeJwtToken, evaluateArithmeticExpression, parsePdfPageSelection } from './additional-tool-utils.js';

const encodeJson = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');

test('calculator parses arithmetic without evaluating JavaScript', () => {
  assert.equal(evaluateArithmeticExpression('(18 + 7) * 3'), 75);
  assert.equal(evaluateArithmeticExpression('-3 + 4 * 2'), 5);
  assert.equal(evaluateArithmeticExpression('8 % 3'), 2);
  assert.throws(() => evaluateArithmeticExpression('1 / 0'), /zero/);
  assert.throws(() => evaluateArithmeticExpression('globalThis.alert(1)'), /Invalid character/);
});

test('JWT decoder returns claims without asserting signature validity', () => {
  const token = `${encodeJson({ alg: 'none' })}.${encodeJson({ sub: 'demo', exp: 123 })}.signature`;
  assert.deepEqual(decodeJwtToken(token), { header: { alg: 'none' }, payload: { sub: 'demo', exp: 123 }, signature: 'signature' });
  assert.throws(() => decodeJwtToken('not.a.jwt.with.too.many.parts'), /three/);
  assert.throws(() => decodeJwtToken(`${encodeJson({})}.%%%+.sig`), /Base64URL/);
});

test('text diff aligns inserted and removed lines', () => {
  assert.equal(createTextDiff('one\ntwo\nthree', 'one\nnew\nthree'), '  one\n- two\n+ new\n  three');
  assert.throws(() => createTextDiff(Array(252).fill('x').join('\n'), 'x'), /250 lines/);
});

test('PDF page selection parses ranges and rejects out-of-range values', () => {
  assert.deepEqual(parsePdfPageSelection('1,3-5, 3', 6), [0, 2, 3, 4]);
  assert.throws(() => parsePdfPageSelection('2-1', 6), /between/);
  assert.throws(() => parsePdfPageSelection('7', 6), /between/);
  assert.throws(() => parsePdfPageSelection('all', 6), /page numbers/);
});
