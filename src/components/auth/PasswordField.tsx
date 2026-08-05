"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type PasswordFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
  /** Renders a live strength meter under the field — pass the field's
   * current value (RHF's watch()) so it updates as the user types. Used
   * on Reset Password / Change Password, not Login (a strength meter on a
   * login field would be meaningless and mildly insulting). */
  showStrength?: boolean;
};

function getStrength(password: string): { score: number; label: string } {
  let score = 0;
  if (password.length >= 10) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: password.length === 0 ? "" : labels[Math.max(score - 1, 0)] };
}

function strengthColor(score: number): string {
  if (score <= 2) return "bg-error";
  if (score <= 3) return "bg-warning";
  return "bg-success";
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
  { invalid, showStrength, value, className, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const strength = showStrength && typeof value === "string" ? getStrength(value) : null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          invalid={invalid}
          value={value}
          className={cn("pr-11", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          {visible ? (
            <EyeOff aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Eye aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>
      {strength && strength.label && (
        <div className="flex flex-col gap-1">
          <div className="flex gap-1" role="presentation">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className={cn(
                  "h-1 flex-1 rounded-full",
                  i < strength.score ? strengthColor(strength.score) : "bg-border",
                )}
              />
            ))}
          </div>
          <p className="text-caption text-muted-foreground">{strength.label}</p>
        </div>
      )}
    </div>
  );
});
