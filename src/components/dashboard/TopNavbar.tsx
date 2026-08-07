import { MobileDrawer } from "@/components/dashboard/MobileDrawer";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { NotificationBell } from "@/components/dashboard/NotificationBell";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { MockNotification } from "@/config/dashboardMockData";

type TopNavbarProps = {
  userName: string;
  userRole?: string;
  userPermissions?: string[];
  notifications: MockNotification[];
};

// Server Component — SearchBar, ThemeToggle and DashboardBreadcrumbs are
// the only actual client leaves inside it; NotificationBell/
// ProfileDropdown use the <details>/<summary> pattern (FAQAccordion)
// rather than client state.
export function TopNavbar({ userName, userRole, userPermissions = [], notifications }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 sm:px-6">
      <MobileDrawer userPermissions={userPermissions} />
      <div className="hidden lg:block">
        <DashboardBreadcrumbs />
      </div>
      <div className="flex flex-1 items-center justify-end gap-3">
        <SearchBar />
        <div className="flex items-center gap-1">
          <NotificationBell notifications={notifications} />
          <ThemeToggle />
          <ProfileDropdown name={userName} role={userRole} />
        </div>
      </div>
    </header>
  );
}
