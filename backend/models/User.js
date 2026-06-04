const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    profile: {
      btechBranch: { type: String, default: '' },
      cgpa: { type: Number, min: 0, max: 10, default: null },
      greScore: { type: Number, min: 260, max: 340, default: null },
      ieltsScore: { type: Number, min: 0, max: 9, default: null },
      toeflScore: { type: Number, min: 0, max: 120, default: null },
      targetCountries: [{ type: String }],
      targetSpecialisations: [{ type: String }],
      budget: { type: Number, default: null },
      targetIntake: { type: String, default: '' },
    },
    savedRoadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' }],
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
