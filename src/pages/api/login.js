export default function handler(req, res) {
  const returnTo = encodeURIComponent(req.headers.referer || '/');
  res.redirect(`https://mrashcreates.cloudflareaccess.com/cdn-cgi/access/login?redirect_url=${returnTo}`);
}