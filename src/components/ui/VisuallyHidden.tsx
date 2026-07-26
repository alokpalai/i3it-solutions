type VisuallyHiddenProps = {
  children: React.ReactNode;
  as?: "span" | "div";
};

/** Content for assistive technology only — never visually revealed
 * (contrast with the skip link, which reveals on focus). Use for icon-only
 * control labels once those exist. */
export function VisuallyHidden({ children, as: Tag = "span" }: VisuallyHiddenProps) {
  return <Tag className="sr-only">{children}</Tag>;
}
