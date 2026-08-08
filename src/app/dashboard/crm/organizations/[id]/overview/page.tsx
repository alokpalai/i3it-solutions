import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ContactCard } from "@/components/dashboard/ContactCard";
import { OpportunityCard } from "@/components/dashboard/OpportunityCard";
import { CrmActivityFeed } from "@/components/dashboard/CrmActivityFeed";
import { getOrganizationById, getContactsByOrganization, getOpportunitiesByOrganization, getCrmActivityByOrganization } from "@/config/crmMockData";
import { getProjectsByOrganization, getQuotationsByOrganization, formatCurrency } from "@/lib/crmMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Overview` : "Organization" };
}

export default async function OrganizationOverviewPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const contacts = getContactsByOrganization(organization.id);
  const opportunities = getOpportunitiesByOrganization(organization.id);
  const projects = getProjectsByOrganization(organization);
  const quotations = getQuotationsByOrganization(organization.id);
  const activity = getCrmActivityByOrganization(organization.id).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card className="flex flex-col gap-3">
          <p className="text-h5 text-foreground">Notes</p>
          <p className="text-body-sm text-muted-foreground">{organization.notes}</p>
        </Card>

        <Card className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-caption text-muted-foreground">GST</span>
            <span className="text-body-sm text-foreground">{organization.gst}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption text-muted-foreground">PAN</span>
            <span className="text-body-sm text-foreground">{organization.pan}</span>
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-caption text-muted-foreground">Address</span>
            <span className="text-body-sm text-foreground">
              {organization.address}, {organization.city}, {organization.state}, {organization.country}
            </span>
          </div>
        </Card>

        <DashboardCard title="Contacts" action={{ label: "View all", href: `/dashboard/crm/organizations/${organization.id}/contacts` }}>
          {contacts.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">No contacts recorded yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.slice(0, 2).map((contact) => <ContactCard key={contact.id} contact={contact} />)}
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Opportunities" action={{ label: "View all", href: `/dashboard/crm/organizations/${organization.id}/opportunities` }}>
          {opportunities.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">No opportunities recorded yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {opportunities.slice(0, 2).map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} />)}
            </div>
          )}
        </DashboardCard>
      </div>

      <div className="flex flex-col gap-6">
        {projects.length > 0 && (
          <DashboardCard title="Associated projects" action={{ label: "View all", href: `/dashboard/crm/organizations/${organization.id}/projects` }}>
            <ul className="flex flex-col gap-3">
              {projects.map((project) => (
                <li key={project.id} className="flex flex-col">
                  <span className="text-body-sm text-foreground">{project.name}</span>
                  <span className="text-caption text-muted-foreground">{project.status} &middot; {formatCurrency(project.budget)}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        )}

        {quotations.length > 0 && (
          <DashboardCard title="Associated quotations">
            <ul className="flex flex-col gap-3">
              {quotations.map((quotation) => (
                <li key={quotation.id} className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-body-sm text-foreground">{quotation.quotationNumber}</span>
                    <span className="text-caption text-muted-foreground">{quotation.status}</span>
                  </div>
                  <span className="text-caption text-muted-foreground">{formatCurrency(quotation.amount)}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        )}

        <DashboardCard title="Activity" action={{ label: "View all", href: `/dashboard/crm/organizations/${organization.id}/timeline` }}>
          <CrmActivityFeed items={activity} limit={4} />
        </DashboardCard>
      </div>
    </div>
  );
}
