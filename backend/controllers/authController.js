const { register, login } = require('../services/authService');

async function registerHandler(req, res, next) {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function loginHandler(req, res, next) {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { registerHandler, loginHandler };
