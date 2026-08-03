"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

// Client Component: owns open/close state and the dialog ref. Uses a native
// <dialog> (showModal) for the drawer — free focus containment and
// Escape-to-close — and native <details>/<summary> for accordion groups, so
// expanding a category needs zero React state.
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function open() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-sm text-foreground hover:text-primary lg:hidden"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
        aria-label="Site navigation"
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-background p-0 backdrop:bg-foreground/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="text-h5 text-foreground">{siteConfig.name}</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-sm text-foreground hover:text-primary"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => {
                if (!item.menu) {
                  return (
                    <li key={item.label} className="border-b border-border">
                      <Link
                        href={item.href ?? "/"}
                        onClick={close}
                        className="block py-3 text-body font-medium text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const links =
                  item.menu.kind === "mega"
                    ? item.menu.columns.flatMap((column) => column.items)
                    : item.menu.items;

                return (
                  <li key={item.label} className="border-b border-border">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-body font-medium text-foreground marker:content-none">
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className="h-4 w-4 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
                        />
                      </summary>
                      <ul className="flex flex-col gap-1 pb-3 pl-3">
                        {item.href && (
                          <li>
                            <Link
                              href={item.href}
                              onClick={close}
                              className="block py-2 text-body-sm font-medium text-primary"
                            >
                              View all {item.label}
                            </Link>
                          </li>
                        )}
                        {links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={close}
                              className="block py-2 text-body-sm text-muted-foreground"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 border-t border-border px-4 py-4">
            <div className="flex items-center gap-3">
              <Button href="/login" variant="ghost" onClick={close} className="flex-1">
                Login
              </Button>
              <Button href="/signup" variant="secondary" onClick={close} className="flex-1">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
