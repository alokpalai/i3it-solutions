import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StockIndicator } from "@/components/dashboard/StockIndicator";
import type { MockProduct } from "@/config/procurementMockData";
import { getVendorById } from "@/config/procurementMockData";
import { getStockByProductId, formatCurrency } from "@/lib/procurementMetrics";

export function ProductCard({ product }: { product: MockProduct }) {
  const vendor = getVendorById(product.vendorId);
  const stock = getStockByProductId(product.id);

  return (
    <Link href={`/dashboard/inventory/products/${product.id}`}>
      <Card interactive className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-body-sm font-medium text-foreground">{product.name}</p>
            <p className="text-caption text-muted-foreground">{product.brand} &middot; {product.model}</p>
          </div>
          <Badge>{product.category}</Badge>
        </div>

        <p className="font-mono text-caption text-muted-foreground">{product.sku}</p>
        <p className="line-clamp-2 text-caption text-muted-foreground">{product.specifications}</p>
        <p className="text-body-sm font-medium text-foreground">{formatCurrency(product.unitPrice)}</p>

        {vendor && <p className="text-caption text-secondary">{vendor.company}</p>}

        {stock && (
          <div className="mt-auto border-t border-border pt-3">
            <StockIndicator stock={stock} />
          </div>
        )}
      </Card>
    </Link>
  );
}
