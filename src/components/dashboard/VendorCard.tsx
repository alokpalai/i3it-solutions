import Link from "next/link";
import { MapPin, Mail, Phone, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MockVendor } from "@/config/procurementMockData";
import { getPurchaseOrdersByVendor } from "@/lib/procurementMetrics";

export function VendorCard({ vendor }: { vendor: MockVendor }) {
  const pastOrders = getPurchaseOrdersByVendor(vendor.id);

  return (
    <Link href={`/dashboard/procurement/vendors/${vendor.id}`}>
      <Card interactive className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-body-sm font-medium text-foreground">{vendor.company}</p>
          <span className="flex shrink-0 items-center gap-1 text-caption font-medium text-foreground">
            <Star aria-hidden="true" className="h-3.5 w-3.5 fill-accent text-accent" />
            {vendor.performanceRating.toFixed(1)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {vendor.categories.map((category) => <Badge key={category}>{category}</Badge>)}
        </div>

        <div className="flex flex-col gap-1.5 text-caption text-muted-foreground">
          <span className="text-body-sm text-foreground">{vendor.primaryContact}</span>
          <span className="flex items-center gap-1.5">
            <Mail aria-hidden="true" className="h-3 w-3 shrink-0" />
            <span className="truncate">{vendor.email}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone aria-hidden="true" className="h-3 w-3 shrink-0" />
            {vendor.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
            {vendor.city}, {vendor.state}
          </span>
        </div>

        <p className="mt-auto border-t border-border pt-3 text-caption text-muted-foreground">
          {pastOrders.length} past order{pastOrders.length === 1 ? "" : "s"}
        </p>
      </Card>
    </Link>
  );
}
