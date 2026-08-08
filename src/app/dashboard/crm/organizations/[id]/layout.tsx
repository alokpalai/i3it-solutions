import { notFound } from "next/navigation";
import { OrganizationHeader } from "@/components/dashboard/OrganizationHeader";
import { OrganizationTabs } from "@/components/dashboard/OrganizationTabs";
import { getOrganizationById } from "@/config/crmMockData";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

// Wraps every /dashboard/crm/organizations/[id]/* sub-route with the
// shared header and tab navigation — same shape as
// /dashboard/projects/[id]/layout.tsx.
export default async function OrganizationDetailLayout({ children, params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  return (
    <div className="flex flex-col gap-6">
      <OrganizationHeader organization={organization} />
      <OrganizationTabs organizationId={organization.id} />
      {children}
    </div>
  );
}
