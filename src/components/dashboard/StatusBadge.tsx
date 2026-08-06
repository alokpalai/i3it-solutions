import type { ProjectStatus } from "@/config/dashboardMockData";
import { cn } from "@/lib/utils";

// Grouped by what the status means for the project, not just alphabetical:
// pre-execution (muted/secondary), active execution (accent), and the
// three "the project has stopped moving" outcomes (success/warning/error).
const STATUS_STYLE: Record<ProjectStatus, string> = {
  Planning: "border-border-strong bg-surface-muted text-muted-foreground",
  Quotation: "border-secondary/30 bg-secondary/10 text-secondary",
  Approved: "border-secondary/30 bg-secondary/10 text-secondary",
  Procurement: "border-secondary/30 bg-secondary/10 text-secondary",
  Deployment: "border-accent/30 bg-accent/10 text-accent",
  Testing: "border-accent/30 bg-accent/10 text-accent",
  Training: "border-accent/30 bg-accent/10 text-accent",
  Completed: "border-success/30 bg-success/10 text-success",
  "On Hold": "border-warning/30 bg-warning/10 text-warning",
  Cancelled: "border-error/30 bg-error/10 text-error",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border px-2.5 py-1 text-caption font-medium",
        STATUS_STYLE[status],
      )}
    >
      {status}
    </span>
  );
}
