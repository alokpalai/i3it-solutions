// Mock data for the CRM module — Phase 4D brief. Same footing as
// dashboardMockData.ts: deliberately fictional demo content for an
// authenticated internal tool, not a public-facing claim (docs/
// CONTENT_STRATEGY.md governs public pages, not this). Organizations use
// generic buyer-category names, never real named entities — the same
// rule dashboardMockData.ts's mock projects and the public RFQ form
// already follow (docs/DECISIONS.md A13).
//
// No Prisma models exist yet for any entity below (Lead/Organization/
// Contact/Opportunity/Meeting/FollowUp/Quotation) — same "architecture,
// not wired to a backend" status as Projects were before their own
// eventual migration. Wiring this to real data is Phase 5+ scope.
//
// Deliberately cross-linked with dashboardMockData.ts's mockProjects: the
// 7 existing mock projects each trace back to a Won opportunity below
// (same client, same budget as expectedRevenue, closing date just before
// the project's startDate) — so browsing from a CRM opportunity to the
// project it produced (or back) tells one consistent story instead of
// two disconnected mock datasets.

import { mockUsers, mockProjects, type MockUser, type Priority } from "@/config/dashboardMockData";

export const salesExecutives: MockUser[] = mockUsers.filter((user) => user.role === "Sales");

// ---------------------------------------------------------------------------
// Organizations
// ---------------------------------------------------------------------------

export type OrganizationType =
  | "Government Department"
  | "University"
  | "PSU"
  | "Hospital"
  | "Corporate Enterprise"
  | "Technology Company";

export type Industry =
  | "Government"
  | "Education"
  | "Healthcare"
  | "Technology"
  | "Manufacturing"
  | "Financial Services"
  | "Power & Utilities";

export type RelationshipStage = "Prospect" | "Client";

export type MockOrganization = {
  id: string;
  name: string;
  type: OrganizationType;
  industry: Industry;
  relationship: RelationshipStage;
  /** Placeholder only — no real registration numbers, per the brief. */
  gst: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  primaryContactId?: string;
  secondaryContactId?: string;
  /** Links back to dashboardMockData.ts's mockProjects for Client orgs. */
  associatedProjectIds: string[];
  notes: string;
  createdAt: string;
};

