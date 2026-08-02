import { primaryNav, type NavLink, type NavColumn } from "@/config/navigation";

// Small shared helpers so internal-page routes can derive their content
// from src/config/navigation.ts (the single source of truth) instead of
// re-declaring route lists — mirrors the pattern already used in
// src/config/homepage.ts for Featured Solutions/Products.
export function getMegaMenuItems(label: string): NavLink[] {
  const item = primaryNav.find((navItem) => navItem.label === label);
  return item?.menu?.kind === "mega" ? item.menu.columns.flatMap((c) => c.items) : [];
}

// Returns the mega menu's columns as-is (heading + items), for pages that
// want to present the same grouping the mega menu uses rather than a flat
// list — e.g. the Solutions landing page's "Solution categories" section.
export function getMegaMenuColumns(label: string): NavColumn[] {
  const item = primaryNav.find((navItem) => navItem.label === label);
  return item?.menu?.kind === "mega" ? item.menu.columns : [];
}

export function getSimpleMenuItems(label: string): NavLink[] {
  const item = primaryNav.find((navItem) => navItem.label === label);
  return item?.menu?.kind === "simple" ? item.menu.items : [];
}

export function slugFromHref(href: string, basePath: string): string {
  return href.startsWith(`${basePath}/`) ? href.slice(basePath.length + 1) : href;
}
