
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const config = {
  runtime: 'edge',
};
export async function GET() {
  const cookieStore = cookies();
  const email = cookieStore.get('magic_user')?.value;

  if (!email) return NextResponse.json({ loggedIn: false }, { status: 401 });
  return NextResponse.json({ loggedIn: true, email });
}