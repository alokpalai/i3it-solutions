import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { hasPermission } from "@/lib/permissions";
import { AdminLayout } from "@/components/dashboard/AdminLayout";

// Private, staff-only pages — never indexed, regardless of the
// robots.txt/sitemap.ts config governing the public marketing site.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// This is the one route tree in the whole dashboard that's gated by more
// than "signed in" — src/app/dashboard/layout.tsx's ProtectedLayout
// already handles that. Roles:view is the narrowest grant in
// src/lib/permissions.ts's DEFAULT_ROLE_PERMISSIONS (only Super Admin and
// Admin hold it by default), so this is real enforcement, not a mock UI
// gate: a signed-in user without it is redirected to /access-denied
// before any admin page renders, server-side.
export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const permissions = session?.user?.permissions ?? [];

  if (!hasPermission(permissions, "Roles", "view")) {
    redirect("/access-denied");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
