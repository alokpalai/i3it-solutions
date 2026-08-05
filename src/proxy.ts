import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Next.js 16 renamed the middleware.ts convention to proxy.ts (the export
// is now named `proxy`, not `middleware`) — confirmed against this
// installed version's own docs (node_modules/next/dist/docs/.../proxy.md)
// rather than assumed from older training data, per this repo's own
// AGENTS.md instruction to check for exactly this kind of breaking change.
// Proxy also now defaults to the Node.js runtime rather than Edge, so the
// auth.config.ts / auth.ts split (kept here for portability) is no longer
// strictly required by a runtime constraint — but it's still good
// practice, so it stays.
const { auth } = NextAuth(authConfig);

export const proxy = auth;

// Matcher stays in sync with auth.config.ts's PROTECTED_PREFIXES rather
// than running on every request.
export const config = {
  matcher: ["/profile/:path*", "/account/:path*", "/dashboard/:path*"],
};
