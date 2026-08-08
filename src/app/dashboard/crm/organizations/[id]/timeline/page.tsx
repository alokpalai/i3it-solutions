import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { OrganizationTimeline } from "@/components/dashboard/OrganizationTimeline";
import { getOrganizationById } from "@/config/crmMockData";
import { getOrganizationTimeline } from "@/lib/crmMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Timeline` : "Organization" };
}

export default async function OrganizationTimelinePage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const entries = getOrganizationTimeline(organization.id);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm text-muted-foreground">
        Every activity, meeting and quotation recorded for {organization.name}, most recent first.
      </p>
      <Card>
        <OrganizationTimeline entries={entries} />
      </Card>
    </div>
  );
}
