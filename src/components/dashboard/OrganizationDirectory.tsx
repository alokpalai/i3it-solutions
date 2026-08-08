"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { MockOrganization, OrganizationType, Industry, RelationshipStage } from "@/config/crmMockData";
import { Input } from "@/components/ui/Input";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { OrganizationCard } from "@/components/dashboard/OrganizationCard";

export function OrganizationDirectory({ organizations }: { organizations: MockOrganization[] }) {
  const [search, setSearch] = useState("");
  const [relationshipFilter, setRelationshipFilter] = useState<"All" | RelationshipStage>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | OrganizationType>("All");
  const [industryFilter, setIndustryFilter] = useState<"All" | Industry>("All");

  const types = useMemo(() => Array.from(new Set(organizations.map((org) => org.type))).sort(), [organizations]);
  const industries = useMemo(() => Array.from(new Set(organizations.map((org) => org.industry))).sort(), [organizations]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return organizations.filter((org) => {
      const matchesSearch =
        query === "" || org.name.toLowerCase().includes(query) || org.city.toLowerCase().includes(query);
      const matchesRelationship = relationshipFilter === "All" || org.relationship === relationshipFilter;
      const matchesType = typeFilter === "All" || org.type === typeFilter;
      const matchesIndustry = industryFilter === "All" || org.industry === industryFilter;
      return matchesSearch && matchesRelationship && matchesType && matchesIndustry;
    });
  }, [organizations, search, relationshipFilter, typeFilter, industryFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by organization or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search organizations"
          />
        </div>
        <FilterPanel
          filters={[
            {
              label: "Filter by relationship",
              value: relationshipFilter,
              onChange: (value) => setRelationshipFilter(value as "All" | RelationshipStage),
              options: [
                { label: "All organizations", value: "All" },
                { label: "Clients", value: "Client" },
                { label: "Prospects", value: "Prospect" },
              ],
            },
            {
              label: "Filter by organization type",
              value: typeFilter,
              onChange: (value) => setTypeFilter(value as "All" | OrganizationType),
              options: [{ label: "All types", value: "All" }, ...types.map((type) => ({ label: type, value: type }))],
            },
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
          <p className="text-body-sm text-muted-foreground">No organizations match your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}
    </div>
  );
}
