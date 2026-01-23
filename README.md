# Nexus Portfolio (Sumit Shah)

This repository contains a Vite + React frontend and an optional Express backend that proxies GenAI requests and can save chats to Firebase.

## Run locally

Requirements: Node.js (>=18 recommended)

1) Backend (optional, required for GenAI and chat saving)

```bash
cd server
npm install
# set env vars (zsh)
export GENAI_API_KEY="your-genai-api-key"
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"...","project_id":"..."}'
npm start
```

2) Frontend

```bash
cd ..
npm install
npm run dev
```

Open: http://localhost:3000 — Vite proxies `/api` to the backend in development.

## Deploy to Vercel

1) Push your repo to GitHub (you already pushed to `main`).
2) In Vercel, click "New Project" → Import from GitHub → select this repository.
3) Configure Environment Variables in Vercel (Project Settings → Environment Variables):

- `GENAI_API_KEY` = your GenAI key
- `FIREBASE_SERVICE_ACCOUNT_JSON` = (optional) JSON string of your Firebase service account

Build & Output settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

API routes:

This repo contains a small Express `server/` folder. To host server APIs on Vercel you can either:

- Convert the server into Vercel Serverless functions (I can do that), or
- Deploy the Express server separately (Cloud Run, Heroku, Render) and set the frontend to call that URL.

Notes:

- Do not commit secrets. Use Vercel's Environment Variables for `GENAI_API_KEY` and `FIREBASE_SERVICE_ACCOUNT_JSON`.
- If you want, I can convert `server/index.js` into an `api/` folder with serverless endpoints and wire the frontend automatically.

---

If you'd like me to: convert the Express server into Vercel serverless functions or add automated deploy steps, tell me and I'll implement the changes.
# Nexus Portfolio AI

This repository contains a Vite + React frontend and an optional Express backend that proxies AI requests and can save chats to Firebase.

## Local development (backend + frontend)

Requirements:
- Node.js (>=18 recommended)

1) Start the backend server

- Set environment variables (zsh):

```bash
export GENAI_API_KEY="your-genai-api-key"
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"...","project_id":"...", ... }'
```

- Install and start the server:

```bash
cd server
npm install
npm start
```

The server listens on port 4000 and exposes:

- POST /api/ask { message, systemPrompt } -> { text }
- POST /api/saveChat { chat } -> { id }

2) Start the frontend

From the project root:

```bash
npm install
npm run dev
```

Vite is configured to proxy /api to http://localhost:4000 in development, so the frontend will call the backend automatically.

Notes:
- If you don't provide `FIREBASE_SERVICE_ACCOUNT_JSON`, chat saving will be disabled but AI proxying still works (if GENAI_API_KEY is set).
- The server requires a GenAI API key in `GENAI_API_KEY`.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# Portfolio
