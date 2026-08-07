import type { Metadata } from "next";
import { Package, Tags, AlertTriangle, IndianRupee } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StockIndicator } from "@/components/dashboard/StockIndicator";
import { mockProducts, procurementCategories, warehouseName, getVendorById } from "@/config/procurementMockData";
import { mockStock } from "@/config/procurementMockData";
import { isLowStock, formatCurrency } from "@/lib/procurementMetrics";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryOverviewPage() {
  const totalValue = mockStock.reduce((sum, stock) => {
    const product = mockProducts.find((p) => p.id === stock.productId);
    return sum + (product ? product.unitPrice * stock.quantity : 0);
  }, 0);
  const lowStockCount = mockStock.filter(isLowStock).length;
  const lowStockProducts = mockStock
    .filter(isLowStock)
    .map((stock) => ({ stock, product: mockProducts.find((p) => p.id === stock.productId) }))
    .filter((entry): entry is { stock: typeof entry.stock; product: NonNullable<typeof entry.product> } => Boolean(entry.product));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Inventory</h1>
        <p className="text-body-sm text-muted-foreground">{warehouseName}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Products" value={mockProducts.length} icon={Package} />
        <StatCard label="Categories" value={procurementCategories.length} icon={Tags} />
        <StatCard label="Low Stock Items" value={lowStockCount} icon={AlertTriangle} />
        <StatCard label="Stock Value" value={formatCurrency(totalValue)} icon={IndianRupee} />
      </div>

      <DashboardCard title="Low stock items" action={{ label: "View all stock", href: "/dashboard/inventory/stock" }}>
        {lowStockProducts.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">Everything is above its minimum stock level.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {lowStockProducts.map(({ stock, product }) => (
              <li key={stock.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex flex-col">
                  <span className="text-body-sm font-medium text-foreground">{product.name}</span>
                  <span className="text-caption text-muted-foreground">{getVendorById(product.vendorId)?.company ?? "—"}</span>
                </div>
                <StockIndicator stock={stock} />
              </li>
            ))}
          </ul>
        )}
      </DashboardCard>
    </div>
  );
}
