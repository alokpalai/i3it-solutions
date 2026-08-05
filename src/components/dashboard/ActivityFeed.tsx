import { Activity } from "lucide-react";
import type { MockActivityItem } from "@/config/dashboardMockData";
import { formatRelativeTime } from "@/lib/formatDate";

export function ActivityFeed({ items }: { items: MockActivityItem[] }) {
  if (items.length === 0) {
    return <p className="text-body-sm text-muted-foreground">No recent activity.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted">
            <Activity aria-hidden="true" className="h-3.5 w-3.5 text-secondary" />
          </span>
          <div className="flex flex-col">
            <p className="text-body-sm text-foreground">
              <span className="font-medium">{item.actor}</span> {item.action}{" "}
              <span className="font-medium">{item.target}</span>
            </p>
            <p className="text-caption text-muted-foreground">{formatRelativeTime(item.timestamp)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
