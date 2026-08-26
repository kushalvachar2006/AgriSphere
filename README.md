# AgriSphere AI — SIH 2026 Prototype

An AI-powered **intelligence and decision layer** for agricultural market linkages and price discovery.

AgriSphere AI does not replace eNAM, AGMARKNET, or existing agricultural marketplaces. Instead, it sits on top of that infrastructure and transforms fragmented market, buyer, logistics, storage, arrival-volume, and demand data into one clear, explainable recommendation:

> **Right Price. Right Buyer. Right Time. Right Decision.**

This is a hackathon demonstration prototype, not a production trading platform.

---

## Tech Stack

**Frontend:** React + Vite + Tailwind CSS + React Router + Recharts + Lucide Icons

**Backend:** Node.js + Express + MongoDB + Mongoose

**AI:** Google Gemini via the official `@google/genai` SDK

Gemini is used only for:

* Explaining market opportunities
* Explaining buyer rankings
* Sale-window reasoning
* Arrival-volume insights
* Demand forecast explanations
* Offer summaries

All financial calculations, forecasts, rankings, trust scores, arrival analytics, and transaction states are computed deterministically in backend services before any AI explanation is generated.

---

## What AgriSphere AI Solves

Farmers frequently sell produce below its true potential value because:

* Market prices are fragmented across sources
* Buyer demand is difficult to discover
* Arrival-volume information is unavailable
* Logistics and storage costs are not considered together
* Institutional buyers are hard to access
* Small farmers cannot aggregate sufficient volume
* Payment reliability is unclear
* Sale timing decisions are difficult

AgriSphere AI consolidates these signals into actionable recommendations for farmers and FPOs.

---

## Core Features

### 1. Market Intelligence

Compares nearby markets and ranks them by:

**Net Realisation = Selling Price − Transport Cost − Storage Cost − Transaction Cost**

Includes:

* Market comparison tables
* 60-day price trends
* Net realization ranking
* Sale-window recommendations

---

### 2. Arrival Volume Intelligence

Tracks and analyzes market arrivals to help farmers understand supply pressure.

Includes:

* Historical arrival volumes
* Arrival trend charts
* Percentage increase/decrease analysis
* Supply pressure indicators
* AI-assisted explanation of how arrivals may affect prices

All arrival statistics are calculated deterministically.

---

### 3. Buyer Discovery & Smart Matching

Connects farmers directly with verified buyers.

Buyer ranking considers:

* Crop fit
* Quantity fit
* Quality fit
* Offer price
* Distance
* Trust score
* Urgency

Includes:

* Buyer cards
* Smart matching
* AI crop grading from images
* Trust score explanation

---

### 4. Buyer Demand Forecasting

Predicts future procurement demand using historical buyer procurement patterns.

Includes:

* Demand forecasts
* Seasonal demand analysis
* Procurement trend charts
* AI-assisted forecast explanations

Forecast calculations use deterministic seasonal-index moving averages for complete transparency and auditability.

---

### 5. Institutional Buyer Integration

Supports multiple buyer categories:

* Food processors
* Retail chains
* Exporters
* Government procurement agencies
* Wholesale traders

Each buyer profile includes:

* Quantity requirements
* Quality requirements
* Delivery timelines
* Buyer type
* Procurement channel

---

### 6. Digital Offer & Negotiation System

Enables structured offer management between farmers/FPOs and buyers.

Includes:

* Offer creation
* Offer acceptance
* Counter-offers
* Offer rejection
* Offer status tracking

All offer transitions follow a deterministic state machine.

---

### 7. Multi-Channel Market Comparison

Compares selling opportunities across multiple channels.

Supported channels:

* APMC Mandis
* eNAM
* Direct Buyers
* Processors
* Export Markets
* Retail Procurement

All channels use the same net-realization ranking logic to ensure fair comparison.

---

### 8. FPO Smart Lot Builder

Allows Farmer Producer Organizations (FPOs) to aggregate produce from multiple farmers into buyer-ready lots.

Benefits:

* Higher bargaining power
* Access to bulk buyers
* Better price realization
* Reduced fragmentation

---

### 9. Transaction Tracking & Dispute Resolution

Tracks the full transaction lifecycle:

Offer Created → Offer Accepted → Pickup Scheduled → In Transit → Delivered → Payment Received

Includes:

* Status tracking
* Payment tracking
* Dispute creation
* Grievance management

---

### 10. Farmer AI Assistant

A grounded AI assistant available throughout the application.

Example questions:

* Why should I sell to this buyer?
* Why is this market ranked higher?
* Why is demand expected to increase?
* Why should I wait before selling?

The assistant never invents prices, forecasts, buyer offers, or logistics numbers.

If verified data is unavailable, it explicitly says so.

---

## Folder Structure

```text
agrisphere-ai/
├── backend/
│   ├── server.js
│   └── src/
│       ├── config/db.js
│       ├── models/
│       │   ├── Farmer.js
│       │   ├── Market.js
│       │   ├── Buyer.js
│       │   ├── Storage.js
│       │   ├── Offer.js
│       │   ├── ArrivalVolume.js
│       │   └── ProcurementHistory.js
│       ├── services/
│       │   ├── marketDataService.js
│       │   ├── profitCalculator.js
│       │   ├── trustScoreService.js
│       │   ├── matchingService.js
│       │   ├── arrivalVolumeService.js
│       │   ├── demandForecastService.js
│       │   ├── offerService.js
│       │   ├── multiChannelService.js
│       │   └── geminiService.js
│       ├── ai/prompts/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       └── seed/
└── frontend/
    └── src/
        ├── api/client.js
        ├── components/
        └── pages/
```

---

## Setup

### Backend

```bash
cd backend

npm install

cp .env.example .env

# Add:
# GEMINI_API_KEY
# MONGODB_URI

npm run seed

npm run dev
```

Runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## Demo Flow

1. Dashboard → Click **Find My Best Selling Option**
2. Market Intelligence → Compare markets by net realization
3. Arrival Intelligence → Review supply pressure and arrival trends
4. Multi-Channel Comparison → Compare APMC, eNAM, processors, exporters
5. Buyer Discovery → Run Smart Matching
6. Demand Forecasting → View buyer demand outlook
7. Offer Negotiation → Create or respond to offers
8. FPO Smart Lot → Aggregate produce
9. Transactions → Track fulfillment and payments
10. AI Assistant → Ask for explanations and recommendations

---

## Notes on Data & Disclaimers

* All buyers are fictional demo entities.
* Price history is synthetic demo data.
* Arrival-volume data is synthetic demo data.
* Demand forecasts are generated from synthetic procurement history.
* Trust Scores are AgriSphere-specific indicators and are not official credit ratings.
* AI recommendations are clearly labeled as AI-assisted and not guaranteed.
* Gemini never calculates prices, forecasts, trust scores, net realization, rankings, or transaction states.
* If Gemini is unavailable, all AI endpoints fall back to deterministic rule-based explanations.
* If MongoDB is unavailable, the application degrades gracefully and reports clear fallback messages.

---

## Architecture Principle

**Every important number is deterministic. Every AI response is explainable.**

AgriSphere AI computes all rankings, forecasts, scores, and recommendations using auditable backend logic first. Gemini is only used afterward to convert those results into farmer-friendly explanations.

This ensures transparency, reliability, and trust while preserving the benefits of conversational AI.
