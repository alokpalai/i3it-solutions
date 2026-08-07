import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { PoStatusBadge } from "@/components/dashboard/PoStatusBadge";
import { QuoteStatusBadge } from "@/components/dashboard/QuoteStatusBadge";
import { getVendorById } from "@/config/procurementMockData";
import { getPurchaseOrdersByVendor, getQuotesByVendor, formatCurrency } from "@/lib/procurementMetrics";
import { formatDate } from "@/lib/formatDate";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vendor = getVendorById(id);
  return { title: vendor ? `${vendor.company} — Vendors` : "Vendor" };
}

export default async function VendorDetailPage({ params }: Props) {
  const { id } = await params;
  const vendor = getVendorById(id);
  if (!vendor) notFound();

  const pastOrders = getPurchaseOrdersByVendor(vendor.id);
  const quotes = getQuotesByVendor(vendor.id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/procurement/vendors"
        className="inline-flex w-fit items-center gap-1.5 text-caption font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All vendors
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-h2 text-foreground">{vendor.company}</h1>
          <p className="text-body-sm text-muted-foreground">{vendor.primaryContact}</p>
        </div>
        <span className="flex items-center gap-1.5 text-body-sm font-medium text-foreground">
          <Star aria-hidden="true" className="h-4 w-4 fill-accent text-accent" />
          {vendor.performanceRating.toFixed(1)} performance rating
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <DashboardCard title={`Past orders (${pastOrders.length})`}>
            {pastOrders.length === 0 ? (
              <p className="text-body-sm text-muted-foreground">No purchase orders with this vendor yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                      <th scope="col" className="py-2 pr-4">PO Number</th>
                      <th scope="col" className="py-2 pr-4">Order Date</th>
                      <th scope="col" className="py-2 pr-4">Status</th>
                      <th scope="col" className="py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastOrders.map((po) => (
                      <tr key={po.id} className="border-b border-border text-body-sm last:border-0">
                        <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{po.poNumber}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{formatDate(po.orderDate)}</td>
                        <td className="py-3 pr-4"><PoStatusBadge status={po.status} /></td>
                        <td className="py-3 text-muted-foreground">{formatCurrency(po.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </DashboardCard>

          <DashboardCard title={`Quotations (${quotes.length})`}>
            {quotes.length === 0 ? (
              <p className="text-body-sm text-muted-foreground">No quotations from this vendor yet.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {quotes.map((quote) => (
                  <li key={quote.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-body-sm font-medium text-foreground">{quote.quoteNumber}</span>
                      <span className="text-caption text-muted-foreground">{quote.client}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-caption text-muted-foreground">{formatCurrency(quote.amount)}</span>
                      <QuoteStatusBadge status={quote.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </DashboardCard>
        </div>

        <Card className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-caption text-muted-foreground">Categories</span>
            <div className="flex flex-wrap gap-1.5">
              {vendor.categories.map((category) => <Badge key={category}>{category}</Badge>)}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption text-muted-foreground">Contact</span>
            <span className="flex items-center gap-1.5 text-body-sm text-foreground">
              <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              {vendor.email}
            </span>
            <span className="flex items-center gap-1.5 text-body-sm text-foreground">
              <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              {vendor.phone}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption text-muted-foreground">Address</span>
            <span className="flex items-start gap-1.5 text-body-sm text-foreground">
              <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              {vendor.address}, {vendor.city}, {vendor.state}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-caption text-muted-foreground">GST</span>
              <span className="text-body-sm text-foreground">{vendor.gst}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-caption text-muted-foreground">PAN</span>
              <span className="text-body-sm text-foreground">{vendor.pan}</span>
            </div>
          </div>
          {vendor.notes && (
            <div className="flex flex-col gap-1 border-t border-border pt-3">
              <span className="text-caption text-muted-foreground">Notes</span>
              <span className="text-body-sm text-foreground">{vendor.notes}</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
