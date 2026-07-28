import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { getSimpleMenuItems } from "@/lib/nav";
import { shellIntro } from "@/config/internalContent";

type Props = { params: Promise<{ slug: string }> };

function sectionItems() {
  return getSimpleMenuItems("Government").filter((item) => item.href !== "/government");
}

function findItem(slug: string) {
  return sectionItems().find((item) => item.href === `/government/${slug}`);
}

export function generateStaticParams() {
  return sectionItems().map((item) => ({ slug: item.href.replace("/government/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return {
    title: item.label,
    description: `${item.label} — i3it Solutions is a registered seller on the Government e-Marketplace (GeM).`,
    robots: { index: false, follow: true },
  };
}

// Route shell. For /government/clients specifically: no client/organization
// entry has owner-granted displayPermission: Approved yet
// (docs/INFORMATION_ARCHITECTURE.md §6.3), so the honest shell copy applies
// here exactly as it does to every other government sub-page — nothing
// special-cased, nothing fabricated to fill the page.
export default async function GovernmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const related = sectionItems().filter((i) => i.href !== item.href);

  return (
    <>
      <PageHero
        eyebrow="Government"
        title={item.label}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Government", href: "/government" },
          { label: item.label },
        ]}
      />
      <IntroSection>
        <p>{shellIntro.government}</p>
      </IntroSection>
      <RelatedLinks
        title="Other government pages"
        items={related.map((i) => ({ label: i.label, href: i.href }))}
      />
      <PageCTA
        title="Have a government requirement?"
        secondary={{ label: "Back to Government overview", href: "/government" }}
      />
    </>
  );
}
