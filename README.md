# AgriSphere AI — SIH 2026 Prototype

An AI-powered **intelligence and decision layer** for agricultural market linkages and price
discovery. AgriSphere AI does not replace eNAM/AGMARKNET — it sits on top of that
infrastructure and turns fragmented market, buyer, logistics and storage data into one clear,
explainable recommendation:

> **Right Price. Right Buyer. Right Time. Right Decision.**

This is a hackathon demonstration prototype, not a production trading platform.

---

## Tech stack

**Frontend:** React + Vite + Tailwind CSS + React Router + Recharts + Lucide icons
**Backend:** Node.js + Express + MongoDB + Mongoose
**AI:** Google Gemini via the official `@google/genai` SDK — used ONLY for explanation/timing
reasoning. All prices, net realization, matching scores, and trust scores are calculated
deterministically by the backend (`src/services/`), never by Gemini.

## Folder structure

```
agrisphere-ai/
├── backend/
│   ├── server.js                # Express app entry point
│   └── src/
│       ├── config/db.js         # MongoDB connection
│       ├── models/               # Mongoose schemas (Farmer, Market, Buyer, Storage, ...)
│       ├── services/             # Deterministic business logic + Gemini wrapper
│       │   ├── marketDataService.js   # adapter — swap in real AGMARKNET API later
│       │   ├── profitCalculator.js    # Net Realisation formula (core differentiator)
│       │   ├── trustScoreService.js   # AgriSphere Buyer Trust Score
│       │   ├── matchingService.js     # weighted buyer-matching algorithm
│       │   └── geminiService.js       # the ONLY file that calls Gemini, with fallbacks
│       ├── ai/prompts/            # centralized Gemini prompt templates
│       ├── controllers/           # one file per resource, thin — calls services
│       ├── routes/                # Express routers, mounted in server.js
│       ├── middleware/            # asyncHandler + centralized errorHandler
│       └── seed/                  # demo/synthetic seed data + seed runner
└── frontend/
    └── src/
        ├── api/client.js         # single fetch wrapper for all backend calls
        ├── components/           # shared UI: Navbar, cards, tables, AI widget, modal
        └── pages/                 # one file per route (Landing, Dashboard, Market, ...)
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # then paste your real GEMINI_API_KEY and MONGODB_URI
npm run seed                # populates MongoDB with demo farmer/markets/buyers/etc.
npm run dev                 # starts on http://localhost:5000
```

If `GEMINI_API_KEY` is missing or the Gemini API call fails, every AI endpoint automatically
falls back to a simple rule-based response so the demo never breaks on stage.

If MongoDB is unreachable, the server still starts; only DB-backed endpoints will report a
clear fallback message instead of crashing.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                 # starts on http://localhost:5173, proxies /api to :5000
```

Open `http://localhost:5173` — you'll land on the demo entry page, then `/dashboard` shows the
preconfigured demo farmer (Ramesh Kumar, Kolar, 10T Tomato Grade A). Click **"Find My Best
Selling Option"** for the full end-to-end journey described in the spec (market comparison →
buyer matches → net realization → logistics/storage → AI sale-timing recommendation → trust
score).

## Notes on data & disclaimers

- All buyer names (e.g. "ABC Foods (Demo)") are **fictional demo data**, clearly labeled — not
  real companies.
- Price history is **synthetic** (random-walk generated), not official AGMARKNET data. The
  `marketDataService.js` adapter is structured so a real AGMARKNET/OGD integration can be
  dropped in later without touching any other file.
- Every AI-generated recommendation is labeled "AI-assisted" with a "not guaranteed" disclaimer,
  and the Buyer Trust Score is explicitly labeled as not an official credit score.
