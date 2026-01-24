// Simple smoke test: checks frontend and backend endpoints
(async () => {
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  async function retryFetch(url, options, attempts = 8, delay = 500) {
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch(url, options);
        return res;
      } catch (e) {
        if (i === attempts - 1) throw e;
        await wait(delay);
      }
    }
  }

  try {
    const rootResp = await retryFetch('http://localhost:3000/');
    console.log('Frontend:', rootResp.status, rootResp.headers.get('content-type'));
  } catch (e) {
    console.error('Frontend check failed:', e.message);
  }

  try {
    const aiResp = await retryFetch('http://localhost:4000/api/ask', {
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
