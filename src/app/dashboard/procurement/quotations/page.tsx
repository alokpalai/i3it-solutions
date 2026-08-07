import type { Metadata } from "next";
import { QuotationDirectory } from "@/components/dashboard/QuotationDirectory";
import { ProcurementActionButton } from "@/components/dashboard/ProcurementActionButton";
import { mockQuoteRecords } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Quotations — Procurement" };

export default function ProcurementQuotationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Quotations</h1>
          <p className="text-body-sm text-muted-foreground">{mockQuoteRecords.length} vendor quotations.</p>
        </div>
        <ProcurementActionButton label="New Quotation" />
      </div>
      <QuotationDirectory quotes={mockQuoteRecords} />
    </div>
  );
}
