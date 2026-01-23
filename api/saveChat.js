// Vercel Serverless function for /api/saveChat
// Expects POST { chat }
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { chat } = req.body || {};
  if (!chat) return res.status(400).json({ error: 'Missing chat' });

  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return res.status(503).json({ error: 'FIREBASE_SERVICE_ACCOUNT_JSON not configured' });
  }

  try {
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }

    const db = admin.firestore();
    const doc = await db.collection('chats').add({ chat, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.status(200).json({ id: doc.id });
  } catch (err) {
    console.error('Firebase error', err);
    return res.status(500).json({ error: 'Firebase error' });
  }
};
