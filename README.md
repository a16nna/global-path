# Global Path

AI-powered platform that generates personalized study-abroad roadmaps for Indian BTech students — university shortlists, eligibility checks, visa steps, costs, timelines, post-study work options, and document checklists, grounded in verified data rather than free-form AI generation.

Currently covering Canada, Australia, UK, and Germany across CS, Data Science, and ECE specialisations, for the BTech → MS/MEng pathway.

---

## Why this exists

Study-abroad research today is scattered across government sites, consultancies, YouTube, Reddit, and blogs — much of it outdated or contradictory. Global Path centralizes this into one place and uses AI as a **reasoning and personalization layer on top of verified data**, not as a source of facts. The model never invents universities, fees, or visa rules — it only synthesizes from a structured knowledge base that's manually researched and seeded from official sources (IRCC, Home Office, DAAD, university websites, etc.). Avoiding misinformation and "agency traps" is the core design constraint, not an afterthought.

---

## Tech stack

**Backend**
- Node.js + Express
- MongoDB (Mongoose) — users, pathway knowledge base, generated roadmaps
- Redis (Upstash) — roadmap caching + per-user daily generation limits
- Google Gemini 1.5 Flash — LLM reasoning layer
- Zod — request validation
- JWT — authentication

**Frontend**
- React 19 + Vite
- React Router
- Tailwind CSS
- Axios
- Framer Motion, GSAP, Three.js / React Three Fiber (landing page visuals)

---

## Project structure

```
global-path/
├── backend/
│   ├── config/         # DB connection, Redis connection, shared constants (enums)
│   ├── controllers/    # Route handlers (auth, user, roadmap)
│   ├── middleware/     # auth, errorHandler, rateLimiter, requestId
│   ├── models/         # Mongoose schemas — User, Pathway, Roadmap
│   ├── routes/         # Express routers — auth, user, roadmap, meta
│   ├── services/       # Business logic — authService, roadmapService, aiService, cacheService
│   ├── utils/          # Zod validation schemas
│   ├── seed/           # Pathway knowledge base seed data (per country + specialisation)
│   ├── server.js       # App entry point
│   └── .env.example
├── frontend/
│   └── src/
│       ├── pages/        # Landing, Login, Register, RoadmapForm
│       ├── components/   # Navbar, Hero, Features, RoadmapResult, etc.
│       ├── services/     # api.js — Axios instance with auth interceptor
│       └── App.jsx       # Route definitions
├── docs/
│   └── architecture.md   # (in progress)
└── research/
    └── country-research.md   # (in progress — source notes per pathway)
```

---

## Getting started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/abroad-platform
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_REFRESH_SECRET=your_refresh_secret_change_this

REDIS_URL=redis://default:<password>@<host>:<port>

GEMINI_API_KEY=your_gemini_api_key_from_aistudio_google_com

EXCHANGE_RATE_API_KEY=your_exchangerate_api_key
EXCHANGE_RATE_BASE_URL=https://v6.exchangerate-api.com/v6

CLIENT_URL=http://localhost:3000
ROADMAP_DAILY_LIMIT=5
```

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | MongoDB Atlas → Cluster → Connect → "Get connection string" |
| `REDIS_URL` | Upstash → Database → Connect → `ioredis` tab |
| `GEMINI_API_KEY` | aistudio.google.com → Get API key → Create new project |
| `EXCHANGE_RATE_API_KEY` | exchangerate-api.com dashboard |

```bash
npm run seed     # populates MongoDB with the pathway knowledge base
npm run dev      # starts the server on http://localhost:5000
```

Expect to see:
```
Server running on port 5000
MongoDB connected
Redis connected
```

Sanity check:
```
GET http://localhost:5000/api/health
GET http://localhost:5000/api/meta/options
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Talks to the backend via `src/services/api.js` (`http://localhost:5000/api`), which auto-attaches the JWT from `localStorage` to every request.

---

## API reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login, returns JWT + user |
| GET | `/user/profile` | Yes | Get logged-in user's profile |
| PUT | `/user/profile` | Yes | Update user profile |
| POST | `/roadmap/generate` | Yes | Generate a personalized roadmap |
| GET | `/roadmap/history` | Yes | List user's saved roadmaps (paginated) |
| GET | `/roadmap/:id` | Yes | Get a specific saved roadmap |
| DELETE | `/roadmap/:id` | Yes | Delete a roadmap |
| GET | `/meta/options` | No | Valid country + specialisation enum values |
| GET | `/health` | No | Health check |

