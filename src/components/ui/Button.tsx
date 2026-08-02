import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-button " +
  "transition-colors duration-150 ease-out disabled:cursor-not-allowed " +
  "disabled:opacity-45 aria-disabled:cursor-not-allowed aria-disabled:opacity-45";

// docs/DESIGN_SYSTEM.md §6 defines exactly four variants. "Secondary" is
// already the outline treatment (white fill, navy border+text) — no
// separate "outline" variant is added to avoid duplicating it.
const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "border border-primary text-primary bg-transparent hover:bg-surface-muted active:bg-surface-muted",
  accent:
    "bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-active",
  ghost: "text-primary bg-transparent hover:bg-surface-muted active:bg-surface-muted",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-12 px-8",
};

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 motion-safe:animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        href={href}
        className={classes}
        aria-disabled={loading || undefined}
      >
        {loading && <Spinner />}
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      className={classes}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
