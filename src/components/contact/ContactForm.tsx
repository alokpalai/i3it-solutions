"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import {
  contactFormSchema,
  contactFormDefaults,
  organizationTypes,
  departments,
  preferredContactMethods,
  type ContactFormValues,
} from "@/lib/validation/contact";
import { submitContactForm } from "@/lib/actions/contact";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Button } from "@/components/ui/Button";
import { ConsentCheckbox } from "@/components/contact/ConsentCheckbox";
import { ErrorMessage } from "@/components/contact/ErrorMessage";

// Client Component — the one genuinely required by this phase's brief
// ("Client Components only where forms require them"). Validates with the
// same Zod schema client- and server-side (src/lib/actions/contact.ts),
// and submits through a Server Action rather than a hand-rolled fetch/API
// route, per Next.js's own recommended pattern for this Next.js version.
export function ContactForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaults,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    const result = await submitContactForm(values);
    if (result.success) {
      router.push("/contact/thank-you");
      return;
    }
    setSubmitError(result.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitError && <ErrorMessage title="Your enquiry couldn't be submitted" description={submitError} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName" required>Full Name</Label>
          <Input id="fullName" invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")} />
          <FieldError id="fullName-error" message={errors.fullName?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="organization" required>Organization</Label>
          <Input id="organization" invalid={!!errors.organization} aria-describedby={errors.organization ? "organization-error" : undefined} {...register("organization")} />
          <FieldError id="organization-error" message={errors.organization?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="designation">Designation</Label>
          <Input id="designation" {...register("designation")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" required>Phone Number</Label>
          <Input id="phone" type="tel" invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city" required>City</Label>
            <Input id="city" invalid={!!errors.city} aria-describedby={errors.city ? "city-error" : undefined} {...register("city")} />
            <FieldError id="city-error" message={errors.city?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="state" required>State</Label>
            <Input id="state" invalid={!!errors.state} aria-describedby={errors.state ? "state-error" : undefined} {...register("state")} />
            <FieldError id="state-error" message={errors.state?.message} />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="organizationType" required>Organization Type</Label>
          <Select id="organizationType" invalid={!!errors.organizationType} {...register("organizationType")}>
            {organizationTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="department" required>Department</Label>
          <Select id="department" invalid={!!errors.department} {...register("department")}>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject" required>Subject</Label>
        <Input id="subject" invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} {...register("subject")} />
        <FieldError id="subject-error" message={errors.subject?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" required>Message</Label>
        <Textarea id="message" invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="attachment">Attachment (optional)</Label>
        {/* Captured client-side only — no file storage backend exists yet
            (architecture-only per the phase brief). Wiring this up means
            adding the file to the Server Action call once storage exists. */}
        <label
          htmlFor="attachment"
          className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-4 text-body-sm text-muted-foreground hover:border-secondary"
        >
          <Paperclip aria-hidden="true" className="h-4 w-4 shrink-0" />
          {attachmentName ?? "Choose a file"}
        </label>
        <input
          id="attachment"
          type="file"
          className="sr-only"
          onChange={(event) => setAttachmentName(event.target.files?.[0]?.name ?? null)}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-foreground">Preferred Contact Method</legend>
        <div className="flex gap-6">
          {preferredContactMethods.map((method) => (
            <label key={method} className="flex items-center gap-2 text-body-sm text-foreground">
              <input type="radio" value={method} className="h-4 w-4" style={{ accentColor: "var(--color-primary)" }} {...register("preferredContactMethod")} />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <ConsentCheckbox
        errorId="consent-error"
        invalid={!!errors.consent}
        errorMessage={errors.consent?.message}
        {...register("consent")}
      />

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full sm:w-fit">
        {isSubmitting ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
}
