export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });
  
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `📣 Terminal alert: ${message}` })
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to send message' });
    }
  }