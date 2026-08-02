type FieldErrorProps = {
  id: string;
  message?: string;
};

// Associated with its input via aria-describedby (see Input/Select/Textarea)
// so assistive tech announces the error when the field receives focus —
// the standard accessible pattern, rather than a page-wide role="alert"
// firing per keystroke.
export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} className="text-caption text-error">
      {message}
    </p>
  );
}
