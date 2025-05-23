// /pages/api/login.js
export default function handler(req, res) {
  const returnTo = encodeURIComponent('https://mrashcreates.xyz');
  res.redirect(`https://mrashcreates.cloudflareaccess.com/cdn-cgi/access/login?redirect_url=${returnTo}`);
}