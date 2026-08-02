"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { SimpleDropdown } from "./SimpleDropdown";

// Only this component (and MobileNav) is a Client Component — everything
// else in the header/nav tree is static markup. State: which single
// top-level menu is open. Supports mouse (hover), keyboard (Enter/Space to
// toggle, Escape to close), and focus (closes when focus leaves the item).
export function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const idPrefix = useId();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openLabel) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenLabel(null);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenLabel(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openLabel]);

  return (
    <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNav.map((item) => {
          if (!item.menu) {
            return (
              <li key={item.label}>
                <Link
                  href={item.href ?? "/"}
                  className="block rounded-sm px-2.5 py-2 text-body-sm font-medium text-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const panelId = `${idPrefix}-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
          const isOpen = openLabel === item.label;

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenLabel(item.label)}
              onMouseLeave={() => setOpenLabel((current) => (current === item.label ? null : current))}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setOpenLabel((current) => (current === item.label ? null : current));
                }
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenLabel((current) => (current === item.label ? null : item.label))}
                className={cn(
                  "flex items-center gap-1 rounded-sm px-2.5 py-2 text-body-sm font-medium hover:text-primary",
                  isOpen ? "text-primary" : "text-foreground",
                )}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-4 w-4 transition-transform duration-150", isOpen && "rotate-180")}
                />
              </button>

              {item.menu.kind === "mega" ? (
                <MegaMenu id={panelId} menu={item.menu} open={isOpen} />
              ) : (
                <SimpleDropdown id={panelId} items={item.menu.items} open={isOpen} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
