// Simple smoke test: checks frontend and backend endpoints
(async () => {
  try {
    const rootResp = await fetch('http://localhost:3000/');
    console.log('Frontend:', rootResp.status, rootResp.headers.get('content-type'));
  } catch (e) {
    console.error('Frontend check failed:', e.message);
  }

  try {
    const aiResp = await fetch('http://localhost:4000/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What are your top skills?' })
    });
    console.log('/api/ask:', aiResp.status);
    const text = await aiResp.text();
    console.log('Response body:', text.slice(0, 400));
  } catch (e) {
    console.error('/api/ask check failed:', e.message);
  }
})();
