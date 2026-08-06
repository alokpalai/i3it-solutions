"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";
import { loginAction } from "@/lib/actions/auth";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/auth/PasswordField";
import { ErrorMessage } from "@/components/contact/ErrorMessage";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (values: LoginValues) => {
    setSubmitError(null);
    const result = await loginAction(values);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitError && <ErrorMessage title="Couldn't sign you in" description={submitError} />}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" required>
            Password
          </Label>
          <Link href="/forgot-password" className="text-caption font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <PasswordField
          id="password"
          autoComplete="current-password"
          invalid={!!errors.password}
          value={watch("password")}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
        <FieldError id="password-error" message={errors.password?.message} />
      </div>

      <label className="flex items-center gap-2">
        <Checkbox {...register("remember")} />
        <span className="text-body-sm text-foreground">Remember me</span>
      </label>

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in…" : "Log in"}
      </Button>
    </form>
  );
}
