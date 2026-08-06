import { FileText, FolderOpen } from "lucide-react";
import type { ProjectDocumentItem } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

type DocumentListProps = {
  documents: ProjectDocumentItem[];
  limit?: number;
};

export function DocumentList({ documents, limit }: DocumentListProps) {
  const items = limit ? documents.slice(0, limit) : documents;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpen aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
        <p className="text-body-sm text-muted-foreground">No documents uploaded yet.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {items.map((doc) => (
        <li key={doc.id} className="flex items-center gap-3 py-3">
          <FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-secondary" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-body-sm font-medium text-foreground">{doc.name}</span>
            <span className="text-caption text-muted-foreground">
              {doc.category} &middot; Uploaded by {doc.uploadedBy}
            </span>
          </div>
          <span className="shrink-0 text-caption text-muted-foreground">{formatDate(doc.uploadedAt)}</span>
        </li>
      ))}
    </ul>
  );
}
