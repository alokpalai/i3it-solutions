// Mock data for the Procurement, Inventory & Document Management module —
// Phase 4E brief. Same footing as dashboardMockData.ts/crmMockData.ts:
// deliberately fictional demo content for an authenticated internal
// tool, not a public-facing claim (docs/CONTENT_STRATEGY.md governs
// public pages, not this). Vendors and product brands are invented
// generic names, never real companies — same rule as every other mock
// dataset in this codebase (docs/DECISIONS.md A13).
//
// No Prisma models exist yet for any entity below — same "architecture,
// not wired to a backend" status Projects/CRM were on before their own
// eventual migrations.
//
// Cross-linked with dashboardMockData.ts's mockProjects/mockUsers (both
// committed on main) so an RFQ/PO/warranty record can trace back to the
// project it equipped. NOT linked to src/config/crmMockData.ts — that
// module belongs to the not-yet-committed Phase 4D branch and doesn't
// exist here; RFQ/Quotation "Client" fields use plain strings (the same
// convention dashboardMockData.ts's own mockRfqs already uses) rather
// than importing an organization id that wouldn't resolve on this branch.

import { mockUsers, mockProjects, type MockUser, type Priority } from "@/config/dashboardMockData";

export const procurementCategories = [
  "Computing",
  "Servers",
  "Storage",
  "Networking",
  "Surveillance & Security",
  "Collaboration & Display",
  "Power Backup",
  "Software",
] as const;
export type ProcurementCategory = (typeof procurementCategories)[number];

const procurementLead: MockUser = mockUsers.find((user) => user.role === "Procurement") ?? mockUsers[2];

// ---------------------------------------------------------------------------
// Vendors
// ---------------------------------------------------------------------------

export type MockVendor = {
  id: string;
  company: string;
  primaryContact: string;
  email: string;
  phone: string;
  gst: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  categories: ProcurementCategory[];
  performanceRating: number; // 1-5, mock
  notes?: string;
};

export const mockVendors: MockVendor[] = [
  { id: "v1", company: "Apex Computing Distributors", primaryContact: "Sanjay Kulkarni", email: "sanjay.kulkarni@example-apexcomputing.com", phone: "+91 98110 20011", gst: "GSTIN-VENDOR-01", pan: "PAN-VENDOR-01", address: "Plot 14, MIDC Industrial Area", city: "Mumbai", state: "Maharashtra", categories: ["Computing", "Servers"], performanceRating: 4.4 },
  { id: "v2", company: "Silverline Storage Solutions", primaryContact: "Priyanka Deshmukh", email: "priyanka.deshmukh@example-silverlinestorage.com", phone: "+91 98220 30022", gst: "GSTIN-VENDOR-02", pan: "PAN-VENDOR-02", address: "Tech Park, Hinjewadi Phase 2", city: "Pune", state: "Maharashtra", categories: ["Storage", "Servers"], performanceRating: 4.1 },
  { id: "v3", company: "NetCore Networking Pvt Ltd", primaryContact: "Arvind Nair", email: "arvind.nair@example-netcorenetworking.com", phone: "+91 98330 40033", gst: "GSTIN-VENDOR-03", pan: "PAN-VENDOR-03", address: "Electronics City Phase 1", city: "Bengaluru", state: "Karnataka", categories: ["Networking"], performanceRating: 4.7 },
  { id: "v4", company: "Visionary Surveillance Systems", primaryContact: "Harpreet Kaur", email: "harpreet.kaur@example-visionarysurveillance.com", phone: "+91 98440 50044", gst: "GSTIN-VENDOR-04", pan: "PAN-VENDOR-04", address: "Okhla Industrial Estate, Phase 3", city: "New Delhi", state: "Delhi", categories: ["Surveillance & Security"], performanceRating: 4.3 },
  { id: "v5", company: "Prime Collaboration Technologies", primaryContact: "Farhan Ahmed", email: "farhan.ahmed@example-primecollab.com", phone: "+91 98550 60055", gst: "GSTIN-VENDOR-05", pan: "PAN-VENDOR-05", address: "HITEC City, Madhapur", city: "Hyderabad", state: "Telangana", categories: ["Collaboration & Display"], performanceRating: 4.5 },
  { id: "v6", company: "SteadyPower Backup Solutions", primaryContact: "Muthu Krishnan", email: "muthu.krishnan@example-steadypower.com", phone: "+91 98660 70066", gst: "GSTIN-VENDOR-06", pan: "PAN-VENDOR-06", address: "Ambattur Industrial Estate", city: "Chennai", state: "Tamil Nadu", categories: ["Power Backup"], performanceRating: 3.9 },
  { id: "v7", company: "Nexus Software Licensing", primaryContact: "Ritika Chawla", email: "ritika.chawla@example-nexuslicensing.com", phone: "+91 98770 80077", gst: "GSTIN-VENDOR-07", pan: "PAN-VENDOR-07", address: "Baner Road, Business Bay", city: "Pune", state: "Maharashtra", categories: ["Software"], performanceRating: 4.2 },
  { id: "v8", company: "Unified IT Hardware Traders", primaryContact: "Bhavesh Patel", email: "bhavesh.patel@example-unifiedit.com", phone: "+91 98880 90088", gst: "GSTIN-VENDOR-08", pan: "PAN-VENDOR-08", address: "Naroda Industrial Area", city: "Ahmedabad", state: "Gujarat", categories: ["Computing", "Networking", "Storage"], performanceRating: 3.6, notes: "Backup vendor for hardware when primary suppliers are lead-time constrained." },
];

