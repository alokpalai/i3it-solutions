import { SectionTabNav } from "@/components/dashboard/SectionTabNav";
import { inventoryNavItems } from "@/config/procurementNav";

export default function InventoryRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTabNav items={inventoryNavItems} ariaLabel="Inventory sections" rootHref="/dashboard/inventory" />
      {children}
    </div>
  );
}
