import type { NextAuthConfig } from "next-auth";

// Prisma-free half of the Auth.js config, shared by src/proxy.ts and
// src/auth.ts. src/auth.ts extends this config and adds the Credentials
// provider, which does need Prisma. Historically this split existed
// because middleware ran on the Edge runtime, which can't load Prisma's
// Node-only driver adapter — Next.js 16 renamed middleware.ts to proxy.ts
// and switched its default runtime to Node.js, so that constraint no
// longer strictly applies, but keeping the split costs nothing and stays
// portable if that ever changes again.
//
// /dashboard/* added in Phase 4B alongside the existing /profile and
// /account from Phase 4A. The `authorized` callback below only checks "is
// there a session," not a specific permission — the dashboard has no
// resource yet that not every authenticated role can at least view;
// permission-level gating within the dashboard (PermissionGuard,
// src/components/auth/PermissionGuard.tsx) is used inside individual
// pages/sidebar items instead, e.g. hiding a Users link from non-Admins.
const PROTECTED_PREFIXES = ["/profile", "/account", "/dashboard"];

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    // 8-hour session — reasonable default for a staff tool; "Remember me"
    // (LoginForm) extends this to 30 days via the maxAge passed at sign-in.
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = PROTECTED_PREFIXES.some((prefix) =>
        request.nextUrl.pathname.startsWith(prefix),
      );
      if (isProtected && !isLoggedIn) return false;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role;
        token.permissions = (user as { permissions?: string[] }).permissions ?? [];
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | undefined;
        session.user.permissions = (token.permissions as string[]) ?? [];
      }
      return session;
    },
  },
  providers: [], // populated in src/auth.ts (needs the Node runtime)
} satisfies NextAuthConfig;