export function getVendorById(id: string): MockVendor | undefined {
  return mockVendors.find((vendor) => vendor.id === id);
}

// ---------------------------------------------------------------------------
// Products (Inventory catalog)
// ---------------------------------------------------------------------------

export type MockProduct = {
  id: string;
  sku: string;
  name: string;
  category: ProcurementCategory;
  brand: string;
  model: string;
  specifications: string;
  /** Placeholder only, per the brief — not a real tracked asset registry. */
  serialNumber: string;
  warrantyMonths: number;
  vendorId: string;
  unitPrice: number;
  associatedProjectIds: string[];
};

export const mockProducts: MockProduct[] = [
  { id: "p1", sku: "SKU-CMP-001", name: "Business Desktop Pro 14", category: "Computing", brand: "CoreTech", model: "CT-BD14", specifications: "Intel Core i5, 16GB RAM, 512GB SSD", serialNumber: "CMP-PLACEHOLDER-001", warrantyMonths: 36, vendorId: "v1", unitPrice: 52_000, associatedProjectIds: [] },
  { id: "p2", sku: "SKU-SRV-001", name: "Rack Server 2U Dual-Socket", category: "Servers", brand: "ServeMax", model: "SM-R2U-48", specifications: "Dual Xeon Silver, 128GB RAM, 8x3.5\" bays", serialNumber: "SRV-PLACEHOLDER-002", warrantyMonths: 60, vendorId: "v1", unitPrice: 485_000, associatedProjectIds: ["proj-1", "proj-4"] },
  { id: "p3", sku: "SKU-SRV-002", name: "Rack Server 1U Entry", category: "Servers", brand: "ServeMax", model: "SM-R1U-16", specifications: "Xeon E-2400, 32GB RAM", serialNumber: "SRV-PLACEHOLDER-003", warrantyMonths: 36, vendorId: "v8", unitPrice: 210_000, associatedProjectIds: ["proj-6"] },
  { id: "p4", sku: "SKU-STG-001", name: "SAN Storage Array 48TB", category: "Storage", brand: "DataVault", model: "DV-SAN-48", specifications: "48TB raw, RAID 6, dual controller", serialNumber: "STG-PLACEHOLDER-004", warrantyMonths: 60, vendorId: "v2", unitPrice: 1_150_000, associatedProjectIds: ["proj-4", "proj-6"] },
  { id: "p5", sku: "SKU-STG-002", name: "NAS Backup Appliance 24TB", category: "Storage", brand: "DataVault", model: "DV-NAS-24", specifications: "24TB raw, 4-bay", serialNumber: "STG-PLACEHOLDER-005", warrantyMonths: 36, vendorId: "v2", unitPrice: 320_000, associatedProjectIds: ["proj-6"] },
  { id: "p6", sku: "SKU-NET-001", name: "Layer 3 Core Switch 48-Port", category: "Networking", brand: "NetCore", model: "NC-L3-48P", specifications: "48x1G + 4x10G SFP+", serialNumber: "NET-PLACEHOLDER-006", warrantyMonths: 60, vendorId: "v3", unitPrice: 185_000, associatedProjectIds: ["proj-1", "proj-5"] },
  { id: "p7", sku: "SKU-NET-002", name: "Wireless Access Point Wi-Fi 6", category: "Networking", brand: "NetCore", model: "NC-AP-6E", specifications: "Wi-Fi 6E, PoE+", serialNumber: "NET-PLACEHOLDER-007", warrantyMonths: 36, vendorId: "v3", unitPrice: 18_500, associatedProjectIds: ["proj-5"] },
  { id: "p8", sku: "SKU-NET-003", name: "Structured Cabling Kit Cat6A", category: "Networking", brand: "NetCore", model: "NC-CAB-C6A", specifications: "305m box, Cat6A UTP", serialNumber: "NET-PLACEHOLDER-008", warrantyMonths: 12, vendorId: "v3", unitPrice: 9_200, associatedProjectIds: ["proj-1"] },
  { id: "p9", sku: "SKU-SEC-001", name: "4MP IP Dome Camera", category: "Surveillance & Security", brand: "VisionGuard", model: "VG-DM4-IR", specifications: "4MP, IR 30m range, PoE", serialNumber: "SEC-PLACEHOLDER-009", warrantyMonths: 24, vendorId: "v4", unitPrice: 8_900, associatedProjectIds: ["proj-3"] },
  { id: "p10", sku: "SKU-SEC-002", name: "NVR 32-Channel", category: "Surveillance & Security", brand: "VisionGuard", model: "VG-NVR-32", specifications: "32-channel, 8-bay", serialNumber: "SEC-PLACEHOLDER-010", warrantyMonths: 24, vendorId: "v4", unitPrice: 62_000, associatedProjectIds: ["proj-3"] },
  { id: "p11", sku: "SKU-SEC-003", name: "Access Control Biometric Panel", category: "Surveillance & Security", brand: "VisionGuard", model: "VG-BIO-100", specifications: "Fingerprint + card, 100k users", serialNumber: "SEC-PLACEHOLDER-011", warrantyMonths: 24, vendorId: "v4", unitPrice: 24_500, associatedProjectIds: [] },
  { id: "p12", sku: "SKU-COL-001", name: "75-inch Interactive Display Panel", category: "Collaboration & Display", brand: "ViewBoard", model: "VB-IP75", specifications: "4K UHD, touch, Android OS", serialNumber: "COL-PLACEHOLDER-012", warrantyMonths: 36, vendorId: "v5", unitPrice: 145_000, associatedProjectIds: ["proj-2"] },
  { id: "p13", sku: "SKU-COL-002", name: "Video Conferencing Bar", category: "Collaboration & Display", brand: "ViewBoard", model: "VB-VCB-200", specifications: "4K camera, speaker + mic array", serialNumber: "COL-PLACEHOLDER-013", warrantyMonths: 24, vendorId: "v5", unitPrice: 68_000, associatedProjectIds: ["proj-2"] },
  { id: "p14", sku: "SKU-PWR-001", name: "Online UPS 10kVA", category: "Power Backup", brand: "SteadyPower", model: "SP-UPS-10K", specifications: "10kVA online double conversion", serialNumber: "PWR-PLACEHOLDER-014", warrantyMonths: 24, vendorId: "v6", unitPrice: 210_000, associatedProjectIds: ["proj-1", "proj-7"] },
  { id: "p15", sku: "SKU-PWR-002", name: "Voltage Stabilizer 15kVA", category: "Power Backup", brand: "SteadyPower", model: "SP-STB-15K", specifications: "15kVA servo-controlled stabilizer", serialNumber: "PWR-PLACEHOLDER-015", warrantyMonths: 24, vendorId: "v6", unitPrice: 68_000, associatedProjectIds: ["proj-7"] },
  { id: "p16", sku: "SKU-SFT-001", name: "Endpoint Security Suite (annual, per seat)", category: "Software", brand: "Nexus", model: "NX-SEC-ANN", specifications: "Annual per-seat license", serialNumber: "SFT-PLACEHOLDER-016", warrantyMonths: 12, vendorId: "v7", unitPrice: 1_850, associatedProjectIds: [] },
];

