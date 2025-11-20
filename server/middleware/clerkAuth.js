// middleware/clerkAuth.js
import { Clerk } from "@clerk/clerk-sdk-node";

const clerkApiKey = process.env.CLERK_SECRET_KEY;

if (!clerkApiKey || clerkApiKey === 'your_clerk_secret_key_here') {
  console.warn('Warning: CLERK_SECRET_KEY is not set or is using placeholder value');
}

const clerk = clerkApiKey && clerkApiKey !== 'your_clerk_secret_key_here' 
  ? new Clerk({ apiKey: clerkApiKey })
  : null;

export default async function clerkAuth(req, res, next) {
  try {
    if (!clerk) {
      console.error('CLERK_SECRET_KEY is not configured properly');
      return res.status(500).json({ success: false, message: "Server configuration error: Clerk not configured" });
    }

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token" });

    const token = authHeader.replace("Bearer ", "");

    // verify token
    const verified = await clerk.verifyToken(token).catch((err) => {
      console.error('Token verification error:', err);
      return null;
    });
    
    if (!verified) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.auth = { userId: verified.sub }; // or verified.userId depending on Clerk version

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ success: false, message: "Auth failed" });
  }
}
