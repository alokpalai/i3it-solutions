"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validation/auth";
import { resetPassword } from "@/lib/actions/auth";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/auth/PasswordField";
import { ErrorMessage } from "@/components/contact/ErrorMessage";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    setSubmitError(null);
    const result = await resetPassword(values);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    router.push("/login?reset=success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitError && <ErrorMessage title="Couldn't reset your password" description={submitError} />}
      <input type="hidden" {...register("token")} />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" required>
          New password
        </Label>
        <PasswordField
          id="password"
          autoComplete="new-password"
          showStrength
          invalid={!!errors.password}
          value={watch("password")}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
        <FieldError id="password-error" message={errors.password?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword" required>
          Confirm new password
        </Label>
        <PasswordField
          id="confirmPassword"
          autoComplete="new-password"
          invalid={!!errors.confirmPassword}
          value={watch("confirmPassword")}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
          {...register("confirmPassword")}
        />
        <FieldError id="confirmPassword-error" message={errors.confirmPassword?.message} />
      </div>

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Resetting…" : "Reset password"}
      </Button>
    </form>
  );
}
