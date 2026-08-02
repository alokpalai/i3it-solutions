import Link from "next/link";
import type { NavLink } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SimpleDropdownProps = {
  id: string;
  items: NavLink[];
  open: boolean;
};

// Presentational — see MegaMenu.tsx for why no "use client" directive and
// why the panel stays mounted with `inert` rather than conditional rendering.
export function SimpleDropdown({ id, items, open }: SimpleDropdownProps) {
  return (
    <div
      id={id}
      role="region"
      inert={!open}
      className={cn(
        // Flush against the trigger row — see MegaMenu.tsx for why (no
        // hoverable gap between trigger and panel).
        "absolute left-0 top-full z-30 w-64 rounded-md border border-border bg-background p-2 shadow-sm transition-[opacity,transform] duration-150 ease-out",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 pointer-events-none",
      )}
    >
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-sm px-3 py-2 text-body-sm text-foreground hover:bg-surface-muted hover:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
