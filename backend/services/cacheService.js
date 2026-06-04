const { getRedis } = require('../config/redis');

async function getCached(key) {
  try {
    const redis = getRedis();
    if (!redis) return null;
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

async function setCached(key, value, ttlSeconds = 86400) {
  try {
    const redis = getRedis();
    if (!redis) return;
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // cache failure should never break the main flow
  }
}

async function deleteCached(key) {
  try {
    const redis = getRedis();
    if (!redis) return;
    await redis.del(key);
  } catch {}
}

module.exports = { getCached, setCached, deleteCached };
