import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactCard } from "@/components/contact/ContactCard";
import { OfficeHours } from "@/components/contact/OfficeHours";
import { ContactForm } from "@/components/contact/ContactForm";

// The premium conversion section inserted directly above the footer (Phase
// 3G brief) — homepage previously ended at ProcurementCTA. Contact details
// stay in the "awaiting official information" state throughout
// (docs/CONTENT_STRATEGY.md §9.2 — not yet owner-confirmed for public
// display); nothing here is a placeholder phone number or address.
export function ContactSection() {
  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-overline uppercase tracking-wide text-secondary">Get in touch</p>
              <h2 className="text-h2 text-foreground">Let&rsquo;s discuss your requirement</h2>
              <p className="max-w-lg text-body-lg text-muted-foreground">
                Whether you&rsquo;re scoping a government procurement, an infrastructure project or
                a routine support request, our team will follow up directly.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <ContactCard icon={Phone} label="Phone" />
              <ContactCard icon={Mail} label="Email" />
              <ContactCard icon={MapPin} label="Office" />
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
              >
                Request a quote
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
              >
                Get support
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>

            <OfficeHours />
          </div>

          <div className="rounded-lg border border-border bg-background p-6 shadow-lg sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
