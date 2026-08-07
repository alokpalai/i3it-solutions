"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavGroups } from "@/config/adminNav";
import { isNavItemActive } from "@/lib/isNavItemActive";
import { cn } from "@/lib/utils";

// Desktop-only real secondary vertical nav (hidden below lg — see
// SectionTabNav's use in AdminLayout for the narrow-viewport
// equivalent, same split as the main Sidebar.tsx/MobileDrawer.tsx
// pattern). 13 routes across 4 groups is enough that a horizontal tab
// strip (CRMLayout's/ProcurementLayout's approach) stops being scannable
// — this is the one dashboard section that earns a real second sidebar.
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className="hidden w-56 shrink-0 flex-col gap-6 lg:flex">
      {adminNavGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 text-caption font-semibold uppercase tracking-wide text-muted-foreground">
            {group.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.href === "/dashboard/admin" ? pathname === item.href : isNavItemActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2 text-body-sm font-medium transition-colors",
                      active
                        ? "bg-surface-muted text-primary"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground",
                    )}
                  >
                    <item.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
