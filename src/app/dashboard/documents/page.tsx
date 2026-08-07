import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, ReceiptText, ShieldCheck, ShoppingCart, FileText, BookOpen, BadgeCheck } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DocumentGrid } from "@/components/dashboard/DocumentGrid";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { documentFolders, mockLibraryDocuments, type DocumentFolder } from "@/config/procurementMockData";

// Rewritten for Phase 4E's Document Library (folders, upload
// architecture) — supersedes Phase 4B's simpler flat table, which read
// from dashboardMockData.ts's mockDocuments (still used elsewhere, e.g.
// the dashboard homepage's "Recent documents" widget, so that array and
// type are left alone).
export const metadata: Metadata = { title: "Documents" };

const FOLDER_ICON: Record<DocumentFolder, typeof ScrollText> = {
  Contracts: ScrollText,
  Invoices: ReceiptText,
  Warranty: ShieldCheck,
  "Purchase Orders": ShoppingCart,
  "Technical Documents": FileText,
  Brochures: BookOpen,
  Certificates: BadgeCheck,
};

const FOLDER_ROUTES: Partial<Record<DocumentFolder, string>> = {
  Contracts: "/dashboard/documents/contracts",
  Invoices: "/dashboard/documents/invoices",
  Warranty: "/dashboard/documents/warranty",
};

export default function DocumentsLibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Document Library</h1>
        <p className="text-body-sm text-muted-foreground">{mockLibraryDocuments.length} documents across {documentFolders.length} folders.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {documentFolders.map((folder) => {
          const Icon = FOLDER_ICON[folder];
          const count = mockLibraryDocuments.filter((doc) => doc.folder === folder).length;
          const href = FOLDER_ROUTES[folder];
          const content = (
            <div className="flex items-center gap-3 rounded-md border border-border bg-background p-4 transition-colors hover:border-secondary">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-muted">
                <Icon aria-hidden="true" className="h-5 w-5 text-secondary" />
              </span>
              <div className="flex flex-col">
                <span className="text-body-sm font-medium text-foreground">{folder}</span>
                <span className="text-caption text-muted-foreground">{count} document{count === 1 ? "" : "s"}</span>
              </div>
            </div>
          );
          return href ? <Link key={folder} href={href}>{content}</Link> : <div key={folder}>{content}</div>;
        })}
      </div>

      <DashboardCard title="Upload a document">
        <UploadZone />
      </DashboardCard>

      <DashboardCard title="All documents">
        <DocumentGrid documents={[...mockLibraryDocuments].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))} />
      </DashboardCard>
    </div>
  );
}
