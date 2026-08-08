import type { MeetingStatus } from "@/config/crmMockData";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<MeetingStatus, string> = {
  Upcoming: "border-secondary/30 bg-secondary/10 text-secondary",
  Completed: "border-success/30 bg-success/10 text-success",
  Cancelled: "border-error/30 bg-error/10 text-error",
};

export function MeetingStatusBadge({ status }: { status: MeetingStatus }) {
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
