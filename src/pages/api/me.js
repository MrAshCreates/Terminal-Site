// /pages/api/me.js
export default function handler(req, res) {
    const email = req.headers['cf-access-authenticated-user-email'];
    if (!email) return res.status(401).json({ loggedIn: false });
  
    return res.status(200).json({
      loggedIn: true,
      email
    });
  }