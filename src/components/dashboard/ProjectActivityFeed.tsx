import { FolderPlus, UserPlus, RefreshCw, CheckCircle2, FileUp, MessageCircle } from "lucide-react";
import type { ProjectActivityItem, ProjectActivityType } from "@/config/dashboardMockData";
import { formatRelativeTime } from "@/lib/formatDate";

const TYPE_ICON: Record<ProjectActivityType, typeof FolderPlus> = {
  "Project created": FolderPlus,
  "Member assigned": UserPlus,
  "Status updated": RefreshCw,
  "Task completed": CheckCircle2,
  "Document uploaded": FileUp,
  "Comment added": MessageCircle,
};

// Distinct from src/components/dashboard/ActivityFeed.tsx (the dashboard
// homepage's cross-project feed, MockActivityItem shape) — this renders
// ProjectActivityItem, which is typed by a fixed activity taxonomy rather
// than free-text actor/action/target strings.
export function ProjectActivityFeed({ items }: { items: ProjectActivityItem[] }) {
  if (items.length === 0) {
    return <p className="text-body-sm text-muted-foreground">No activity recorded yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-4">
      {items.map((item) => {
        const Icon = TYPE_ICON[item.type];
        return (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-secondary" />
            </span>
            <div className="flex flex-col">
              <p className="text-body-sm text-foreground">
                <span className="font-medium">{item.actor}</span> &mdash; {item.detail}
              </p>
              <p className="text-caption text-muted-foreground">
                {item.type} &middot; {formatRelativeTime(item.timestamp)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
