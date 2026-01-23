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
