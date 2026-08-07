import type { Metadata } from "next";
import { VendorDirectory } from "@/components/dashboard/VendorDirectory";
import { ProcurementActionButton } from "@/components/dashboard/ProcurementActionButton";
import { mockVendors } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Vendors — Procurement" };

export default function ProcurementVendorsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Vendors</h1>
          <p className="text-body-sm text-muted-foreground">{mockVendors.length} registered vendors.</p>
        </div>
        <ProcurementActionButton label="Add Vendor" />
      </div>
      <VendorDirectory vendors={mockVendors} />
    </div>
  );
}
