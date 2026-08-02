"use server";

import { rfqFormSchema } from "@/lib/validation/rfq";
import { sendEmail } from "@/lib/email";

export type RFQActionResult = { success: true } | { success: false; error: string };

export async function submitRfqForm(values: unknown): Promise<RFQActionResult> {
  const parsed = rfqFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the highlighted fields and try again." };
  }

  const { organization, contactPerson, projectName, productsRequired, solutionsRequired } = parsed.data;

  await sendEmail({
    to: process.env.RFQ_RECIPIENT_EMAIL,
    subject: `[RFQ] ${projectName} — ${organization}`,
    body: `Contact: ${contactPerson}\nProducts: ${productsRequired.join(", ") || "—"}\nSolutions: ${solutionsRequired.join(", ") || "—"}`,
  });

  return { success: true };
}
