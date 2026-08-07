import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { procurementCategories, mockProducts, mockStock } from "@/config/procurementMockData";
import { isLowStock, formatCurrency } from "@/lib/procurementMetrics";

export const metadata: Metadata = { title: "Categories — Inventory" };

export default function InventoryCategoriesPage() {
  const rows = procurementCategories.map((category) => {
    const products = mockProducts.filter((p) => p.category === category);
    const productIds = new Set(products.map((p) => p.id));
    const stockForCategory = mockStock.filter((s) => productIds.has(s.productId));
    const value = stockForCategory.reduce((sum, stock) => {
      const product = products.find((p) => p.id === stock.productId);
      return sum + (product ? product.unitPrice * stock.quantity : 0);
    }, 0);
    const lowStockCount = stockForCategory.filter(isLowStock).length;
    return { category, productCount: products.length, value, lowStockCount };
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Categories</h1>
        <p className="text-body-sm text-muted-foreground">{procurementCategories.length} product categories.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => (
          <Link key={row.category} href={`/dashboard/inventory/products?category=${encodeURIComponent(row.category)}`}>
            <Card interactive className="flex flex-col gap-3">
              <p className="text-body-sm font-medium text-foreground">{row.category}</p>
              <p className="text-h3 text-foreground">{row.productCount}</p>
              <p className="text-caption text-muted-foreground">product{row.productCount === 1 ? "" : "s"}</p>
              <div className="flex flex-col gap-1 border-t border-border pt-3 text-caption text-muted-foreground">
                <span>{formatCurrency(row.value)} stock value</span>
                {row.lowStockCount > 0 && <span className="text-warning">{row.lowStockCount} low stock</span>}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
