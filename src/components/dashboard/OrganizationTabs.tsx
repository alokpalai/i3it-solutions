"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Contact, FolderKanban, Target, CalendarClock, FileText, History } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview", segment: "overview", icon: LayoutGrid },
  { label: "Contacts", segment: "contacts", icon: Contact },
  { label: "Projects", segment: "projects", icon: FolderKanban },
  { label: "Opportunities", segment: "opportunities", icon: Target },
  { label: "Meetings", segment: "meetings", icon: CalendarClock },
  { label: "Documents", segment: "documents", icon: FileText },
  { label: "Timeline", segment: "timeline", icon: History },
];

// Same horizontal-tab-strip pattern as ProjectSidebar — a real <nav> of
// links (not a fake tablist, each tab is its own page), scoped to one
// organization's detail routes.
export function OrganizationTabs({ organizationId }: { organizationId: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Organization sections" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1 border-b border-border">
        {TABS.map((tab) => {
          const href = `/dashboard/crm/organizations/${organizationId}/${tab.segment}`;
          const active = pathname === href;
          return (
            <li key={tab.segment} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-3 py-2.5 text-body-sm font-medium transition-colors",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <tab.icon aria-hidden="true" className="h-4 w-4" />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
