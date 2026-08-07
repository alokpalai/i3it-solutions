"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Inbox, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { MockPurchaseOrder, PoStatus } from "@/config/procurementMockData";
import { poStatuses, getVendorById } from "@/config/procurementMockData";
import { mockProjects } from "@/config/dashboardMockData";
import { formatCurrency } from "@/lib/procurementMetrics";
import { formatDate } from "@/lib/formatDate";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { PoStatusBadge } from "@/components/dashboard/PoStatusBadge";

const PAGE_SIZE = 8;

type SortKey = "poNumber" | "orderDate" | "expectedDelivery" | "amount" | "status";
type SortDirection = "asc" | "desc";

function compareValues(a: MockPurchaseOrder, b: MockPurchaseOrder, key: SortKey): number {
  switch (key) {
    case "poNumber":
      return a.poNumber.localeCompare(b.poNumber);
    case "orderDate":
      return a.orderDate.localeCompare(b.orderDate);
    case "expectedDelivery":
      return a.expectedDelivery.localeCompare(b.expectedDelivery);
    case "amount":
      return a.amount - b.amount;
    case "status":
      return a.status.localeCompare(b.status);
  }
}

// Hoisted outside the component (react-hooks/static-components) — same
// reason every other sortable table's SortHeader in this codebase is.
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

export function PurchaseOrderTable({ purchaseOrders }: { purchaseOrders: MockPurchaseOrder[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PoStatus>("All");
  const [sortKey, setSortKey] = useState<SortKey>("orderDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = purchaseOrders.filter((po) => {
      const vendor = getVendorById(po.vendorId);
      const matchesSearch =
        query === "" ||
        po.poNumber.toLowerCase().includes(query) ||
        vendor?.company.toLowerCase().includes(query) ||
        po.items.some((item) => item.productName.toLowerCase().includes(query));
      const matchesStatus = statusFilter === "All" || po.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    return [...result].sort((a, b) => {
      const comparison = compareValues(a, b, sortKey);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [purchaseOrders, search, statusFilter, sortKey, sortDirection]);

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
            placeholder="Search by PO number, vendor or product…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
            aria-label="Search purchase orders"
          />
        </div>
        <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as "All" | PoStatus); setPage(1); }} className="lg:w-48">
          <option value="All">All statuses</option>
          {poStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No purchase orders match your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <SortHeader sortKeyValue="poNumber" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>PO Number</SortHeader>
                <th scope="col" className="py-2 pr-4">Vendor</th>
                <th scope="col" className="py-2 pr-4">Project</th>
                <SortHeader sortKeyValue="orderDate" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Order Date</SortHeader>
                <SortHeader sortKeyValue="expectedDelivery" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Expected Delivery</SortHeader>
                <SortHeader sortKeyValue="status" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Status</SortHeader>
                <SortHeader sortKeyValue="amount" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Amount</SortHeader>
                <th scope="col" className="py-2">Products</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((po) => {
                const vendor = getVendorById(po.vendorId);
                const project = po.projectId ? mockProjects.find((p) => p.id === po.projectId) : undefined;
                return (
                  <tr key={po.id} className="border-b border-border text-body-sm">
                    <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{po.poNumber}</td>
                    <td className="max-w-44 truncate py-3 pr-4 font-medium text-foreground">{vendor?.company ?? "—"}</td>
                    <td className="max-w-40 truncate py-3 pr-4 text-muted-foreground">
                      {project ? <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">{project.name}</Link> : "—"}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatDate(po.orderDate)}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatDate(po.expectedDelivery)}</td>
                    <td className="py-3 pr-4"><PoStatusBadge status={po.status} /></td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(po.amount)}</td>
                    <td className="max-w-56 truncate py-3 text-muted-foreground" title={po.items.map((i) => `${i.productName} × ${i.quantity}`).join(", ")}>
                      {po.items.map((i) => i.productName).join(", ")}
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
            Page {currentPage} of {totalPages} &middot; {filtered.length} purchase order{filtered.length === 1 ? "" : "s"}
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
