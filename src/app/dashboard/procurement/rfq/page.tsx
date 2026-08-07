import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { RFQTable } from "@/components/dashboard/RFQTable";
import { ProcurementActionButton } from "@/components/dashboard/ProcurementActionButton";
import { mockRfqRecords } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "RFQs — Procurement" };

export default function ProcurementRfqPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Requests for Quotation</h1>
          <p className="text-body-sm text-muted-foreground">{mockRfqRecords.length} RFQs across the procurement pipeline.</p>
        </div>
        <ProcurementActionButton label="New RFQ" />
      </div>
      <Card>
        <RFQTable rfqs={mockRfqRecords} />
      </Card>
    </div>
  );
}
