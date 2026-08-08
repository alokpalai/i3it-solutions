import type { Metadata } from "next";
import { CrmPipelineView } from "@/components/dashboard/CrmPipelineView";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { mockOpportunities } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Opportunities — CRM" };

export default function CrmOpportunitiesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Opportunities</h1>
          <p className="text-body-sm text-muted-foreground">
            {mockOpportunities.length} opportunities across the sales pipeline. Drag cards between stages on the
            board — moves aren&rsquo;t saved yet, there&rsquo;s no pipeline backend to write to.
          </p>
        </div>
        <CrmActionButton label="Add Opportunity" />
      </div>
      <CrmPipelineView opportunities={mockOpportunities} />
    </div>
  );
}
