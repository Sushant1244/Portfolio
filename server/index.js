const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Do not require/instantiate GoogleGenAI at module load time so server can start without an API key.
// We'll require it lazily inside the handler when GENAI_API_KEY is present.
const admin = require('firebase-admin');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin if service account provided
if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    console.log('Firebase Admin initialized');
  } catch (err) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON', err);
  }
} else {
  console.log('No Firebase service account provided; chat saving will be disabled');
}

app.post('/api/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  if (!process.env.GENAI_API_KEY) {
    return res.status(503).json({ error: 'GENAI_API_KEY not configured on the server. Set GENAI_API_KEY to enable AI.' });
  }

  try {
    // Lazy require and instantiate the client to avoid startup-time errors when key is missing
    const { GoogleGenAI } = require('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

    const systemPrompt = req.body.systemPrompt || '';
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: systemPrompt, temperature: 0.7 }
    });

    res.json({ text: response.text || '' });
  } catch (err) {
    console.error('AI error', err);
    res.status(500).json({ error: 'AI error' });
  }
});

app.post('/api/saveChat', async (req, res) => {
  if (!admin.apps.length) return res.status(503).json({ error: 'Firebase not configured' });
  const { chat } = req.body;
  if (!chat) return res.status(400).json({ error: 'Missing chat' });

  try {
    const db = admin.firestore();
    const doc = await db.collection('chats').add({ chat, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ id: doc.id });
  } catch (err) {
    console.error('Firebase error', err);
    res.status(500).json({ error: 'Firebase error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
