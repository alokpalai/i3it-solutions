import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { PageCTA } from "@/components/internal/PageCTA";
import { buildMetadata } from "@/lib/seo";

// Honest placeholder — see src/app/login/page.tsx for the same reasoning:
// employee account creation is Phase 4 scope, not built here.
export const metadata = buildMetadata({
  title: "Employee Sign Up",
  description: "Employee account creation for i3it Solutions.",
  path: "/signup",
  noindex: true,
});

export default function SignupPage() {
  return (
    <>
      <PageHero
        eyebrow="Employees"
        title="Employee sign up"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Employee Sign Up" }]}
      />
      <IntroSection>
        <p>
          Employee account creation isn&rsquo;t available yet — it&rsquo;s part of a later phase
          of this site. If you&rsquo;re a customer or partner looking to get in touch, use the
          contact options below instead.
        </p>
      </IntroSection>
      <PageCTA title="Need to reach us?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
