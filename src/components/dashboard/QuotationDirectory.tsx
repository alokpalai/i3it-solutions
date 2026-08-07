"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { MockQuoteRecord, QuoteStatus } from "@/config/procurementMockData";
import { quoteStatuses, getVendorById } from "@/config/procurementMockData";
import { Input } from "@/components/ui/Input";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { QuotationCard } from "@/components/dashboard/QuotationCard";

export function QuotationDirectory({ quotes }: { quotes: MockQuoteRecord[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | QuoteStatus>("All");
  const [vendorFilter, setVendorFilter] = useState("All");

  const vendors = useMemo(() => {
    const ids = Array.from(new Set(quotes.map((q) => q.vendorId)));
    return ids.map((id) => getVendorById(id)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  }, [quotes]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      const matchesSearch =
        query === "" || quote.quoteNumber.toLowerCase().includes(query) || quote.client.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || quote.status === statusFilter;
      const matchesVendor = vendorFilter === "All" || quote.vendorId === vendorFilter;
      return matchesSearch && matchesStatus && matchesVendor;
    });
  }, [quotes, search, statusFilter, vendorFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by quote number or client…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search quotations"
          />
        </div>
        <FilterPanel
          filters={[
            {
              label: "Filter by status",
              value: statusFilter,
              onChange: (value) => setStatusFilter(value as "All" | QuoteStatus),
              options: [{ label: "All statuses", value: "All" }, ...quoteStatuses.map((status) => ({ label: status, value: status }))],
            },
            {
              label: "Filter by vendor",
              value: vendorFilter,
              onChange: setVendorFilter,
              options: [{ label: "All vendors", value: "All" }, ...vendors.map((v) => ({ label: v.company, value: v.id }))],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No quotations match your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((quote) => <QuotationCard key={quote.id} quote={quote} />)}
        </div>
      )}
    </div>
  );
}
