"use server";

import { contactFormSchema } from "@/lib/validation/contact";
import { sendEmail } from "@/lib/email";

export type ContactActionResult = { success: true } | { success: false; error: string };

// Re-validates server-side (never trust client validation alone) before
// handing off to the email architecture stub. Returns a generic error
// message rather than exposing schema internals to the client.
export async function submitContactForm(values: unknown): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the highlighted fields and try again." };
  }

  const { fullName, organization, subject, department, message } = parsed.data;

  await sendEmail({
    to: process.env.CONTACT_RECIPIENT_EMAIL,
    subject: `[Contact] ${subject} — ${department}`,
    body: `From: ${fullName} (${organization})\n\n${message}`,
  });

  return { success: true };
}
