"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, Landmark, UserPlus, Contact, X } from "lucide-react";
import { mockOrganizations, mockLeads, mockContacts, getOrganizationById } from "@/config/crmMockData";

type SearchResult = { label: string; sublabel: string; category: string; href: string; icon: typeof Search };

// Global CRM search per the brief — Organization / Client / Lead /
// Contact / Email / Phone / Sales Executive. Same "architecture only"
// footing as the dashboard-wide SearchBar: filters the mock datasets
// already loaded client-side rather than hitting a search API. Kept as
// its own component (not a reuse of SearchBar) since it searches a
// completely different set of entities, scoped to /dashboard/crm/*.
function getResults(query: string): SearchResult[] {
  if (query.trim().length < 2) return [];
  const q = query.toLowerCase();

  const organizationResults: SearchResult[] = mockOrganizations
    .filter((org) => org.name.toLowerCase().includes(q) || org.city.toLowerCase().includes(q))
    .map((org) => ({
      label: org.name,
      sublabel: org.relationship,
      category: "Organizations",
      href: `/dashboard/crm/organizations/${org.id}/overview`,
      icon: Landmark,
    }));

  const leadResults: SearchResult[] = mockLeads
    .filter((lead) => {
      const org = getOrganizationById(lead.organizationId);
      return (
        org?.name.toLowerCase().includes(q) ||
        lead.assignedTo.name.toLowerCase().includes(q) ||
        lead.source.toLowerCase().includes(q)
      );
    })
    .map((lead) => ({
      label: getOrganizationById(lead.organizationId)?.name ?? lead.id,
      sublabel: `${lead.status} · ${lead.assignedTo.name}`,
      category: "Leads",
      href: "/dashboard/crm/leads",
      icon: UserPlus,
    }));

  const contactResults: SearchResult[] = mockContacts
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        contact.phone.toLowerCase().includes(q),
    )
    .map((contact) => ({
      label: contact.name,
      sublabel: contact.email,
      category: "Contacts",
      href: "/dashboard/crm/contacts",
      icon: Contact,
    }));

  return [...organizationResults, ...leadResults, ...contactResults].slice(0, 8);
}

export function CrmSearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => getResults(query), [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="crm-search-results"
          placeholder="Search organizations, leads, contacts…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-9 text-body-sm text-foreground placeholder:text-muted-foreground focus:bg-background"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <ul id="crm-search-results" className="absolute z-50 mt-2 w-full rounded-md border border-border bg-background py-2 shadow-lg">
          {results.length === 0 ? (
            <li className="px-4 py-3 text-body-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</li>
          ) : (
            results.map((result, index) => (
              <li key={`${result.category}-${result.label}-${index}`}>
                <Link href={result.href} className="flex items-center gap-3 px-4 py-2 text-body-sm text-foreground hover:bg-surface">
                  <result.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate">{result.label}</span>
                    <span className="truncate text-caption text-muted-foreground">{result.sublabel}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-caption text-muted-foreground">{result.category}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
