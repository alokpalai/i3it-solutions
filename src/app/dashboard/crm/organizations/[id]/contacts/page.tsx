import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCard } from "@/components/dashboard/ContactCard";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { getOrganizationById, getContactsByOrganization } from "@/config/crmMockData";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Contacts` : "Organization" };
}

export default async function OrganizationContactsPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const contacts = getContactsByOrganization(organization.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">
          {contacts.length} contact{contacts.length === 1 ? "" : "s"} at {organization.name}.
        </p>
        <CrmActionButton label="Add Contact" />
      </div>
      {contacts.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-body-sm text-muted-foreground">
          No contacts recorded yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)}
        </div>
      )}
    </div>
  );
}
