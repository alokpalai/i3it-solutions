"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/internal/Breadcrumbs";
import { dashboardNavItems, dashboardFooterNavItems } from "@/config/dashboardNav";
import { getProjectById } from "@/lib/projectMetrics";
import { getVendorById, getProductById } from "@/config/procurementMockData";

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
<<<<<<< Updated upstream
// that subtree got its own resolver. Phase 4F's admin section adds a
// plain /dashboard/admin/<section> level plus one detail route
// (/dashboard/admin/users/[id]) — everything else still falls through to
// the original two-level case.
=======
// that subtree got its own resolver. Phase 4E adds two more: a plain
// /dashboard/procurement|inventory|documents/<section> level, and vendor/
// product detail routes one level deeper still
// (/dashboard/procurement/vendors/[id], /dashboard/inventory/products/[id])
// — everything else still falls through to the original two-level case.
>>>>>>> Stashed changes
export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];

  const isProjectDetail = segments[1] === "projects" && segments.length > 2 && segments[2] !== "new";
<<<<<<< Updated upstream
  const isUserDetail = segments[1] === "admin" && segments[2] === "users" && segments.length > 3;
  const isAdminSection = segments[1] === "admin" && segments.length > 2 && !isUserDetail;
=======
  const isVendorDetail = segments[1] === "procurement" && segments[2] === "vendors" && segments.length > 3;
  const isProcurementSection = segments[1] === "procurement" && segments.length > 2 && !isVendorDetail;
  const isProductDetail = segments[1] === "inventory" && segments[2] === "products" && segments.length > 3;
  const isInventorySection = segments[1] === "inventory" && segments.length > 2 && !isProductDetail;
  const isDocumentsSection = segments[1] === "documents" && segments.length > 2;
>>>>>>> Stashed changes

  if (isProjectDetail) {
    const project = getProjectById(segments[2]);
    items.push({ label: "Projects", href: "/dashboard/projects" });
    if (project) {
      const tab = segments[3];
      items.push({ label: project.name, href: tab ? `/dashboard/projects/${project.id}/overview` : undefined });
      if (tab) items.push({ label: titleCase(tab) });
    }
<<<<<<< Updated upstream
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
=======
  } else if (isVendorDetail) {
    const vendor = getVendorById(segments[3]);
    items.push({ label: "Procurement", href: "/dashboard/procurement" });
    items.push({ label: "Vendors", href: "/dashboard/procurement/vendors" });
    if (vendor) items.push({ label: vendor.company });
  } else if (isProcurementSection) {
    items.push({ label: "Procurement", href: "/dashboard/procurement" });
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  } else if (isProductDetail) {
    const product = getProductById(segments[3]);
    items.push({ label: "Inventory", href: "/dashboard/inventory" });
    items.push({ label: "Products", href: "/dashboard/inventory/products" });
    if (product) items.push({ label: product.name });
  } else if (isInventorySection) {
    items.push({ label: "Inventory", href: "/dashboard/inventory" });
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  } else if (isDocumentsSection) {
    items.push({ label: "Documents", href: "/dashboard/documents" });
>>>>>>> Stashed changes
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  } else if (segments.length > 1) {
    items.push({ label: labelFor(`/${segments.join("/")}`) });
  }

  return <Breadcrumbs items={items} />;
}