export const mockOrganizations: MockOrganization[] = [
  {
    id: "org-1", name: "State Government Department", type: "Government Department", industry: "Government",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-01", pan: "PAN-PLACEHOLDER-01",
    address: "IT Directorate, Civil Secretariat", city: "New Delhi", state: "Delhi", country: "India",
    website: "https://example-govt.gov.in", primaryContactId: "c-1a", secondaryContactId: "c-1b",
    associatedProjectIds: ["proj-1"], notes: "Long-standing government client; GeM-empanelled procurement.",
    createdAt: "2026-03-01",
  },
  {
    id: "org-2", name: "Private University", type: "University", industry: "Education",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-02", pan: "PAN-PLACEHOLDER-02",
    address: "Knowledge Park Campus", city: "Pune", state: "Maharashtra", country: "India",
    website: "https://example-university.edu", primaryContactId: "c-2a", secondaryContactId: "c-2b",
    associatedProjectIds: ["proj-2"], notes: "Repeat client for classroom and campus technology upgrades.",
    createdAt: "2026-02-15",
  },
  {
    id: "org-3", name: "Regional Hospital Network", type: "Hospital", industry: "Healthcare",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-03", pan: "PAN-PLACEHOLDER-03",
    address: "Multi-campus, Central Administration Office", city: "Bengaluru", state: "Karnataka", country: "India",
    website: "https://example-hospitalnetwork.org", primaryContactId: "c-3a", secondaryContactId: "c-3b",
    associatedProjectIds: ["proj-3"], notes: "Quarterly account review cadence; sensitive to support SLAs.",
    createdAt: "2026-05-10",
  },
  {
    id: "org-4", name: "Enterprise Client — Manufacturing", type: "Corporate Enterprise", industry: "Manufacturing",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-04", pan: "PAN-PLACEHOLDER-04",
    address: "Head Office, Industrial Estate", city: "Chennai", state: "Tamil Nadu", country: "India",
    website: "https://example-manufacturing.com", primaryContactId: "c-4a", secondaryContactId: "c-4b",
    associatedProjectIds: ["proj-4"], notes: "Onboarded via a channel partner referral.",
    createdAt: "2025-12-10",
  },
  {
    id: "org-5", name: "Public University Campus", type: "University", industry: "Education",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-05", pan: "PAN-PLACEHOLDER-05",
    address: "Main Campus, Engineering Block", city: "Hyderabad", state: "Telangana", country: "India",
    website: "https://example-publicuniversity.edu", primaryContactId: "c-5a", secondaryContactId: "c-5b",
    associatedProjectIds: ["proj-5"], notes: "Budget cycle tied to the academic year.",
    createdAt: "2026-04-01",
  },
  {
    id: "org-6", name: "Financial Services Client", type: "Corporate Enterprise", industry: "Financial Services",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-06", pan: "PAN-PLACEHOLDER-06",
    address: "Corporate Tower, BKC", city: "Mumbai", state: "Maharashtra", country: "India",
    website: "https://example-financialservices.com", primaryContactId: "c-6a", secondaryContactId: "c-6b",
    associatedProjectIds: ["proj-6"], notes: "High compliance and security requirements on every deal.",
    createdAt: "2026-06-01",
  },
  {
    id: "org-7", name: "State Power Utility", type: "PSU", industry: "Power & Utilities",
    relationship: "Client", gst: "GSTIN-PLACEHOLDER-07", pan: "PAN-PLACEHOLDER-07",
    address: "Regional Office Complex", city: "Jaipur", state: "Rajasthan", country: "India",
    website: "https://example-powerutility.gov.in", primaryContactId: "c-7a", secondaryContactId: "c-7b",
    associatedProjectIds: ["proj-7"], notes: "Budget re-approval cycles can pause active projects.",
    createdAt: "2026-04-15",
  },
  {
    id: "org-8", name: "Metropolitan Municipal Corporation", type: "Government Department", industry: "Government",
    relationship: "Prospect", gst: "GSTIN-PLACEHOLDER-08", pan: "PAN-PLACEHOLDER-08",
    address: "Municipal Headquarters", city: "Ahmedabad", state: "Gujarat", country: "India",
    website: "https://example-municipal.gov.in", primaryContactId: "c-8a", secondaryContactId: "c-8b",
    associatedProjectIds: [], notes: "Smart city surveillance expansion — GeM tender expected Q4.",
    createdAt: "2026-08-01",
  },
  {
    id: "org-9", name: "National Research Institute", type: "PSU", industry: "Technology",
    relationship: "Prospect", gst: "GSTIN-PLACEHOLDER-09", pan: "PAN-PLACEHOLDER-09",
    address: "Research Campus, Sector 12", city: "Bengaluru", state: "Karnataka", country: "India",
    website: "https://example-researchinstitute.res.in", primaryContactId: "c-9a", secondaryContactId: "c-9b",
    associatedProjectIds: [], notes: "Compute-heavy requirement for a new research lab.",
    createdAt: "2026-07-28",
  },
  {
    id: "org-10", name: "Regional IT Services Company", type: "Technology Company", industry: "Technology",
    relationship: "Prospect", gst: "GSTIN-PLACEHOLDER-10", pan: "PAN-PLACEHOLDER-10",
    address: "Tech Park, Phase 2", city: "Pune", state: "Maharashtra", country: "India",
    website: "https://example-itservices.com", primaryContactId: "c-10a", secondaryContactId: "c-10b",
    associatedProjectIds: [], notes: "Price-sensitive; evaluating two other vendors in parallel.",
    createdAt: "2026-07-30",
  },
  {
    id: "org-11", name: "District Cooperative Bank", type: "Corporate Enterprise", industry: "Financial Services",
    relationship: "Prospect", gst: "GSTIN-PLACEHOLDER-11", pan: "PAN-PLACEHOLDER-11",
    address: "Bank Head Office, MG Road", city: "Nagpur", state: "Maharashtra", country: "India",
    website: "https://example-districtbank.coop", primaryContactId: "c-11a", secondaryContactId: "c-11b",
    associatedProjectIds: [], notes: "Multi-branch surveillance and storage refresh, early-stage.",
    createdAt: "2026-08-02",
  },
];

