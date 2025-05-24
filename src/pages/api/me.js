import { parse } from 'cookie';

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  if (!cookies.magic_user) return res.status(401).json({ loggedIn: false });

  return res.status(200).json({ loggedIn: true, email: cookies.magic_user });
}