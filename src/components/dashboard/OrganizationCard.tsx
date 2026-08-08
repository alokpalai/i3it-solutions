import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MockOrganization } from "@/config/crmMockData";
import { getContactsByOrganization } from "@/config/crmMockData";
import { getProjectsByOrganization } from "@/lib/crmMetrics";

export function OrganizationCard({ organization }: { organization: MockOrganization }) {
  const contactCount = getContactsByOrganization(organization.id).length;
  const projectCount = getProjectsByOrganization(organization).length;

  return (
    <Link href={`/dashboard/crm/organizations/${organization.id}/overview`}>
      <Card interactive className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-body-sm font-medium text-foreground">{organization.name}</p>
            <p className="text-caption text-muted-foreground">{organization.type}</p>
          </div>
          <Badge variant={organization.relationship === "Client" ? "accent" : "default"}>{organization.relationship}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{organization.industry}</Badge>
        </div>

        <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
          <MapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
          {organization.city}, {organization.state}
        </span>

        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-caption text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users aria-hidden="true" className="h-3.5 w-3.5" />
            {contactCount} contact{contactCount === 1 ? "" : "s"}
          </span>
          {projectCount > 0 && <span>{projectCount} project{projectCount === 1 ? "" : "s"}</span>}
        </div>
      </Card>
    </Link>
  );
}
