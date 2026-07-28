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
  return getMegaMenuItems("Solutions").find((item) => item.href === `/solutions/${slug}`);
}

export function generateStaticParams() {
  return getMegaMenuItems("Solutions").map((item) => ({
    slug: item.href.replace("/solutions/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return {
    title: item.label,
    description: `${item.label} — part of i3it Solutions' technology solutions portfolio.`,
    robots: { index: false, follow: true },
  };
}

// Route shell: this is not the final Solutions detail page (docs/ROADMAP.md
// Phase 3B+). It exists now so /solutions links resolve to a real,
// honestly-labeled page instead of a 404, without pretending final content
// already exists (Phase 3A brief, Step 9).
export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const related = getMegaMenuItems("Solutions").filter((i) => i.href !== item.href);

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={item.label}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: item.label },
        ]}
      />
      <IntroSection>
        <p>{shellIntro.solutions}</p>
      </IntroSection>
      <RelatedLinks
        title="Other solution areas"
        items={related.map((i) => ({ label: i.label, href: i.href }))}
      />
      <PageCTA
        title="Discuss this requirement"
        secondary={{ label: "Explore all solutions", href: "/solutions" }}
      />
    </>
  );
}
