import type { LucideIcon } from "lucide-react";
import { FeatureItem } from "./FeatureItem";

export type FeatureGridItem = {
  title: string;
  description?: string;
  href?: string;
  icon?: LucideIcon;
};

type FeatureGridProps = {
  items: FeatureGridItem[];
  columns?: 2 | 3;
};

// Responsive grid of FeatureItems, separated by generous whitespace rather
// than borders/cards. Used for category listings (Solutions/Products/
// Government overview pages) where the sub-items are the known, finite,
// non-fabricated set already defined in src/config/navigation.ts.
export function FeatureGrid({ items, columns = 2 }: FeatureGridProps) {
  return (
    <div
      className={`grid gap-x-10 gap-y-6 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {items.map((item) => (
        <FeatureItem key={item.href ?? item.title} {...item} />
      ))}
    </div>
  );
}
