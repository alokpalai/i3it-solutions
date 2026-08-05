// Rate-limiting architecture placeholder — Phase 4A brief: "rate limiting
// architecture," not a working limiter. No Redis/Upstash instance is
// provisioned, so this can't actually enforce anything yet. The shape
// here (checkRateLimit returning {allowed, remaining}) is what
// login/forgot-password call sites are written against
// (src/lib/actions/auth.ts), so wiring up a real backing store later
// means replacing this function's body only, not any caller.
//
// In-memory fallback below is NOT a real rate limiter — it resets on every
// server restart/redeploy and doesn't share state across serverless
// instances. It exists only so the login/forgot-password flows have
// *some* throttling in local dev, not as the production mechanism.

type RateLimitResult = { allowed: boolean; remaining: number };

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}
