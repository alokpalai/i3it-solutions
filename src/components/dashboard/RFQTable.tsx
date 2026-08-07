"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Inbox, Paperclip, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { MockRfqRecord, RfqStatus } from "@/config/procurementMockData";
import { rfqStatuses } from "@/config/procurementMockData";
import { mockProjects } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { RfqStatusBadge } from "@/components/dashboard/RfqStatusBadge";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";

const PAGE_SIZE = 8;

type SortKey = "rfqNumber" | "requiredDelivery" | "status";
type SortDirection = "asc" | "desc";

function compareValues(a: MockRfqRecord, b: MockRfqRecord, key: SortKey): number {
  switch (key) {
    case "rfqNumber":
      return a.rfqNumber.localeCompare(b.rfqNumber);
    case "requiredDelivery":
      return a.requiredDelivery.localeCompare(b.requiredDelivery);
    case "status":
      return a.status.localeCompare(b.status);
  }
}

// Hoisted outside RFQTable (react-hooks/static-components) — same reason
// ProjectTable.tsx's/LeadTable.tsx's SortHeader is hoisted.
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

export function RFQTable({ rfqs }: { rfqs: MockRfqRecord[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | RfqStatus>("All");
  const [sortKey, setSortKey] = useState<SortKey>("requiredDelivery");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = rfqs.filter((rfq) => {
      const matchesSearch =
        query === "" ||
        rfq.rfqNumber.toLowerCase().includes(query) ||
        rfq.client.toLowerCase().includes(query) ||
        rfq.items.some((item) => item.productName.toLowerCase().includes(query));
      const matchesStatus = statusFilter === "All" || rfq.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    return [...result].sort((a, b) => {
      const comparison = compareValues(a, b, sortKey);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [rfqs, search, statusFilter, sortKey, sortDirection]);

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
            placeholder="Search by RFQ number, client or product…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
            aria-label="Search RFQs"
          />
        </div>
        <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as "All" | RfqStatus); setPage(1); }} className="lg:w-48">
          <option value="All">All statuses</option>
          {rfqStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No RFQs match your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <SortHeader sortKeyValue="rfqNumber" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>RFQ Number</SortHeader>
                <th scope="col" className="py-2 pr-4">Client</th>
                <th scope="col" className="py-2 pr-4">Project</th>
                <th scope="col" className="py-2 pr-4">Products Required</th>
                <th scope="col" className="py-2 pr-4">Priority</th>
                <SortHeader sortKeyValue="status" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Status</SortHeader>
                <th scope="col" className="py-2 pr-4">Assigned To</th>
                <SortHeader sortKeyValue="requiredDelivery" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Required Delivery</SortHeader>
                <th scope="col" className="py-2">Attachments</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((rfq) => {
                const project = rfq.projectId ? mockProjects.find((p) => p.id === rfq.projectId) : undefined;
                const totalQuantity = rfq.items.reduce((sum, item) => sum + item.quantity, 0);
                return (
                  <tr key={rfq.id} className="border-b border-border text-body-sm">
                    <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{rfq.rfqNumber}</td>
                    <td className="max-w-44 truncate py-3 pr-4 font-medium text-foreground">{rfq.client}</td>
                    <td className="max-w-40 truncate py-3 pr-4 text-muted-foreground">
                      {project ? <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">{project.name}</Link> : "—"}
                    </td>
                    <td className="max-w-56 truncate py-3 pr-4 text-muted-foreground" title={rfq.items.map((i) => `${i.productName} × ${i.quantity}`).join(", ")}>
                      {rfq.items.map((i) => i.productName).join(", ")} ({totalQuantity} units)
                    </td>
                    <td className="py-3 pr-4"><PriorityBadge priority={rfq.priority} /></td>
                    <td className="py-3 pr-4"><RfqStatusBadge status={rfq.status} /></td>
                    <td className="max-w-32 truncate py-3 pr-4 text-muted-foreground">{rfq.assignedTo.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatDate(rfq.requiredDelivery)}</td>
                    <td className="py-3 text-muted-foreground">
                      {rfq.attachments.length > 0 ? (
                        <span className="flex items-center gap-1">
                          <Paperclip aria-hidden="true" className="h-3.5 w-3.5" />
                          {rfq.attachments.length}
                        </span>
                      ) : "—"}
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
            Page {currentPage} of {totalPages} &middot; {filtered.length} RFQ{filtered.length === 1 ? "" : "s"}
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
