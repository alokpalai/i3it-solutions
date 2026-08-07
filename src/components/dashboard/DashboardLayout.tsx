import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { siteConfig } from "@/config/site";
import type { MockNotification } from "@/config/dashboardMockData";

type DashboardLayoutProps = {
  userName: string;
  userRole?: string;
  userPermissions?: string[];
  notifications: MockNotification[];
  children: React.ReactNode;
};

export function DashboardLayout({ userName, userRole, userPermissions = [], notifications, children }: DashboardLayoutProps) {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-dvh bg-surface">
      <Sidebar userPermissions={userPermissions} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar userName={userName} userRole={userRole} userPermissions={userPermissions} notifications={notifications} />
        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
        <footer className="border-t border-border px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-caption text-muted-foreground">
            &copy; {year} {siteConfig.name}. Internal platform.
          </p>
        </footer>
      </div>
    </div>
  );
}
