"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, CheckSquare, Users, GanttChartSquare, FileText, History } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview", segment: "overview", icon: LayoutGrid },
  { label: "Tasks", segment: "tasks", icon: CheckSquare },
  { label: "Team", segment: "team", icon: Users },
  { label: "Timeline", segment: "timeline", icon: GanttChartSquare },
  { label: "Documents", segment: "documents", icon: FileText },
  { label: "Activity", segment: "activity", icon: History },
];

// The brief names this "ProjectSidebar," but a second full-height vertical
// sidebar nested inside the dashboard's own Sidebar would be genuinely
// heavy UI (two sidebars stacked). This is the same secondary
// in-project-navigation concept implemented as a horizontal tab strip
// instead — scrolls on mobile, sits under ProjectHeader on desktop.
export function ProjectSidebar({ projectId }: { projectId: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Project sections" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1 border-b border-border">
        {TABS.map((tab) => {
          const href = `/dashboard/projects/${projectId}/${tab.segment}`;
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
