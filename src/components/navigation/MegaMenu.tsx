import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MegaMenu as MegaMenuData } from "@/config/navigation";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  id: string;
  menu: MegaMenuData;
  open: boolean;
};

// Presentational only — no "use client" here. It's still bundled with its
// client parent (DesktopNav), but doesn't need its own directive since it
// holds no state or handlers. Stays mounted (not conditionally rendered) so
// its links remain in the SSR'd HTML for internal-link SEO/no-JS resilience;
// `inert` makes it properly non-interactive/hidden from AT while closed.
export function MegaMenu({ id, menu, open }: MegaMenuProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label={menu.intro.title}
      inert={!open}
      className={cn(
        // Flush against the trigger row (no margin gap) — mouseenter/mouseleave
        // is attached to the parent <li>, and an absolutely-positioned panel
        // separated by a margin creates unhovered pixels a diagonal mouse path
        // can cross, closing the menu prematurely. Click/keyboard don't depend
        // on this, but hover should still work cleanly.
        "absolute left-0 top-full z-30 w-[min(880px,calc(100vw-2rem))] rounded-md border border-border bg-background p-6 shadow-sm transition-[opacity,transform] duration-150 ease-out",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 pointer-events-none",
      )}
    >
      <div className="grid grid-cols-[200px_1fr_220px] gap-8">
        <div className="border-r border-border pr-6">
          <p className="text-overline uppercase tracking-wide text-secondary">
            {menu.intro.title}
          </p>
          <p className="mt-3 text-body-sm text-muted-foreground">{menu.intro.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {menu.columns.map((column) => (
            <div key={column.heading}>
              <Link
                href={column.href}
                className="text-body-sm font-medium text-foreground hover:text-primary"
              >
                {column.heading}
              </Link>
              <ul className="mt-3 flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-muted-foreground hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href={menu.featured.href}
          className="flex flex-col justify-between gap-4 rounded-md border border-transparent bg-surface-muted p-5 hover:border-secondary"
        >
          <div>
            <p className="text-h6 text-foreground">{menu.featured.label}</p>
            <p className="mt-2 text-body-sm text-muted-foreground">
              {menu.featured.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-body-sm font-medium text-primary">
            Explore <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}
