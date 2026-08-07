import type { Metadata } from "next";
import { DocumentGrid } from "@/components/dashboard/DocumentGrid";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { mockLibraryDocuments } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Invoices — Documents" };

export default function InvoicesPage() {
  const documents = mockLibraryDocuments.filter((doc) => doc.folder === "Invoices");

  return (
    <div className="flex flex-col gap-6">
      <p className="text-body-sm text-muted-foreground">{documents.length} invoice{documents.length === 1 ? "" : "s"}.</p>
      <DashboardCard title="Upload an invoice">
        <UploadZone label="Upload invoice" />
      </DashboardCard>
      <DocumentGrid documents={documents} />
    </div>
  );
}
