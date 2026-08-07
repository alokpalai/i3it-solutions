import type { PoStatus } from "@/config/procurementMockData";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<PoStatus, string> = {
  Draft: "border-border-strong bg-surface-muted text-muted-foreground",
  Sent: "border-secondary/30 bg-secondary/10 text-secondary",
  Acknowledged: "border-secondary/30 bg-secondary/10 text-secondary",
  "In Progress": "border-accent/30 bg-accent/10 text-accent",
  "Partially Delivered": "border-accent/30 bg-accent/10 text-accent",
  Delivered: "border-success/30 bg-success/10 text-success",
  Cancelled: "border-error/30 bg-error/10 text-error",
};

export function PoStatusBadge({ status }: { status: PoStatus }) {
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
