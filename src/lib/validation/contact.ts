import { z } from "zod";

// Phase 3G brief's exact dropdown option sets — not invented.
export const organizationTypes = [
  "Government Department",
  "PSU",
  "Educational Institution",
  "Corporate",
  "Healthcare",
  "Smart City",
  "Defence",
  "OEM",
  "System Integrator",
  "Other",
] as const;

export const departments = [
  "Sales",
  "Government Procurement",
  "Technical Support",
  "Projects",
  "Partnership",
  "Accounts",
  "General Enquiry",
] as const;

export const preferredContactMethods = ["Email", "Phone"] as const;

const phonePattern = /^[0-9+()\-\s]{7,15}$/;

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  organization: z.string().trim().min(2, "Enter your organization name"),
  designation: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phonePattern, "Enter a valid phone number"),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().trim().min(2, "Enter your state"),
  organizationType: z.enum(organizationTypes),
  subject: z.string().trim().min(3, "Enter a subject"),
  department: z.enum(departments),
  message: z.string().trim().min(10, "Enter a message (at least 10 characters)"),
  preferredContactMethod: z.enum(preferredContactMethods),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must agree before submitting",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaults: ContactFormValues = {
  fullName: "",
  organization: "",
  designation: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  organizationType: "Corporate",
  subject: "",
  department: "General Enquiry",
  message: "",
  preferredContactMethod: "Email",
  consent: false,
};
