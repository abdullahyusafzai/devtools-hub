import test from 'node:test';
import assert from 'node:assert/strict';
import handler from './ai-tools.js';

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    setHeader(name, value) { this.headers[name] = value; },
    end(body) { this.body = JSON.parse(body); }
  };
}

const invoke = async (request) => {
  const response = createResponse();
  await handler({ ...request, headers: { host: 'devtools.example', ...request.headers } }, response);
  return response;
};

test('AI endpoint rejects methods other than POST', async () => {
  const response = await invoke({ method: 'GET' });
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, 'POST');
});

test('AI endpoint rejects cross-origin requests before processing', async () => {
  const response = await invoke({ method: 'POST', headers: { origin: 'https://attacker.invalid' }, body: { action: 'summarize', text: 'private' } });
  assert.equal(response.statusCode, 403);
});

test('AI endpoint validates action, JSON, and input size before model calls', async () => {
  const malformed = await invoke({ method: 'POST', body: '{' });
  assert.equal(malformed.statusCode, 400);
  const badAction = await invoke({ method: 'POST', body: { action: 'unknown', text: 'example' } });
  assert.equal(badAction.statusCode, 400);
  const tooLong = await invoke({ method: 'POST', body: { action: 'rewrite', text: 'x'.repeat(10001) } });
  assert.equal(tooLong.statusCode, 400);
});
