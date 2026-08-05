import type { DefaultSession } from "next-auth";

// Extends Auth.js's default Session/User/JWT shapes with the fields our
// Credentials authorize() callback and auth.config.ts's jwt/session
// callbacks actually populate — id, role, permissions. Without this, every
// read of session.user.role etc. elsewhere in the app would need an `as`
// cast at the call site instead of once, here.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      permissions?: string[];
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    permissions?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    permissions?: string[];
  }
}
