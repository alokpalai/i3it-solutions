import {
  mockRfqRecords,
  mockQuoteRecords,
  mockPurchaseOrders,
  mockStock,
  mockWarrantyRecords,
  mockLibraryDocuments,
  mockProducts,
  getVendorById,
  type MockStockItem,
} from "@/config/procurementMockData";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Stock
// ---------------------------------------------------------------------------

export function availableStock(stock: MockStockItem): number {
  return Math.max(0, stock.quantity - stock.reserved);
}

export type StockLevel = "Out of Stock" | "Low" | "OK";

export function stockLevel(stock: MockStockItem): StockLevel {
  const available = availableStock(stock);
  if (available <= 0) return "Out of Stock";
  if (available < stock.minimumStock) return "Low";
  return "OK";
}

const LOW_STOCK_STATUSES: StockLevel[] = ["Low", "Out of Stock"];

export function isLowStock(stock: MockStockItem): boolean {
  return LOW_STOCK_STATUSES.includes(stockLevel(stock));
}

// ---------------------------------------------------------------------------
// Warranty
// ---------------------------------------------------------------------------

export type WarrantyStatus = "Active" | "Expiring Soon" | "Expired";

const EXPIRING_SOON_WINDOW_DAYS = 30;

// Computed from expiryDate vs "today" rather than stored, so it never
// drifts from the actual date — same reasoning as
// src/lib/projectMetrics.ts's daysRemaining().
export function warrantyStatus(expiryDate: string, today: Date = new Date()): WarrantyStatus {
  const daysRemaining = Math.round((new Date(expiryDate).getTime() - today.getTime()) / 86_400_000);
  if (daysRemaining < 0) return "Expired";
  if (daysRemaining <= EXPIRING_SOON_WINDOW_DAYS) return "Expiring Soon";
  return "Active";
}

// ---------------------------------------------------------------------------
// Procurement dashboard KPIs
// ---------------------------------------------------------------------------

const OPEN_RFQ_STATUSES = ["Draft", "Pending", "Vendor Requested", "Quotation Received"];
const PENDING_QUOTE_STATUSES = ["Sent", "Under Review"];
const OPEN_PO_STATUSES = ["Draft", "Sent", "Acknowledged", "In Progress", "Partially Delivered"];
const UPCOMING_DELIVERY_WINDOW_DAYS = 30;

export function procurementDashboardKpis(today: Date = new Date()) {
  const openRfqs = mockRfqRecords.filter((rfq) => OPEN_RFQ_STATUSES.includes(rfq.status)).length;
  const pendingQuotations = mockQuoteRecords.filter((quote) => PENDING_QUOTE_STATUSES.includes(quote.status)).length;
  const purchaseOrders = mockPurchaseOrders.filter((po) => OPEN_PO_STATUSES.includes(po.status)).length;
  const lowStockItems = mockStock.filter(isLowStock).length;

  const deliveries = mockPurchaseOrders.filter((po) => {
    if (!OPEN_PO_STATUSES.includes(po.status)) return false;
    const daysUntil = Math.round((new Date(po.expectedDelivery).getTime() - today.getTime()) / 86_400_000);
    return daysUntil >= 0 && daysUntil <= UPCOMING_DELIVERY_WINDOW_DAYS;
  }).length;

  const warrantyExpiring = mockWarrantyRecords.filter((record) => warrantyStatus(record.expiryDate, today) === "Expiring Soon").length;

  return { openRfqs, pendingQuotations, purchaseOrders, lowStockItems, deliveries, warrantyExpiring };
}

export function recentDocuments(limit = 5) {
  return [...mockLibraryDocuments].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)).slice(0, limit);
}

export type VendorActivityEntry = {
  vendorId: string;
  vendorName: string;
  label: string;
  timestamp: string;
};

/** "Recent Vendor Activity" — derived from quotations and purchase
 * orders (both already timestamped) rather than a fifth hand-authored
 * activity log that would inevitably drift from the records it
 * describes. */
export function recentVendorActivity(limit = 6): VendorActivityEntry[] {
  const fromQuotes: VendorActivityEntry[] = mockQuoteRecords.map((quote) => ({
    vendorId: quote.vendorId,
    vendorName: getVendorById(quote.vendorId)?.company ?? quote.vendorId,
    label: `Sent quotation ${quote.quoteNumber} (${quote.status})`,
    timestamp: quote.createdAt,
  }));
  const fromPos: VendorActivityEntry[] = mockPurchaseOrders.map((po) => ({
    vendorId: po.vendorId,
    vendorName: getVendorById(po.vendorId)?.company ?? po.vendorId,
    label: `Purchase order ${po.poNumber} — ${po.status}`,
    timestamp: po.orderDate,
  }));
  return [...fromQuotes, ...fromPos].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, limit);
}

export function getPurchaseOrdersByVendor(vendorId: string) {
  return mockPurchaseOrders.filter((po) => po.vendorId === vendorId);
}

export function getQuotesByVendor(vendorId: string) {
  return mockQuoteRecords.filter((quote) => quote.vendorId === vendorId);
}

export function getProductsByVendor(vendorId: string) {
  return mockProducts.filter((product) => product.vendorId === vendorId);
}

export { getProductById, getVendorById, getStockByProductId } from "@/config/procurementMockData";
