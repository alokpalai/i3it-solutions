import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PipelineStageBadge } from "@/components/dashboard/PipelineStageBadge";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import type { MockOpportunity } from "@/config/crmMockData";
import { getOrganizationById } from "@/config/crmMockData";
import { formatCurrency } from "@/lib/crmMetrics";
import { formatDate } from "@/lib/formatDate";

type OpportunityCardProps = {
  opportunity: MockOpportunity;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export function OpportunityCard({ opportunity, draggable, onDragStart }: OpportunityCardProps) {
  const organization = getOrganizationById(opportunity.organizationId);

  return (
    <Card
      draggable={draggable}
      onDragStart={onDragStart}
      className={draggable ? "flex cursor-grab flex-col gap-3 active:cursor-grabbing" : "flex flex-col gap-3"}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-body-sm font-medium text-foreground">{opportunity.name}</p>
        <PriorityBadge priority={opportunity.priority} />
      </div>

      {organization && (
        <Link
          href={`/dashboard/crm/organizations/${organization.id}/overview`}
          className="text-caption text-secondary hover:underline"
        >
          {organization.name}
        </Link>
      )}

      <p className="text-h5 text-foreground">{formatCurrency(opportunity.expectedRevenue)}</p>

      <ProgressBar value={opportunity.probability} label={`${opportunity.probability}% probability`} />

      <div className="flex items-center justify-between text-caption text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" />
          {formatDate(opportunity.expectedClosingDate)}
        </span>
        <span
          title={opportunity.assignedTo.name}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-muted text-[10px] font-semibold text-primary"
        >
          {opportunity.assignedTo.initials}
        </span>
      </div>

      {!draggable && <PipelineStageBadge stage={opportunity.stage} />}
    </Card>
  );
}