Protected routes require:
```
Authorization: Bearer <token>
```

`POST /roadmap/generate` body:
```json
{
  "country": "canada",
  "specialisation": "cs",
  "cgpa": 8.2,
  "greScore": 320,
  "ieltsScore": 7.0,
  "budget": 5000000,
  "targetIntake": "Fall 2026"
}
```

Valid enums:
```
countries:       australia, canada, uk, germany
specialisations: cs, data-science, ece, mechanical, civil, biotech
intakes:         Winter 2026, Fall 2026, Spring 2027, Summer 2027, Fall 2027, Winter 2027
```

---

## How a roadmap gets generated today

```
1. User submits profile (country, specialisation, CGPA, GRE, IELTS, budget, intake)
2. Backend checks Redis cache for identical inputs → instant return if found
3. Backend fetches the matching Pathway document from MongoDB
4. Universities are tagged "reach" / "match" / "safe" based on the user's
   CGPA/GRE/IELTS vs each university's cutoffs
5. A prompt is built containing ONLY verified pathway + university data
6. Gemini 1.5 Flash synthesizes a structured JSON roadmap from that data
   (it does not invent universities, fees, or visa rules)
7. Result is saved to MongoDB and cached in Redis (24h TTL)
8. Frontend renders universities, timeline, costs, visa steps,
   post-study options, and the document checklist
```

---

## Key architecture decisions (MVP)

- **Pure MERN, no FastAPI/RAG yet** — the knowledge base is small enough to fit directly into one LLM prompt; a vector DB and Python microservice would be premature complexity at this scale. This was a deliberate scoping call, not a skill gap — see "What's next" below for where it changes.
- **LLM as reasoning layer, not knowledge source** — the model only synthesizes from data passed into the prompt. This is the direct defense against the misinformation/agency-trap problem the project is built around.
- **Redis-backed caching and rate limiting** — identical roadmap requests are served from cache instead of re-calling the LLM; each user is capped at `ROADMAP_DAILY_LIMIT` generations/day (resets at midnight) to control API cost.
- **`Pathway` collection as the knowledge base** — each `{ country, specialisation }` pair is a manually researched, verified MongoDB document. Adding a pathway means adding a seed file, not scraping or retraining anything.

---

## Current MVP scope

- **Countries:** Canada, Australia, UK, Germany
- **Specialisations:** CS, Data Science, ECE *(Mechanical, Civil, Biotech enum values exist but have no seed data yet)*
- **Degree path:** BTech → MS/MEng only
- **Seed data complete for:** Canada + CS. All other pathway combinations are pending research (tracked in `research/country-research.md`).

---

## What's next — v2 roadmap

The next phase is anchored on a **RAG (Retrieval-Augmented Generation) layer**, which is the biggest upgrade over the MVP's single-document-lookup approach:

```
Phase 1 — RAG foundation
├── Ingestion pipeline: scrape + chunk official sources beyond what
│   fits in the Pathway schema (IRCC pages, DAAD FAQs, university
│   policy pages), tagged with country/topic/source URL/verified date
├── Embeddings (OpenAI text-embedding-3-small or Gemini embeddings)
├── Vector store (Pinecone free tier, or pgvector)
└── Top-k retrieval + lightweight reranking

Phase 2 — Citation-grounded conversational layer
├── Turn the one-shot roadmap form into a follow-up chat
│   ("what if I lower my budget by 10 lakhs?")
├── Every answer cites the retrieved source chunk it came from
└── Requires real session/context-window design, not just a prompt tweak

Phase 3 — one additional module, depending on direction
├── SOP/LOR review tool — reuses the RAG pipeline to retrieve
│   "what makes a strong SOP for X program" patterns and critique
│   a user's uploaded draft
   — or —
└── Eligibility scoring engine — real point-based calculators
    (Canada Express Entry CRS, Australia SkillSelect) implemented
    as deterministic formulas, not LLM guesses — a deliberate
    "know when not to use an LLM" contrast to the RAG work
```

Stretch / parallel-track ideas: policy-change alerting (periodic re-scrape + diff detection on official pages, notifying users whose saved roadmap is affected by a rule change).

---

## Notes for contributors

- Backend and frontend enum values for `country` and `specialisation` **must stay in sync** — source of truth is `backend/config/constants.js`, exposed via `GET /api/meta/options`.
- Never commit `.env` — only `.env.example` is tracked.
- Roadmap responses are structurally deterministic (enforced by the prompt schema in `services/aiService.js`) even though wording varies between generations.
