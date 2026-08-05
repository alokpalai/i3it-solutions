"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/internal/Breadcrumbs";
import { dashboardNavItems, dashboardFooterNavItems } from "@/config/dashboardNav";

const ALL_ITEMS = [...dashboardNavItems, ...dashboardFooterNavItems];

function labelFor(href: string): string {
  const match = ALL_ITEMS.find((item) => item.href === href);
  if (match) return match.label;
  const segment = href.split("/").filter(Boolean).pop() ?? "";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

// The one genuinely client-only piece of TopNavbar — usePathname() has no
// server equivalent inside a shared layout. Route depth in this phase
// never exceeds /dashboard/<section>, so a two-level trail covers every
// real case rather than a general-purpose N-level breadcrumb resolver.
export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];
  if (segments.length > 1) {
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  }

  return <Breadcrumbs items={items} />;
}
