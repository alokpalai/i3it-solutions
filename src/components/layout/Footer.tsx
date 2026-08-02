import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

// Server Component, fully static. Contact column links out to /contact
// rather than printing address/phone/email — see src/config/navigation.ts
// for why (docs/CONTENT_STRATEGY.md §9.2: not yet owner-confirmed public).
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-8">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-3 lg:col-span-2">
            <span className="text-h5 text-foreground">{siteConfig.name}</span>
            <p className="max-w-xs text-body-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {footerNav.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-body-sm font-medium text-foreground">{column.heading}</p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          {/* Developer attribution — owner-approved, Phase 2C. Plain <a> (external
              domain, not an internal route) so next/link's prefetching doesn't
              apply; kept visually subordinate to the copyright line. */}
          <a
            href="https://alokpalai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-caption text-muted-foreground transition-colors hover:text-primary"
          >
            Developed by alokpalai.com
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
