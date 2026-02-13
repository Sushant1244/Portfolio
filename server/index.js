const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Do not require/instantiate GoogleGenAI at module load time so server can start without an API key.
// We'll require it lazily inside the handler when GENAI_API_KEY is present.
const admin = require('firebase-admin');

// Portfolio data - shared with frontend
const PORTFOLIO_DATA = {
  name: "Sumit Shah",
  role: "Senior Full Stack Engineer",
  location: "San Francisco, CA",
  bio: "Passionate developer specialized in building scalable high-performance web applications with React, Node.js, and Cloud architectures. I love bridging the gap between design and robust engineering.",
  email: "sushantsha985@gmail.com",
  phone: "9766325733",
  github: "https://github.com/Sushant1244",
  linkedin: "https://www.linkedin.com/in/sumit-shah-216569388/",
  twitter: "https://twitter.com"
};

const PROJECTS = [
  { id: "1", title: "QuantumSaaS Dashboard", description: "Enterprise-grade analytics platform for tracking real-time cloud infrastructure performance.", tags: ["React", "TypeScript", "D3.js", "Node.js", "Redis"] },
  { id: "2", title: "EcoStream Mobile", description: "Sustainability tracking app with social integration.", tags: ["React Native", "Firebase", "Node.js", "GraphQL"] },
  { id: "3", title: "HyperCommerce", description: "High-performance e-commerce engine with AI-driven recommendations.", tags: ["Next.js", "PostgreSQL", "Tailwind", "Gemini API"] },
  { id: "4", title: "Electrocart E-commerce", description: "A full-featured online store platform.", tags: ["React", "Node.js", "PostgreSQL", "Stripe"] },
  { id: "5", title: "Connunity", description: "A community platform for creators and shoppers.", tags: ["React", "Firebase", "Realtime"] },
  { id: "6", title: "Electrocart App", description: "Mobile companion app for Electrocart.", tags: ["React Native", "Firebase", "Stripe"] }
];

const EXPERIENCES = [
  { company: "TechGiant Corp", role: "Senior Software Engineer", period: "2021 - Present", skills: ["React", "TypeScript", "AWS", "Kubernetes"] },
  { company: "Innovate Labs", role: "Full Stack Developer", period: "2018 - 2021", skills: ["Vue.js", "Node.js", "MongoDB", "Docker"] }
];

const SKILLS = [
  { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }, { name: "Next.js" },
  { name: "Node.js" }, { name: "PostgreSQL" }, { name: "Redis" }, { name: "GraphQL" },
  { name: "AWS" }, { name: "Docker" }, { name: "GitHub Actions" }, { name: "Figma" }
];

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
    // Provide a helpful local fallback using portfolio data when no API key is present
    const m = (message || '').toLowerCase();
    if (m.includes('skill')) {
      return res.json({ text: `Top skills: ${SKILLS.map(s => s.name).join(', ')}.` });
    }
    if (m.includes('project')) {
      const list = PROJECTS.slice(0, 5).map(p => `- ${p.title}: ${p.description}`).join('\n');
      return res.json({ text: `Here are some projects:\n${list}` });
    }
    if (m.includes('contact') || m.includes('email') || m.includes('phone')) {
      return res.json({ text: `Contact ${PORTFOLIO_DATA.name} at ${PORTFOLIO_DATA.email} or ${PORTFOLIO_DATA.phone}.` });
    }
    if (m.includes('experience')) {
      const parts = EXPERIENCES.map(e => e.role + ' at ' + e.company + ' (' + e.period + ')');
      return res.json({ text: 'Experience highlights: ' + parts.join('; ') });
    }

    return res.json({ text: `Hi — I'm ${PORTFOLIO_DATA.name}'s assistant. Ask me about skills, projects, or contact information.` });
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
