"use server";

import { randomBytes, createHash } from "node:crypto";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendEmail } from "@/lib/email";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "@/lib/validation/auth";

export type AuthActionResult = { success: true } | { success: false; error: string };

// Server Action wrapping Auth.js's server-side signIn() (@/auth, not
// next-auth/react) — LoginForm is a client component but calls this
// instead of the client signIn(), so it doesn't need a <SessionProvider>
// wrapping the app just for one form.
//
// "Remember me" is captured and threaded through, but isn't fully wired
// yet: differentiating session cookie lifetime per sign-in (vs. the fixed
// maxAge in auth.config.ts) needs a custom cookies() function in the
// Auth.js config, which is deliberately not built speculatively here.
// Today every session gets the same 8-hour default regardless of the
// checkbox — flagged rather than silently ignored.
export async function loginAction(values: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Enter a valid email and password." };
  }

  const rateLimit = await checkRateLimit(`login:${parsed.data.email}`);
  if (!rateLimit.allowed) {
    return { success: false, error: "Too many failed attempts. Please try again later." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid email or password." };
    }
    throw error;
  }
}

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function hashToken(token: string): string {
  // SHA-256, not bcrypt — this is a lookup key backed by its own high
  // entropy (32 random bytes), not a low-entropy secret a human chose, so
  // it doesn't need bcrypt's deliberate slowness. Stored hashed so a
  // database leak alone doesn't hand out valid reset links.
  return createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(values: unknown): Promise<AuthActionResult> {
  const parsed = forgotPasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Enter a valid email address." };
  }
  const { email } = parsed.data;

  const rateLimit = await checkRateLimit(`forgot-password:${email}`);
  if (!rateLimit.allowed) {
    return { success: false, error: "Too many attempts. Please try again later." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always the same success response whether or not the account exists —
  // otherwise this endpoint becomes a way to enumerate valid staff emails.
  if (user && user.isActive) {
    const rawToken = randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: hashToken(rawToken),
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL ?? ""}/reset-password?token=${rawToken}`;
    await sendEmail({
      to: user.email,
      subject: "Reset your i3it Solutions password",
      body: `A password reset was requested for your account. This link expires in 1 hour:\n\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
    });
  }

  return { success: true };
}

export async function resetPassword(values: unknown): Promise<AuthActionResult> {
  const parsed = resetPasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the highlighted fields and try again." };
  }
  const { token, password } = parsed.data;

  const rateLimit = await checkRateLimit(`reset-password:${hashToken(token)}`);
  if (!rateLimit.allowed) {
    return { success: false, error: "Too many attempts. Please try again later." };
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token: hashToken(token) },
  });

  if (
    !resetToken ||
    resetToken.usedAt !== null ||
    resetToken.expiresAt.getTime() < Date.now()
  ) {
    return { success: false, error: "This reset link is invalid or has expired." };
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return { success: true };
}

export async function changePassword(values: unknown): Promise<AuthActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You must be signed in to change your password." };
  }

  const parsed = changePasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the highlighted fields and try again." };
  }
  const { currentPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { success: false, error: "Account not found." };
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Current password is incorrect." };
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return { success: true };
}

// Bound directly to the Sidebar's Logout item as a form action (Phase
// 4B) — signOut() clears the session cookie and redirects server-side, no
// client JS required for the logout click itself.
export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}
