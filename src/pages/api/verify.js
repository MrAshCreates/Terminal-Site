import { tokens } from './magic-link';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { token } = req.query;
  const entry = tokens.get(token);

  if (!entry || entry.expiresAt < Date.now()) {
    return res.status(403).send('Invalid or expired token');
  }

  tokens.delete(token); // One-time use

  const cookie = serialize('magic_user', entry.email, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  });

  res.setHeader('Set-Cookie', cookie);
  res.redirect('/');
}