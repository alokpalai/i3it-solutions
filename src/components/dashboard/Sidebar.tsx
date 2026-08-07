"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";
import { dashboardNavItems, dashboardFooterNavItems, type DashboardNavItem } from "@/config/dashboardNav";
import { siteConfig } from "@/config/site";
import { isNavItemActive } from "@/lib/isNavItemActive";
import { hasPermission } from "@/lib/permissions";

function NavLink({ item, collapsed, active }: { item: DashboardNavItem; collapsed: boolean; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm font-medium transition-colors",
        active
          ? "bg-surface-muted text-primary"
          : "text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
    >
      <item.icon aria-hidden="true" className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

// Desktop only (hidden below lg) — MobileDrawer covers small screens with
// the same dashboardNavItems/dashboardFooterNavItems list, so the two
// never drift. Collapse state is local (not persisted) — simple and
// correct for a first version; localStorage persistence is a one-line
// addition later if wanted.
export function Sidebar({ userPermissions = [] }: { userPermissions?: string[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const visibleNavItems = dashboardNavItems.filter(
    (item) => !item.requires || hasPermission(userPermissions, item.requires.resource, item.requires.action),
  );

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-background transition-[width] duration-200 lg:flex",
        collapsed ? "w-[76px]" : "w-64",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        {!collapsed && <span className="truncate text-h5 text-foreground">{siteConfig.name}</span>}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            <ChevronsRight aria-hidden="true" className="h-4 w-4" />
          ) : (
            <ChevronsLeft aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
        {visibleNavItems.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} active={isNavItemActive(pathname, item.href)} />
        ))}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border px-3 py-3">
        {dashboardFooterNavItems.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} active={isNavItemActive(pathname, item.href)} />
        ))}
        <form action={logoutAction}>
          <button
            type="submit"
            title={collapsed ? "Logout" : undefined}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-body-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-error"
          >
            <LogOut aria-hidden="true" className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
