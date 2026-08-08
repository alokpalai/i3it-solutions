import type { LeadStatus } from "@/config/crmMockData";
import { cn } from "@/lib/utils";

// Same grouping logic as StatusBadge (Projects): pre-qualification
// (muted), actively being worked (secondary/accent), and the three
// terminal outcomes (success/error/muted for Archived).
const STATUS_STYLE: Record<LeadStatus, string> = {
  New: "border-border-strong bg-surface-muted text-muted-foreground",
  Contacted: "border-secondary/30 bg-secondary/10 text-secondary",
  Qualified: "border-secondary/30 bg-secondary/10 text-secondary",
  "Proposal Sent": "border-accent/30 bg-accent/10 text-accent",
  Negotiation: "border-accent/30 bg-accent/10 text-accent",
  Won: "border-success/30 bg-success/10 text-success",
  Lost: "border-error/30 bg-error/10 text-error",
  Archived: "border-border-strong bg-surface-muted text-muted-foreground",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
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
