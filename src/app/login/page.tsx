import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

// Real, functional login for company staff (Phase 4A) — no customer
// authentication, and no self-service sign-up exists for this platform
// (staff accounts are provisioned directly, not self-registered — see
// src/app/signup/page.tsx, unchanged from its Phase 3 placeholder since
// that route genuinely still isn't part of this platform).
//
// Wrapped in the same public Header/Footer as every other page rather
// than a fully chrome-less full-screen layout — a dedicated auth shell
// would mean splitting the entire site into (marketing)/(auth) route
// groups, which is a much bigger, riskier restructuring than this phase
// warrants. The two-column panel below still reads as a dedicated login
// experience within that constraint.
export const metadata = buildMetadata({
  title: "Employee Login",
  description: "Employee login for i3it Solutions.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <Image
          src="/logo.jpeg"
          alt={siteConfig.name}
          width={783}
          height={177}
          className="h-10 w-auto brightness-0 invert"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-h1 text-primary-foreground">Welcome back</h1>
          <p className="max-w-sm text-body-lg text-primary-foreground/80">
            Sign in to access procurement, project and account tools for i3it Solutions staff.
          </p>
        </div>
        <p className="text-caption text-primary-foreground/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Internal platform.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-h2 text-foreground">Log in</h2>
            <p className="text-body text-muted-foreground">
              Enter your company email and password to continue.
            </p>
          </div>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
