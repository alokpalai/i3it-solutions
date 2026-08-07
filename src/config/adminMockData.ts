// Mock data for the Enterprise Administration module — Phase 4F brief.
// Same footing as dashboardMockData.ts/crmMockData.ts/
// procurementMockData.ts: fictional demo content for an authenticated
// internal tool's UI, not a public-facing claim. Two exceptions,
// deliberately NOT mocked because they'd be actively misleading if they
// were: the real RBAC model (src/lib/permissions.ts, used directly by
// the Roles/Permissions pages) and Company Settings' pre-filled fields
// (only the verified company name/description from src/config/site.ts —
// GST/PAN/address/phone/etc. are left as genuinely empty placeholders,
// never fabricated, since those would represent real facts about the
// real company if filled in — docs/DECISIONS.md A13's "never invent"
// rule applies more strongly here than to e.g. a fictional vendor name).

import { mockUsers, type MockUser } from "@/config/dashboardMockData";

// ---------------------------------------------------------------------------
// Departments
// ---------------------------------------------------------------------------

export type MockDepartment = {
  id: string;
  name: string;
  description: string;
  head?: MockUser;
  headcount: number;
};

export const mockDepartments: MockDepartment[] = [
  { id: "dept-1", name: "Sales", description: "Business development, client relationships and the sales pipeline.", head: mockUsers.find((u) => u.role === "Sales"), headcount: 3 },
  { id: "dept-2", name: "Procurement", description: "Vendor sourcing, RFQs, quotations and purchase orders.", head: mockUsers.find((u) => u.role === "Procurement"), headcount: 2 },
  { id: "dept-3", name: "Projects", description: "Project delivery, deployment and on-site implementation.", head: mockUsers.find((u) => u.role === "Project Manager"), headcount: 5 },
  { id: "dept-4", name: "Support", description: "Post-deployment technical support and client success.", head: mockUsers.find((u) => u.role === "Support"), headcount: 4 },
  { id: "dept-5", name: "Finance", description: "Accounts, invoicing and financial reporting.", head: mockUsers.find((u) => u.role === "Finance"), headcount: 2 },
  { id: "dept-6", name: "HR", description: "Recruitment, onboarding and employee records.", headcount: 1 },
  { id: "dept-7", name: "Administration", description: "Office operations and administrative support.", headcount: 2 },
  { id: "dept-8", name: "Engineering", description: "Internal tooling and platform engineering.", headcount: 3 },
];

// ---------------------------------------------------------------------------
// Activity log (user-facing audit trail)
// ---------------------------------------------------------------------------

export type AuditModule = "Users" | "Roles" | "Projects" | "CRM" | "Procurement" | "Documents" | "Settings" | "Security";
export type AuditAction = "Created" | "Updated" | "Deleted" | "Logged in" | "Logged out" | "Assigned" | "Disabled" | "Enabled";

export type MockAuditLogEntry = {
  id: string;
  timestamp: string;
  actor: string;
  module: AuditModule;
  action: AuditAction;
  object: string;
  /** Placeholder only, per the brief — no real IP capture exists yet. */
  ip: string;
  device: string;
};

export const mockAuditLog: MockAuditLogEntry[] = [
  { id: "aud-1", timestamp: "2026-08-06T08:12:00", actor: "Aditi Rao", module: "Projects", action: "Updated", object: "Government Data Center Upgrade — status", ip: "203.0.113.PLACEHOLDER", device: "Chrome on Windows" },
  { id: "aud-2", timestamp: "2026-08-06T07:55:00", actor: "Fatima Sheikh", module: "Procurement", action: "Created", object: "RFQ-2026-130", ip: "203.0.113.PLACEHOLDER", device: "Chrome on Windows" },
  { id: "aud-3", timestamp: "2026-08-05T18:30:00", actor: "Karan Mehta", module: "CRM", action: "Updated", object: "Lead — District Cooperative Bank", ip: "203.0.113.PLACEHOLDER", device: "Safari on macOS" },
  { id: "aud-4", timestamp: "2026-08-05T17:05:00", actor: "System", module: "Security", action: "Logged out", object: "Session expired — Vikram Singh", ip: "—", device: "—" },
  { id: "aud-5", timestamp: "2026-08-05T15:40:00", actor: "Neha Kulkarni", module: "Documents", action: "Created", object: "Invoice INV-2026-0478.pdf", ip: "203.0.113.PLACEHOLDER", device: "Edge on Windows" },
  { id: "aud-6", timestamp: "2026-08-05T11:20:00", actor: "Super Admin", module: "Roles", action: "Updated", object: "Procurement role — added Inventory:manage", ip: "203.0.113.PLACEHOLDER", device: "Chrome on Windows" },
  { id: "aud-7", timestamp: "2026-08-05T10:05:00", actor: "Super Admin", module: "Users", action: "Assigned", object: "Priya Nair — role changed to Support", ip: "203.0.113.PLACEHOLDER", device: "Chrome on Windows" },
  { id: "aud-8", timestamp: "2026-08-04T16:45:00", actor: "Rohan Iyer", module: "Documents", action: "Updated", object: "Site Readiness Report.docx", ip: "203.0.113.PLACEHOLDER", device: "Firefox on Windows" },
  { id: "aud-9", timestamp: "2026-08-04T09:30:00", actor: "Ishaan Verma", module: "Users", action: "Logged in", object: "—", ip: "203.0.113.PLACEHOLDER", device: "Chrome on Android" },
  { id: "aud-10", timestamp: "2026-08-03T14:15:00", actor: "Super Admin", module: "Settings", action: "Updated", object: "Notification preferences — Email channel", ip: "203.0.113.PLACEHOLDER", device: "Chrome on Windows" },
];

