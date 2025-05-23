// /pages/api/me.js
export default function handler(req, res) {
    const email = req.headers['cf-access-authenticated-user-email'];
    if (!email) return res.status(401).json({ loggedIn: false });
  
    return res.status(200).json({
      loggedIn: true,
      email
    });
  }
  
  let retries = 0;
const checkLogin = async () => {
  try {
    const res = await fetch('/api/me', { cache: 'no-store' });
    const data = await res.json();
    if (data.loggedIn) {
      setUser(data.email);
      addLine(`✅ Logged in as ${data.email}`);
    } else throw new Error();
  } catch {
    if (retries < 2) {
      retries++;
      setTimeout(checkLogin, 500); // try again in half a sec
    } else {
      addLine('⚠️ Login failed to verify. Try refreshing.');
    }
  }
};