export function getOrganizationById(id: string): MockOrganization | undefined {
  return mockOrganizations.find((org) => org.id === id);
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export type PreferredCommunication = "Email" | "Phone" | "WhatsApp" | "In Person";

export type MockContact = {
  id: string;
  organizationId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  isDecisionMaker: boolean;
  preferredCommunication: PreferredCommunication;
  notes?: string;
};

export const mockContacts: MockContact[] = [
  { id: "c-1a", organizationId: "org-1", name: "Ramesh Chandran", role: "IT Director", email: "ramesh.chandran@example-govt.gov.in", phone: "+91 98100 11122", department: "Information Technology", isDecisionMaker: true, preferredCommunication: "Email" },
  { id: "c-1b", organizationId: "org-1", name: "Sunita Yadav", role: "Procurement Officer", email: "sunita.yadav@example-govt.gov.in", phone: "+91 98100 11133", department: "Procurement", isDecisionMaker: false, preferredCommunication: "Phone" },
  { id: "c-2a", organizationId: "org-2", name: "Dr. Anil Kapoor", role: "Registrar", email: "anil.kapoor@example-university.edu", phone: "+91 98200 22211", department: "Administration", isDecisionMaker: true, preferredCommunication: "Email" },
  { id: "c-2b", organizationId: "org-2", name: "Meera Joshi", role: "IT Infrastructure Head", email: "meera.joshi@example-university.edu", phone: "+91 98200 22233", department: "Information Technology", isDecisionMaker: false, preferredCommunication: "Email" },
  { id: "c-3a", organizationId: "org-3", name: "Dr. Lakshmi Menon", role: "Chief Administrator", email: "lakshmi.menon@example-hospitalnetwork.org", phone: "+91 98300 33311", department: "Administration", isDecisionMaker: true, preferredCommunication: "Phone" },
  { id: "c-3b", organizationId: "org-3", name: "Suresh Pillai", role: "Facilities Manager", email: "suresh.pillai@example-hospitalnetwork.org", phone: "+91 98300 33322", department: "Facilities", isDecisionMaker: false, preferredCommunication: "WhatsApp" },
  { id: "c-4a", organizationId: "org-4", name: "Vivek Agarwal", role: "Plant Head", email: "vivek.agarwal@example-manufacturing.com", phone: "+91 98400 44411", department: "Operations", isDecisionMaker: true, preferredCommunication: "Email" },
  { id: "c-4b", organizationId: "org-4", name: "Kavita Reddy", role: "IT Manager", email: "kavita.reddy@example-manufacturing.com", phone: "+91 98400 44422", department: "Information Technology", isDecisionMaker: false, preferredCommunication: "Email" },
  { id: "c-5a", organizationId: "org-5", name: "Prof. Ravi Shankar", role: "Dean of Infrastructure", email: "ravi.shankar@example-publicuniversity.edu", phone: "+91 98500 55511", department: "Administration", isDecisionMaker: true, preferredCommunication: "Phone" },
  { id: "c-5b", organizationId: "org-5", name: "Anjali Deshpande", role: "Network Administrator", email: "anjali.deshpande@example-publicuniversity.edu", phone: "+91 98500 55522", department: "Information Technology", isDecisionMaker: false, preferredCommunication: "Email" },
  { id: "c-6a", organizationId: "org-6", name: "Rajiv Malhotra", role: "Chief Technology Officer", email: "rajiv.malhotra@example-financialservices.com", phone: "+91 98600 66611", department: "Technology", isDecisionMaker: true, preferredCommunication: "Email" },
  { id: "c-6b", organizationId: "org-6", name: "Pooja Bansal", role: "IT Security Lead", email: "pooja.bansal@example-financialservices.com", phone: "+91 98600 66622", department: "Information Security", isDecisionMaker: false, preferredCommunication: "In Person" },
  { id: "c-7a", organizationId: "org-7", name: "Deepak Choudhary", role: "Chief Engineer", email: "deepak.choudhary@example-powerutility.gov.in", phone: "+91 98700 77711", department: "Engineering", isDecisionMaker: true, preferredCommunication: "Phone" },
  { id: "c-7b", organizationId: "org-7", name: "Nisha Verma", role: "Purchase Officer", email: "nisha.verma@example-powerutility.gov.in", phone: "+91 98700 77722", department: "Procurement", isDecisionMaker: false, preferredCommunication: "Email" },
  { id: "c-8a", organizationId: "org-8", name: "Alok Mishra", role: "Municipal Commissioner", email: "alok.mishra@example-municipal.gov.in", phone: "+91 98800 88811", department: "Administration", isDecisionMaker: true, preferredCommunication: "In Person" },
  { id: "c-8b", organizationId: "org-8", name: "Ritu Saxena", role: "Smart City Project Officer", email: "ritu.saxena@example-municipal.gov.in", phone: "+91 98800 88822", department: "Smart City Cell", isDecisionMaker: false, preferredCommunication: "Email" },
  { id: "c-9a", organizationId: "org-9", name: "Dr. Vikram Rathi", role: "Director", email: "vikram.rathi@example-researchinstitute.res.in", phone: "+91 98900 99911", department: "Administration", isDecisionMaker: true, preferredCommunication: "Email" },
  { id: "c-9b", organizationId: "org-9", name: "Sneha Kulkarni", role: "Administrative Officer", email: "sneha.kulkarni@example-researchinstitute.res.in", phone: "+91 98900 99922", department: "Administration", isDecisionMaker: false, preferredCommunication: "Phone" },
  { id: "c-10a", organizationId: "org-10", name: "Amitabh Sen", role: "Founder & CEO", email: "amitabh.sen@example-itservices.com", phone: "+91 99000 11144", department: "Leadership", isDecisionMaker: true, preferredCommunication: "WhatsApp" },
  { id: "c-10b", organizationId: "org-10", name: "Divya Krishnan", role: "Operations Manager", email: "divya.krishnan@example-itservices.com", phone: "+91 99000 11155", department: "Operations", isDecisionMaker: false, preferredCommunication: "Email" },
  { id: "c-11a", organizationId: "org-11", name: "Manoj Tiwari", role: "VP Operations", email: "manoj.tiwari@example-districtbank.coop", phone: "+91 99100 22266", department: "Operations", isDecisionMaker: true, preferredCommunication: "Email" },
  { id: "c-11b", organizationId: "org-11", name: "Shalini Rao", role: "IT Manager", email: "shalini.rao@example-districtbank.coop", phone: "+91 99100 22277", department: "Information Technology", isDecisionMaker: false, preferredCommunication: "Phone" },
];

export function getContactsByOrganization(organizationId: string): MockContact[] {
  return mockContacts.filter((contact) => contact.organizationId === organizationId);
}

export function getContactById(id: string): MockContact | undefined {
  return mockContacts.find((contact) => contact.id === id);
}

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export const leadSources = ["Website", "Referral", "Cold Call", "GeM Portal", "Trade Show", "Email Campaign", "Partner"] as const;
export type LeadSource = (typeof leadSources)[number];

export const leadStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost", "Archived"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type MockLead = {
  id: string;
  organizationId: string;
  contactId: string;
  source: LeadSource;
  industry: Industry;
  assignedTo: MockUser;
  status: LeadStatus;
  priority: Priority;
  nextFollowUp: string;
  createdAt: string;
  notes?: string;
};

