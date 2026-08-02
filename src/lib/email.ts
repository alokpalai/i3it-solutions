export type EmailPayload = {
  to: string | undefined;
  subject: string;
  body: string;
};

export type EmailResult = { delivered: boolean };

// Backend-ready integration point for a transactional email provider
// (Resend or Nodemailer both fit this signature) — Phase 3G brief:
// "prepare backend-ready architecture... do not implement production
// credentials." No API key or SMTP credential is configured anywhere in
// this codebase; wiring up a real provider means replacing the body of
// this one function, not changing any caller.
//
// `to` is read from an environment variable at the call site rather than
// hardcoded here — no email address is invented (docs/DECISIONS.md A13).
// Until EMAIL_PROVIDER and a real recipient are both set, this only logs
// server-side so form submissions can be developed and tested end-to-end
// without a live mail backend.
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const provider = process.env.EMAIL_PROVIDER; // "resend" | "nodemailer", unset today

  if (!provider || !payload.to) {
    console.log("[email] Not yet configured — enquiry captured, not sent.", {
      subject: payload.subject,
    });
    return { delivered: false };
  }

  // Real Resend/Nodemailer calls go here once EMAIL_PROVIDER and the
  // matching credentials (RESEND_API_KEY, or SMTP_HOST/SMTP_USER/SMTP_PASS
  // for Nodemailer) are set in the deployment environment.
  console.log(`[email] Provider "${provider}" configured but not yet implemented.`);
  return { delivered: false };
}
