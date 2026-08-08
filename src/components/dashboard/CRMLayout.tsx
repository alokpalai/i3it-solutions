"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { crmNavItems } from "@/config/crmNav";
import { isNavItemActive } from "@/lib/isNavItemActive";
import { cn } from "@/lib/utils";
import { CrmSearchBar } from "@/components/dashboard/CrmSearchBar";

// Top-level section nav for every /dashboard/crm/* route — same
// horizontal-tab-strip pattern as ProjectSidebar (real <nav> of links,
// not a fake tablist, since each tab navigates to its own page). Wraps
// all ten CRM routes; the Sidebar's own "CRM" entry gets you here, this
// is the finer-grained nav once you're inside the module.
export function CRMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="CRM sections" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-1 border-b border-border">
          {crmNavItems.map((item) => {
            // "Dashboard" (/dashboard/crm) needs an exact match, same
            // reason isNavItemActive special-cases "/dashboard" itself —
            // otherwise every deeper CRM route would also light it up.
            // Every other tab (e.g. "Organizations") legitimately owns a
            // deeper subtree (/dashboard/crm/organizations/[id]/...).
            const active = item.href === "/dashboard/crm" ? pathname === item.href : isNavItemActive(pathname, item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-3 py-2.5 text-body-sm font-medium transition-colors",
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon aria-hidden="true" className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <CrmSearchBar />
      {children}
    </div>
  );
}
