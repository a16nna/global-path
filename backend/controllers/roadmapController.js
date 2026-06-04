const {
  generateRoadmap,
  getRoadmapById,
  getRoadmapHistory,
  deleteRoadmap,
} = require('../services/roadmapService');

async function generate(req, res, next) {
  try {
    const result = await generateRoadmap(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const result = await getRoadmapById(req.params.id, req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getRoadmapHistory(req.user._id, page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await deleteRoadmap(req.params.id, req.user._id);
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { generate, getById, getHistory, remove };
