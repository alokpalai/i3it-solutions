import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentList } from "@/components/dashboard/DocumentList";
import { getOrganizationById } from "@/config/crmMockData";
import { getDocumentsByOrganization } from "@/lib/crmMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Documents` : "Organization" };
}

export default async function OrganizationDocumentsPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const documents = getDocumentsByOrganization(organization);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm text-muted-foreground">
        {documents.length} document{documents.length === 1 ? "" : "s"} across {organization.name}&rsquo;s associated projects.
      </p>
      <DocumentList documents={documents} />
    </div>
  );
}
