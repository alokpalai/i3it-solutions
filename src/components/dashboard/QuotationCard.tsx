"use client";

import { useState } from "react";
import { CalendarClock, Download, Mail } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { QuoteStatusBadge } from "@/components/dashboard/QuoteStatusBadge";
import type { MockQuoteRecord } from "@/config/procurementMockData";
import { getVendorById } from "@/config/procurementMockData";
import { formatCurrency } from "@/lib/procurementMetrics";
import { formatDate } from "@/lib/formatDate";

export function QuotationCard({ quote }: { quote: MockQuoteRecord }) {
  const vendor = getVendorById(quote.vendorId);
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <p className="text-body-sm font-medium text-foreground">{quote.quoteNumber}</p>
          <p className="text-caption text-muted-foreground">{quote.client}</p>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      {vendor && <p className="text-caption text-secondary">{vendor.company}</p>}

      <p className="text-h5 text-foreground">{formatCurrency(quote.amount)}</p>

      <div className="flex items-center gap-2 text-caption text-muted-foreground">
        <CalendarClock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        Valid until {formatDate(quote.validUntil)}
      </div>

      <p className="text-caption text-muted-foreground">Assigned to {quote.assignedTo.name}</p>

      <div className="flex items-center gap-3 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => setNotice("PDF generation isn't connected yet.")}
          className="flex items-center gap-1.5 text-caption font-medium text-primary hover:underline"
        >
          <Download aria-hidden="true" className="h-3.5 w-3.5" />
          Download PDF
        </button>
        <button
          type="button"
          onClick={() => setNotice("Email delivery isn't connected yet.")}
          className="flex items-center gap-1.5 text-caption font-medium text-primary hover:underline"
        >
          <Mail aria-hidden="true" className="h-3.5 w-3.5" />
          Email Quote
        </button>
      </div>
      {notice && <p className="text-caption text-muted-foreground">{notice}</p>}
    </Card>
  );
}
