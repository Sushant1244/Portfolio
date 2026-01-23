// Vercel Serverless function for /api/ask
// Expects POST { message, systemPrompt }
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, systemPrompt } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message' });

  if (!process.env.GENAI_API_KEY) {
    return res.status(503).json({ error: 'GENAI_API_KEY not configured' });
  }

  try {
    const { GoogleGenAI } = require('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: systemPrompt || '', temperature: 0.7 }
    });

    return res.status(200).json({ text: response.text || '' });
  } catch (err) {
    console.error('AI error', err);
    return res.status(500).json({ error: 'AI error' });
  }
};