export function getProductById(id: string): MockProduct | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function getProductsByProject(projectId: string): MockProduct[] {
  return mockProducts.filter((product) => product.associatedProjectIds.includes(projectId));
}

// ---------------------------------------------------------------------------
// Stock (single warehouse, per the brief)
// ---------------------------------------------------------------------------

export const warehouseName = "Main Warehouse — Bhiwandi, Maharashtra";

export type MockStockItem = {
  id: string;
  productId: string;
  quantity: number;
  reserved: number;
  minimumStock: number;
  updatedAt: string;
};

// `available` is deliberately not stored — it's always quantity - reserved,
// computed in src/lib/procurementMetrics.ts, the same "don't hand-author a
// derived number that can drift" reasoning as Projects' health field.
export const mockStock: MockStockItem[] = [
  { id: "s1", productId: "p1", quantity: 40, reserved: 12, minimumStock: 15, updatedAt: "2026-08-04" },
  { id: "s2", productId: "p2", quantity: 6, reserved: 4, minimumStock: 5, updatedAt: "2026-08-03" },
  { id: "s3", productId: "p3", quantity: 10, reserved: 2, minimumStock: 4, updatedAt: "2026-08-02" },
  { id: "s4", productId: "p4", quantity: 3, reserved: 2, minimumStock: 3, updatedAt: "2026-08-05" },
  { id: "s5", productId: "p5", quantity: 8, reserved: 1, minimumStock: 3, updatedAt: "2026-08-01" },
  { id: "s6", productId: "p6", quantity: 14, reserved: 6, minimumStock: 5, updatedAt: "2026-08-04" },
  { id: "s7", productId: "p7", quantity: 60, reserved: 20, minimumStock: 20, updatedAt: "2026-08-02" },
  { id: "s8", productId: "p8", quantity: 25, reserved: 10, minimumStock: 8, updatedAt: "2026-08-01" },
  { id: "s9", productId: "p9", quantity: 5, reserved: 4, minimumStock: 6, updatedAt: "2026-08-05" },
  { id: "s10", productId: "p10", quantity: 6, reserved: 3, minimumStock: 3, updatedAt: "2026-08-05" },
  { id: "s11", productId: "p11", quantity: 2, reserved: 0, minimumStock: 3, updatedAt: "2026-07-30" },
  { id: "s12", productId: "p12", quantity: 4, reserved: 2, minimumStock: 2, updatedAt: "2026-07-28" },
  { id: "s13", productId: "p13", quantity: 5, reserved: 1, minimumStock: 2, updatedAt: "2026-07-28" },
  { id: "s14", productId: "p14", quantity: 3, reserved: 2, minimumStock: 3, updatedAt: "2026-08-03" },
  { id: "s15", productId: "p15", quantity: 6, reserved: 1, minimumStock: 2, updatedAt: "2026-08-03" },
  { id: "s16", productId: "p16", quantity: 500, reserved: 120, minimumStock: 100, updatedAt: "2026-08-01" },
];

