# Abroad Platform — Backend

AI-powered study abroad guidance platform for Indian BTech students targeting MS/MEng programs.

## Tech stack
- Node.js + Express
- MongoDB (Mongoose)
- Redis (Upstash)
- Google Gemini 1.5 Flash (LLM)
- Zod (validation)

## Getting started

```bash
npm install
cp .env.example .env
# Fill in your .env values
npm run seed       # seed pathway data into MongoDB
npm run dev        # start dev server with nodemon
```

## API endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login, get JWT |
| GET | /api/user/profile | Yes | Get logged-in user profile |
| PUT | /api/user/profile | Yes | Update user profile |
| POST | /api/roadmap/generate | Yes | Generate personalized roadmap |
| GET | /api/roadmap/history | Yes | List user's saved roadmaps |
| GET | /api/roadmap/:id | Yes | Get a specific roadmap |
| DELETE | /api/roadmap/:id | Yes | Delete a roadmap |
| GET | /api/meta/options | No | Get country + specialisation enums |
| GET | /api/health | No | Health check |

## Auth
All protected routes require `Authorization: Bearer <token>` header.

## Environment variables
See `.env.example` for all required variables.

## Folder structure
```
config/       DB, Redis, constants
controllers/  Route handlers
middleware/   Auth, error handler, rate limiter, requestId
models/       Mongoose schemas
routes/       Express routers
services/     Business logic (auth, roadmap, AI, cache)
utils/        Zod validation schemas
seed/         Pathway seed data scripts
```

## Adding a new pathway
1. Create `seed/<country>-<specialisation>.js` following the canada-cs.js template
2. Add it to `seed/index.js`
3. Run `npm run seed`

## Architecture decisions
- Pure MERN stack for MVP — no FastAPI needed since data is structured and fits in a single prompt
- LLM only synthesizes from verified MongoDB data — does not generate facts freely
- Redis caches roadmaps by input hash — same inputs never trigger a second LLM call
- Per-user daily generation limit tracked in Redis (resets midnight)
