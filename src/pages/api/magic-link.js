import { Resend } from 'resend';
import { nanoid } from 'nanoid';

const resend = new Resend(process.env.RESEND_API_KEY);
const tokens = new Map(); // In-memory store

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  const token = nanoid(32);
  const expiresAt = Date.now() + 1000 * 60 * 10; // 10 min

  tokens.set(token, { email, expiresAt });

  const link = `${process.env.BASE_URL}/api/verify?token=${token}`;

  try {
    await resend.emails.send({
      from: 'cli@mrashcreates.xyz',
      to: email,
      subject: 'Your Magic Login Link ✨',
      html: `<p>Click to login: <a href="${link}">${link}</a></p>`
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Email send failed' });
  }
}

export { tokens }; // so we can share token store