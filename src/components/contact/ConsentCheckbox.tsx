import { forwardRef } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldError } from "@/components/ui/FieldError";

type ConsentCheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
  errorMessage?: string;
  errorId: string;
};

// No link to a not-yet-built Privacy Policy page — the consent statement
// stays self-contained rather than pointing at a route that doesn't exist
// yet (Phase 3G brief: "no dead links").
export const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(
  function ConsentCheckbox({ invalid, errorMessage, errorId, ...props }, ref) {
    return (
      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3">
          <Checkbox
            ref={ref}
            invalid={invalid}
            aria-describedby={errorMessage ? errorId : undefined}
            {...props}
          />
          <span className="text-body-sm text-muted-foreground">
            I consent to i3it Solutions contacting me regarding this enquiry using the details
            provided above.
          </span>
        </label>
        <FieldError id={errorId} message={errorMessage} />
      </div>
    );
  },
);
