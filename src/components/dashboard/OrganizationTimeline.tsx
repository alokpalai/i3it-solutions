import { RefreshCw, CalendarClock, FileText } from "lucide-react";
import type { OrganizationTimelineEntry } from "@/lib/crmMetrics";
import { formatRelativeTime } from "@/lib/formatDate";

const KIND_ICON: Record<OrganizationTimelineEntry["kind"], typeof RefreshCw> = {
  Activity: RefreshCw,
  Meeting: CalendarClock,
  Quotation: FileText,
};

// The brief's "Timeline" reusable component, scoped to an organization's
// merged activity/meeting/quotation history (src/lib/crmMetrics.ts's
// getOrganizationTimeline). Distinct from Timeline.tsx (Projects'
// Gantt-style milestone chart) — same shape of naming collision as
// ProjectActivityFeed vs ActivityFeed, same resolution (a new,
// purpose-named component rather than overloading the existing one).
export function OrganizationTimeline({ entries }: { entries: OrganizationTimelineEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-body-sm text-muted-foreground">No timeline events recorded yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-4">
      {entries.map((entry) => {
        const Icon = KIND_ICON[entry.kind];
        return (
          <li key={`${entry.kind}-${entry.id}`} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-secondary" />
            </span>
            <div className="flex flex-col">
              <p className="text-body-sm text-foreground">{entry.label}</p>
              <p className="text-caption text-muted-foreground">{entry.kind} &middot; {formatRelativeTime(entry.timestamp)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
