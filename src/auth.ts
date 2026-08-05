import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { loginSchema } from "@/lib/validation/auth";
import { authConfig } from "@/auth.config";

// Node-runtime half of the Auth.js config (route handlers, Server
// Components/Actions — never src/middleware.ts, see auth.config.ts).
// PrismaAdapter is wired up for future OAuth/SSO providers (Account table
// already exists for that); it plays no role in the Credentials flow
// below, which looks the user up itself and issues a JWT session.
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            role: {
              include: { permissions: { include: { permission: true } } },
            },
          },
        });

        // Same generic failure for "no such user" and "wrong password" —
        // never reveal which one it was (standard enumeration defense).
        if (!user || !user.isActive) return null;

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) return null;

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.avatarUrl,
          role: user.role.name,
          permissions: user.role.permissions.map(
            (rp) => `${rp.permission.resource}:${rp.permission.action}`,
          ),
        };
      },
    }),
  ],
});
