export default function handler(req, res) {
  const returnTo = encodeURIComponent('https://mrashcreates.xyz');
  const base = 'https://mrashcreates.cloudflareaccess.com/cdn-cgi/access/login';
  res.redirect(`${base}?redirect_url=${returnTo}`);
}