export function getStockByProductId(productId: string): MockStockItem | undefined {
  return mockStock.find((stock) => stock.productId === productId);
}

// ---------------------------------------------------------------------------
// RFQs
// ---------------------------------------------------------------------------

export const rfqStatuses = ["Draft", "Pending", "Vendor Requested", "Quotation Received", "Approved", "Rejected", "Closed"] as const;
export type RfqStatus = (typeof rfqStatuses)[number];

export type RfqLineItem = { productName: string; quantity: number };

export type MockRfqRecord = {
  id: string;
  rfqNumber: string;
  client: string;
  projectId?: string;
  items: RfqLineItem[];
  requiredDelivery: string;
  priority: Priority;
  status: RfqStatus;
  assignedTo: MockUser;
  attachments: string[];
  createdAt: string;
  notes?: string;
};

export const mockRfqRecords: MockRfqRecord[] = [
  { id: "rfq-1", rfqNumber: "RFQ-2026-101", client: "State Government Department", projectId: "proj-1", items: [{ productName: "Rack Server 2U Dual-Socket", quantity: 4 }, { productName: "Layer 3 Core Switch 48-Port", quantity: 2 }, { productName: "Online UPS 10kVA", quantity: 2 }], requiredDelivery: "2026-05-15", priority: "High", status: "Approved", assignedTo: procurementLead, attachments: ["RFQ-101-Requirements.pdf"], createdAt: "2026-03-05" },
  { id: "rfq-2", rfqNumber: "RFQ-2026-118", client: "Regional Hospital Network", projectId: "proj-3", items: [{ productName: "4MP IP Dome Camera", quantity: 60 }, { productName: "NVR 32-Channel", quantity: 4 }], requiredDelivery: "2026-08-05", priority: "High", status: "Vendor Requested", assignedTo: procurementLead, attachments: ["Camera-Spec-Sheet.pdf"], createdAt: "2026-07-05" },
  { id: "rfq-3", rfqNumber: "RFQ-2026-122", client: "Metropolitan Municipal Corporation", items: [{ productName: "4MP IP Dome Camera", quantity: 120 }, { productName: "NVR 32-Channel", quantity: 8 }], requiredDelivery: "2026-10-20", priority: "High", status: "Pending", assignedTo: procurementLead, attachments: [], createdAt: "2026-08-01" },
  { id: "rfq-4", rfqNumber: "RFQ-2026-125", client: "National Research Institute", items: [{ productName: "Rack Server 2U Dual-Socket", quantity: 6 }, { productName: "SAN Storage Array 48TB", quantity: 2 }], requiredDelivery: "2026-11-10", priority: "Medium", status: "Quotation Received", assignedTo: procurementLead, attachments: ["Lab-Requirement-Note.docx"], createdAt: "2026-07-28" },
  { id: "rfq-5", rfqNumber: "RFQ-2026-126", client: "Regional IT Services Company", items: [{ productName: "Structured Cabling Kit Cat6A", quantity: 10 }, { productName: "Layer 3 Core Switch 48-Port", quantity: 1 }], requiredDelivery: "2026-10-01", priority: "Medium", status: "Draft", assignedTo: procurementLead, attachments: [], createdAt: "2026-08-03" },
  { id: "rfq-6", rfqNumber: "RFQ-2026-108", client: "Private University", projectId: "proj-2", items: [{ productName: "75-inch Interactive Display Panel", quantity: 40 }, { productName: "Video Conferencing Bar", quantity: 10 }], requiredDelivery: "2026-06-15", priority: "Medium", status: "Approved", assignedTo: procurementLead, attachments: ["Classroom-List.xlsx"], createdAt: "2026-03-20" },
  { id: "rfq-7", rfqNumber: "RFQ-2026-111", client: "Public University Campus", projectId: "proj-5", items: [{ productName: "Wireless Access Point Wi-Fi 6", quantity: 150 }], requiredDelivery: "2026-06-01", priority: "Low", status: "Closed", assignedTo: procurementLead, attachments: [], createdAt: "2026-04-15" },
  { id: "rfq-8", rfqNumber: "RFQ-2026-130", client: "District Cooperative Bank", items: [{ productName: "4MP IP Dome Camera", quantity: 30 }, { productName: "NAS Backup Appliance 24TB", quantity: 2 }], requiredDelivery: "2026-11-30", priority: "Low", status: "Pending", assignedTo: procurementLead, attachments: [], createdAt: "2026-08-04" },
  { id: "rfq-9", rfqNumber: "RFQ-2026-127", client: "Financial Services Client", projectId: "proj-6", items: [{ productName: "SAN Storage Array 48TB", quantity: 2 }, { productName: "Rack Server 1U Entry", quantity: 4 }], requiredDelivery: "2026-09-30", priority: "Urgent", status: "Approved", assignedTo: procurementLead, attachments: ["DR-Site-BOM.pdf"], createdAt: "2026-06-20" },
  { id: "rfq-10", rfqNumber: "RFQ-2026-119", client: "State Power Utility", projectId: "proj-7", items: [{ productName: "Voltage Stabilizer 15kVA", quantity: 8 }, { productName: "Online UPS 10kVA", quantity: 4 }], requiredDelivery: "2026-07-15", priority: "Medium", status: "Rejected", assignedTo: procurementLead, attachments: ["Budget-Rejection-Note.pdf"], createdAt: "2026-05-25", notes: "Rejected pending the utility's next budget cycle." },
];

