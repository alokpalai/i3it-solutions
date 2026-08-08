"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { MockContact } from "@/config/crmMockData";
import { getOrganizationById } from "@/config/crmMockData";
import { Input } from "@/components/ui/Input";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ContactCard } from "@/components/dashboard/ContactCard";

export function ContactDirectory({ contacts }: { contacts: MockContact[] }) {
  const [search, setSearch] = useState("");
  const [decisionMakerFilter, setDecisionMakerFilter] = useState("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return contacts.filter((contact) => {
      const organization = getOrganizationById(contact.organizationId);
      const matchesSearch =
        query === "" ||
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query) ||
        organization?.name.toLowerCase().includes(query);
      const matchesDecisionMaker =
        decisionMakerFilter === "All" ||
        (decisionMakerFilter === "Yes" && contact.isDecisionMaker) ||
        (decisionMakerFilter === "No" && !contact.isDecisionMaker);
      return matchesSearch && matchesDecisionMaker;
    });
  }, [contacts, search, decisionMakerFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, organization, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search contacts"
          />
        </div>
        <FilterPanel
          filters={[
            {
              label: "Filter by decision maker",
              value: decisionMakerFilter,
              onChange: setDecisionMakerFilter,
              options: [
                { label: "All contacts", value: "All" },
                { label: "Decision makers", value: "Yes" },
                { label: "Non decision makers", value: "No" },
              ],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No contacts match your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}
