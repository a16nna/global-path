const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inputs: {
      country: String,
      specialisation: String,
      cgpa: Number,
      greScore: Number,
      ieltsScore: Number,
      budget: Number,
      targetIntake: String,
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    cacheKey: { type: String, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
