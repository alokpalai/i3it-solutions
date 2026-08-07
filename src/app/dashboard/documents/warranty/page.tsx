import type { Metadata } from "next";
import Link from "next/link";
import { DocumentGrid } from "@/components/dashboard/DocumentGrid";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { WarrantyStatusBadge } from "@/components/dashboard/WarrantyStatusBadge";
import { mockLibraryDocuments, mockWarrantyRecords, getProductById, getVendorById } from "@/config/procurementMockData";
import { mockProjects } from "@/config/dashboardMockData";
import { warrantyStatus } from "@/lib/procurementMetrics";
import { formatDate } from "@/lib/formatDate";

export const metadata: Metadata = { title: "Warranty — Documents" };

export default function WarrantyPage() {
  const documents = mockLibraryDocuments.filter((doc) => doc.folder === "Warranty");
  const records = [...mockWarrantyRecords].sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));

  return (
    <div className="flex flex-col gap-6">
      <DashboardCard title="Warranty records">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">Product</th>
                <th scope="col" className="py-2 pr-4">Serial Number</th>
                <th scope="col" className="py-2 pr-4">Project</th>
                <th scope="col" className="py-2 pr-4">Vendor</th>
                <th scope="col" className="py-2 pr-4">Purchased</th>
                <th scope="col" className="py-2 pr-4">Expires</th>
                <th scope="col" className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const product = getProductById(record.productId);
                const vendor = getVendorById(record.vendorId);
                const project = record.projectId ? mockProjects.find((p) => p.id === record.projectId) : undefined;
                return (
                  <tr key={record.id} className="border-b border-border text-body-sm">
                    <td className="max-w-56 truncate py-3 pr-4 font-medium text-foreground">{product?.name ?? "—"}</td>
                    <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{record.serialNumber}</td>
                    <td className="max-w-48 truncate py-3 pr-4 text-muted-foreground">
                      {project ? (
                        <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">{project.name}</Link>
                      ) : "—"}
                    </td>
                    <td className="max-w-40 truncate py-3 pr-4 text-muted-foreground">{vendor?.company ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatDate(record.purchaseDate)}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatDate(record.expiryDate)}</td>
                    <td className="py-3"><WarrantyStatusBadge status={warrantyStatus(record.expiryDate)} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <DashboardCard title="Upload a warranty certificate">
        <UploadZone label="Upload warranty certificate" />
      </DashboardCard>

      <DocumentGrid documents={documents} />
    </div>
  );
}
