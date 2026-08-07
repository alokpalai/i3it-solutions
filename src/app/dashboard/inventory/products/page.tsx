import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDirectory } from "@/components/dashboard/ProductDirectory";
import { ProcurementActionButton } from "@/components/dashboard/ProcurementActionButton";
import { mockProducts } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Products — Inventory" };

export default function InventoryProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Product Catalog</h1>
          <p className="text-body-sm text-muted-foreground">{mockProducts.length} products across the catalog.</p>
        </div>
        <ProcurementActionButton label="Add Product" />
      </div>
      {/* ProductDirectory reads the ?category= query param via
          useSearchParams(), which requires a Suspense boundary. */}
      <Suspense fallback={null}>
        <ProductDirectory products={mockProducts} />
      </Suspense>
    </div>
  );
}
