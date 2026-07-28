import { primaryNav, type NavLink } from "@/config/navigation";

// Small shared helpers so internal-page routes can derive their content
// from src/config/navigation.ts (the single source of truth) instead of
// re-declaring route lists — mirrors the pattern already used in
// src/config/homepage.ts for Featured Solutions/Products.
export function getMegaMenuItems(label: string): NavLink[] {
  const item = primaryNav.find((navItem) => navItem.label === label);
  return item?.menu?.kind === "mega" ? item.menu.columns.flatMap((c) => c.items) : [];
}

export function getSimpleMenuItems(label: string): NavLink[] {
  const item = primaryNav.find((navItem) => navItem.label === label);
  return item?.menu?.kind === "simple" ? item.menu.items : [];
}

export function slugFromHref(href: string, basePath: string): string {
  return href.startsWith(`${basePath}/`) ? href.slice(basePath.length + 1) : href;
}
