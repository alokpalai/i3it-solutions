import { SectionTabNav } from "@/components/dashboard/SectionTabNav";
import { procurementNavItems } from "@/config/procurementNav";

export default function ProcurementRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTabNav items={procurementNavItems} ariaLabel="Procurement sections" rootHref="/dashboard/procurement" />
      {children}
    </div>
  );
}
