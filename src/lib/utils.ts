type ClassValue = string | number | null | boolean | undefined;

/**
 * Minimal class-list joiner (falsy values dropped). No Tailwind conflict
 * resolution yet — components here use discrete, non-overlapping variant
 * class strings, so tailwind-merge isn't justified. Swap in clsx +
 * tailwind-merge later without changing call sites if that changes.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
