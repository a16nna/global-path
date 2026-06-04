const router = require('express').Router();
const { generate, getById, getHistory, remove } = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');
const { roadmapRateLimiter } = require('../middleware/rateLimiter');
const { validate, generateRoadmapSchema } = require('../utils/validate');

router.post('/generate', protect, roadmapRateLimiter, validate(generateRoadmapSchema), generate);
router.get('/history', protect, getHistory);
router.get('/:id', protect, getById);
router.delete('/:id', protect, remove);

module.exports = router;
