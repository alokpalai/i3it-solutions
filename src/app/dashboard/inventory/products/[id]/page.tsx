import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StockIndicator } from "@/components/dashboard/StockIndicator";
import { getProductById, getVendorById } from "@/config/procurementMockData";
import { mockProjects } from "@/config/dashboardMockData";
import { getStockByProductId, formatCurrency } from "@/lib/procurementMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product ? `${product.name} — Products` : "Product" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const vendor = getVendorById(product.vendorId);
  const stock = getStockByProductId(product.id);
  const associatedProjects = mockProjects.filter((p) => product.associatedProjectIds.includes(p.id));

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/inventory/products"
        className="inline-flex w-fit items-center gap-1.5 text-caption font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All products
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-h2 text-foreground">{product.name}</h1>
          <p className="text-body-sm text-muted-foreground">{product.brand} &middot; {product.model}</p>
        </div>
        <Badge>{product.category}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="flex flex-col gap-3">
            <p className="text-h5 text-foreground">Specifications</p>
            <p className="text-body-sm text-muted-foreground">{product.specifications}</p>
          </Card>

          <Card className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-caption text-muted-foreground">SKU</span>
              <span className="font-mono text-body-sm text-foreground">{product.sku}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-caption text-muted-foreground">Serial Number</span>
              <span className="font-mono text-body-sm text-foreground">{product.serialNumber}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-caption text-muted-foreground">Unit Price</span>
              <span className="text-body-sm text-foreground">{formatCurrency(product.unitPrice)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-caption text-muted-foreground">Warranty</span>
              <span className="text-body-sm text-foreground">{product.warrantyMonths} months</span>
            </div>
          </Card>

          {associatedProjects.length > 0 && (
            <Card className="flex flex-col gap-3">
              <p className="text-h5 text-foreground">Associated projects</p>
              <ul className="flex flex-col gap-2">
                {associatedProjects.map((project) => (
                  <li key={project.id}>
                    <Link href={`/dashboard/projects/${project.id}`} className="text-body-sm text-secondary hover:underline">
                      {project.name}
                    </Link>
                    <span className="text-caption text-muted-foreground"> — {project.client}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {stock && (
            <Card className="flex flex-col gap-3">
              <p className="text-h5 text-foreground">Stock</p>
              <StockIndicator stock={stock} />
              <div className="grid grid-cols-3 gap-3 border-t border-border pt-3 text-center">
                <div className="flex flex-col">
                  <span className="text-h5 text-foreground">{stock.quantity}</span>
                  <span className="text-caption text-muted-foreground">On hand</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-h5 text-foreground">{stock.reserved}</span>
                  <span className="text-caption text-muted-foreground">Reserved</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-h5 text-foreground">{stock.minimumStock}</span>
                  <span className="text-caption text-muted-foreground">Minimum</span>
                </div>
              </div>
            </Card>
          )}

          {vendor && (
            <Card className="flex flex-col gap-2">
              <p className="text-h5 text-foreground">Vendor</p>
              <Link href={`/dashboard/procurement/vendors/${vendor.id}`} className="text-body-sm text-secondary hover:underline">
                {vendor.company}
              </Link>
              <p className="text-caption text-muted-foreground">{vendor.primaryContact}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
