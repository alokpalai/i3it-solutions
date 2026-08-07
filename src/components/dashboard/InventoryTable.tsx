"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Inbox, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { MockProduct, ProcurementCategory } from "@/config/procurementMockData";
import { procurementCategories, getVendorById } from "@/config/procurementMockData";
import { getStockByProductId, availableStock, stockLevel, formatCurrency } from "@/lib/procurementMetrics";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PAGE_SIZE = 10;

type SortKey = "name" | "unitPrice" | "available";
type SortDirection = "asc" | "desc";

const LEVEL_TEXT_CLASS: Record<ReturnType<typeof stockLevel>, string> = {
  "Out of Stock": "text-error",
  Low: "text-warning",
  OK: "text-success",
};

// Icon shape, not color alone, distinguishes stock level — same
// WCAG 1.4.1-conscious pattern as StockIndicator itself.
const LEVEL_ICON = { "Out of Stock": XCircle, Low: AlertTriangle, OK: CheckCircle2 } as const;

function compareValues(a: MockProduct, b: MockProduct, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name);
    case "unitPrice":
      return a.unitPrice - b.unitPrice;
    case "available": {
      const stockA = getStockByProductId(a.id);
      const stockB = getStockByProductId(b.id);
      return (stockA ? availableStock(stockA) : 0) - (stockB ? availableStock(stockB) : 0);
    }
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

export function InventoryTable({ products }: { products: MockProduct[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | ProcurementCategory>("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    return [...result].sort((a, b) => {
      const comparison = compareValues(a, b, sortKey);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [products, search, categoryFilter, sortKey, sortDirection]);

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
            placeholder="Search by product, SKU or brand…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
            aria-label="Search inventory"
          />
        </div>
        <Select aria-label="Filter by category" value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value as "All" | ProcurementCategory); setPage(1); }} className="lg:w-52">
          <option value="All">All categories</option>
          {procurementCategories.map((category) => <option key={category} value={category}>{category}</option>)}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No products match your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">SKU</th>
                <SortHeader sortKeyValue="name" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Product</SortHeader>
                <th scope="col" className="py-2 pr-4">Category</th>
                <th scope="col" className="py-2 pr-4">Brand</th>
                <th scope="col" className="py-2 pr-4">Vendor</th>
                <SortHeader sortKeyValue="unitPrice" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Unit Price</SortHeader>
                <th scope="col" className="py-2 pr-4">Quantity</th>
                <th scope="col" className="py-2 pr-4">Reserved</th>
                <SortHeader sortKeyValue="available" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Available</SortHeader>
                <th scope="col" className="py-2">Min Stock</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((product) => {
                const vendor = getVendorById(product.vendorId);
                const stock = getStockByProductId(product.id);
                const available = stock ? availableStock(stock) : 0;
                const level = stock ? stockLevel(stock) : "OK";
                const LevelIcon = LEVEL_ICON[level];
                return (
                  <tr key={product.id} className="border-b border-border text-body-sm">
                    <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{product.sku}</td>
                    <td className="max-w-56 truncate py-3 pr-4 font-medium text-foreground">
                      <Link href={`/dashboard/inventory/products/${product.id}`} className="hover:underline">{product.name}</Link>
                    </td>
                    <td className="py-3 pr-4"><Badge>{product.category}</Badge></td>
                    <td className="py-3 pr-4 text-muted-foreground">{product.brand}</td>
                    <td className="max-w-36 truncate py-3 pr-4 text-muted-foreground">{vendor?.company ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(product.unitPrice)}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{stock?.quantity ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{stock?.reserved ?? "—"}</td>
                    <td className={`py-3 pr-4 font-medium ${LEVEL_TEXT_CLASS[level]}`}>
                      <span className="inline-flex items-center gap-1.5">
                        <LevelIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                        {available}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{stock?.minimumStock ?? "—"}</td>
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
            Page {currentPage} of {totalPages} &middot; {filtered.length} product{filtered.length === 1 ? "" : "s"}
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
