# Portfolio (Sumit Shah)

This repo contains a Vite + React frontend and serverless API endpoints under `api/` (Vercel functions) that provide:

- POST /api/ask  — proxies requests to Google GenAI (Gemini)
- POST /api/saveChat — saves chat records to Firestore (optional)

Local development

1) Frontend (dev server)

```bash
npm install
npm run dev
```

Open: http://localhost:3000

2) Local testing of serverless endpoints

Options:
- Use Vercel CLI to run functions locally (`vercel dev`) — recommended to replicate Vercel environment.
- Or run the original Express server for local testing (server/ folder), which behaves the same as the serverless endpoints.

Environment variables

Set these in your Vercel project (and locally when testing):

- `GENAI_API_KEY` — your GenAI (Gemini) API key
- `FIREBASE_SERVICE_ACCOUNT_JSON` — (optional) JSON string of your Firebase service account

Deploy on Vercel

1) In Vercel: New Project → Import from GitHub → select this repository.
2) Set the environment variables in Project Settings.
3) Vercel will detect a static site (Vite). The `api/` folder will be deployed as serverless functions automatically.

Notes

- If you prefer running a persistent Express server instead of serverless functions, you can deploy `server/index.js` to Cloud Run, Heroku, or Render and point the frontend to that base URL.
- Keep secrets out of the repo. Use Vercel's Environment Variables or other secret managers.

If you'd like I can:
- Add a `vercel.json` (already added) with custom routing, or
- Convert the `server/` endpoints into more granular serverless handlers (I already added `api/ask.js` and `api/saveChat.js`).
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