export function getRfqById(id: string): MockRfqRecord | undefined {
  return mockRfqRecords.find((rfq) => rfq.id === id);
}

// ---------------------------------------------------------------------------
// Quotations
// ---------------------------------------------------------------------------

export const quoteStatuses = ["Draft", "Sent", "Under Review", "Accepted", "Rejected", "Expired"] as const;
export type QuoteStatus = (typeof quoteStatuses)[number];

export type MockQuoteRecord = {
  id: string;
  quoteNumber: string;
  rfqId?: string;
  client: string;
  vendorId: string;
  amount: number;
  validUntil: string;
  status: QuoteStatus;
  assignedTo: MockUser;
  createdAt: string;
};

export const mockQuoteRecords: MockQuoteRecord[] = [
  { id: "q-1", quoteNumber: "QT-2026-201", rfqId: "rfq-4", client: "National Research Institute", vendorId: "v1", amount: 3_350_000, validUntil: "2026-08-31", status: "Sent", assignedTo: procurementLead, createdAt: "2026-08-02" },
  { id: "q-2", quoteNumber: "QT-2026-190", rfqId: "rfq-1", client: "State Government Department", vendorId: "v1", amount: 2_400_000, validUntil: "2026-04-15", status: "Accepted", assignedTo: procurementLead, createdAt: "2026-03-10" },
  { id: "q-3", quoteNumber: "QT-2026-191", rfqId: "rfq-1", client: "State Government Department", vendorId: "v3", amount: 410_000, validUntil: "2026-04-15", status: "Accepted", assignedTo: procurementLead, createdAt: "2026-03-12" },
  { id: "q-4", quoteNumber: "QT-2026-192", rfqId: "rfq-1", client: "State Government Department", vendorId: "v6", amount: 480_000, validUntil: "2026-04-15", status: "Accepted", assignedTo: procurementLead, createdAt: "2026-03-14" },
  { id: "q-5", quoteNumber: "QT-2026-205", rfqId: "rfq-2", client: "Regional Hospital Network", vendorId: "v4", amount: 812_000, validUntil: "2026-08-20", status: "Under Review", assignedTo: procurementLead, createdAt: "2026-07-18" },
  { id: "q-6", quoteNumber: "QT-2026-180", rfqId: "rfq-6", client: "Private University", vendorId: "v5", amount: 6_480_000, validUntil: "2026-04-05", status: "Accepted", assignedTo: procurementLead, createdAt: "2026-03-25" },
  { id: "q-7", quoteNumber: "QT-2026-175", rfqId: "rfq-7", client: "Public University Campus", vendorId: "v3", amount: 2_775_000, validUntil: "2026-05-10", status: "Accepted", assignedTo: procurementLead, createdAt: "2026-04-20" },
  { id: "q-8", quoteNumber: "QT-2026-198", rfqId: "rfq-9", client: "Financial Services Client", vendorId: "v2", amount: 2_860_000, validUntil: "2026-07-10", status: "Accepted", assignedTo: procurementLead, createdAt: "2026-06-25" },
  { id: "q-9", quoteNumber: "QT-2026-188", rfqId: "rfq-10", client: "State Power Utility", vendorId: "v6", amount: 2_144_000, validUntil: "2026-06-20", status: "Rejected", assignedTo: procurementLead, createdAt: "2026-05-28" },
  { id: "q-10", quoteNumber: "QT-2026-206", rfqId: "rfq-3", client: "Metropolitan Municipal Corporation", vendorId: "v4", amount: 1_340_000, validUntil: "2026-09-15", status: "Draft", assignedTo: procurementLead, createdAt: "2026-08-05" },
];

