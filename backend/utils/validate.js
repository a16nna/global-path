const { z } = require('zod');
const { COUNTRIES, SPECIALISATIONS, INTAKES } = require('../config/constants');

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const updateProfileSchema = z.object({
  btechBranch: z.string().optional(),
  cgpa: z.number().min(0).max(10).optional().nullable(),
  greScore: z.number().min(260).max(340).optional().nullable(),
  ieltsScore: z.number().min(0).max(9).optional().nullable(),
  toeflScore: z.number().min(0).max(120).optional().nullable(),
  targetCountries: z.array(z.enum(COUNTRIES)).optional(),
  targetSpecialisations: z.array(z.enum(SPECIALISATIONS)).optional(),
  budget: z.number().positive().optional().nullable(),
  targetIntake: z.string().optional(),
});

const generateRoadmapSchema = z.object({
  country: z.enum(COUNTRIES),
  specialisation: z.enum(SPECIALISATIONS),
  cgpa: z.number().min(0).max(10).optional().nullable(),
  greScore: z.number().min(260).max(340).optional().nullable(),
  ieltsScore: z.number().min(0).max(9).optional().nullable(),
  budget: z.number().positive().optional().nullable(),
  targetIntake: z.string().optional(),
});

function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  generateRoadmapSchema,
  validate,
};
