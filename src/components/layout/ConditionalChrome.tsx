"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// The public marketing site (Header/Footer, light-only) and the
// authenticated /dashboard/* workspace (its own chrome, dark-mode
// capable — see DashboardLayout) share one root layout.tsx/html element,
// so this is the single client-side boundary that decides which chrome
// wraps a given route. Children are still Server Components — passing
// server-rendered content through a client component's `children` prop
// doesn't force it to become client code.
//
// Also resets/restores data-theme on every navigation: dark mode is only
// ever dashboard-scoped, but data-theme lives on <html>, which persists
// across client-side route changes. Without this, toggling dark mode
// inside /dashboard and then navigating to a public page would carry the
// dark palette onto pages that were never meant to have one.
export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") ?? false;

  useEffect(() => {
    if (isDashboard) {
      const saved = window.localStorage.getItem("dashboard-theme");
      if (saved === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDashboard]);

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
