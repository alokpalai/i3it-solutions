import {
  LayoutDashboard,
  ClipboardList,
  ReceiptText,
  ShoppingCart,
  Truck,
  Warehouse,
  Package,
  Tags,
  Boxes,
  FolderOpen,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import type { SectionTabItem } from "@/components/dashboard/SectionTabNav";

export const procurementNavItems: SectionTabItem[] = [
  { label: "Dashboard", href: "/dashboard/procurement", icon: LayoutDashboard },
  { label: "RFQs", href: "/dashboard/procurement/rfq", icon: ClipboardList },
  { label: "Quotations", href: "/dashboard/procurement/quotations", icon: ReceiptText },
  { label: "Purchase Orders", href: "/dashboard/procurement/purchase-orders", icon: ShoppingCart },
  { label: "Vendors", href: "/dashboard/procurement/vendors", icon: Truck },
];

export const inventoryNavItems: SectionTabItem[] = [
  { label: "Overview", href: "/dashboard/inventory", icon: Warehouse },
  { label: "Products", href: "/dashboard/inventory/products", icon: Package },
  { label: "Categories", href: "/dashboard/inventory/categories", icon: Tags },
  { label: "Stock", href: "/dashboard/inventory/stock", icon: Boxes },
];

export const documentsNavItems: SectionTabItem[] = [
  { label: "Library", href: "/dashboard/documents", icon: FolderOpen },
  { label: "Contracts", href: "/dashboard/documents/contracts", icon: ScrollText },
  { label: "Invoices", href: "/dashboard/documents/invoices", icon: ReceiptText },
  { label: "Warranty", href: "/dashboard/documents/warranty", icon: ShieldCheck },
];
