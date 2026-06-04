const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });

  const token = signToken(user._id);
  return { token, user: sanitizeUser(user) };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const token = signToken(user._id);
  return { token, user: sanitizeUser(user) };
}

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    profile: user.profile,
    createdAt: user.createdAt,
  };
}

module.exports = { register, login };
