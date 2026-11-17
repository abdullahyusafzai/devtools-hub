import assert from 'node:assert/strict';
import test from 'node:test';
import handler from './voice.js';

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

test('valid voice requests are blocked before paid services when the spend cap is zero', async () => {
  const response = createResponse();

  await handler({
    method: 'POST',
    headers: {},
    body: { text: 'Hello there', voice: 'alloy', speed: 1 }
  }, response);

  assert.equal(response.statusCode, 402);
  assert.match(response.body.error, /\$0 monthly spending cap/);
});

test('server input validation still runs before the zero-spend guard', async () => {
  const response = createResponse();

  await handler({
    method: 'POST',
    headers: {},
    body: { text: '   ', voice: 'alloy', speed: 1 }
  }, response);

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, 'Enter text before generating audio.');
});
