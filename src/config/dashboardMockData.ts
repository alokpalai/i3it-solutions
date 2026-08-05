// Mock data for the internal employee dashboard — Phase 4B brief:
// "Create structured mock datasets." This is deliberately fictional
// demo/sample content for an authenticated internal tool's UI, not a
// public-facing claim about the company — a different context entirely
// from the marketing site's strict content-verification rules
// (docs/CONTENT_STRATEGY.md governs public pages, not this). No real
// client, employee, or project name appears anywhere below.
//
// None of this is backed by the database yet — Tasks/Projects/Messages/
// etc. have no Prisma models (only User/Role/Permission/Session exist,
// Phase 4A). Wiring this dashboard to real data is Phase 4C+ scope;
// this file is what every /dashboard/* page renders from today.

export type MockUser = {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  avatarUrl?: string;
};

export const mockUsers: MockUser[] = [
  { id: "u1", name: "Aditi Rao", initials: "AR", role: "Project Manager", department: "Delivery" },
  { id: "u2", name: "Karan Mehta", initials: "KM", role: "Sales", department: "Business Development" },
  { id: "u3", name: "Fatima Sheikh", initials: "FS", role: "Procurement", department: "Sourcing" },
  { id: "u4", name: "Rohan Iyer", initials: "RI", role: "Support", department: "Technical Support" },
  { id: "u5", name: "Neha Kulkarni", initials: "NK", role: "Finance", department: "Accounts" },
  { id: "u6", name: "Vikram Singh", initials: "VS", role: "Employee", department: "Delivery" },
];

export type ProjectStatus = "On Track" | "At Risk" | "Delayed" | "Completed";

export type MockMilestone = { label: string; done: boolean };

export type MockProject = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0-100
  deadline: string; // ISO date
  team: MockUser[];
  milestones: MockMilestone[];
};

export const mockProjects: MockProject[] = [
  {
    id: "p1",
    name: "Network Infrastructure Refresh",
    description: "Switch and access-point replacement across three office locations.",
    status: "On Track",
    progress: 65,
    deadline: "2026-09-15",
    team: [mockUsers[0], mockUsers[3], mockUsers[5]],
    milestones: [
      { label: "Site survey complete", done: true },
      { label: "Hardware procured", done: true },
      { label: "Phase 1 installation", done: false },
      { label: "Final handover", done: false },
    ],
  },
  {
    id: "p2",
    name: "Client Onboarding Portal",
    description: "Internal tool for tracking new client setup and documentation.",
    status: "At Risk",
    progress: 40,
    deadline: "2026-08-30",
    team: [mockUsers[0], mockUsers[1]],
    milestones: [
      { label: "Requirements finalized", done: true },
      { label: "Design review", done: true },
      { label: "Development", done: false },
    ],
  },
  {
    id: "p3",
    name: "Server Room Cooling Upgrade",
    description: "Precision cooling installation for the primary server room.",
    status: "Completed",
    progress: 100,
    deadline: "2026-07-10",
    team: [mockUsers[3], mockUsers[5]],
    milestones: [
      { label: "Vendor selected", done: true },
      { label: "Installation", done: true },
      { label: "Testing & sign-off", done: true },
    ],
  },
  {
    id: "p4",
    name: "Q3 Procurement Documentation Audit",
    description: "Reviewing quotation and invoice records for the current quarter.",
    status: "Delayed",
    progress: 20,
    deadline: "2026-08-05",
    team: [mockUsers[2], mockUsers[4]],
    milestones: [
      { label: "Records collected", done: true },
      { label: "Review complete", done: false },
    ],
  },
];

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Done";

export type MockTask = {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedBy: string;
  project: string;
  progress: number;
};

export const mockTasks: MockTask[] = [
  { id: "t1", title: "Configure new access points", priority: "High", status: "In Progress", dueDate: "2026-08-10", assignedBy: "Aditi Rao", project: "Network Infrastructure Refresh", progress: 60 },
  { id: "t2", title: "Draft onboarding checklist template", priority: "Medium", status: "To Do", dueDate: "2026-08-14", assignedBy: "Aditi Rao", project: "Client Onboarding Portal", progress: 0 },
  { id: "t3", title: "Review Q3 vendor invoices", priority: "Urgent", status: "In Review", dueDate: "2026-08-06", assignedBy: "Neha Kulkarni", project: "Q3 Procurement Documentation Audit", progress: 80 },
  { id: "t4", title: "Prepare handover documentation", priority: "Low", status: "Done", dueDate: "2026-07-09", assignedBy: "Rohan Iyer", project: "Server Room Cooling Upgrade", progress: 100 },
  { id: "t5", title: "Schedule client kickoff call", priority: "Medium", status: "To Do", dueDate: "2026-08-12", assignedBy: "Karan Mehta", project: "Client Onboarding Portal", progress: 0 },
  { id: "t6", title: "Test failover on new switches", priority: "High", status: "In Progress", dueDate: "2026-08-11", assignedBy: "Aditi Rao", project: "Network Infrastructure Refresh", progress: 35 },
  { id: "t7", title: "Reconcile procurement ledger", priority: "Medium", status: "To Do", dueDate: "2026-08-18", assignedBy: "Neha Kulkarni", project: "Q3 Procurement Documentation Audit", progress: 10 },
];

export type NotificationCategory = "Task" | "Project" | "Message" | "System" | "Announcement";

export type MockNotification = {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: "Normal" | "High";
  read: boolean;
  date: string; // ISO datetime
};

