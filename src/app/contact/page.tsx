import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCard } from "@/components/contact/ContactCard";
import { OfficeHours } from "@/components/contact/OfficeHours";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContentSection } from "@/components/internal/ContentSection";
import { FAQAccordion } from "@/components/internal/FAQAccordion";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { contactFaqPreview, emergencyContactNotice } from "@/config/contactContent";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with i3it Solutions for technology procurement, infrastructure and support enquiries.",
  path: "/contact",
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(contactFaqPreview)} />

      <ContactHero
        title="Get in touch"
        description="Tell us about your requirement and our team will follow up directly — for procurement, technical questions or general enquiries."
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Visit Support", href: "/support" }}
      />

      <ContentSection title="Contact information">
        <div className="grid gap-6 sm:grid-cols-3">
          <ContactCard icon={Phone} label="Phone" />
          <ContactCard icon={Mail} label="Email" />
          <ContactCard icon={MapPin} label="Office address" />
        </div>
      </ContentSection>

      <ContentSection title="Send us a message" className="bg-surface">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </ContentSection>

      <ContentSection title="Office hours">
        <OfficeHours />
      </ContentSection>

      <ContentSection title="Find us" className="bg-surface">
        <MapPlaceholder />
      </ContentSection>

      <ContentSection title="Frequently asked questions">
        <FAQAccordion items={contactFaqPreview} />
      </ContentSection>

      <ContentSection className="bg-surface">
        <div className="flex items-start gap-3 rounded-md border border-warning bg-background p-4">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <p className="text-body-sm text-muted-foreground">{emergencyContactNotice}</p>
        </div>
      </ContentSection>

      <PageCTA title="Have a requirement in mind?" secondary={{ label: "Explore Solutions", href: "/solutions" }} />
    </>
  );
}