export function getQuoteById(id: string): MockQuoteRecord | undefined {
  return mockQuoteRecords.find((quote) => quote.id === id);
}

// ---------------------------------------------------------------------------
// Purchase Orders
// ---------------------------------------------------------------------------

export const poStatuses = ["Draft", "Sent", "Acknowledged", "In Progress", "Partially Delivered", "Delivered", "Cancelled"] as const;
export type PoStatus = (typeof poStatuses)[number];

export type PoLineItem = { productName: string; quantity: number; unitPrice: number };

export type MockPurchaseOrder = {
  id: string;
  poNumber: string;
  vendorId: string;
  projectId?: string;
  orderDate: string;
  expectedDelivery: string;
  status: PoStatus;
  amount: number;
  items: PoLineItem[];
  notes?: string;
};

export const mockPurchaseOrders: MockPurchaseOrder[] = [
  { id: "po-1", poNumber: "PO-2026-301", vendorId: "v1", projectId: "proj-1", orderDate: "2026-04-16", expectedDelivery: "2026-05-10", status: "Delivered", amount: 1_940_000, items: [{ productName: "Rack Server 2U Dual-Socket", quantity: 4, unitPrice: 485_000 }] },
  { id: "po-2", poNumber: "PO-2026-302", vendorId: "v3", projectId: "proj-1", orderDate: "2026-04-18", expectedDelivery: "2026-05-05", status: "Delivered", amount: 425_200, items: [{ productName: "Layer 3 Core Switch 48-Port", quantity: 2, unitPrice: 185_000 }, { productName: "Structured Cabling Kit Cat6A", quantity: 6, unitPrice: 9_200 }] },
  { id: "po-3", poNumber: "PO-2026-303", vendorId: "v6", projectId: "proj-1", orderDate: "2026-04-20", expectedDelivery: "2026-05-12", status: "Delivered", amount: 420_000, items: [{ productName: "Online UPS 10kVA", quantity: 2, unitPrice: 210_000 }] },
  { id: "po-4", poNumber: "PO-2026-304", vendorId: "v5", projectId: "proj-2", orderDate: "2026-03-28", expectedDelivery: "2026-05-20", status: "Delivered", amount: 5_800_000, items: [{ productName: "75-inch Interactive Display Panel", quantity: 40, unitPrice: 145_000 }] },
  { id: "po-5", poNumber: "PO-2026-305", vendorId: "v5", projectId: "proj-2", orderDate: "2026-03-28", expectedDelivery: "2026-05-20", status: "Delivered", amount: 680_000, items: [{ productName: "Video Conferencing Bar", quantity: 10, unitPrice: 68_000 }] },
  { id: "po-6", poNumber: "PO-2026-306", vendorId: "v3", projectId: "proj-5", orderDate: "2026-04-22", expectedDelivery: "2026-05-25", status: "Delivered", amount: 2_775_000, items: [{ productName: "Wireless Access Point Wi-Fi 6", quantity: 150, unitPrice: 18_500 }] },
  { id: "po-7", poNumber: "PO-2026-307", vendorId: "v2", projectId: "proj-6", orderDate: "2026-06-28", expectedDelivery: "2026-08-10", status: "In Progress", amount: 2_300_000, items: [{ productName: "SAN Storage Array 48TB", quantity: 2, unitPrice: 1_150_000 }] },
  { id: "po-8", poNumber: "PO-2026-308", vendorId: "v4", projectId: "proj-3", orderDate: "2026-08-04", expectedDelivery: "2026-09-05", status: "Sent", amount: 782_000, items: [{ productName: "4MP IP Dome Camera", quantity: 60, unitPrice: 8_900 }, { productName: "NVR 32-Channel", quantity: 4, unitPrice: 62_000 }] },
  { id: "po-9", poNumber: "PO-2026-309", vendorId: "v6", projectId: "proj-7", orderDate: "2026-06-10", expectedDelivery: "2026-07-15", status: "Partially Delivered", amount: 1_384_000, items: [{ productName: "Voltage Stabilizer 15kVA", quantity: 8, unitPrice: 68_000 }, { productName: "Online UPS 10kVA", quantity: 4, unitPrice: 210_000 }], notes: "First batch of 4 stabilizers delivered; balance in transit." },
  { id: "po-10", poNumber: "PO-2026-310", vendorId: "v1", orderDate: "2026-07-20", expectedDelivery: "2026-08-15", status: "Acknowledged", amount: 1_040_000, items: [{ productName: "Business Desktop Pro 14", quantity: 20, unitPrice: 52_000 }], notes: "Stock replenishment order, not tied to a specific project." },
  { id: "po-11", poNumber: "PO-2026-311", vendorId: "v7", orderDate: "2026-08-05", expectedDelivery: "2026-08-06", status: "Draft", amount: 370_000, items: [{ productName: "Endpoint Security Suite (annual, per seat)", quantity: 200, unitPrice: 1_850 }], notes: "Renewal pending finance approval." },
];

