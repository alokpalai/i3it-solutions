import type { Metadata } from "next";
import { ClientDirectory } from "@/components/dashboard/ClientDirectory";
import { mockOrganizations } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Clients — CRM" };

export default function CrmClientsPage() {
  const clients = mockOrganizations.filter((org) => org.relationship === "Client");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Clients</h1>
        <p className="text-body-sm text-muted-foreground">{clients.length} organizations with at least one won opportunity.</p>
      </div>
      <ClientDirectory clients={clients} />
    </div>
  );
}
