import Link from "next/link";
import { ArrowLeft, MapPin, Globe, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { MockOrganization } from "@/config/crmMockData";
import { getContactById } from "@/config/crmMockData";

export function OrganizationHeader({ organization }: { organization: MockOrganization }) {
  const primaryContact = organization.primaryContactId ? getContactById(organization.primaryContactId) : undefined;

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6">
      <Link
        href="/dashboard/crm/organizations"
        className="inline-flex w-fit items-center gap-1.5 text-caption font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All organizations
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-h2 text-foreground">{organization.name}</h1>
          <p className="text-body-sm text-muted-foreground">{organization.type}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={organization.relationship === "Client" ? "accent" : "default"}>{organization.relationship}</Badge>
          <Badge>{organization.industry}</Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
          {organization.city}, {organization.state}, {organization.country}
        </div>
        {organization.website && (
          <a
            href={organization.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-body-sm text-secondary hover:underline"
          >
            <Globe aria-hidden="true" className="h-4 w-4 shrink-0" />
            {organization.website.replace(/^https?:\/\//, "")}
          </a>
        )}
        {primaryContact && (
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <User aria-hidden="true" className="h-4 w-4 shrink-0" />
            {primaryContact.name} &middot; {primaryContact.role}
          </div>
        )}
      </div>
    </div>
  );
}
