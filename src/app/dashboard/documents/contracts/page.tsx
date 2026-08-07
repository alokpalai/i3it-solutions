import type { Metadata } from "next";
import { DocumentGrid } from "@/components/dashboard/DocumentGrid";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { mockLibraryDocuments } from "@/config/procurementMockData";

export const metadata: Metadata = { title: "Contracts — Documents" };

export default function ContractsPage() {
  const documents = mockLibraryDocuments.filter((doc) => doc.folder === "Contracts");

  return (
    <div className="flex flex-col gap-6">
      <p className="text-body-sm text-muted-foreground">{documents.length} contract document{documents.length === 1 ? "" : "s"}.</p>
      <DashboardCard title="Upload a contract">
        <UploadZone label="Upload contract" />
      </DashboardCard>
      <DocumentGrid documents={documents} />
    </div>
  );
}
