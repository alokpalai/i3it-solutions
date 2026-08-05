import type { Metadata } from "next";
import { auth } from "@/auth";
import { ProtectedLayout } from "@/components/auth/ProtectedLayout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { mockNotifications } from "@/config/dashboardMockData";

// Private, staff-only pages — never indexed, regardless of the
// robots.txt/sitemap.ts config governing the public marketing site.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <ProtectedLayout session={session}>
      <DashboardLayout
        userName={session?.user?.name ?? "Employee"}
        userRole={session?.user?.role}
        notifications={mockNotifications}
      >
        {children}
      </DashboardLayout>
    </ProtectedLayout>
  );
}