export const mockLeads: MockLead[] = [
  { id: "lead-1", organizationId: "org-8", contactId: "c-8b", source: "GeM Portal", industry: "Government", assignedTo: mockUsers[1], status: "Qualified", priority: "High", nextFollowUp: "2026-08-10", createdAt: "2026-08-01", notes: "Camera count and coverage zones still being finalized." },
  { id: "lead-2", organizationId: "org-9", contactId: "c-9b", source: "Referral", industry: "Technology", assignedTo: mockUsers[8], status: "Proposal Sent", priority: "Medium", nextFollowUp: "2026-08-09", createdAt: "2026-07-28" },
  { id: "lead-3", organizationId: "org-10", contactId: "c-10b", source: "Website", industry: "Technology", assignedTo: mockUsers[9], status: "Contacted", priority: "Medium", nextFollowUp: "2026-08-08", createdAt: "2026-07-30" },
  { id: "lead-4", organizationId: "org-11", contactId: "c-11b", source: "Cold Call", industry: "Financial Services", assignedTo: mockUsers[1], status: "New", priority: "Low", nextFollowUp: "2026-08-12", createdAt: "2026-08-02" },
  { id: "lead-5", organizationId: "org-1", contactId: "c-1b", source: "GeM Portal", industry: "Government", assignedTo: mockUsers[1], status: "Won", priority: "High", nextFollowUp: "2026-04-20", createdAt: "2026-03-01", notes: "Converted to Government Data Center Upgrade." },
  { id: "lead-6", organizationId: "org-3", contactId: "c-3b", source: "Referral", industry: "Healthcare", assignedTo: mockUsers[8], status: "Won", priority: "High", nextFollowUp: "2026-06-15", createdAt: "2026-05-10", notes: "Converted to Hospital Surveillance Network." },
  { id: "lead-7", organizationId: "org-6", contactId: "c-6b", source: "Trade Show", industry: "Financial Services", assignedTo: mockUsers[9], status: "Negotiation", priority: "Urgent", nextFollowUp: "2026-08-07", createdAt: "2026-07-25", notes: "Upsell — additional security hardening for an existing client." },
  { id: "lead-8", organizationId: "org-4", contactId: "c-4b", source: "Partner", industry: "Manufacturing", assignedTo: mockUsers[1], status: "Won", priority: "Medium", nextFollowUp: "2026-01-10", createdAt: "2025-12-10", notes: "Converted to Enterprise Server Infrastructure." },
  { id: "lead-9", organizationId: "org-10", contactId: "c-10b", source: "Website", industry: "Technology", assignedTo: mockUsers[9], status: "Lost", priority: "Low", nextFollowUp: "2026-07-20", createdAt: "2026-06-01", notes: "Client chose to build the capability in-house." },
  { id: "lead-10", organizationId: "org-11", contactId: "c-11a", source: "Cold Call", industry: "Financial Services", assignedTo: mockUsers[1], status: "Archived", priority: "Low", nextFollowUp: "2026-06-01", createdAt: "2026-05-15", notes: "No response after three follow-up attempts." },
];

export function getLeadById(id: string): MockLead | undefined {
  return mockLeads.find((lead) => lead.id === id);
}

export function getLeadsByOrganization(organizationId: string): MockLead[] {
  return mockLeads.filter((lead) => lead.organizationId === organizationId);
}

// ---------------------------------------------------------------------------
// Opportunities & Sales Pipeline
// ---------------------------------------------------------------------------

export const pipelineStages = ["Lead", "Qualified", "Meeting Scheduled", "Proposal Sent", "Negotiation", "Won", "Lost"] as const;
export type PipelineStage = (typeof pipelineStages)[number];

// Readable titles for the site's real solution taxonomy
// (src/config/solutionsContent.ts's solutionDetails keys) — reused here
// rather than inventing a separate label set.
export const solutionOptions = [
  "Government Procurement",
  "Enterprise Technology Procurement",
  "IT Infrastructure",
  "Network Infrastructure",
  "System Integration",
  "Surveillance & Security",
  "Biometric & Access Control",
  "Collaboration & Video Conferencing",
  "Power & Business Continuity",
  "Software & Licensing",
  "Digital Workplace",
  "Deployment & Support",
  "Turnkey Projects",
  "Smart City",
] as const;

export type MockOpportunity = {
  id: string;
  name: string;
  organizationId: string;
  leadId?: string;
  expectedRevenue: number;
  probability: number; // 0-100
  expectedClosingDate: string;
  assignedTo: MockUser;
  products: string[];
  solutions: string[];
  priority: Priority;
  stage: PipelineStage;
  createdAt: string;
  updatedAt: string;
};