export function getPurchaseOrderById(id: string): MockPurchaseOrder | undefined {
  return mockPurchaseOrders.find((po) => po.id === id);
}

// ---------------------------------------------------------------------------
// Warranty Records
// ---------------------------------------------------------------------------

export type MockWarrantyRecord = {
  id: string;
  productId: string;
  serialNumber: string;
  projectId?: string;
  vendorId: string;
  purchaseDate: string;
  expiryDate: string;
};

export const mockWarrantyRecords: MockWarrantyRecord[] = [
  { id: "w-1", productId: "p2", serialNumber: "SRV2U-88213-IN", projectId: "proj-1", vendorId: "v1", purchaseDate: "2026-05-10", expiryDate: "2031-05-10" },
  { id: "w-2", productId: "p6", serialNumber: "NCL3-40217-IN", projectId: "proj-1", vendorId: "v3", purchaseDate: "2026-05-05", expiryDate: "2031-05-05" },
  { id: "w-3", productId: "p14", serialNumber: "SPUPS-19042-IN", projectId: "proj-1", vendorId: "v6", purchaseDate: "2026-05-12", expiryDate: "2028-05-12" },
  { id: "w-4", productId: "p12", serialNumber: "VBIP75-30591-IN", projectId: "proj-2", vendorId: "v5", purchaseDate: "2026-05-20", expiryDate: "2029-05-20" },
  { id: "w-5", productId: "p7", serialNumber: "NCAP6E-58820-IN", projectId: "proj-5", vendorId: "v3", purchaseDate: "2026-05-25", expiryDate: "2029-05-25" },
  { id: "w-6", productId: "p4", serialNumber: "DVSAN48-11029-IN", projectId: "proj-4", vendorId: "v2", purchaseDate: "2021-03-15", expiryDate: "2026-03-15" },
  { id: "w-7", productId: "p3", serialNumber: "SMR1U16-77310-IN", projectId: "proj-4", vendorId: "v8", purchaseDate: "2021-01-20", expiryDate: "2024-01-20" },
  { id: "w-8", productId: "p9", serialNumber: "VGDM4-90142-IN", projectId: "proj-3", vendorId: "v4", purchaseDate: "2024-08-20", expiryDate: "2026-08-20" },
  { id: "w-9", productId: "p10", serialNumber: "VGNVR32-90177-IN", projectId: "proj-3", vendorId: "v4", purchaseDate: "2024-08-20", expiryDate: "2026-08-20" },
  { id: "w-10", productId: "p15", serialNumber: "SPSTB15-24471-IN", projectId: "proj-7", vendorId: "v6", purchaseDate: "2026-06-15", expiryDate: "2028-06-15" },
  { id: "w-11", productId: "p5", serialNumber: "DVNAS24-05561-IN", projectId: "proj-6", vendorId: "v2", purchaseDate: "2020-05-01", expiryDate: "2023-05-01" },
];

export function getWarrantyRecordById(id: string): MockWarrantyRecord | undefined {
  return mockWarrantyRecords.find((record) => record.id === id);
}

// ---------------------------------------------------------------------------
// Document Library
// ---------------------------------------------------------------------------

export const documentFolders = ["Contracts", "Invoices", "Warranty", "Purchase Orders", "Technical Documents", "Brochures", "Certificates"] as const;
export type DocumentFolder = (typeof documentFolders)[number];

export type DocumentFileType = "PDF" | "DOCX" | "XLSX" | "PNG";

export type MockLibraryDocument = {
  id: string;
  name: string;
  folder: DocumentFolder;
  relatedLabel?: string;
  uploadedBy: string;
  uploadedAt: string;
  fileType: DocumentFileType;
};

