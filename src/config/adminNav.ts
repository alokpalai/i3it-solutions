import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  KeyRound,
  Building2,
  Settings,
  Building,
  Palette,
  Lock,
  Bell,
  History,
  BarChart3,
  ScrollText,
} from "lucide-react";
import type { SectionTabItem } from "@/components/dashboard/SectionTabNav";

export type AdminNavGroup = { label: string; items: SectionTabItem[] };

// Grouped (unlike CRM/Procurement's flat tab strips) — 13 routes is
// enough that an ungrouped list stops being scannable. AdminSidebar
// renders these groups as a real secondary vertical nav rather than a
// horizontal tab strip; ProjectSidebar's "a second sidebar is heavy UI"
// reasoning was sized for 6-7 tabs, not 13.
export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard }],
  },
  {
    label: "Users & Access",
    items: [
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Roles", href: "/dashboard/admin/roles", icon: ShieldCheck },
      { label: "Permissions", href: "/dashboard/admin/permissions", icon: KeyRound },
      { label: "Departments", href: "/dashboard/admin/departments", icon: Building2 },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
      { label: "Company", href: "/dashboard/admin/company", icon: Building },
      { label: "Branding", href: "/dashboard/admin/branding", icon: Palette },
      { label: "Security", href: "/dashboard/admin/security", icon: Lock },
      { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Activity", href: "/dashboard/admin/activity", icon: History },
      { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
      { label: "Logs", href: "/dashboard/admin/logs", icon: ScrollText },
    ],
  },
];

export const adminNavItems: SectionTabItem[] = adminNavGroups.flatMap((group) => group.items);
