import type { Priority } from "@/config/dashboardMockData";
import { cn } from "@/lib/utils";

const PRIORITY_STYLE: Record<Priority, string> = {
  Low: "border-border-strong bg-surface-muted text-muted-foreground",
  Medium: "border-secondary/30 bg-secondary/10 text-secondary",
  High: "border-accent/30 bg-accent/10 text-accent",
  Urgent: "border-error/30 bg-error/10 text-error",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border px-2.5 py-1 text-caption font-medium",
        PRIORITY_STYLE[priority],
      )}
    >
      {priority}
    </span>
  );
}