export const mockLibraryDocuments: MockLibraryDocument[] = [
  { id: "d-1", name: "Master Supply Agreement — State Government Department.pdf", folder: "Contracts", relatedLabel: "State Government Department", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-03-01", fileType: "PDF" },
  { id: "d-2", name: "Annual Rate Contract — NetCore Networking.pdf", folder: "Contracts", relatedLabel: "NetCore Networking Pvt Ltd", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-01-15", fileType: "PDF" },
  { id: "d-3", name: "Invoice INV-2026-0442.pdf", folder: "Invoices", relatedLabel: "PO-2026-301", uploadedBy: "Neha Kulkarni", uploadedAt: "2026-05-14", fileType: "PDF" },
  { id: "d-4", name: "Invoice INV-2026-0455.pdf", folder: "Invoices", relatedLabel: "PO-2026-303", uploadedBy: "Neha Kulkarni", uploadedAt: "2026-05-16", fileType: "PDF" },
  { id: "d-5", name: "Invoice INV-2026-0478.pdf", folder: "Invoices", relatedLabel: "PO-2026-306", uploadedBy: "Neha Kulkarni", uploadedAt: "2026-05-28", fileType: "PDF" },
  { id: "d-6", name: "Warranty Certificate — Rack Server 2U.pdf", folder: "Warranty", relatedLabel: "SRV2U-88213-IN", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-05-11", fileType: "PDF" },
  { id: "d-7", name: "Warranty Certificate — Interactive Display Panel.pdf", folder: "Warranty", relatedLabel: "Private University", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-05-21", fileType: "PDF" },
  { id: "d-8", name: "PO-2026-301 — Signed Purchase Order.pdf", folder: "Purchase Orders", relatedLabel: "Apex Computing Distributors", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-04-16", fileType: "PDF" },
  { id: "d-9", name: "PO-2026-308 — Signed Purchase Order.pdf", folder: "Purchase Orders", relatedLabel: "Visionary Surveillance Systems", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-08-04", fileType: "PDF" },
  { id: "d-10", name: "Rack Server 2U — Technical Datasheet.pdf", folder: "Technical Documents", relatedLabel: "ServeMax SM-R2U-48", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-02-10", fileType: "PDF" },
  { id: "d-11", name: "Network Topology Diagram — Government Data Center.png", folder: "Technical Documents", relatedLabel: "Government Data Center Upgrade", uploadedBy: "Rohan Iyer", uploadedAt: "2026-06-01", fileType: "PNG" },
  { id: "d-12", name: "SAN Storage Array — Configuration Guide.pdf", folder: "Technical Documents", relatedLabel: "DataVault DV-SAN-48", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-06-25", fileType: "PDF" },
  { id: "d-13", name: "ViewBoard Product Brochure.pdf", folder: "Brochures", relatedLabel: "Prime Collaboration Technologies", uploadedBy: "Karan Mehta", uploadedAt: "2026-01-20", fileType: "PDF" },
  { id: "d-14", name: "VisionGuard Surveillance Catalog.pdf", folder: "Brochures", relatedLabel: "Visionary Surveillance Systems", uploadedBy: "Karan Mehta", uploadedAt: "2026-02-05", fileType: "PDF" },
  { id: "d-15", name: "SteadyPower UPS Range Brochure.pdf", folder: "Brochures", relatedLabel: "SteadyPower Backup Solutions", uploadedBy: "Karan Mehta", uploadedAt: "2026-02-12", fileType: "PDF" },
  { id: "d-16", name: "ISO 9001 Certificate — i3it Solutions.pdf", folder: "Certificates", relatedLabel: "Compliance", uploadedBy: "Neha Kulkarni", uploadedAt: "2026-01-05", fileType: "PDF" },
  { id: "d-17", name: "Installation Certificate — Hospital Surveillance Network.pdf", folder: "Certificates", relatedLabel: "Regional Hospital Network", uploadedBy: "Rohan Iyer", uploadedAt: "2026-07-15", fileType: "PDF" },
  { id: "d-18", name: "OEM Authorization Certificate — NetCore.pdf", folder: "Certificates", relatedLabel: "NetCore Networking Pvt Ltd", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-01-18", fileType: "PDF" },
];

// ---------------------------------------------------------------------------
// Workflow (visual reference for WorkflowTimeline)
// ---------------------------------------------------------------------------

export const procurementWorkflowSteps = [
  "Requirement",
  "RFQ",
  "Quotation",
  "Approval",
  "Purchase Order",
  "Vendor",
  "Delivery",
  "Installation",
  "Project Completion",
] as const;

// Re-export mockProjects for convenience so pages that need both
// procurement and project data only import from one place.
export { mockProjects };
