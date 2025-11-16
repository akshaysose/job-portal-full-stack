// middleware/clerkAuth.js
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

export default async function clerkAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token" });

    const token = authHeader.replace("Bearer ", "");

    // verify token
    const verified = await clerk.verifyToken(token).catch(() => null);
    if (!verified)
      return res.status(401).json({ success: false, message: "Invalid token" });

    req.auth = { userId: verified.sub }; // or verified.userId depending on Clerk version

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err);
    return res.status(401).json({ success: false, message: "Auth failed" });
  }
}
