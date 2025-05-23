export default function handler(req, res) {
  // Redirect to your Cloudflare Access login
  const returnTo = encodeURIComponent(req.headers.referer || '/');
  res.redirect(`https://dash.cloudflare.com/access/login?redirect_url=${returnTo}`);
}