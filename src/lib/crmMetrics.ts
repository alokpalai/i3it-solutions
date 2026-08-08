import {
  mockOrganizations,
  mockLeads,
  mockOpportunities,
  mockMeetings,
  mockFollowUps,
  mockQuotations,
  followUpBucket,
  salesExecutives,
  getCrmActivityByOrganization,
  getMeetingsByOrganization,
  getQuotationsByOrganization,
  type MockOrganization,
  type LeadSource,
  type Industry,
  type PipelineStage,
  type LeadStatus,
} from "@/config/crmMockData";
import { mockProjects, type MockProject } from "@/config/dashboardMockData";

export function getProjectsByOrganization(organization: MockOrganization): MockProject[] {
  return mockProjects.filter((project) => organization.associatedProjectIds.includes(project.id));
}

/** A Client's "Associated Documents" — the union of documents from every
 * project linked to the organization, rather than a separate duplicate
 * document list. */
export function getDocumentsByOrganization(organization: MockOrganization) {
  return getProjectsByOrganization(organization).flatMap((project) =>
    project.documents.map((doc) => ({ ...doc, projectName: project.name })),
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// CRM dashboard KPIs
// ---------------------------------------------------------------------------

const ACTIVE_PIPELINE_STAGES: PipelineStage[] = ["Lead", "Qualified", "Meeting Scheduled", "Proposal Sent", "Negotiation"];

export function crmDashboardKpis(today: Date = new Date()) {
  const totalLeads = mockLeads.length;
  const qualifiedLeads = mockLeads.filter((lead) => lead.status === "Qualified").length;
  const activeOpportunities = mockOpportunities.filter((opp) => ACTIVE_PIPELINE_STAGES.includes(opp.stage)).length;
  const clients = mockOrganizations.filter((org) => org.relationship === "Client").length;

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 86_400_000);
  const meetingsToday = mockMeetings.filter((meeting) => {
    const at = new Date(meeting.datetime).getTime();
    return meeting.status === "Upcoming" && at >= startOfToday.getTime() && at < endOfToday.getTime();
  }).length;

  const followUpsDue = mockFollowUps.filter(
    (followUp) => followUp.status === "Pending" && followUpBucket(followUp.dueDate, today) !== "Upcoming",
  ).length;

  const revenuePipeline = mockOpportunities
    .filter((opp) => ACTIVE_PIPELINE_STAGES.includes(opp.stage))
    .reduce((sum, opp) => sum + opp.expectedRevenue, 0);

  const won = mockLeads.filter((lead) => lead.status === "Won").length;
  const closed = mockLeads.filter((lead) => lead.status === "Won" || lead.status === "Lost").length;
  const conversionRate = closed === 0 ? 0 : Math.round((won / closed) * 100);

  return { totalLeads, qualifiedLeads, activeOpportunities, clients, meetingsToday, followUpsDue, revenuePipeline, conversionRate };
}

// ---------------------------------------------------------------------------
// Reports (mock calculations only, computed from the mock datasets rather
// than hand-authored a second time — same reasoning as
// src/lib/projectMetrics.ts's computeProjectHealth).
// ---------------------------------------------------------------------------

export function leadSourceDistribution(): { source: LeadSource; count: number }[] {
  const counts = new Map<LeadSource, number>();
  for (const lead of mockLeads) counts.set(lead.source, (counts.get(lead.source) ?? 0) + 1);
  return Array.from(counts.entries()).map(([source, count]) => ({ source, count }));
}

export function industryDistribution(): { industry: Industry; count: number }[] {
  const counts = new Map<Industry, number>();
  for (const org of mockOrganizations) counts.set(org.industry, (counts.get(org.industry) ?? 0) + 1);
  return Array.from(counts.entries()).map(([industry, count]) => ({ industry, count }));
}

const FUNNEL_STAGES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won"];

export function conversionFunnel(): { stage: LeadStatus; count: number }[] {
  return FUNNEL_STAGES.map((stage) => ({ stage, count: mockLeads.filter((lead) => lead.status === stage).length }));
}

export function pipelineByStage(): { stage: PipelineStage; count: number; value: number }[] {
  const stages: PipelineStage[] = ["Lead", "Qualified", "Meeting Scheduled", "Proposal Sent", "Negotiation", "Won", "Lost"];
  return stages.map((stage) => {
    const inStage = mockOpportunities.filter((opp) => opp.stage === stage);
    return { stage, count: inStage.length, value: inStage.reduce((sum, opp) => sum + opp.expectedRevenue, 0) };
  });
}

export function monthlyOpportunities(): { month: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const opp of mockOpportunities) {
    const date = new Date(opp.createdAt);
    const key = date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([month, count]) => ({ month, count, sortKey: new Date(`1 ${month}`).getTime() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ month, count }) => ({ month, count }));
}

export function wonVsLost(): { won: number; lost: number } {
  return {
    won: mockOpportunities.filter((opp) => opp.stage === "Won").length,
    lost: mockOpportunities.filter((opp) => opp.stage === "Lost").length,
  };
}

/** "Sales Performance" dashboard widget — per-executive won revenue and
 * deal counts, computed from the same opportunity records the pipeline
 * and reports use (no separate hand-authored leaderboard to drift out
 * of sync). */
export function salesPerformance() {
  return salesExecutives.map((executive) => {
    const own = mockOpportunities.filter((opp) => opp.assignedTo.id === executive.id);
    const won = own.filter((opp) => opp.stage === "Won");
    const active = own.filter((opp) => ACTIVE_PIPELINE_STAGES.includes(opp.stage));
    return {
      executive,
      wonCount: won.length,
      wonRevenue: won.reduce((sum, opp) => sum + opp.expectedRevenue, 0),
      activeCount: active.length,
      activeRevenue: active.reduce((sum, opp) => sum + opp.expectedRevenue, 0),
    };
  });
}

export type OrganizationTimelineEntry = {
  id: string;
  kind: "Activity" | "Meeting" | "Quotation";
  label: string;
  timestamp: string;
};

/** Unified chronological feed for an Organization's "Timeline" tab —
 * merges CRM activity log entries, meetings and quotations for that
 * organization into one sorted list, rather than a fourth hand-authored
 * dataset that would inevitably drift from the other three. */
export function getOrganizationTimeline(organizationId: string): OrganizationTimelineEntry[] {
  const activity: OrganizationTimelineEntry[] = getCrmActivityByOrganization(organizationId).map((item) => ({
    id: item.id,
    kind: "Activity",
    label: `${item.type} — ${item.detail}`,
    timestamp: item.timestamp,
  }));

  const meetings: OrganizationTimelineEntry[] = getMeetingsByOrganization(organizationId).map((meeting) => ({
    id: meeting.id,
    kind: "Meeting",
    label: `${meeting.status} meeting — ${meeting.title}`,
    timestamp: meeting.datetime,
  }));

  const quotations: OrganizationTimelineEntry[] = getQuotationsByOrganization(organizationId).map((quotation) => ({
    id: quotation.id,
    kind: "Quotation",
    label: `Quotation ${quotation.quotationNumber} ${quotation.status.toLowerCase()} (${formatCurrency(quotation.amount)})`,
    timestamp: quotation.sentDate ?? quotation.validUntil,
  }));

  return [...activity, ...meetings, ...quotations].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export { getOrganizationById, getProjectForOpportunity, getQuotationsByOrganization, getMeetingsByOrganization, getCrmActivityByOrganization } from "@/config/crmMockData";
export { mockQuotations };
