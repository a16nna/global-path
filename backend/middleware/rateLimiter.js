const rateLimit = require('express-rate-limit');
const { getRedis } = require('../config/redis');

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many auth attempts, please try again later.' },
});

async function roadmapRateLimiter(req, res, next) {
  try {
    const redis = getRedis();
    if (!redis) return next();

    const key = `roadmap_limit:${req.user._id}`;
    const limit = parseInt(process.env.ROADMAP_DAILY_LIMIT) || 5;

    const current = await redis.incr(key);

    if (current === 1) {
      const secondsUntilMidnight = getSecondsUntilMidnight();
      await redis.expire(key, secondsUntilMidnight);
    }

    if (current > limit) {
      return res.status(429).json({
        error: `Daily roadmap generation limit of ${limit} reached. Resets at midnight.`,
        requestId: req.requestId,
      });
    }

    next();
  } catch (err) {
    next();
  }
}

function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
}

module.exports = { globalRateLimiter, authRateLimiter, roadmapRateLimiter };
