import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunityCard } from "@/components/dashboard/OpportunityCard";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { getOrganizationById, getOpportunitiesByOrganization } from "@/config/crmMockData";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Opportunities` : "Organization" };
}

export default async function OrganizationOpportunitiesPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const opportunities = getOpportunitiesByOrganization(organization.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">
          {opportunities.length} opportunit{opportunities.length === 1 ? "y" : "ies"} with {organization.name}.
        </p>
        <CrmActionButton label="Add Opportunity" />
      </div>
      {opportunities.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-body-sm text-muted-foreground">
          No opportunities recorded yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} />)}
        </div>
      )}
    </div>
  );
}
