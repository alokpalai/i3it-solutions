import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { SplitContent } from "@/components/internal/SplitContent";
import { PageCTA } from "@/components/internal/PageCTA";
import { companySnapshot } from "@/config/homepage";

export const metadata: Metadata = {
  title: "About i3it Solutions",
  description:
    "IT procurement, infrastructure and technology solutions partner for government, public-sector and enterprise organizations. Established 2021.",
};

// docs/PROJECT.md §3 positioning framework (understand -> source -> integrate
// -> deploy -> support). companySnapshot is reused verbatim from
// src/config/homepage.ts rather than re-declared here — same approved facts,
// one source of truth.
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="About i3it Solutions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company", href: "/about" }, { label: "About" }]}
      />
      <SplitContent
        aside={
          <ul className="flex flex-col gap-4">
            {companySnapshot.map((item) => (
              <li key={item.title} className="border-l-2 border-secondary pl-4">
                <p className="text-h5 text-foreground">{item.title}</p>
                <p className="text-body-sm text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        }
      >
        <p className="text-body-lg text-muted-foreground">
          i3it Solutions is a technology solutions partner — not merely a product reseller —
          working to understand a buyer&rsquo;s requirement, source the right technology across
          multiple brands, integrate systems, deploy solutions, and support customers after
          delivery.
        </p>
        <p className="text-body text-muted-foreground">
          We serve government departments, public-sector organizations, institutions and
          enterprises, with a particular focus on transparent, GeM-based procurement for
          government buyers.
        </p>
      </SplitContent>
      <PageCTA
        title="Want to know more about how we work?"
        secondary={{ label: "Read our Vision & Mission", href: "/company/vision-mission" }}
      />
    </>
  );
}
