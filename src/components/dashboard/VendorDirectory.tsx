"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { MockVendor, ProcurementCategory } from "@/config/procurementMockData";
import { Input } from "@/components/ui/Input";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { VendorCard } from "@/components/dashboard/VendorCard";

export function VendorDirectory({ vendors }: { vendors: MockVendor[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | ProcurementCategory>("All");

  const categories = useMemo(
    () => Array.from(new Set(vendors.flatMap((v) => v.categories))).sort(),
    [vendors],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vendors.filter((vendor) => {
      const matchesSearch =
        query === "" || vendor.company.toLowerCase().includes(query) || vendor.city.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All" || vendor.categories.includes(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [vendors, search, categoryFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by vendor or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search vendors"
          />
        </div>
        <FilterPanel
          filters={[
            {
              label: "Filter by category",
              value: categoryFilter,
              onChange: (value) => setCategoryFilter(value as "All" | ProcurementCategory),
              options: [{ label: "All categories", value: "All" }, ...categories.map((c) => ({ label: c, value: c }))],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No vendors match your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
        </div>
      )}
    </div>
  );
}