export const mockOpportunities: MockOpportunity[] = [
  { id: "opp-1", name: "Smart City Surveillance Expansion", organizationId: "org-8", leadId: "lead-1", expectedRevenue: 6_500_000, probability: 40, expectedClosingDate: "2026-10-30", assignedTo: mockUsers[1], products: ["Surveillance & Security", "Networking"], solutions: ["Smart City", "Surveillance & Security"], priority: "High", stage: "Qualified", createdAt: "2026-08-01", updatedAt: "2026-08-05" },
  { id: "opp-2", name: "Research Lab Computing Upgrade", organizationId: "org-9", leadId: "lead-2", expectedRevenue: 9_200_000, probability: 55, expectedClosingDate: "2026-11-15", assignedTo: mockUsers[8], products: ["Computing", "Servers"], solutions: ["IT Infrastructure"], priority: "Medium", stage: "Proposal Sent", createdAt: "2026-07-28", updatedAt: "2026-08-04" },
  { id: "opp-3", name: "Office Network Modernization", organizationId: "org-10", leadId: "lead-3", expectedRevenue: 1_800_000, probability: 25, expectedClosingDate: "2026-10-05", assignedTo: mockUsers[9], products: ["Networking"], solutions: ["Network Infrastructure", "Enterprise Technology Procurement"], priority: "Medium", stage: "Meeting Scheduled", createdAt: "2026-07-30", updatedAt: "2026-08-03" },
  { id: "opp-4", name: "Branch Security & Storage", organizationId: "org-11", leadId: "lead-4", expectedRevenue: 2_400_000, probability: 15, expectedClosingDate: "2026-12-01", assignedTo: mockUsers[1], products: ["Storage", "Surveillance & Security"], solutions: ["IT Infrastructure"], priority: "Low", stage: "Lead", createdAt: "2026-08-02", updatedAt: "2026-08-02" },
  { id: "opp-5", name: "Government Data Center Upgrade", organizationId: "org-1", leadId: "lead-5", expectedRevenue: 8_500_000, probability: 100, expectedClosingDate: "2026-04-25", assignedTo: mockUsers[1], products: ["Servers", "Storage", "Networking", "Power Backup"], solutions: ["Government Procurement"], priority: "High", stage: "Won", createdAt: "2026-03-01", updatedAt: "2026-04-25" },
  { id: "opp-6", name: "University Smart Classroom Deployment", organizationId: "org-2", expectedRevenue: 3_200_000, probability: 100, expectedClosingDate: "2026-04-05", assignedTo: mockUsers[1], products: ["Collaboration & Display", "Networking", "Software"], solutions: ["Digital Workplace", "Network Infrastructure"], priority: "Medium", stage: "Won", createdAt: "2026-02-15", updatedAt: "2026-04-05" },
  { id: "opp-7", name: "Hospital Surveillance Network", organizationId: "org-3", leadId: "lead-6", expectedRevenue: 4_100_000, probability: 100, expectedClosingDate: "2026-06-25", assignedTo: mockUsers[8], products: ["Surveillance & Security", "Networking"], solutions: ["Surveillance & Security", "System Integration"], priority: "High", stage: "Won", createdAt: "2026-05-10", updatedAt: "2026-06-25" },
  { id: "opp-8", name: "Enterprise Server Infrastructure", organizationId: "org-4", leadId: "lead-8", expectedRevenue: 6_000_000, probability: 100, expectedClosingDate: "2026-01-25", assignedTo: mockUsers[1], products: ["Servers", "Storage"], solutions: ["IT Infrastructure", "Enterprise Technology Procurement"], priority: "Medium", stage: "Won", createdAt: "2025-12-10", updatedAt: "2026-01-25" },
  { id: "opp-9", name: "Campus Wi-Fi Deployment", organizationId: "org-5", expectedRevenue: 1_800_000, probability: 100, expectedClosingDate: "2026-05-10", assignedTo: mockUsers[9], products: ["Networking"], solutions: ["Network Infrastructure"], priority: "Low", stage: "Won", createdAt: "2026-04-01", updatedAt: "2026-05-10" },
  { id: "opp-10", name: "Disaster Recovery Setup", organizationId: "org-6", expectedRevenue: 5_500_000, probability: 100, expectedClosingDate: "2026-07-28", assignedTo: mockUsers[8], products: ["Storage", "Servers", "Power Backup"], solutions: ["IT Infrastructure", "Power & Business Continuity"], priority: "Urgent", stage: "Won", createdAt: "2026-06-15", updatedAt: "2026-07-28" },
  { id: "opp-11", name: "Power Backup Modernization", organizationId: "org-7", expectedRevenue: 2_700_000, probability: 100, expectedClosingDate: "2026-05-28", assignedTo: mockUsers[1], products: ["Power Backup"], solutions: ["Power & Business Continuity"], priority: "Medium", stage: "Won", createdAt: "2026-04-20", updatedAt: "2026-05-28" },
  { id: "opp-12", name: "Security Upgrade Add-on", organizationId: "org-6", leadId: "lead-7", expectedRevenue: 1_600_000, probability: 60, expectedClosingDate: "2026-09-15", assignedTo: mockUsers[9], products: ["Surveillance & Security"], solutions: ["Surveillance & Security"], priority: "Urgent", stage: "Negotiation", createdAt: "2026-07-25", updatedAt: "2026-08-05" },
  { id: "opp-13", name: "Cloud Migration Consulting", organizationId: "org-10", leadId: "lead-9", expectedRevenue: 1_200_000, probability: 0, expectedClosingDate: "2026-07-20", assignedTo: mockUsers[9], products: ["Software"], solutions: ["Digital Workplace"], priority: "Low", stage: "Lost", createdAt: "2026-06-01", updatedAt: "2026-07-28" },
];

