
import { PORTFOLIO_DATA, PROJECTS, EXPERIENCES, SKILLS } from "../constants";

const systemPrompt = `
You are the "AI Twin" of ${PORTFOLIO_DATA.name}, a ${PORTFOLIO_DATA.role} based in ${PORTFOLIO_DATA.location}.
Your goal is to answer questions from potential employers or collaborators based on the portfolio data provided below.

PORTFOLIO DATA:
- Role: ${PORTFOLIO_DATA.role}
- Bio: ${PORTFOLIO_DATA.bio}
- Location: ${PORTFOLIO_DATA.location}
- Skills: ${SKILLS.map(s => s.name).join(", ")}
- Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join("; ")}
- Experience: ${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period})`).join("; ")}

GUIDELINES:
1. Be professional, friendly, and helpful.
2. If someone asks for contact info, provide the email: ${PORTFOLIO_DATA.email}.
3. If asked about technical expertise, emphasize the skills listed.
4. If you don't know an answer, say you're not sure but suggest they contact ${PORTFOLIO_DATA.name} directly.
5. Keep responses concise and engaging. Use Markdown for formatting.
`;

export async function askAITwin(userMessage: string) {
  // Helper: a small portfolio-based fallback responder so chat works without Gemini
  const localFallback = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes('skill')) {
      return `Top skills: ${SKILLS.map(s => s.name).join(', ')}.`;
    }
    if (m.includes('project') || m.includes('projects') || m.includes('portfolio')) {
      const list = PROJECTS.slice(0, 5).map(p => `- ${p.title}: ${p.description}`).join('\n');
      return `Here are some projects:\n${list}`;
    }
    if (m.includes('contact') || m.includes('email') || m.includes('phone')) {
      return `You can reach ${PORTFOLIO_DATA.name} at ${PORTFOLIO_DATA.email} or ${PORTFOLIO_DATA.phone}.`;
    }
    if (m.includes('experience') || m.includes('work')) {
      const parts = EXPERIENCES.map(e => e.role + ' at ' + e.company + ' (' + e.period + ')');
      return 'Experience highlights: ' + parts.join('; ');
    }
    // generic fallback
    return `Hi — I'm ${PORTFOLIO_DATA.name}'s assistant. Ask me about skills, projects, or contact information.`;
  };

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, systemPrompt })
    });

    if (!res.ok) {
      // If server indicates AI is unavailable (e.g., 503) or other error, return local fallback
      try {
        const body = await res.text();
        console.error('Backend /api/ask error', res.status, body);
      } catch (e) {
        console.error('Backend /api/ask error and failed to read body', e);
      }
      return localFallback(userMessage);
    }

    const data = await res.json();
    return data.text || localFallback(userMessage);
  } catch (err) {
    console.error('askAITwin error', err);
    return localFallback(userMessage);
  }
}

export async function saveChat(chat: any) {
  try {
    const res = await fetch('/api/saveChat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat })
    });
    if (!res.ok) {
      console.error('saveChat failed', await res.text());
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('saveChat error', err);
    return null;
  }
}
