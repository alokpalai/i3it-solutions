"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/internal/Breadcrumbs";
import { dashboardNavItems, dashboardFooterNavItems } from "@/config/dashboardNav";
import { getProjectById } from "@/lib/projectMetrics";
import { getOrganizationById } from "@/config/crmMockData";

const ALL_ITEMS = [...dashboardNavItems, ...dashboardFooterNavItems];

function labelFor(href: string): string {
  const match = ALL_ITEMS.find((item) => item.href === href);
  if (match) return match.label;
  const segment = href.split("/").filter(Boolean).pop() ?? "";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

function titleCase(segment: string): string {
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

// The one genuinely client-only piece of TopNavbar — usePathname() has no
// server equivalent inside a shared layout. Originally a flat two-level
// trail (Dashboard > <section>) covered every route; Phase 4C's project
// detail routes went a level deeper (/dashboard/projects/[id]/<tab>), so
// that subtree got its own resolver. Phase 4D's CRM section and Phase 4F's
// admin section each add their own shapes on top: a plain
// /dashboard/<section>/<sub-section> level, and (CRM only) organization
// detail routes one level deeper still
// (/dashboard/crm/organizations/[id]/<tab>) plus (admin only) one detail
// route (/dashboard/admin/users/[id]) — everything else still falls
// through to the original two-level case.
export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];

  const isProjectDetail = segments[1] === "projects" && segments.length > 2 && segments[2] !== "new";
  const isCrmOrgDetail = segments[1] === "crm" && segments[2] === "organizations" && segments.length > 3;
  const isCrmSection = segments[1] === "crm" && segments.length > 2 && !isCrmOrgDetail;
  const isUserDetail = segments[1] === "admin" && segments[2] === "users" && segments.length > 3;
  const isAdminSection = segments[1] === "admin" && segments.length > 2 && !isUserDetail;

  if (isProjectDetail) {
    const project = getProjectById(segments[2]);
    items.push({ label: "Projects", href: "/dashboard/projects" });
    if (project) {
      const tab = segments[3];
      items.push({ label: project.name, href: tab ? `/dashboard/projects/${project.id}/overview` : undefined });
      if (tab) items.push({ label: titleCase(tab) });
    }
  } else if (isCrmOrgDetail) {
    const organization = getOrganizationById(segments[3]);
    items.push({ label: "CRM", href: "/dashboard/crm" });
    items.push({ label: "Organizations", href: "/dashboard/crm/organizations" });
    if (organization) {
      const tab = segments[4];
      items.push({ label: organization.name, href: tab ? `/dashboard/crm/organizations/${organization.id}/overview` : undefined });
      if (tab) items.push({ label: titleCase(tab) });
    }
  } else if (isCrmSection) {
    items.push({ label: "CRM", href: "/dashboard/crm" });
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  } else if (isUserDetail) {
    // The user's real name isn't available here — this component is
    // client-only (usePathname has no server equivalent) and a Prisma
    // lookup can't run client-side. The truncated ID matches how
    // UserTable itself displays it, so it's at least a consistent,
    // honest label rather than a fabricated one.
    items.push({ label: "Admin", href: "/dashboard/admin" });
    items.push({ label: "Users", href: "/dashboard/admin/users" });
    items.push({ label: segments[3].slice(0, 8) });
  } else if (isAdminSection) {
    items.push({ label: "Admin", href: "/dashboard/admin" });
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  } else if (segments.length > 1) {
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  }

  return <Breadcrumbs items={items} />;
}
