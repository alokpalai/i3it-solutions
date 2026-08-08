import type { Metadata } from "next";
import { OrganizationDirectory } from "@/components/dashboard/OrganizationDirectory";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { mockOrganizations } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Organizations — CRM" };

export default function CrmOrganizationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Organizations</h1>
          <p className="text-body-sm text-muted-foreground">{mockOrganizations.length} organizations — clients and prospects.</p>
        </div>
        <CrmActionButton label="Add Organization" />
      </div>
      <OrganizationDirectory organizations={mockOrganizations} />
    </div>
  );
}
