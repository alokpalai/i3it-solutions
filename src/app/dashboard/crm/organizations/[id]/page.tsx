import { notFound, redirect } from "next/navigation";
import { getOrganizationById } from "@/config/crmMockData";

type Props = { params: Promise<{ id: string }> };

export default async function OrganizationDetailIndexPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();
  redirect(`/dashboard/crm/organizations/${id}/overview`);
}
