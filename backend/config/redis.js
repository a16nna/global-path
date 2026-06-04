const Redis = require('ioredis');

let redis;

async function connectRedis() {
  try {
    redis = new Redis(process.env.REDIS_URL);
    redis.on('connect', () => console.log('Redis connected'));
    redis.on('error', (err) => console.error('Redis error:', err.message));
  } catch (err) {
    console.error('Redis connection error:', err.message);
  }
}

function getRedis() {
  return redis;
}

module.exports = { connectRedis, getRedis };
