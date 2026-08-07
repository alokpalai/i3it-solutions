"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Inbox } from "lucide-react";
import type { MockProduct, ProcurementCategory } from "@/config/procurementMockData";
import { procurementCategories } from "@/config/procurementMockData";
import { Input } from "@/components/ui/Input";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ProductCard } from "@/components/dashboard/ProductCard";

function isProcurementCategory(value: string): value is ProcurementCategory {
  return (procurementCategories as readonly string[]).includes(value);
}

export function ProductDirectory({ products }: { products: MockProduct[] }) {
  // Categories' page links here as /dashboard/inventory/products?category=X
  // — read once as the initial filter so that link actually pre-filters
  // instead of silently landing on an unfiltered catalog.
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory = categoryParam && isProcurementCategory(categoryParam) ? categoryParam : "All";

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | ProcurementCategory>(initialCategory);

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);
  const [brandFilter, setBrandFilter] = useState("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
      const matchesBrand = brandFilter === "All" || product.brand === brandFilter;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, search, categoryFilter, brandFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by product, SKU or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search products"
          />
        </div>
        <FilterPanel
          filters={[
            {
              label: "Filter by category",
              value: categoryFilter,
              onChange: (value) => setCategoryFilter(value as "All" | ProcurementCategory),
              options: [{ label: "All categories", value: "All" }, ...procurementCategories.map((c) => ({ label: c, value: c }))],
            },
            {
              label: "Filter by brand",
              value: brandFilter,
              onChange: setBrandFilter,
              options: [{ label: "All brands", value: "All" }, ...brands.map((b) => ({ label: b, value: b }))],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No products match your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
