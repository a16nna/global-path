const User = require('../models/User');

async function getProfile(req, res, next) {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profile: { ...req.user.profile.toObject(), ...req.body } } },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
