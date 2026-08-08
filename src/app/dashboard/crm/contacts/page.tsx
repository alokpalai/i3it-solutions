import type { Metadata } from "next";
import { ContactDirectory } from "@/components/dashboard/ContactDirectory";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { mockContacts } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Contacts — CRM" };

export default function CrmContactsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Contacts</h1>
          <p className="text-body-sm text-muted-foreground">{mockContacts.length} contacts across all organizations.</p>
        </div>
        <CrmActionButton label="Add Contact" />
      </div>
      <ContactDirectory contacts={mockContacts} />
    </div>
  );
}
