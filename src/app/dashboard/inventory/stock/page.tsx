import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { mockProducts, warehouseName } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Stock — Inventory" };

export default function InventoryStockPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Stock</h1>
        <p className="text-body-sm text-muted-foreground">{warehouseName} &middot; {mockProducts.length} products tracked.</p>
      </div>
      <Card>
        <InventoryTable products={mockProducts} />
      </Card>
    </div>
  );
}
