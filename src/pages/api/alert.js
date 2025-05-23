export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end('Method Not Allowed');
    }
  
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }
  
    try {
      const webhook = process.env.DISCORD_WEBHOOK_URL;
  
      if (!webhook) {
        return res.status(500).json({ error: 'Webhook not configured' });
      }
  
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `📣 Terminal alert: ${message}` })
      });
  
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('[DISCORD ALERT FAILED]', err);
      return res.status(500).json({ error: 'Failed to send alert' });
    }
  }