const Pathway = require('../models/Pathway');
const Roadmap = require('../models/Roadmap');
const { generateRoadmapWithAI } = require('./aiService');
const { getCached, setCached } = require('./cacheService');
const { COUNTRY_LABELS, SPECIALISATION_LABELS, ELIGIBILITY } = require('../config/constants');

async function generateRoadmap(userId, inputs) {
  const { country, specialisation, cgpa, greScore, ieltsScore, budget, targetIntake } = inputs;

  const cacheKey = buildCacheKey(inputs);
  const cached = await getCached(cacheKey);
  if (cached) {
    return { ...cached, fromCache: true };
  }

  const pathway = await Pathway.findOne({ country, specialisation });
  if (!pathway) {
    const err = new Error(`No pathway data found for ${country} + ${specialisation}`);
    err.status = 404;
    throw err;
  }

  const eligibleUniversities = tagEligibility(pathway.universities, { cgpa, greScore, ieltsScore });

  const roadmapOutput = await generateRoadmapWithAI({
    pathway,
    eligibleUniversities,
    userInputs: inputs,
    countryLabel: COUNTRY_LABELS[country],
    specialisationLabel: SPECIALISATION_LABELS[specialisation],
  });

  const saved = await Roadmap.create({
    userId,
    inputs,
    output: roadmapOutput,
    cacheKey,
  });

  await setCached(cacheKey, roadmapOutput, 60 * 60 * 24);

  return { roadmapId: saved._id, ...roadmapOutput, fromCache: false };
}

async function getRoadmapById(roadmapId, userId) {
  const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
  if (!roadmap) {
    const err = new Error('Roadmap not found');
    err.status = 404;
    throw err;
  }
  return { roadmapId: roadmap._id, ...roadmap.output, inputs: roadmap.inputs, createdAt: roadmap.createdAt };
}

async function getRoadmapHistory(userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [roadmaps, total] = await Promise.all([
    Roadmap.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).select('inputs createdAt _id'),
    Roadmap.countDocuments({ userId }),
  ]);
  return {
    roadmaps: roadmaps.map((r) => ({
      roadmapId: r._id,
      country: r.inputs.country,
      specialisation: r.inputs.specialisation,
      targetIntake: r.inputs.targetIntake,
      createdAt: r.createdAt,
    })),
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  };
}

async function deleteRoadmap(roadmapId, userId) {
  const result = await Roadmap.findOneAndDelete({ _id: roadmapId, userId });
  if (!result) {
    const err = new Error('Roadmap not found');
    err.status = 404;
    throw err;
  }
}

function tagEligibility(universities, { cgpa, greScore, ieltsScore }) {
  return universities.map((uni) => {
    const req = uni.requirements;
    const cgpaOk = !cgpa || !req.cgpaCutoff || cgpa >= req.cgpaCutoff;
    const greOk = !req.greRequired || !greScore || greScore >= (req.greMinScore || 300);
    const ieltsOk = !ieltsScore || !req.ieltsMin || ieltsScore >= req.ieltsMin;

    const gap = cgpa && req.cgpaCutoff ? cgpa - req.cgpaCutoff : 0;

    let eligibility;
    if (!cgpaOk || !greOk || !ieltsOk) {
      eligibility = ELIGIBILITY.REACH;
    } else if (gap >= 1.0) {
      eligibility = ELIGIBILITY.SAFE;
    } else {
      eligibility = ELIGIBILITY.MATCH;
    }

    return { ...uni.toObject(), eligibility };
  });
}

function buildCacheKey(inputs) {
  const { country, specialisation, cgpa, greScore, ieltsScore, budget, targetIntake } = inputs;
  return `roadmap:${country}:${specialisation}:${cgpa}:${greScore}:${ieltsScore}:${budget}:${targetIntake}`;
}

module.exports = { generateRoadmap, getRoadmapById, getRoadmapHistory, deleteRoadmap };
