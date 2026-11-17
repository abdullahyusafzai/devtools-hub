import assert from 'node:assert/strict';
import test from 'node:test';
import { createVoiceProtection } from './voice-protection.js';

function createFakeRedis({ fail = false } = {}) {
  const transactions = [];

  return {
    transactions,
    multi() {
      const commands = [];
      const transaction = {
        hincrby(...args) {
          commands.push(['hincrby', ...args]);
          return transaction;
        },
        expire(...args) {
          commands.push(['expire', ...args]);
          return transaction;
        },
        async exec() {
          transactions.push(commands);
          if (fail) throw new Error('Redis unavailable');
          return [];
        }
      };
      return transaction;
    }
  };
}

function createLimiter(response, events = []) {
  return {
    async limit(identifier) {
      events.push(['limit', identifier]);
      return { pending: Promise.resolve().then(() => events.push(['pending'])), ...response };
    }
  };
}

test('records accepted request and character usage with private daily keys', async () => {
  const now = Date.parse('2026-11-17T12:00:00.000Z');
  const redis = createFakeRedis();
  const events = [];
  const protection = createVoiceProtection({
    redis,
    rateLimiter: createLimiter({ success: true, remaining: 2, reset: now + 60_000 }, events),
    hmacKey: 'test-secret',
    now: () => now
  });

  const allowance = await protection.consume({ clientAddress: '203.0.113.20', characterCount: 42 });

  assert.equal(allowance.success, true);
  assert.equal(allowance.remaining, 2);
  assert.equal(events[1][0], 'pending');
  assert.equal(redis.transactions.length, 1);
  assert.deepEqual(redis.transactions[0].filter(([command]) => command === 'hincrby').map(([, key, field, amount]) => [key, field, amount]), [
    ['devtools-hub:voice:usage:daily:2026-11-17:all', 'requests', 1],
    ['devtools-hub:voice:usage:daily:2026-11-17:all', 'characters', 42],
    [redis.transactions[0][3][1], 'requests', 1],
    [redis.transactions[0][3][1], 'characters', 42]
  ]);
  assert.equal(redis.transactions[0][3][1].startsWith('devtools-hub:voice:usage:daily:2026-11-17:client:'), true);
  assert.equal(JSON.stringify(redis.transactions).includes('203.0.113.20'), false);

  await allowance.recordOutcome('succeeded');
  assert.equal(redis.transactions[1].filter(([command]) => command === 'hincrby').every(([, , field, amount]) => field === 'succeeded' && amount === 1), true);
});

test('does not record usage for a rate-limited request', async () => {
  const redis = createFakeRedis();
  const protection = createVoiceProtection({
    redis,
    rateLimiter: createLimiter({ success: false, remaining: 0, reset: 1234 }),
    hmacKey: 'test-secret'
  });

  const allowance = await protection.consume({ clientAddress: '203.0.113.21', characterCount: 12 });

  assert.equal(allowance.success, false);
  assert.equal(allowance.reset, 1234);
  assert.equal(redis.transactions.length, 0);
});

test('fails closed when shared usage accounting is unavailable', async () => {
  const protection = createVoiceProtection({
    redis: createFakeRedis({ fail: true }),
    rateLimiter: createLimiter({ success: true, remaining: 1, reset: 1234 }),
    hmacKey: 'test-secret'
  });

  await assert.rejects(protection.consume({ clientAddress: '203.0.113.22', characterCount: 1 }), /Redis unavailable/);
});

test('rejects invalid character usage before calling the limiter', async () => {
  const redis = createFakeRedis();
  const events = [];
  const protection = createVoiceProtection({
    redis,
    rateLimiter: createLimiter({ success: true, remaining: 1, reset: 1234 }, events),
    hmacKey: 'test-secret'
  });

  await assert.rejects(protection.consume({ clientAddress: '203.0.113.23', characterCount: -1 }), /non-negative safe integer/);
  assert.equal(events.length, 0);
});
