import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { tokens } from './tokens'; // make sure this is edge-safe

export const runtime = 'edge';

export async function POST(req) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const token = randomBytes(32).toString('hex');
  const env = process.env;

  await tokens.set(token, { email, expiresAt: Date.now() + 15 * 60_000 }, 900, env);

  const link = `${env.BASE_URL}/api/verify?token=${token}`;

  if (env.NODE_ENV === 'production') {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'login@mrashcreates.xyz',
        to: email,
        subject: 'Your Magic Login Link ✨',
        html: `<p>Click to login: <a href="${link}">${link}</a></p>`
      })
    });
  } else {
    console.log('Magic link:', link);
  }

  return NextResponse.json({ success: true });
}