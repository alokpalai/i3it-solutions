"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordValues } from "@/lib/validation/auth";
import { changePassword } from "@/lib/actions/auth";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/auth/PasswordField";
import { SuccessMessage } from "@/components/contact/SuccessMessage";
import { ErrorMessage } from "@/components/contact/ErrorMessage";

export function ChangePasswordForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = async (values: ChangePasswordValues) => {
    setSubmitError(null);
    setSuccess(false);
    const result = await changePassword(values);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    setSuccess(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitError && <ErrorMessage title="Couldn't change your password" description={submitError} />}
      {success && (
        <SuccessMessage title="Password changed" description="Your password was updated successfully." />
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="currentPassword" required>
          Current password
        </Label>
        <PasswordField
          id="currentPassword"
          autoComplete="current-password"
          invalid={!!errors.currentPassword}
          value={watch("currentPassword")}
          aria-describedby={errors.currentPassword ? "currentPassword-error" : undefined}
          {...register("currentPassword")}
        />
        <FieldError id="currentPassword-error" message={errors.currentPassword?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="newPassword" required>
          New password
        </Label>
        <PasswordField
          id="newPassword"
          autoComplete="new-password"
          showStrength
          invalid={!!errors.newPassword}
          value={watch("newPassword")}
          aria-describedby={errors.newPassword ? "newPassword-error" : undefined}
          {...register("newPassword")}
        />
        <FieldError id="newPassword-error" message={errors.newPassword?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmNewPassword" required>
          Confirm new password
        </Label>
        <PasswordField
          id="confirmNewPassword"
          autoComplete="new-password"
          invalid={!!errors.confirmNewPassword}
          value={watch("confirmNewPassword")}
          aria-describedby={errors.confirmNewPassword ? "confirmNewPassword-error" : undefined}
          {...register("confirmNewPassword")}
        />
        <FieldError id="confirmNewPassword-error" message={errors.confirmNewPassword?.message} />
      </div>

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-fit">
        {isSubmitting ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
