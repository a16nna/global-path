const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: String,
  program: String,
  duration: String,
  location: String,
  ranking: Number,
  tuition: {
    annualLocal: Number,
    localCurrency: String,
    annualINR: Number,
    totalINR: Number,
  },
  requirements: {
    cgpaCutoff: Number,
    greRequired: Boolean,
    greMinScore: Number,
    ieltsMin: Number,
    toeflMin: Number,
  },
  deadlines: {
    fall: String,
    winter: String,
  },
  applicationUrl: String,
});

const pathwaySchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    specialisation: { type: String, required: true },
    universities: [universitySchema],
    visa: {
      type: {
        type: String,
      },
      processingTime: String,
      fees: {
        localAmount: Number,
        localCurrency: String,
        INR: Number,
      },
      financialProof: String,
      steps: [String],
      officialUrl: String,
    },
    costs: {
      tuition: {
        annualMinINR: Number,
        annualMaxINR: Number,
      },
      living: [
        {
          city: String,
          monthlyINR: Number,
          annualINR: Number,
        },
      ],
      otherOneTime: {
        visaFeesINR: Number,
        healthInsuranceINR: Number,
        flightAndSetupINR: Number,
      },
    },
    postStudy: {
      workPermit: {
        name: String,
        duration: String,
        eligibility: String,
        applicationWindow: String,
      },
      prPathway: {
        name: String,
        description: String,
        typicalTimeline: String,
      },
      averageSalaryCAD: Number,
      averageSalaryINR: Number,
    },
    timeline: [
      {
        monthsFromNow: Number,
        milestone: String,
        category: {
          type: String,
          enum: ['exam', 'research', 'documents', 'application', 'decision', 'visa'],
        },
        details: String,
      },
    ],
    documents: {
      academic: [String],
      testScores: [String],
      application: [String],
      visa: [String],
    },
  },
  { timestamps: true }
);

pathwaySchema.index({ country: 1, specialisation: 1 }, { unique: true });

module.exports = mongoose.model('Pathway', pathwaySchema);
