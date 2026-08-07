import { SectionTabNav } from "@/components/dashboard/SectionTabNav";
import { documentsNavItems } from "@/config/procurementNav";

export default function DocumentsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTabNav items={documentsNavItems} ariaLabel="Document library sections" rootHref="/dashboard/documents" />
      {children}
    </div>
  );
}
