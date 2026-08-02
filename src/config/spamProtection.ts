// Architecture placeholder for form spam protection — Phase 3G brief:
// "prepare architecture for Cloudflare Turnstile or Google reCAPTCHA... do
// not integrate real keys." No widget is rendered and no third-party
// script is loaded anywhere in this codebase yet. Once a provider and site
// key are chosen, set NEXT_PUBLIC_TURNSTILE_SITE_KEY (or the reCAPTCHA
// equivalent) and mount the provider's widget at the marked integration
// point in ContactForm/RFQForm — no other code changes required.

export type SpamProtectionProvider = "turnstile" | "recaptcha" | null;

export const spamProtectionConfig: {
  provider: SpamProtectionProvider;
  siteKey: string | null;
} = {
  provider:
    (process.env.NEXT_PUBLIC_SPAM_PROTECTION_PROVIDER as SpamProtectionProvider) ?? null,
  siteKey: process.env.NEXT_PUBLIC_SPAM_PROTECTION_SITE_KEY ?? null,
};
