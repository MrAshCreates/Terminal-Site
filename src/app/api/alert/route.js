import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'No message provided' }, { status: 400 });
  }

  try {
    const webhook = process.env.DISCORD_WEBHOOK_URL;

    if (!webhook) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `📣 Terminal alert: ${message}` })
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DISCORD ALERT FAILED]', err);
    return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 });
  }
}