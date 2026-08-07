import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { PurchaseOrderTable } from "@/components/dashboard/PurchaseOrderTable";
import { ProcurementActionButton } from "@/components/dashboard/ProcurementActionButton";
import { mockPurchaseOrders } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Purchase Orders — Procurement" };

export default function ProcurementPurchaseOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Purchase Orders</h1>
          <p className="text-body-sm text-muted-foreground">{mockPurchaseOrders.length} purchase orders across vendors.</p>
        </div>
        <ProcurementActionButton label="New Purchase Order" />
      </div>
      <Card>
        <PurchaseOrderTable purchaseOrders={mockPurchaseOrders} />
      </Card>
    </div>
  );
}
