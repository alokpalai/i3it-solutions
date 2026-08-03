import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";

// Server Component — renders the interactive nav pieces as children rather
// than needing client state itself. Sticky via plain CSS; no scroll
// listener.
//
// Uses the same 1280px cap as Container but tighter, header-specific
// gutters (24/32px vs Container's 24/32/64px) rather than the Container
// primitive itself — at the 1024px breakpoint the full nav and utility
// controls all become visible at once, and Container's 64px desktop
// gutter left too little room; a nav bar legitimately needs different
// edge spacing than a content section.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20">
        <Link href="/" className="shrink-0" aria-label={siteConfig.name}>
          <Image
            src="/logo.jpeg"
            alt={siteConfig.name}
            width={783}
            height={177}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-1">
          {/* Employee-facing, not customer-facing — see src/app/login and
              src/app/signup: honest placeholders, no auth exists yet
              (Phase 4 scope). */}
          <Link
            href="/login"
            className="hidden px-3 text-body-sm font-medium text-foreground hover:text-primary lg:inline-flex lg:items-center"
          >
            Login
          </Link>
          <Button href="/signup" variant="secondary" size="sm" className="hidden lg:inline-flex">
            Sign Up
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
