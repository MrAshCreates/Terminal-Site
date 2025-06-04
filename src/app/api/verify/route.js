
import { cookies } from 'next/headers';
import { tokens } from '../magic-link/tokens';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  const env = context.env;
  const entry = await tokens.get(token, env);
  if (!entry || entry.expiresAt < Date.now()) {
    return new NextResponse('Token invalid or expired', { status: 403 });
  }
  await tokens.delete(token, env);

  cookies().set('magic_user', entry.email, {
    httpOnly: true,
    sameSite: 'Strict',
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  });

  return NextResponse.redirect(`${env.BASE_URL}/`);
}