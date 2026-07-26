import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { trustedOrganizations } from "@/config/homepage";

// docs/INFORMATION_ARCHITECTURE.md §6.3: no client/organization is published
// without displayPermission: Approved. None currently are, so this renders
// nothing rather than a fabricated logo wall — never "Government Client 1"
// style placeholders. Structure is ready: populate trustedOrganizations in
// src/config/homepage.ts once names/logos are actually approved.
export function TrustStrip() {
  if (trustedOrganizations.length === 0) return null;

  return (
    <Section spacing="compact" className="border-y border-border bg-surface">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustedOrganizations.map((org) => (
            <li key={org.name} className="text-body-sm font-medium text-muted-foreground">
              {org.name}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