export function getOpportunityById(id: string): MockOpportunity | undefined {
  return mockOpportunities.find((opportunity) => opportunity.id === id);
}

export function getOpportunitiesByOrganization(organizationId: string): MockOpportunity[] {
  return mockOpportunities.filter((opportunity) => opportunity.organizationId === organizationId);
}

/** The mock project this opportunity became, where one exists — the same
 * link `getProjectsByOrganization` uses from the other direction via
 * MockOrganization.associatedProjectIds. */
export function getProjectForOpportunity(opportunity: MockOpportunity) {
  if (opportunity.stage !== "Won") return undefined;
  return mockProjects.find((project) => project.client === getOrganizationById(opportunity.organizationId)?.name);
}

// ---------------------------------------------------------------------------
// Quotations (backs a Client's "Associated Quotations" field)
// ---------------------------------------------------------------------------

export type QuotationStatus = "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";

export type MockQuotation = {
  id: string;
  quotationNumber: string;
  opportunityId: string;
  organizationId: string;
  amount: number;
  status: QuotationStatus;
  sentDate?: string;
  validUntil: string;
};

export const mockQuotations: MockQuotation[] = [
  { id: "q-1", quotationNumber: "QTN-2026-014", opportunityId: "opp-2", organizationId: "org-9", amount: 9_200_000, status: "Sent", sentDate: "2026-08-04", validUntil: "2026-09-04" },
  { id: "q-2", quotationNumber: "QTN-2026-002", opportunityId: "opp-5", organizationId: "org-1", amount: 8_500_000, status: "Accepted", sentDate: "2026-04-15", validUntil: "2026-05-15" },
  { id: "q-3", quotationNumber: "QTN-2026-005", opportunityId: "opp-6", organizationId: "org-2", amount: 3_200_000, status: "Accepted", sentDate: "2026-03-28", validUntil: "2026-04-28" },
  { id: "q-4", quotationNumber: "QTN-2026-018", opportunityId: "opp-7", organizationId: "org-3", amount: 4_100_000, status: "Accepted", sentDate: "2026-06-18", validUntil: "2026-07-18" },
  { id: "q-5", quotationNumber: "QTN-2025-041", opportunityId: "opp-8", organizationId: "org-4", amount: 6_000_000, status: "Accepted", sentDate: "2026-01-15", validUntil: "2026-02-15" },
  { id: "q-6", quotationNumber: "QTN-2026-009", opportunityId: "opp-9", organizationId: "org-5", amount: 1_800_000, status: "Accepted", sentDate: "2026-05-02", validUntil: "2026-06-02" },
  { id: "q-7", quotationNumber: "QTN-2026-022", opportunityId: "opp-10", organizationId: "org-6", amount: 5_500_000, status: "Accepted", sentDate: "2026-07-22", validUntil: "2026-08-22" },
  { id: "q-8", quotationNumber: "QTN-2026-011", opportunityId: "opp-11", organizationId: "org-7", amount: 2_700_000, status: "Accepted", sentDate: "2026-05-20", validUntil: "2026-06-20" },
  { id: "q-9", quotationNumber: "QTN-2026-027", opportunityId: "opp-12", organizationId: "org-6", amount: 1_600_000, status: "Sent", sentDate: "2026-08-05", validUntil: "2026-09-05" },
  { id: "q-10", quotationNumber: "QTN-2026-020", opportunityId: "opp-13", organizationId: "org-10", amount: 1_200_000, status: "Rejected", sentDate: "2026-07-20", validUntil: "2026-08-20" },
];

export function getQuotationsByOrganization(organizationId: string): MockQuotation[] {
  return mockQuotations.filter((quotation) => quotation.organizationId === organizationId);
}

// ---------------------------------------------------------------------------
// Meetings
// ---------------------------------------------------------------------------

export type MeetingStatus = "Upcoming" | "Completed" | "Cancelled";
export type MeetingActionItem = { id: string; label: string; done: boolean };

export type MockMeeting = {
  id: string;
  title: string;
  organizationId: string;
  contactIds: string[];
  opportunityId?: string;
  datetime: string; // ISO datetime
  status: MeetingStatus;
  agenda: string;
  internalParticipants: MockUser[];
  notes?: string;
  actionItems: MeetingActionItem[];
};

