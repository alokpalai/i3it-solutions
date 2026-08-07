import type { WarrantyStatus } from "@/lib/procurementMetrics";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<WarrantyStatus, string> = {
  Active: "border-success/30 bg-success/10 text-success",
  "Expiring Soon": "border-warning/30 bg-warning/10 text-warning",
  Expired: "border-error/30 bg-error/10 text-error",
};

export function WarrantyStatusBadge({ status }: { status: WarrantyStatus }) {
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
