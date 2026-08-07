"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { isNavItemActive } from "@/lib/isNavItemActive";
import { cn } from "@/lib/utils";

export type SectionTabItem = { label: string; href: string; icon: LucideIcon };

// Generic horizontal tab strip — the same shape ProjectSidebar.tsx
// (Phase 4C) hand-rolls for one section. Reused here as the Admin
// section's narrow-viewport nav (AdminSidebar covers lg+); its
// Procurement/Inventory/Documents equivalents live on
// feature/phase-4-procurement, not this branch, so this is a
// recreation of that same generic component rather than an import.
export function SectionTabNav({ items, ariaLabel, rootHref }: { items: SectionTabItem[]; ariaLabel: string; rootHref: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1 border-b border-border">
        {items.map((item) => {
          // The section root needs an exact match (otherwise every
          // deeper route in the section would also light it up); every
          // other tab may legitimately own a deeper subtree.
          const active = item.href === rootHref ? pathname === item.href : isNavItemActive(pathname, item.href);
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
  );
}
