"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Inbox, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { MockLead, LeadStatus, LeadSource } from "@/config/crmMockData";
import { getOrganizationById, getContactById } from "@/config/crmMockData";
import { leadStatuses, leadSources } from "@/config/crmMockData";
import { salesExecutives } from "@/config/crmMockData";
import { formatDate } from "@/lib/formatDate";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LeadStatusBadge } from "@/components/dashboard/LeadStatusBadge";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";

const PAGE_SIZE = 8;

type SortKey = "organization" | "nextFollowUp" | "status";
type SortDirection = "asc" | "desc";

function organizationName(lead: MockLead): string {
  return getOrganizationById(lead.organizationId)?.name ?? "";
}

function compareValues(a: MockLead, b: MockLead, key: SortKey): number {
  switch (key) {
    case "organization":
      return organizationName(a).localeCompare(organizationName(b));
    case "nextFollowUp":
      return a.nextFollowUp.localeCompare(b.nextFollowUp);
    case "status":
      return a.status.localeCompare(b.status);
  }
}

// Hoisted outside LeadTable (react-hooks/static-components) — same reason
// ProjectTable.tsx's SortHeader is hoisted: a component declared inside
// another component's render is recreated every render.
function SortHeader({
  sortKeyValue,
  activeKey,
  direction,
  onSort,
  children,
}: {
  sortKeyValue: SortKey;
  activeKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
  children: React.ReactNode;
}) {
  const isActive = activeKey === sortKeyValue;
  return (
    <th scope="col" className="py-2 pr-4">
      <button type="button" onClick={() => onSort(sortKeyValue)} className="flex items-center gap-1 hover:text-foreground">
        {children}
        {isActive ? (
          direction === "asc" ? <ArrowUp aria-hidden="true" className="h-3 w-3" /> : <ArrowDown aria-hidden="true" className="h-3 w-3" />
        ) : (
          <ArrowUpDown aria-hidden="true" className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}

export function LeadTable({ leads }: { leads: MockLead[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");
  const [sourceFilter, setSourceFilter] = useState<"All" | LeadSource>("All");
  const [executiveFilter, setExecutiveFilter] = useState<"All" | string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("nextFollowUp");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = leads.filter((lead) => {
      const organization = getOrganizationById(lead.organizationId);
      const contact = getContactById(lead.contactId);
      const matchesSearch =
        query === "" ||
        organization?.name.toLowerCase().includes(query) ||
        contact?.name.toLowerCase().includes(query) ||
        contact?.email.toLowerCase().includes(query) ||
        contact?.phone.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
      const matchesSource = sourceFilter === "All" || lead.source === sourceFilter;
      const matchesExecutive = executiveFilter === "All" || lead.assignedTo.id === executiveFilter;
      return matchesSearch && matchesStatus && matchesSource && matchesExecutive;
    });
    const sorted = [...result].sort((a, b) => {
      const comparison = compareValues(a, b, sortKey);
      return sortDirection === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [leads, search, statusFilter, sourceFilter, executiveFilter, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by organization, contact, email or phone…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
            aria-label="Search leads"
          />
        </div>
        <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as "All" | LeadStatus); setPage(1); }} className="lg:w-44">
          <option value="All">All statuses</option>
          {leadStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </Select>
        <Select aria-label="Filter by source" value={sourceFilter} onChange={(e) => { setSourceFilter(e.target.value as "All" | LeadSource); setPage(1); }} className="lg:w-40">
          <option value="All">All sources</option>
          {leadSources.map((source) => <option key={source} value={source}>{source}</option>)}
        </Select>
        <Select aria-label="Filter by sales executive" value={executiveFilter} onChange={(e) => { setExecutiveFilter(e.target.value); setPage(1); }} className="lg:w-48">
          <option value="All">All executives</option>
          {salesExecutives.map((exec) => <option key={exec.id} value={exec.id}>{exec.name}</option>)}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No leads match your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">Lead ID</th>
                <SortHeader sortKeyValue="organization" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Organization</SortHeader>
                <th scope="col" className="py-2 pr-4">Contact</th>
                <th scope="col" className="py-2 pr-4">Designation</th>
                <th scope="col" className="py-2 pr-4">Phone</th>
                <th scope="col" className="py-2 pr-4">Email</th>
                <th scope="col" className="py-2 pr-4">Source</th>
                <th scope="col" className="py-2 pr-4">Industry</th>
                <th scope="col" className="py-2 pr-4">Executive</th>
                <SortHeader sortKeyValue="status" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Status</SortHeader>
                <th scope="col" className="py-2 pr-4">Priority</th>
                <SortHeader sortKeyValue="nextFollowUp" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Next Follow-up</SortHeader>
                <th scope="col" className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((lead) => {
                const organization = getOrganizationById(lead.organizationId);
                const contact = getContactById(lead.contactId);
                return (
                  <tr key={lead.id} className="border-b border-border text-body-sm">
                    <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{lead.id}</td>
                    <td className="max-w-48 truncate py-3 pr-4 font-medium text-foreground">
                      {organization ? (
                        <Link href={`/dashboard/crm/organizations/${organization.id}/overview`} className="hover:underline">
                          {organization.name}
                        </Link>
                      ) : "—"}
                    </td>
                    <td className="max-w-36 truncate py-3 pr-4 text-muted-foreground">{contact?.name ?? "—"}</td>
                    <td className="max-w-40 truncate py-3 pr-4 text-muted-foreground">{contact?.role ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{contact?.phone ?? "—"}</td>
                    <td className="max-w-48 truncate py-3 pr-4 text-muted-foreground">{contact?.email ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{lead.source}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{lead.industry}</td>
                    <td className="max-w-32 truncate py-3 pr-4 text-muted-foreground">{lead.assignedTo.name}</td>
                    <td className="py-3 pr-4"><LeadStatusBadge status={lead.status} /></td>
                    <td className="py-3 pr-4"><PriorityBadge priority={lead.priority} /></td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatDate(lead.nextFollowUp)}</td>
                    <td className="py-3">
                      {organization && (
                        <Link href={`/dashboard/crm/organizations/${organization.id}/overview`} className="text-caption font-medium text-primary hover:underline">
                          View
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-caption text-muted-foreground">
            Page {currentPage} of {totalPages} &middot; {filtered.length} lead{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" size="sm" disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
            <Button type="button" variant="secondary" size="sm" disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