// ---------------------------------------------------------------------------
// System logs (technical/system-level — distinct from the user-facing
// activity log above)
// ---------------------------------------------------------------------------

export type LogLevel = "Info" | "Warning" | "Error";
export type LogSource = "Auth Service" | "Database" | "API Gateway" | "Scheduler" | "Email Service";

export type MockSystemLogEntry = {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: LogSource;
  message: string;
};

export const mockSystemLogs: MockSystemLogEntry[] = [
  { id: "log-1", timestamp: "2026-08-06T08:00:00", level: "Info", source: "Scheduler", message: "Daily warranty-expiry check completed — 2 records flagged." },
  { id: "log-2", timestamp: "2026-08-06T07:00:00", level: "Info", source: "Auth Service", message: "Session cleanup job removed 4 expired sessions." },
  { id: "log-3", timestamp: "2026-08-05T22:14:00", level: "Warning", source: "API Gateway", message: "Elevated response time on /api/auth/session (avg 1.4s over 5 min window)." },
  { id: "log-4", timestamp: "2026-08-05T19:02:00", level: "Error", source: "Email Service", message: "Password reset email to a placeholder address failed — provider not configured (architecture only, see src/lib/email.ts)." },
  { id: "log-5", timestamp: "2026-08-05T12:30:00", level: "Info", source: "Database", message: "Nightly backup completed successfully." },
  { id: "log-6", timestamp: "2026-08-04T09:45:00", level: "Warning", source: "Auth Service", message: "5 failed login attempts from one source within 15 minutes — rate limit engaged." },
  { id: "log-7", timestamp: "2026-08-03T06:00:00", level: "Info", source: "Scheduler", message: "Weekly analytics rollup completed." },
];

// ---------------------------------------------------------------------------
// Notification channels
// ---------------------------------------------------------------------------

export type NotificationChannelStatus = "Active" | "Placeholder" | "Planned";

export type MockNotificationChannel = {
  id: string;
  name: string;
  description: string;
  status: NotificationChannelStatus;
};

export const mockNotificationChannels: MockNotificationChannel[] = [
  { id: "chan-1", name: "Email", description: "Transactional and digest emails.", status: "Placeholder" },
  { id: "chan-2", name: "In-App", description: "Notification bell and in-dashboard alerts.", status: "Active" },
  { id: "chan-3", name: "SMS", description: "Time-sensitive alerts via text message.", status: "Placeholder" },
  { id: "chan-4", name: "WhatsApp", description: "Business messaging for client-facing alerts.", status: "Placeholder" },
  { id: "chan-5", name: "Push Notifications", description: "Browser and mobile push.", status: "Planned" },
];

// ---------------------------------------------------------------------------
// Analytics (mock calculations for modules not present on this branch —
// CRM/Procurement/Inventory exist as code on their own feature branches,
// not here, so their figures below are illustrative mock numbers, not
// computed from real data the way the Projects/Users figures are)
// ---------------------------------------------------------------------------

export type AnalyticsSeries = { label: string; value: number };

export const analyticsSalesPipeline: AnalyticsSeries[] = [
  { label: "Lead", value: 4 },
  { label: "Qualified", value: 3 },
  { label: "Proposal Sent", value: 2 },
  { label: "Negotiation", value: 2 },
  { label: "Won", value: 7 },
];

export const analyticsProcurement: AnalyticsSeries[] = [
  { label: "Draft", value: 2 },
  { label: "Pending", value: 3 },
  { label: "Approved", value: 3 },
  { label: "Closed", value: 2 },
];

export const analyticsInventory: AnalyticsSeries[] = [
  { label: "Computing", value: 40 },
  { label: "Servers", value: 16 },
  { label: "Storage", value: 11 },
  { label: "Networking", value: 99 },
  { label: "Surveillance & Security", value: 13 },
];

export const analyticsRfqs: AnalyticsSeries[] = [
  { label: "Draft", value: 1 },
  { label: "Pending", value: 2 },
  { label: "Vendor Requested", value: 1 },
  { label: "Approved", value: 3 },
  { label: "Closed", value: 1 },
];

export const analyticsDocuments: AnalyticsSeries[] = [
  { label: "Contracts", value: 2 },
  { label: "Invoices", value: 3 },
  { label: "Technical Documents", value: 3 },
  { label: "Brochures", value: 3 },
  { label: "Certificates", value: 3 },
];

export const analyticsGrowth: AnalyticsSeries[] = [
  { label: "Mar", value: 2 },
  { label: "Apr", value: 3 },
  { label: "May", value: 3 },
  { label: "Jun", value: 4 },
  { label: "Jul", value: 5 },
  { label: "Aug", value: 7 },
];
