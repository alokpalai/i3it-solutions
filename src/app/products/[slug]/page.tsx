import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { getMegaMenuItems } from "@/lib/nav";
import { shellIntro } from "@/config/internalContent";

type Props = { params: Promise<{ slug: string }> };

function findItem(slug: string) {
  return getMegaMenuItems("Products").find((item) => item.href === `/products/${slug}`);
}

export function generateStaticParams() {
  return getMegaMenuItems("Products").map((item) => ({
    slug: item.href.replace("/products/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return {
    title: item.label,
    description: `${item.label} — part of i3it Solutions' product portfolio.`,
    robots: { index: false, follow: true },
  };
}

// Route shell — see src/app/solutions/[slug]/page.tsx for the rationale
// (docs/ROADMAP.md Phase 4 covers full product taxonomy pages).
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const related = getMegaMenuItems("Products").filter((i) => i.href !== item.href);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={item.label}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: item.label },
        ]}
      />
      <IntroSection>
        <p>{shellIntro.products}</p>
      </IntroSection>
      <RelatedLinks
        title="Other product categories"
        items={related.map((i) => ({ label: i.label, href: i.href }))}
      />
      <PageCTA
        title="Need this category sourced?"
        secondary={{ label: "Explore all products", href: "/products" }}
      />
    </>
  );
}
