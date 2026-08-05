import Link from "next/link";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

type ProfileDropdownProps = {
  name: string;
  role?: string;
};

// Native <details>/<summary> (same pattern as FAQAccordion) rather than a
// hand-rolled click-toggle — free keyboard operability and expanded-state
// announcement, no client-side state needed, so this stays a Server
// Component.
export function ProfileDropdown({ name, role }: ProfileDropdownProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 marker:content-none hover:bg-surface">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-caption font-semibold text-primary">
          {initials}
        </span>
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <span className="text-body-sm font-medium text-foreground">{name}</span>
          {role && <span className="text-caption text-muted-foreground">{role}</span>}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
        />
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-border bg-background py-1.5 shadow-lg">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2.5 px-4 py-2 text-body-sm text-foreground hover:bg-surface"
        >
          <User aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
          Profile
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2.5 px-4 py-2 text-body-sm text-foreground hover:bg-surface"
        >
          <Settings aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
          Settings
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-body-sm text-error hover:bg-surface"
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </details>
  );
}
