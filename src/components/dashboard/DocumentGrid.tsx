import { FileText, FileImage, FileSpreadsheet, File, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { MockLibraryDocument, DocumentFileType } from "@/config/procurementMockData";
import { formatDate } from "@/lib/formatDate";

const FILE_ICON: Record<DocumentFileType, typeof FileText> = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  PNG: FileImage,
};

// Grid layout for the global Document Library — distinct from
// src/components/dashboard/DocumentList.tsx (a project's own attachment
// list, single-column, no folder grouping). Same underlying idea, a
// different shape for a different scope, same naming resolution as
// CrmActivityFeed/ProjectActivityFeed.
export function DocumentGrid({ documents }: { documents: MockLibraryDocument[] }) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <FolderOpen aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
        <p className="text-body-sm text-muted-foreground">No documents in this folder yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {documents.map((doc) => {
        const Icon = FILE_ICON[doc.fileType] ?? File;
        return (
          <Card key={doc.id} className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-muted">
                <Icon aria-hidden="true" className="h-5 w-5 text-secondary" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-body-sm font-medium text-foreground">{doc.name}</p>
                <p className="text-caption text-muted-foreground">{doc.folder}</p>
              </div>
            </div>
            {doc.relatedLabel && <p className="truncate text-caption text-muted-foreground">Related: {doc.relatedLabel}</p>}
            <p className="text-caption text-muted-foreground">
              Uploaded by {doc.uploadedBy} &middot; {formatDate(doc.uploadedAt)}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
