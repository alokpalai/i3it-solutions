import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserPlus,
  Landmark,
  Target,
  CalendarClock,
  Bell,
  Contact,
  Building2,
  History,
  BarChart3,
} from "lucide-react";

export type CrmNavItem = { label: string; href: string; icon: LucideIcon };

// Shared by CRMLayout's tab strip and DashboardBreadcrumbs' CRM-subtree
// resolver — one list instead of two that could drift, same reasoning as
// dashboardNav.ts's dashboardNavItems being shared by Sidebar/MobileDrawer.
export const crmNavItems: CrmNavItem[] = [
  { label: "Dashboard", href: "/dashboard/crm", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/crm/leads", icon: UserPlus },
  { label: "Clients", href: "/dashboard/crm/clients", icon: Landmark },
  { label: "Opportunities", href: "/dashboard/crm/opportunities", icon: Target },
  { label: "Meetings", href: "/dashboard/crm/meetings", icon: CalendarClock },
  { label: "Follow-ups", href: "/dashboard/crm/follow-ups", icon: Bell },
  { label: "Contacts", href: "/dashboard/crm/contacts", icon: Contact },
  { label: "Organizations", href: "/dashboard/crm/organizations", icon: Building2 },
  { label: "Activity", href: "/dashboard/crm/activity", icon: History },
  { label: "Reports", href: "/dashboard/crm/reports", icon: BarChart3 },
];
