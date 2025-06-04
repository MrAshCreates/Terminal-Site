
import { cookies } from 'next/headers';
import { tokens } from '../magic-link/tokens';
import { NextResponse } from 'next/server';
export const runtime = 'edge';
export async function GET(req, context) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!entry || entry.expiresAt < Date.now()) {
    return new NextResponse('Token invalid or expired', { status: 403 });
  }

  cookies().set('magic_user', entry.email, {
    httpOnly: true,
    sameSite: 'Strict',
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  });

  return NextResponse.redirect(`${process.env.BASE_URL}/`);
}