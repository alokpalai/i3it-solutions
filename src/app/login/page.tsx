import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { PageCTA } from "@/components/internal/PageCTA";
import { buildMetadata } from "@/lib/seo";

// Honest placeholder — employee authentication is Phase 4 scope (no
// session handling, employee data model, or dashboard exists yet). No
// fake login form; the route exists so header links resolve to a real,
// truthful page instead of a 404.
export const metadata = buildMetadata({
  title: "Employee Login",
  description: "Employee login for i3it Solutions.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Employees"
        title="Employee login"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Employee Login" }]}
      />
      <IntroSection>
        <p>
          Employee login isn&rsquo;t available yet — it&rsquo;s part of a later phase of this
          site. If you&rsquo;re a customer or partner looking to get in touch, use the contact
          options below instead.
        </p>
      </IntroSection>
      <PageCTA title="Need to reach us?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
