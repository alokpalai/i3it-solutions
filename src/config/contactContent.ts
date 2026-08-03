// Contact, RFQ & Support content — Phase 3G. No phone number, email
// address, office address, or map coordinates are invented anywhere here
// (docs/CONTENT_STRATEGY.md §9.2, docs/DECISIONS.md A13) — every contact
// detail renders through ContactCard/OfficeHours/MapPlaceholder's
// "awaiting official information" state until the owner confirms real
// values. No response-time SLA is stated (docs/CONTENT_STRATEGY.md §14).

export type FAQItem = { question: string; answer: string };

// A small, honest preview — not a duplicate of any other section's FAQ
// content elsewhere in the site, written fresh for this page's context.
export const contactFaqPreview: FAQItem[] = [
  {
    question: "How do I request a quote?",
    answer: "Use the Request Quote form, or the contact form on this page — either reaches our team directly.",
  },
  {
    question: "Do you provide support after delivery?",
    answer: "Yes — technical support is available after deployment, not only at the point of sale.",
  },
  {
    question: "Can government departments procure through you?",
    answer: "Yes — we support central and state government departments, PSUs and public institutions through GeM-based procurement.",
  },
];

export const emergencyContactNotice =
  "For urgent technical support outside business hours, please submit the contact form below and clearly mark your enquiry as urgent — we will prioritize it accordingly. Dedicated emergency contact details are being finalized.";

export type SupportCategory = { title: string; description: string; href: string };

export const supportCategories: SupportCategory[] = [
  {
    title: "Technical Support",
    description: "Installation, configuration and technical troubleshooting for equipment we've supplied.",
    href: "/solutions/deployment-support",
  },
  {
    title: "Warranty",
    description: "Manufacturer warranty terms and coordination for supplied equipment.",
    href: "/contact",
  },
  {
    title: "AMC",
    description: "Assistance coordinating annual maintenance contracts for supplied equipment.",
    href: "/contact",
  },
  {
    title: "General Help",
    description: "Any other question about working with i3it Solutions.",
    href: "/contact",
  },
];

export const supportFaq: FAQItem[] = [
  {
    question: "Do products come with a warranty?",
    answer: "Warranty terms are set by the manufacturer for each product and are shared with you as part of the quotation and documentation.",
  },
  {
    question: "Do you assist with AMC (Annual Maintenance Contracts)?",
    answer: "Yes — we can assist with coordinating annual maintenance contracts for equipment we've supplied.",
  },
  {
    question: "How do I request support?",
    answer: "Reach out through the contact form on this page, or request a quote if your requirement is for new equipment.",
  },
];

export const thankYouMessage =
  "Your enquiry has been received. Our team will review it and follow up directly using the contact details you provided.";
