import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { LeadTable } from "@/components/dashboard/LeadTable";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { mockLeads } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Leads — CRM" };

export default function CrmLeadsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Leads</h1>
          <p className="text-body-sm text-muted-foreground">{mockLeads.length} leads across the pipeline.</p>
        </div>
        <CrmActionButton label="Add Lead" />
      </div>
      <Card>
        <LeadTable leads={mockLeads} />
      </Card>
    </div>
  );
}
