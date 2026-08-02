"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import {
  rfqFormSchema,
  rfqFormDefaults,
  rfqIndustries,
  budgetRanges,
  timelines,
  type RFQFormValues,
} from "@/lib/validation/rfq";
import { submitRfqForm } from "@/lib/actions/rfq";
import { getMegaMenuItems } from "@/lib/nav";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/contact/ErrorMessage";

const productOptions = getMegaMenuItems("Products").map((item) => item.label);
const solutionOptions = getMegaMenuItems("Solutions").map((item) => item.label);

// Only Organization, Contact Person, Email, Phone and Project Name are
// required — docs/UX.md §5.1: "Step 1 alone must be submittable" for a
// time-pressured procurement officer. Everything else narrows the
// requirement without blocking submission.
export function RFQForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RFQFormValues>({
    resolver: zodResolver(rfqFormSchema),
    defaultValues: rfqFormDefaults,
  });

  const onSubmit = async (values: RFQFormValues) => {
    setSubmitError(null);
    const result = await submitRfqForm(values);
    if (result.success) {
      router.push("/contact/thank-you");
      return;
    }
    setSubmitError(result.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {submitError && <ErrorMessage title="Your RFQ couldn't be submitted" description={submitError} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="organization" required>Organization</Label>
          <Input id="organization" invalid={!!errors.organization} aria-describedby={errors.organization ? "organization-error" : undefined} {...register("organization")} />
          <FieldError id="organization-error" message={errors.organization?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contactPerson" required>Contact Person</Label>
          <Input id="contactPerson" invalid={!!errors.contactPerson} aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined} {...register("contactPerson")} />
          <FieldError id="contactPerson-error" message={errors.contactPerson?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" required>Phone</Label>
          <Input id="phone" type="tel" invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="projectName" required>Project Name</Label>
        <Input id="projectName" invalid={!!errors.projectName} aria-describedby={errors.projectName ? "projectName-error" : undefined} {...register("projectName")} />
        <FieldError id="projectName-error" message={errors.projectName?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="industry">Industry</Label>
          <Select id="industry" {...register("industry")}>
            <option value="">Select…</option>
            {rfqIndustries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="budgetRange">Budget Range</Label>
          <Select id="budgetRange" {...register("budgetRange")}>
            <option value="">Select…</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="timeline">Timeline</Label>
          <Select id="timeline" {...register("timeline")}>
            <option value="">Select…</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>{timeline}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-body-sm font-medium text-foreground">Products Required</legend>
          <Controller
            control={control}
            name="productsRequired"
            render={({ field }) => (
              <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto rounded-md border border-border p-3">
                {productOptions.map((label) => (
                  <label key={label} className="flex items-center gap-2 text-body-sm text-foreground">
                    <input
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded-sm border border-border"
                      style={{ accentColor: "var(--color-primary)" }}
                      checked={field.value.includes(label)}
                      onChange={(event) => {
                        field.onChange(
                          event.target.checked
                            ? [...field.value, label]
                            : field.value.filter((item) => item !== label),
                        );
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            )}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-body-sm font-medium text-foreground">Solutions Required</legend>
          <Controller
            control={control}
            name="solutionsRequired"
            render={({ field }) => (
              <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto rounded-md border border-border p-3">
                {solutionOptions.map((label) => (
                  <label key={label} className="flex items-center gap-2 text-body-sm text-foreground">
                    <input
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded-sm border border-border"
                      style={{ accentColor: "var(--color-primary)" }}
                      checked={field.value.includes(label)}
                      onChange={(event) => {
                        field.onChange(
                          event.target.checked
                            ? [...field.value, label]
                            : field.value.filter((item) => item !== label),
                        );
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            )}
          />
        </fieldset>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brandsPreferred">Brands Preferred</Label>
        <Input id="brandsPreferred" placeholder="e.g. HP, Cisco, Samsung" {...register("brandsPreferred")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="additionalRequirements">Additional Requirements</Label>
        <Textarea id="additionalRequirements" {...register("additionalRequirements")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rfq-attachment">Attachments (optional)</Label>
        <label
          htmlFor="rfq-attachment"
          className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-4 text-body-sm text-muted-foreground hover:border-secondary"
        >
          <Paperclip aria-hidden="true" className="h-4 w-4 shrink-0" />
          {attachmentName ?? "Choose a file"}
        </label>
        <input
          id="rfq-attachment"
          type="file"
          className="sr-only"
          onChange={(event) => setAttachmentName(event.target.files?.[0]?.name ?? null)}
        />
      </div>

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full sm:w-fit">
        {isSubmitting ? "Submitting…" : "Submit RFQ"}
      </Button>
    </form>
  );
}