export const mockMeetings: MockMeeting[] = [
  { id: "m-1", title: "Smart City Surveillance — Requirement Discussion", organizationId: "org-8", contactIds: ["c-8a", "c-8b"], opportunityId: "opp-1", datetime: "2026-08-08T11:00:00", status: "Upcoming", agenda: "Discuss camera coverage requirements and budget range.", internalParticipants: [mockUsers[1], mockUsers[0]], actionItems: [] },
  { id: "m-2", title: "Research Lab Computing — Technical Walkthrough", organizationId: "org-9", contactIds: ["c-9a"], opportunityId: "opp-2", datetime: "2026-08-09T15:00:00", status: "Upcoming", agenda: "Present the server and compute proposal.", internalParticipants: [mockUsers[8]], actionItems: [] },
  { id: "m-3", title: "Office Network Modernization — Kickoff Call", organizationId: "org-10", contactIds: ["c-10a", "c-10b"], opportunityId: "opp-3", datetime: "2026-08-07T10:30:00", status: "Completed", agenda: "Understand current network pain points.", internalParticipants: [mockUsers[9]], notes: "Client wants a phased rollout starting with the HQ office.", actionItems: [{ id: "m-3-a1", label: "Send site survey checklist", done: true }] },
  { id: "m-4", title: "Branch Security Requirement Gathering", organizationId: "org-11", contactIds: ["c-11a"], datetime: "2026-08-14T14:00:00", status: "Upcoming", agenda: "Identify branches needing a surveillance and storage upgrade.", internalParticipants: [mockUsers[1]], actionItems: [] },
  { id: "m-5", title: "Security Upgrade Add-on — Scope Discussion", organizationId: "org-6", contactIds: ["c-6a", "c-6b"], opportunityId: "opp-12", datetime: "2026-08-11T16:00:00", status: "Upcoming", agenda: "Finalize scope for additional security hardening.", internalParticipants: [mockUsers[9]], actionItems: [] },
  { id: "m-6", title: "Quarterly Account Review", organizationId: "org-3", contactIds: ["c-3a"], datetime: "2026-08-05T09:00:00", status: "Completed", agenda: "Review surveillance rollout progress and support SLAs.", internalParticipants: [mockUsers[8], mockUsers[3]], notes: "Client satisfied with progress; requested faster ticket response on weekends.", actionItems: [{ id: "m-6-a1", label: "Share updated SLA document", done: false }] },
  { id: "m-7", title: "Cloud Migration Consulting — Proposal Review", organizationId: "org-10", contactIds: ["c-10a"], opportunityId: "opp-13", datetime: "2026-07-28T11:00:00", status: "Cancelled", agenda: "Review the consulting proposal.", internalParticipants: [mockUsers[9]], notes: "Client postponed indefinitely — went with an in-house team.", actionItems: [] },
  { id: "m-8", title: "Smart City — Budget Approval Follow-up", organizationId: "org-8", contactIds: ["c-8a"], opportunityId: "opp-1", datetime: "2026-08-20T13:00:00", status: "Upcoming", agenda: "Confirm municipal budget sign-off.", internalParticipants: [mockUsers[1]], actionItems: [] },
];

export function getMeetingsByOrganization(organizationId: string): MockMeeting[] {
  return mockMeetings.filter((meeting) => meeting.organizationId === organizationId);
}

// ---------------------------------------------------------------------------
// Follow-ups
// ---------------------------------------------------------------------------

export type FollowUpRelatedType = "Lead" | "Opportunity" | "Client";
export type FollowUpStatus = "Pending" | "Completed";

export type MockFollowUp = {
  id: string;
  relatedType: FollowUpRelatedType;
  relatedId: string;
  relatedLabel: string;
  organizationId: string;
  dueDate: string; // ISO date
  assignedTo: MockUser;
  status: FollowUpStatus;
  note: string;
};

export const mockFollowUps: MockFollowUp[] = [
  { id: "f-1", relatedType: "Lead", relatedId: "lead-1", relatedLabel: "Metropolitan Municipal Corporation — Smart City Surveillance", organizationId: "org-8", dueDate: "2026-08-06", assignedTo: mockUsers[1], status: "Pending", note: "Confirm camera count with the municipal engineering team." },
  { id: "f-2", relatedType: "Lead", relatedId: "lead-2", relatedLabel: "National Research Institute — Computing Upgrade", organizationId: "org-9", dueDate: "2026-08-06", assignedTo: mockUsers[8], status: "Pending", note: "Follow up on proposal feedback." },
  { id: "f-3", relatedType: "Opportunity", relatedId: "opp-12", relatedLabel: "Financial Services Client — Security Upgrade Add-on", organizationId: "org-6", dueDate: "2026-08-05", assignedTo: mockUsers[9], status: "Pending", note: "Send the revised scope document." },
  { id: "f-4", relatedType: "Lead", relatedId: "lead-4", relatedLabel: "District Cooperative Bank — Branch Security & Storage", organizationId: "org-11", dueDate: "2026-08-04", assignedTo: mockUsers[1], status: "Pending", note: "Initial qualification call." },
  { id: "f-5", relatedType: "Lead", relatedId: "lead-3", relatedLabel: "Regional IT Services Company — Office Network Modernization", organizationId: "org-10", dueDate: "2026-08-08", assignedTo: mockUsers[9], status: "Pending", note: "Share network audit findings." },
  { id: "f-6", relatedType: "Client", relatedId: "org-3", relatedLabel: "Regional Hospital Network", organizationId: "org-3", dueDate: "2026-08-12", assignedTo: mockUsers[8], status: "Pending", note: "Share updated SLA document per the review meeting." },
  { id: "f-7", relatedType: "Opportunity", relatedId: "opp-1", relatedLabel: "Metropolitan Municipal Corporation — Smart City Surveillance", organizationId: "org-8", dueDate: "2026-08-20", assignedTo: mockUsers[1], status: "Pending", note: "Confirm budget approval status." },
  { id: "f-8", relatedType: "Lead", relatedId: "lead-5", relatedLabel: "State Government Department — Data Center Upgrade", organizationId: "org-1", dueDate: "2026-04-28", assignedTo: mockUsers[1], status: "Completed", note: "Sent final commercial proposal." },
  { id: "f-9", relatedType: "Lead", relatedId: "lead-8", relatedLabel: "Enterprise Client — Manufacturing — Server Infrastructure", organizationId: "org-4", dueDate: "2026-01-20", assignedTo: mockUsers[1], status: "Completed", note: "Confirmed purchase order details with procurement." },
  { id: "f-10", relatedType: "Opportunity", relatedId: "opp-13", relatedLabel: "Regional IT Services Company — Cloud Migration Consulting", organizationId: "org-10", dueDate: "2026-07-25", assignedTo: mockUsers[9], status: "Completed", note: "Final call — client declined to proceed." },
];

