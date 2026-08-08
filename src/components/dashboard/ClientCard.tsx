import Link from "next/link";
import { MapPin, Mail, Phone, FolderKanban, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MockOrganization } from "@/config/crmMockData";
import { getContactById } from "@/config/crmMockData";
import { getProjectsByOrganization, getQuotationsByOrganization } from "@/lib/crmMetrics";

// A "Client" is an Organization whose relationship is "Client" — same
// entity as OrganizationCard renders, but a fuller profile card (GST/PAN,
// primary contact reach-out details, associated projects/quotations)
// matching the brief's CLIENTS MODULE field list. Both link to the same
// /dashboard/crm/organizations/[id] detail page rather than maintaining
// a second parallel "client profile" route.
export function ClientCard({ organization }: { organization: MockOrganization }) {
  const primaryContact = organization.primaryContactId ? getContactById(organization.primaryContactId) : undefined;
  const projects = getProjectsByOrganization(organization);
  const quotations = getQuotationsByOrganization(organization.id);

  return (
    <Link href={`/dashboard/crm/organizations/${organization.id}/overview`}>
      <Card interactive className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-body-sm font-medium text-foreground">{organization.name}</p>
            <p className="text-caption text-muted-foreground">{organization.type}</p>
          </div>
          <Badge>{organization.industry}</Badge>
        </div>

        <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
          <MapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
          {organization.city}, {organization.state}, {organization.country}
        </span>

        <span className="text-caption text-muted-foreground">GST {organization.gst} &middot; PAN {organization.pan}</span>

        {primaryContact && (
          <div className="flex flex-col gap-1 border-t border-border pt-2 text-caption text-muted-foreground">
            <span className="text-body-sm font-medium text-foreground">{primaryContact.name}</span>
            <span className="flex items-center gap-1.5">
              <Mail aria-hidden="true" className="h-3 w-3 shrink-0" />
              <span className="truncate">{primaryContact.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone aria-hidden="true" className="h-3 w-3 shrink-0" />
              {primaryContact.phone}
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-caption text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <FolderKanban aria-hidden="true" className="h-3.5 w-3.5" />
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText aria-hidden="true" className="h-3.5 w-3.5" />
            {quotations.length} quotation{quotations.length === 1 ? "" : "s"}
          </span>
        </div>
      </Card>
    </Link>
  );
}
