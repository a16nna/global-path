const router = require('express').Router();
const { registerHandler, loginHandler } = require('../controllers/authController');
const { validate, registerSchema, loginSchema } = require('../utils/validate');
const { authRateLimiter } = require('../middleware/rateLimiter');

router.post('/register', authRateLimiter, validate(registerSchema), registerHandler);
router.post('/login', authRateLimiter, validate(loginSchema), loginHandler);

module.exports = router;
