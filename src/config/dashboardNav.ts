import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  MessageSquare,
  FileText,
  Bell,
  User,
  Settings,
  ShieldCheck,
  Contact2,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Only rendered for users whose session permissions satisfy this
   * resource:action — used for "Admin", which is otherwise a dead link
   * (and a confusing one) for the ~90% of roles that /dashboard/admin's
   * own server-side redirect would bounce straight to /access-denied. */
  requires?: { resource: import("@/lib/permissions").ResourceName; action?: "view" | "manage" };
};

// Sidebar's exact list from the Phase 4B brief. "Documents" and
// "Settings" aren't in the brief's own ROUTES list, but leaving them as
// dead sidebar links would be worse — both get a real, minimal page
// (src/app/dashboard/documents, src/app/dashboard/settings). "Logout" is
// an action (src/lib/actions/auth.ts's logoutAction), not a route, so it
// isn't in either list here — Sidebar/MobileNav render it separately.
export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "CRM", href: "/dashboard/crm", icon: Contact2 },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Admin", href: "/dashboard/admin", icon: ShieldCheck, requires: { resource: "Roles", action: "view" } },
];

export const dashboardFooterNavItems: DashboardNavItem[] = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
