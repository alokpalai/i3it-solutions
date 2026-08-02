import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CompanySnapshot } from "@/components/home/CompanySnapshot";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyI3it } from "@/components/home/WhyI3it";
import { GovernmentProcurement } from "@/components/home/GovernmentProcurement";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TechnologyEcosystem } from "@/components/home/TechnologyEcosystem";
import { FeaturedSolutions } from "@/components/home/FeaturedSolutions";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { Credentials } from "@/components/home/Credentials";
import { Testimonials } from "@/components/home/Testimonials";
import { MediaHighlights } from "@/components/home/MediaHighlights";
import { ProcurementCTA } from "@/components/home/ProcurementCTA";

// docs/SEO.md §2 homepage title pattern: "i3it Solutions | {positioning}".
// Uses title.absolute, not a plain string — a plain string here would be
// augmented by the root layout's "%s | i3it Solutions" template (that
// template is meant for subpages), producing a doubled title. absolute
// bypasses it (confirmed against the installed Next.js version's docs).
// No canonical/metadataBase set here either — same reasoning as
// src/app/layout.tsx (no confirmed production domain yet).
export const metadata: Metadata = {
  title: {
    absolute:
      "i3it Solutions | IT Infrastructure & Procurement Solutions for Government and Enterprise",
  },
};

// Section order follows docs/UX.md §2.1's approved, reasoned sequence
// (capabilities → why-i3it moved up → government → products/ecosystem →
// featured solutions → CTA), adapted to the Phase 2C section inventory.
// Trust/Projects/Credentials/Testimonials/Media all currently render
// nothing — no verified public data exists yet for any of them (see
// src/config/homepage.ts) — but stay composed here in their documented
// conceptual position so populating the data later is enough to surface them.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CompanySnapshot />
      <WhatWeDo />
      <WhyI3it />
      <GovernmentProcurement />
      <FeaturedProducts />
      <TechnologyEcosystem />
      <FeaturedSolutions />
      <FeaturedProjectsSection />
      <Credentials />
      <Testimonials />
      <MediaHighlights />
      <ProcurementCTA />
    </>
  );
}
