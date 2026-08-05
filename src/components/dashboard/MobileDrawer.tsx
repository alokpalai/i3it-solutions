"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";
import { dashboardNavItems, dashboardFooterNavItems } from "@/config/dashboardNav";
import { siteConfig } from "@/config/site";

// Mobile equivalent of Sidebar.tsx — same nav data, native <dialog> drawer
// (matches the public site's MobileNav pattern: free focus containment
// and Escape-to-close from the browser, no extra JS).
export function MobileDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        className="flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:text-primary lg:hidden"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
        aria-label="Dashboard navigation"
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-background p-0 backdrop:bg-foreground/40"
      >
        {isOpen && (
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

            <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="flex flex-col gap-1">
                {[...dashboardNavItems, ...dashboardFooterNavItems].map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-3 text-body font-medium",
                          active ? "bg-surface-muted text-primary" : "text-foreground",
                        )}
                      >
                        <item.icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-border px-3 py-3">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-body font-medium text-error"
                >
                  <LogOut aria-hidden="true" className="h-5 w-5 shrink-0" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
