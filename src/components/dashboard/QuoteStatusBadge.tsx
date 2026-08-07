import type { QuoteStatus } from "@/config/procurementMockData";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<QuoteStatus, string> = {
  Draft: "border-border-strong bg-surface-muted text-muted-foreground",
  Sent: "border-secondary/30 bg-secondary/10 text-secondary",
  "Under Review": "border-accent/30 bg-accent/10 text-accent",
  Accepted: "border-success/30 bg-success/10 text-success",
  Rejected: "border-error/30 bg-error/10 text-error",
  Expired: "border-border-strong bg-surface-muted text-muted-foreground",
};

export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
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
