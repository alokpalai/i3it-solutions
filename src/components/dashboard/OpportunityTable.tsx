import Link from "next/link";
import type { MockOpportunity } from "@/config/crmMockData";
import { getOrganizationById } from "@/config/crmMockData";
import { PipelineStageBadge } from "@/components/dashboard/PipelineStageBadge";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";
import { formatCurrency } from "@/lib/crmMetrics";
import { formatDate } from "@/lib/formatDate";

// The keyboard/screen-reader-accessible alternative to PipelineBoard's
// drag-and-drop view — same reasoning as TaskTable next to TaskBoard.
export function OpportunityTable({ opportunities }: { opportunities: MockOpportunity[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-caption font-medium text-muted-foreground">
            <th scope="col" className="py-2 pr-4">Opportunity</th>
            <th scope="col" className="py-2 pr-4">Organization</th>
            <th scope="col" className="py-2 pr-4">Stage</th>
            <th scope="col" className="py-2 pr-4">Priority</th>
            <th scope="col" className="py-2 pr-4">Revenue</th>
            <th scope="col" className="py-2 pr-4">Probability</th>
            <th scope="col" className="py-2 pr-4">Closing</th>
            <th scope="col" className="py-2">Executive</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => {
            const organization = getOrganizationById(opportunity.organizationId);
            return (
              <tr key={opportunity.id} className="border-b border-border text-body-sm">
                <td className="max-w-56 truncate py-3 pr-4 font-medium text-foreground">{opportunity.name}</td>
                <td className="max-w-40 truncate py-3 pr-4 text-muted-foreground">
                  {organization ? (
                    <Link href={`/dashboard/crm/organizations/${organization.id}/overview`} className="hover:underline">
                      {organization.name}
                    </Link>
                  ) : "—"}
                </td>
                <td className="py-3 pr-4"><PipelineStageBadge stage={opportunity.stage} /></td>
                <td className="py-3 pr-4"><PriorityBadge priority={opportunity.priority} /></td>
                <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(opportunity.expectedRevenue)}</td>
                <td className="py-3 pr-4 text-muted-foreground">{opportunity.probability}%</td>
                <td className="py-3 pr-4 text-muted-foreground">{formatDate(opportunity.expectedClosingDate)}</td>
                <td className="py-3 text-muted-foreground">{opportunity.assignedTo.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
