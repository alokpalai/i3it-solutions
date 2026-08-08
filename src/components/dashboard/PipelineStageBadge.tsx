import type { PipelineStage } from "@/config/crmMockData";
import { cn } from "@/lib/utils";

const STAGE_STYLE: Record<PipelineStage, string> = {
  Lead: "border-border-strong bg-surface-muted text-muted-foreground",
  Qualified: "border-secondary/30 bg-secondary/10 text-secondary",
  "Meeting Scheduled": "border-secondary/30 bg-secondary/10 text-secondary",
  "Proposal Sent": "border-accent/30 bg-accent/10 text-accent",
  Negotiation: "border-accent/30 bg-accent/10 text-accent",
  Won: "border-success/30 bg-success/10 text-success",
  Lost: "border-error/30 bg-error/10 text-error",
};

export function PipelineStageBadge({ stage }: { stage: PipelineStage }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border px-2.5 py-1 text-caption font-medium",
        STAGE_STYLE[stage],
      )}
    >
      {stage}
    </span>
  );
}
