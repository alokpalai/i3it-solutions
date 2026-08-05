import { redirect } from "next/navigation";
import type { Session } from "next-auth";

type ProtectedLayoutProps = {
  /** Resolved by the calling page via `await auth()` — kept as a plain
   * prop rather than this component calling auth() itself, so the caller
   * can reuse the same session value for its own rendering without a
   * second lookup or an async-render-prop pattern that doesn't play well
   * with React/TypeScript's stable children types. */
  session: Session | null;
  children: React.ReactNode;
};

// Defense-in-depth alongside src/middleware.ts, which already redirects
// unauthenticated requests to /profile and /account to /login — this is
// the same check at the component level, and a single place to change
// that behavior later (e.g. preserving a callbackUrl) without touching
// every protected page.
export function ProtectedLayout({ session, children }: ProtectedLayoutProps) {
  if (!session?.user) {
    redirect("/login");
  }
  return <>{children}</>;
}