/** "Today" for follow-up bucketing — kept as a function (not a stored
 * constant) so it stays honest about being derived from the current
 * date, matching src/lib/projectMetrics.ts's daysRemaining() pattern. */
export function followUpBucket(dueDate: string, today: Date = new Date()): "Today" | "Overdue" | "Upcoming" {
  const due = new Date(dueDate);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  if (startOfDue.getTime() === startOfToday.getTime()) return "Today";
  if (startOfDue.getTime() < startOfToday.getTime()) return "Overdue";
  return "Upcoming";
}

// ---------------------------------------------------------------------------
// CRM Activity Timeline
// ---------------------------------------------------------------------------

export type CrmActivityType =
  | "Lead Created"
  | "Call Logged"
  | "Meeting Scheduled"
  | "Quotation Sent"
  | "Client Updated"
  | "Project Created"
  | "Task Assigned";

export type CrmActivityItem = {
  id: string;
  type: CrmActivityType;
  actor: string;
  detail: string;
  organizationId?: string;
  timestamp: string;
};

export const mockCrmActivity: CrmActivityItem[] = [
  { id: "cact-1", type: "Lead Created", actor: "Karan Mehta", detail: "Created a lead for Metropolitan Municipal Corporation", organizationId: "org-8", timestamp: "2026-08-01T09:00:00" },
  { id: "cact-2", type: "Call Logged", actor: "Sanjana Bhatt", detail: "Logged a qualification call with National Research Institute", organizationId: "org-9", timestamp: "2026-08-02T11:30:00" },
  { id: "cact-3", type: "Meeting Scheduled", actor: "Arjun Malhotra", detail: "Scheduled a kickoff call with Regional IT Services Company", organizationId: "org-10", timestamp: "2026-08-03T10:00:00" },
  { id: "cact-4", type: "Quotation Sent", actor: "Sanjana Bhatt", detail: "Sent QTN-2026-014 for the Research Lab Computing Upgrade", organizationId: "org-9", timestamp: "2026-08-04T14:20:00" },
  { id: "cact-5", type: "Client Updated", actor: "Rohan Iyer", detail: "Updated support SLA notes for Regional Hospital Network", organizationId: "org-3", timestamp: "2026-08-05T09:20:00" },
  { id: "cact-6", type: "Meeting Scheduled", actor: "Karan Mehta", detail: "Scheduled a requirement discussion with Metropolitan Municipal Corporation", organizationId: "org-8", timestamp: "2026-08-05T13:00:00" },
  { id: "cact-7", type: "Project Created", actor: "Aditi Rao", detail: "Created project \"Disaster Recovery Setup\" from a won opportunity", organizationId: "org-6", timestamp: "2026-08-01T09:00:00" },
  { id: "cact-8", type: "Task Assigned", actor: "Fatima Sheikh", detail: "Assigned a vendor-sourcing task on Hospital Surveillance Network", organizationId: "org-3", timestamp: "2026-07-20T09:15:00" },
  { id: "cact-9", type: "Call Logged", actor: "Arjun Malhotra", detail: "Logged a follow-up call with District Cooperative Bank", organizationId: "org-11", timestamp: "2026-08-04T16:45:00" },
  { id: "cact-10", type: "Lead Created", actor: "Arjun Malhotra", detail: "Created a lead for District Cooperative Bank", organizationId: "org-11", timestamp: "2026-08-02T10:15:00" },
  { id: "cact-11", type: "Quotation Sent", actor: "Arjun Malhotra", detail: "Sent QTN-2026-027 for the Security Upgrade Add-on", organizationId: "org-6", timestamp: "2026-08-05T17:00:00" },
  { id: "cact-12", type: "Client Updated", actor: "Karan Mehta", detail: "Updated contact details for State Government Department", organizationId: "org-1", timestamp: "2026-08-01T08:30:00" },
];

export function getCrmActivityByOrganization(organizationId: string): CrmActivityItem[] {
  return mockCrmActivity.filter((item) => item.organizationId === organizationId);
}
