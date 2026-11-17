import { createHmac } from 'node:crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const REQUESTS_PER_MINUTE = 3;
const USAGE_RETENTION_SECONDS = 90 * 24 * 60 * 60;
const USAGE_PREFIX = 'devtools-hub:voice:usage';
const RATE_LIMIT_PREFIX = 'devtools-hub:voice:rate-limit';

let sharedProtection;

function createClientIdentifier(clientAddress, hmacKey) {
  const address = typeof clientAddress === 'string' && clientAddress.trim()
    ? clientAddress.trim().slice(0, 256)
    : 'unknown-client';

  return createHmac('sha256', hmacKey).update(address).digest('hex');
}

function incrementUsage(redis, keys, fields) {
  const transaction = redis.multi();

  for (const key of keys) {
    for (const [field, amount] of Object.entries(fields)) {
      transaction.hincrby(key, field, amount);
    }
    transaction.expire(key, USAGE_RETENTION_SECONDS);
  }

  return transaction.exec();
}

export function createVoiceProtection({ redis, rateLimiter, hmacKey, now = () => Date.now() }) {
  if (!redis || !rateLimiter || !hmacKey) {
    throw new TypeError('Redis, a rate limiter, and an HMAC key are required.');
  }

  return {
    async consume({ clientAddress, characterCount }) {
      if (!Number.isSafeInteger(characterCount) || characterCount < 0) {
        throw new TypeError('Character count must be a non-negative safe integer.');
      }

      const timestamp = now();
      const day = new Date(timestamp).toISOString().slice(0, 10);
      const clientIdentifier = createClientIdentifier(clientAddress, hmacKey);
      const usageKeys = [
        `${USAGE_PREFIX}:daily:${day}:all`,
        `${USAGE_PREFIX}:daily:${day}:client:${clientIdentifier}`
      ];
      const limit = await rateLimiter.limit(clientIdentifier);
      if (limit.pending) await limit.pending;
      if (limit.reason === 'timeout') {
        throw new Error('The shared voice rate limiter timed out.');
      }
      if (!limit.success) {
        return { success: false, reset: limit.reset, remaining: limit.remaining };
      }

      await incrementUsage(redis, usageKeys, {
        requests: 1,
        characters: characterCount
      });

      return {
        success: true,
        reset: limit.reset,
        remaining: limit.remaining,
        async recordOutcome(outcome) {
          if (outcome !== 'succeeded' && outcome !== 'failed') return;
          await incrementUsage(redis, usageKeys, { [outcome]: 1 });
        }
      };
    }
  };
}

export function getVoiceProtection() {
  if (sharedProtection) return sharedProtection;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('Upstash Redis is not configured.');
  }

  const redis = new Redis({ url, token });
  const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(REQUESTS_PER_MINUTE, '60 s'),
    analytics: true,
    prefix: RATE_LIMIT_PREFIX
  });

  sharedProtection = createVoiceProtection({ redis, rateLimiter, hmacKey: token });
  return sharedProtection;
}
