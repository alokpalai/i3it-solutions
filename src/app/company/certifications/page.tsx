import { CompanyHero } from "@/components/company/CompanyHero";
import { CertificationCard } from "@/components/company/CertificationCard";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { certificationsIntro, confirmedCertification, pendingCertifications } from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Certifications & Registrations",
  description:
    "i3it Solutions' certification and registration status — confirmed facts stated plainly, everything else marked pending verification.",
  path: "/company/certifications",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Certifications & Registrations" },
];

// Very deliberately does not claim ISO, CMMI, MSME, OEM partnership, or any
// government approval — see src/config/companyContent.ts for the sourcing
// of every item shown here.
export default function CertificationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="Certifications & Registrations"
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Company overview", href: "/company" }}
      />

      <ContentSection title="Our commitment">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{certificationsIntro}</p>
      </ContentSection>

      <ContentSection title="Confirmed" className="bg-surface">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CertificationCard
            name={confirmedCertification.name}
            description={confirmedCertification.description}
            status="confirmed"
          />
        </div>
      </ContentSection>

      <ContentSection
        title="Pending verification"
        description="Profile-stated categories currently being verified. None are claimed as active certifications until a verifying document is confirmed."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pendingCertifications.map((item) => (
            <CertificationCard key={item.name} name={item.name} description={item.description} status="pending" />
          ))}
        </div>
      </ContentSection>

      <RelatedLinks
        title="More about i3it"
        items={[
          { label: "About", href: "/company/about" },
          { label: "Why i3it", href: "/company/why-i3it" },
        ]}
      />

      <PageCTA title="Have a compliance question?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
