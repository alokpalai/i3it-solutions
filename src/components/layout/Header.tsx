import Link from "next/link";
import { Search } from "lucide-react";
import { requestQuoteLink } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";

// Server Component — renders the interactive nav pieces as children rather
// than needing client state itself. Sticky via plain CSS; no scroll
// listener. Structured so the text wordmark can be swapped for the official
// logo (once verified — none exists in public/ yet) without touching layout.
//
// Uses the same 1280px cap as Container but tighter, header-specific
// gutters (24/32px vs Container's 24/32/64px) rather than the Container
// primitive itself — at the 1024px breakpoint the full nav, search icon and
// Request Quote button all become visible at once, and Container's 64px
// desktop gutter left too little room; a nav bar legitimately needs
// different edge spacing than a content section.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20">
        <Link
          href="/"
          className="shrink-0 text-h5 font-semibold text-foreground hover:text-primary"
        >
          {siteConfig.name}
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-primary lg:flex"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>
          <Button
            href={requestQuoteLink.href}
            variant="accent"
            size="sm"
            className="hidden lg:inline-flex"
          >
            {requestQuoteLink.label}
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
