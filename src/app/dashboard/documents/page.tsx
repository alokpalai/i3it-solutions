import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { mockDocuments } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

// Not in the Phase 4B brief's explicit ROUTES list, but Documents is a
// required Sidebar item — built as a real page rather than a dead link,
// same reconciliation approach used in earlier phases when a brief's
// nav/sidebar list and its routes list didn't quite match.
export const metadata: Metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Documents</h1>
        <p className="text-body-sm text-muted-foreground">
          {mockDocuments.length} document{mockDocuments.length === 1 ? "" : "s"} across your projects.
        </p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">Name</th>
                <th scope="col" className="py-2 pr-4">Category</th>
                <th scope="col" className="py-2 pr-4">Project</th>
                <th scope="col" className="py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-border text-body-sm last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-secondary" />
                      <span className="truncate font-medium text-foreground">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{doc.category}</td>
                  <td className="max-w-48 truncate py-3 pr-4 text-muted-foreground">{doc.project ?? "—"}</td>
                  <td className="py-3 text-muted-foreground">{formatDate(doc.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
