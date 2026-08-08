import Link from "next/link";
import { Mail, Phone, Building2, Star, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { MockContact } from "@/config/crmMockData";
import { getOrganizationById } from "@/config/crmMockData";

export function ContactCard({ contact }: { contact: MockContact }) {
  const organization = getOrganizationById(contact.organizationId);

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <p className="text-body-sm font-medium text-foreground">{contact.name}</p>
          <p className="text-caption text-muted-foreground">{contact.role}</p>
        </div>
        {contact.isDecisionMaker && (
          <span className="flex shrink-0 items-center gap-1 rounded-sm border border-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase text-accent">
            <Star aria-hidden="true" className="h-2.5 w-2.5" fill="currentColor" />
            Decision Maker
          </span>
        )}
      </div>

      {organization && (
        <Link
          href={`/dashboard/crm/organizations/${organization.id}/overview`}
          className="flex items-center gap-1.5 text-caption text-secondary hover:underline"
        >
          <Building2 aria-hidden="true" className="h-3 w-3 shrink-0" />
          {organization.name}
        </Link>
      )}

      <div className="flex flex-col gap-1.5 text-caption text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Mail aria-hidden="true" className="h-3 w-3 shrink-0" />
          <span className="truncate">{contact.email}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Phone aria-hidden="true" className="h-3 w-3 shrink-0" />
          {contact.phone}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle aria-hidden="true" className="h-3 w-3 shrink-0" />
          Prefers {contact.preferredCommunication} &middot; {contact.department}
        </span>
      </div>

      {contact.notes && <p className="text-caption text-muted-foreground">{contact.notes}</p>}
    </Card>
  );
}
