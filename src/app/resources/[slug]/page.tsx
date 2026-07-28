import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { getSimpleMenuItems } from "@/lib/nav";
import { shellIntro } from "@/config/internalContent";

type Props = { params: Promise<{ slug: string }> };

function findItem(slug: string) {
  return getSimpleMenuItems("Resources").find((item) => item.href === `/resources/${slug}`);
}

export function generateStaticParams() {
  return getSimpleMenuItems("Resources").map((item) => ({
    slug: item.href.replace("/resources/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return {
    title: item.label,
    description: `${item.label} — i3it Solutions resources.`,
    robots: { index: false, follow: true },
  };
}

// Route shell — no verified downloadable asset exists yet for any resource
// category (docs/DECISIONS.md A13: nothing fabricated to fill the page).
export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const related = getSimpleMenuItems("Resources").filter((i) => i.href !== item.href);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={item.label}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: item.label },
        ]}
      />
      <IntroSection>
        <p>{shellIntro.resources}</p>
      </IntroSection>
      <RelatedLinks
        title="Other resources"
        items={related.map((i) => ({ label: i.label, href: i.href }))}
      />
      <PageCTA
        title="Need something specific?"
        secondary={{ label: "Back to Resources", href: "/resources" }}
      />
    </>
  );
}
