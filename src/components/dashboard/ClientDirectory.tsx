"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { MockOrganization, Industry } from "@/config/crmMockData";
import { Input } from "@/components/ui/Input";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ClientCard } from "@/components/dashboard/ClientCard";

export function ClientDirectory({ clients }: { clients: MockOrganization[] }) {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState<"All" | Industry>("All");

  const industries = useMemo(() => Array.from(new Set(clients.map((c) => c.industry))).sort(), [clients]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return clients.filter((client) => {
      const matchesSearch = query === "" || client.name.toLowerCase().includes(query) || client.city.toLowerCase().includes(query);
      const matchesIndustry = industryFilter === "All" || client.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    });
  }, [clients, search, industryFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by client or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search clients"
          />
        </div>
        <FilterPanel
          filters={[
            {
              label: "Filter by industry",
              value: industryFilter,
              onChange: (value) => setIndustryFilter(value as "All" | Industry),
              options: [{ label: "All industries", value: "All" }, ...industries.map((industry) => ({ label: industry, value: industry }))],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No clients match your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((client) => <ClientCard key={client.id} organization={client} />)}
        </div>
      )}
    </div>
  );
}
