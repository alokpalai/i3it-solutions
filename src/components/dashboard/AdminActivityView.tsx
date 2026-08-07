"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { MockAuditLogEntry, AuditModule } from "@/config/adminMockData";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { AuditTimeline } from "@/components/dashboard/AuditTimeline";

const MODULES: AuditModule[] = ["Users", "Roles", "Projects", "CRM", "Procurement", "Documents", "Settings", "Security"];

export function AdminActivityView({ entries }: { entries: MockAuditLogEntry[] }) {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<"All" | AuditModule>("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return entries
      .filter((entry) => {
        const matchesSearch =
          query === "" || entry.actor.toLowerCase().includes(query) || entry.object.toLowerCase().includes(query);
        const matchesModule = moduleFilter === "All" || entry.module === moduleFilter;
        return matchesSearch && matchesModule;
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [entries, search, moduleFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by user or object…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search activity"
          />
        </div>
        <Select aria-label="Filter by module" value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value as "All" | AuditModule)} className="sm:w-48">
          <option value="All">All modules</option>
          {MODULES.map((module) => <option key={module} value={module}>{module}</option>)}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-body-sm text-muted-foreground">
          No activity matches your search or filters.
        </p>
      ) : (
        <AuditTimeline entries={filtered} />
      )}
    </div>
  );
}
