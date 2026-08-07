import type { RfqStatus } from "@/config/procurementMockData";
import { cn } from "@/lib/utils";

// Named per-entity (RfqStatusBadge/QuoteStatusBadge/PoStatusBadge) rather
// than a single generic "StatusBadge" — that name is already taken by
// src/components/dashboard/StatusBadge.tsx, typed specifically to
// Projects' ProjectStatus. Same resolution as Phase 4D's
// LeadStatusBadge/PipelineStageBadge/MeetingStatusBadge: each status
// enum gets its own small typed badge rather than a shared one that
// can't type-check against three different string unions at once.
const STATUS_STYLE: Record<RfqStatus, string> = {
  Draft: "border-border-strong bg-surface-muted text-muted-foreground",
  Pending: "border-secondary/30 bg-secondary/10 text-secondary",
  "Vendor Requested": "border-secondary/30 bg-secondary/10 text-secondary",
  "Quotation Received": "border-accent/30 bg-accent/10 text-accent",
  Approved: "border-success/30 bg-success/10 text-success",
  Rejected: "border-error/30 bg-error/10 text-error",
  Closed: "border-border-strong bg-surface-muted text-muted-foreground",
};

export function RfqStatusBadge({ status }: { status: RfqStatus }) {
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
