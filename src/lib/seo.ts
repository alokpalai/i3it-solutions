import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// metadataBase is intentionally unset site-wide (src/app/layout.tsx) — no
// confirmed production domain yet (docs/CONTENT_STRATEGY.md §17). Canonical
// and Open Graph URLs here stay relative rather than fabricating a domain;
// Next.js resolves them against metadataBase once one is added post-launch.
type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: "/logo.jpeg", width: 783, height: 177, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export type BreadcrumbLd = { label: string; href?: string };

// docs/SEO.md §3: BreadcrumbList mirrors the visible Breadcrumbs UI exactly —
// same items, same order, nothing added.
export function breadcrumbJsonLd(items: BreadcrumbLd[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };
}

export type FAQLd = { question: string; answer: string };

// docs/SEO.md §3: only added where a page has genuine, substantive Q&A
// content already rendered visibly — never generic/speculative.
export function faqJsonLd(items: FAQLd[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
