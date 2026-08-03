import { z } from "zod";
import { organizationTypes } from "@/lib/validation/contact";

// Reuses the same organization-type set as the Industry classification —
// one approved list, not a second invented taxonomy for the same concept.
export const rfqIndustries = organizationTypes;

export const budgetRanges = [
  "Under ₹5 Lakh",
  "₹5 Lakh – ₹25 Lakh",
  "₹25 Lakh – ₹1 Crore",
  "Above ₹1 Crore",
  "Prefer not to specify",
] as const;

export const timelines = [
  "Immediate (within 2 weeks)",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible / planning stage",
] as const;

const phonePattern = /^[0-9+()\-\s]{7,15}$/;

// Only the fields a time-pressured procurement officer needs to submit a
// first enquiry are required (docs/UX.md §5.1's "Step 1 alone must be
// submittable" principle) — everything else narrows the requirement but
// isn't a blocker.
export const rfqFormSchema = z.object({
  organization: z.string().trim().min(2, "Enter your organization name"),
  contactPerson: z.string().trim().min(2, "Enter the contact person's name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phonePattern, "Enter a valid phone number"),
  projectName: z.string().trim().min(2, "Enter a project or requirement name"),
  industry: z.enum(rfqIndustries).optional(),
  budgetRange: z.enum(budgetRanges).optional(),
  timeline: z.enum(timelines).optional(),
  productsRequired: z.array(z.string()),
  solutionsRequired: z.array(z.string()),
  brandsPreferred: z.string().trim().optional(),
  additionalRequirements: z.string().trim().optional(),
});

export type RFQFormValues = z.infer<typeof rfqFormSchema>;

export const rfqFormDefaults: RFQFormValues = {
  organization: "",
  contactPerson: "",
  email: "",
  phone: "",
  projectName: "",
  industry: undefined,
  budgetRange: undefined,
  timeline: undefined,
  productsRequired: [],
  solutionsRequired: [],
  brandsPreferred: "",
  additionalRequirements: "",
};
