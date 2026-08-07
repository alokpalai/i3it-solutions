import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, ReceiptText, ShoppingCart, AlertTriangle, Truck, ShieldAlert } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DocumentGrid } from "@/components/dashboard/DocumentGrid";
import { WorkflowTimeline } from "@/components/dashboard/WorkflowTimeline";
import { procurementDashboardKpis, recentDocuments, recentVendorActivity } from "@/lib/procurementMetrics";
import { procurementWorkflowSteps } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Procurement" };

export default function ProcurementDashboardPage() {
  const kpis = procurementDashboardKpis();
  const documents = recentDocuments(4);
  const vendorActivity = recentVendorActivity(6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Procurement</h1>
        <p className="text-body-sm text-muted-foreground">RFQs, quotations, purchase orders and vendors at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Open RFQs" value={kpis.openRfqs} icon={ClipboardList} />
        <StatCard label="Pending Quotations" value={kpis.pendingQuotations} icon={ReceiptText} />
        <StatCard label="Purchase Orders" value={kpis.purchaseOrders} icon={ShoppingCart} />
        <StatCard label="Low Stock Items" value={kpis.lowStockItems} icon={AlertTriangle} />
        <StatCard label="Deliveries" value={kpis.deliveries} icon={Truck} />
        <StatCard label="Warranty Expiring" value={kpis.warrantyExpiring} icon={ShieldAlert} />
      </div>

      <DashboardCard title="Procurement workflow">
        <WorkflowTimeline steps={procurementWorkflowSteps} />
      </DashboardCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCard title="Recent documents" action={{ label: "View library", href: "/dashboard/documents" }}>
            <DocumentGrid documents={documents} />
          </DashboardCard>
        </div>

        <DashboardCard title="Recent vendor activity" action={{ label: "View vendors", href: "/dashboard/procurement/vendors" }}>
          {vendorActivity.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">No vendor activity yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {vendorActivity.map((entry, index) => (
                <li key={`${entry.vendorId}-${index}`} className="flex flex-col gap-0.5">
                  <Link href="/dashboard/procurement/vendors" className="text-body-sm font-medium text-foreground hover:underline">
                    {entry.vendorName}
                  </Link>
                  <span className="text-caption text-muted-foreground">{entry.label}</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}
