import { CheckCircle2, Circle } from "lucide-react";
import type { MockMilestone } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

export function MilestoneCard({ milestone }: { milestone: MockMilestone }) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-border px-4 py-3">
      {milestone.done ? (
        <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-success" />
      ) : (
        <Circle aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground" />
      )}
      <div className="flex flex-1 flex-col">
        <span className={cn("text-body-sm", milestone.done ? "text-muted-foreground line-through" : "text-foreground")}>
          {milestone.label}
        </span>
      </div>
      <span className="shrink-0 text-caption text-muted-foreground">{formatDate(milestone.dueDate)}</span>
    </li>
  );
}