export const mockNotifications: MockNotification[] = [
  { id: "n1", title: "Task due tomorrow", message: "\"Configure new access points\" is due Aug 10.", category: "Task", priority: "High", read: false, date: "2026-08-05T09:15:00" },
  { id: "n2", title: "Project status updated", message: "Client Onboarding Portal was marked At Risk.", category: "Project", priority: "High", read: false, date: "2026-08-04T16:40:00" },
  { id: "n3", title: "New message from Karan Mehta", message: "\"Can we move the kickoff call to Thursday?\"", category: "Message", priority: "Normal", read: false, date: "2026-08-04T11:05:00" },
  { id: "n4", title: "Password changed", message: "Your account password was changed successfully.", category: "System", priority: "Normal", read: true, date: "2026-08-02T14:22:00" },
  { id: "n5", title: "Company announcement", message: "Office closed Aug 15 for a public holiday.", category: "Announcement", priority: "Normal", read: true, date: "2026-08-01T08:00:00" },
];

export type MockConversation = {
  id: string;
  participant: MockUser;
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
};

export const mockConversations: MockConversation[] = [
  { id: "c1", participant: mockUsers[1], lastMessage: "Can we move the kickoff call to Thursday?", unreadCount: 2, timestamp: "2026-08-04T11:05:00" },
  { id: "c2", participant: mockUsers[0], lastMessage: "Sent over the updated project timeline.", unreadCount: 0, timestamp: "2026-08-03T17:30:00" },
  { id: "c3", participant: mockUsers[4], lastMessage: "Invoices for Q3 are ready for your review.", unreadCount: 1, timestamp: "2026-08-03T09:12:00" },
  { id: "c4", participant: mockUsers[2], lastMessage: "Thanks, that resolves it.", unreadCount: 0, timestamp: "2026-07-30T15:47:00" },
];

export type MockAnnouncement = {
  id: string;
  title: string;
  body: string;
  date: string;
  category: string;
};

export const mockAnnouncements: MockAnnouncement[] = [
  { id: "a1", title: "Office closed for public holiday", body: "The office will be closed on August 15. Support requests will be picked up the next working day.", date: "2026-08-01", category: "Office" },
  { id: "a2", title: "New expense reporting process", body: "Starting this month, expense claims are routed through Finance for review before approval.", date: "2026-07-28", category: "Process" },
];

export type CalendarEventType = "Meeting" | "Deadline" | "Task" | "Leave" | "Birthday";

export type MockCalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO date
  type: CalendarEventType;
};

export const mockCalendarEvents: MockCalendarEvent[] = [
  { id: "e1", title: "Client Onboarding Portal kickoff", date: "2026-08-06", type: "Meeting" },
  { id: "e2", title: "Q3 vendor invoices due", date: "2026-08-06", type: "Deadline" },
  { id: "e3", title: "Configure new access points", date: "2026-08-10", type: "Task" },
  { id: "e4", title: "Test failover on new switches", date: "2026-08-11", type: "Task" },
  { id: "e5", title: "Fatima Sheikh — leave", date: "2026-08-12", type: "Leave" },
  { id: "e6", title: "Team sync", date: "2026-08-13", type: "Meeting" },
  { id: "e7", title: "Neha Kulkarni's birthday", date: "2026-08-19", type: "Birthday" },
  { id: "e8", title: "Client Onboarding Portal due", date: "2026-08-30", type: "Deadline" },
];

export type MockDocument = {
  id: string;
  name: string;
  category: string;
  updatedAt: string;
  project?: string;
};

export const mockDocuments: MockDocument[] = [
  { id: "d1", name: "Network Refresh — Site Survey.pdf", category: "Technical", updatedAt: "2026-08-03", project: "Network Infrastructure Refresh" },
  { id: "d2", name: "Client Onboarding — Requirements.docx", category: "Planning", updatedAt: "2026-08-02", project: "Client Onboarding Portal" },
  { id: "d3", name: "Q3 Vendor Invoices.xlsx", category: "Finance", updatedAt: "2026-08-04", project: "Q3 Procurement Documentation Audit" },
  { id: "d4", name: "Server Room Handover Notes.pdf", category: "Technical", updatedAt: "2026-07-09", project: "Server Room Cooling Upgrade" },
];

export type MockRfq = {
  id: string;
  organization: string;
  requirement: string;
  status: "New" | "Quoted" | "Won" | "Lost";
  date: string;
};

export const mockRfqs: MockRfq[] = [
  { id: "r1", organization: "State education department", requirement: "Laptop procurement — 120 units", status: "Quoted", date: "2026-08-03" },
  { id: "r2", organization: "Regional hospital network", requirement: "Network switches & cabling", status: "New", date: "2026-08-04" },
  { id: "r3", organization: "District municipal office", requirement: "CCTV surveillance system", status: "Won", date: "2026-07-29" },
];

export type MockActivityItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export const mockActivity: MockActivityItem[] = [
  { id: "act1", actor: "Aditi Rao", action: "updated status on", target: "Network Infrastructure Refresh", timestamp: "2026-08-05T08:40:00" },
  { id: "act2", actor: "Neha Kulkarni", action: "uploaded a document to", target: "Q3 Procurement Documentation Audit", timestamp: "2026-08-04T17:10:00" },
  { id: "act3", actor: "Karan Mehta", action: "sent a message about", target: "Client Onboarding Portal", timestamp: "2026-08-04T11:05:00" },
  { id: "act4", actor: "You", action: "completed a task on", target: "Server Room Cooling Upgrade", timestamp: "2026-07-09T15:22:00" },
  { id: "act5", actor: "Fatima Sheikh", action: "requested a quote from", target: "Regional hospital network", timestamp: "2026-08-04T09:50:00" },
];
