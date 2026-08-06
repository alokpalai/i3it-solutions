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

export type Availability = "Available" | "Busy" | "On Leave";

export type MockUser = {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  avatarUrl?: string;
  availability?: Availability;
};

export const mockUsers: MockUser[] = [
  { id: "u1", name: "Aditi Rao", initials: "AR", role: "Project Manager", department: "Delivery", availability: "Busy" },
  { id: "u2", name: "Karan Mehta", initials: "KM", role: "Sales", department: "Business Development", availability: "Available" },
  { id: "u3", name: "Fatima Sheikh", initials: "FS", role: "Procurement", department: "Sourcing", availability: "Available" },
  { id: "u4", name: "Rohan Iyer", initials: "RI", role: "Support", department: "Technical Support", availability: "Busy" },
  { id: "u5", name: "Neha Kulkarni", initials: "NK", role: "Finance", department: "Accounts", availability: "Available" },
  { id: "u6", name: "Vikram Singh", initials: "VS", role: "Employee", department: "Delivery", availability: "On Leave" },
  { id: "u7", name: "Ishaan Verma", initials: "IV", role: "Employee", department: "Delivery", availability: "Available" },
  { id: "u8", name: "Priya Nair", initials: "PN", role: "Support", department: "Technical Support", availability: "Busy" },
];

// Phase 4C's full project lifecycle — replaces Phase 4B's simpler
// On Track/At Risk/Delayed/Completed placeholder set (that was itself
// generic placeholder content, nothing tied to it elsewhere worth
// preserving). Every consumer of ProjectStatus/MockProject (ProjectCard,
// the dashboard homepage widgets) is updated alongside this.
export type ProjectStatus =
  | "Planning"
  | "Quotation"
  | "Approved"
  | "Procurement"
  | "Deployment"
  | "Testing"
  | "Training"
  | "Completed"
  | "On Hold"
  | "Cancelled";

export type ProjectHealth = "Healthy" | "Warning" | "Critical";
export type RiskLevel = "Low" | "Medium" | "High";
export type Priority = "Low" | "Medium" | "High" | "Urgent";

export type MockMilestone = { id: string; label: string; dueDate: string; done: boolean };

export type ProjectDocumentCategory =
  | "Contracts"
  | "Purchase Orders"
  | "Invoices"
  | "Delivery Notes"
  | "Warranty Documents"
  | "Certificates"
  | "Reports"
  | "Drawings"
  | "Files";

export type ProjectDocumentItem = {
  id: string;
  name: string;
  category: ProjectDocumentCategory;
  uploadedBy: string;
  uploadedAt: string;
};

export type ProjectActivityType =
  | "Project created"
  | "Member assigned"
  | "Status updated"
  | "Task completed"
  | "Document uploaded"
  | "Comment added";

export type ProjectActivityItem = {
  id: string;
  type: ProjectActivityType;
  actor: string;
  detail: string;
  timestamp: string;
};

export type MockProject = {
  id: string;
  name: string;
  client: string;
  description: string;
  projectManager: MockUser;
  team: MockUser[];
  priority: Priority;
  status: ProjectStatus;
  health: ProjectHealth;
  riskLevel: RiskLevel;
  budget: number;
  budgetUtilized: number;
  progress: number; // 0-100
  techStack: string[];
  startDate: string; // ISO date
  deadline: string; // ISO date
  updatedAt: string; // ISO date
  milestones: MockMilestone[];
  documents: ProjectDocumentItem[];
  activity: ProjectActivityItem[];
};

// Client names are generic buyer categories, not real named organizations
// — same rule the RFQ mock data already follows (docs/DECISIONS.md A13
// applies to internal mock data's realism too, not just public content).
// Budgets are in INR.
export const mockProjects: MockProject[] = [
  {
    id: "proj-1",
    name: "Government Data Center Upgrade",
    client: "State Government Department",
    description: "Server, storage and networking refresh for a departmental data center, including power backup modernization.",
    projectManager: mockUsers[0],
    team: [mockUsers[0], mockUsers[3], mockUsers[5], mockUsers[6]],
    priority: "High",
    status: "Deployment",
    health: "Warning",
    riskLevel: "Medium",
    budget: 8_500_000,
    budgetUtilized: 5_200_000,
    progress: 55,
    techStack: ["Servers", "Storage", "Networking", "Power Backup"],
    startDate: "2026-05-01",
    deadline: "2026-10-15",
    updatedAt: "2026-08-05",
    milestones: [
      { id: "proj-1-m1", label: "Requirement scoping complete", dueDate: "2026-05-20", done: true },
      { id: "proj-1-m2", label: "Hardware procured", dueDate: "2026-06-30", done: true },
      { id: "proj-1-m3", label: "Rack installation", dueDate: "2026-08-15", done: false },
      { id: "proj-1-m4", label: "Cutover & go-live", dueDate: "2026-10-01", done: false },
    ],
    documents: [
      { id: "proj-1-d1", name: "Supply Contract.pdf", category: "Contracts", uploadedBy: "Aditi Rao", uploadedAt: "2026-05-05" },
      { id: "proj-1-d2", name: "Server Purchase Order.pdf", category: "Purchase Orders", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-06-01" },
      { id: "proj-1-d3", name: "Site Readiness Report.docx", category: "Reports", uploadedBy: "Rohan Iyer", uploadedAt: "2026-07-20" },
    ],
    activity: [
      { id: "proj-1-a1", type: "Status updated", actor: "Aditi Rao", detail: "Moved to Deployment", timestamp: "2026-08-01T10:00:00" },
      { id: "proj-1-a2", type: "Member assigned", actor: "Aditi Rao", detail: "Assigned Ishaan Verma to the team", timestamp: "2026-07-28T14:30:00" },
      { id: "proj-1-a3", type: "Document uploaded", actor: "Rohan Iyer", detail: "Uploaded Site Readiness Report.docx", timestamp: "2026-07-20T09:15:00" },
    ],
  },
  {
    id: "proj-2",
    name: "University Smart Classroom Deployment",
    client: "Private University",
    description: "Interactive panels, video conferencing and campus networking for 40 classrooms.",
    projectManager: mockUsers[0],
    team: [mockUsers[0], mockUsers[5], mockUsers[3]],
    priority: "Medium",
    status: "Testing",
    health: "Healthy",
    riskLevel: "Low",
    budget: 3_200_000,
    budgetUtilized: 2_900_000,
    progress: 82,
    techStack: ["Collaboration & Display", "Networking", "Software"],
    startDate: "2026-04-10",
    deadline: "2026-08-25",
    updatedAt: "2026-08-04",
    milestones: [
      { id: "proj-2-m1", label: "Classroom survey complete", dueDate: "2026-04-25", done: true },
      { id: "proj-2-m2", label: "Panels & AV installed", dueDate: "2026-07-01", done: true },
      { id: "proj-2-m3", label: "Network testing", dueDate: "2026-08-10", done: false },
      { id: "proj-2-m4", label: "Faculty training", dueDate: "2026-08-22", done: false },
    ],
    documents: [
      { id: "proj-2-d1", name: "Installation Certificate — Block A.pdf", category: "Certificates", uploadedBy: "Vikram Singh", uploadedAt: "2026-07-15" },
      { id: "proj-2-d2", name: "Delivery Note — AV Equipment.pdf", category: "Delivery Notes", uploadedBy: "Rohan Iyer", uploadedAt: "2026-06-20" },
    ],
    activity: [
      { id: "proj-2-a1", type: "Task completed", actor: "Vikram Singh", detail: "Completed panel installation for Block B", timestamp: "2026-08-03T16:00:00" },
      { id: "proj-2-a2", type: "Status updated", actor: "Aditi Rao", detail: "Moved to Testing", timestamp: "2026-08-01T11:20:00" },
    ],
  },
  {
    id: "proj-3",
    name: "Hospital Surveillance Network",
    client: "Regional Hospital Network",
    description: "CCTV and access-control deployment across three hospital campuses.",
    projectManager: mockUsers[2],
    team: [mockUsers[2], mockUsers[3]],
    priority: "High",
    status: "Procurement",
    health: "Warning",
    riskLevel: "Medium",
    budget: 4_100_000,
    budgetUtilized: 900_000,
    progress: 25,
    techStack: ["Surveillance & Security", "Networking"],
    startDate: "2026-07-01",
    deadline: "2026-11-30",
    updatedAt: "2026-08-04",
    milestones: [
      { id: "proj-3-m1", label: "Requirement finalized", dueDate: "2026-07-15", done: true },
      { id: "proj-3-m2", label: "Vendor quotes received", dueDate: "2026-08-10", done: false },
      { id: "proj-3-m3", label: "Purchase order issued", dueDate: "2026-08-25", done: false },
    ],
    documents: [
      { id: "proj-3-d1", name: "Camera Vendor Quotation.pdf", category: "Purchase Orders", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-08-02" },
    ],
    activity: [
      { id: "proj-3-a1", type: "Comment added", actor: "Fatima Sheikh", detail: "Requested revised pricing from two vendors", timestamp: "2026-08-04T13:45:00" },
      { id: "proj-3-a2", type: "Project created", actor: "Aditi Rao", detail: "Project created", timestamp: "2026-07-01T09:00:00" },
    ],
  },
  {
    id: "proj-4",
    name: "Enterprise Server Infrastructure",
    client: "Enterprise Client — Manufacturing",
    description: "Server and storage consolidation for a manufacturing client's head office.",
    projectManager: mockUsers[0],
    team: [mockUsers[0], mockUsers[3], mockUsers[5]],
    priority: "Medium",
    status: "Completed",
    health: "Healthy",
    riskLevel: "Low",
    budget: 6_000_000,
    budgetUtilized: 5_850_000,
    progress: 100,
    techStack: ["Servers", "Storage"],
    startDate: "2026-02-01",
    deadline: "2026-06-30",
    updatedAt: "2026-06-28",
    milestones: [
      { id: "proj-4-m1", label: "Hardware delivered", dueDate: "2026-03-15", done: true },
      { id: "proj-4-m2", label: "Migration complete", dueDate: "2026-05-30", done: true },
      { id: "proj-4-m3", label: "Sign-off", dueDate: "2026-06-28", done: true },
    ],
    documents: [
      { id: "proj-4-d1", name: "Final Handover Report.pdf", category: "Reports", uploadedBy: "Rohan Iyer", uploadedAt: "2026-06-28" },
      { id: "proj-4-d2", name: "Warranty — Server Hardware.pdf", category: "Warranty Documents", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-06-28" },
    ],
    activity: [
      { id: "proj-4-a1", type: "Status updated", actor: "Aditi Rao", detail: "Marked Completed", timestamp: "2026-06-28T17:00:00" },
    ],
  },
  {
    id: "proj-5",
    name: "Campus Wi-Fi Deployment",
    client: "Public University Campus",
    description: "Campus-wide wireless access point rollout across academic and hostel blocks.",
    projectManager: mockUsers[0],
    team: [mockUsers[0], mockUsers[5]],
    priority: "Low",
    status: "Training",
    health: "Healthy",
    riskLevel: "Low",
    budget: 1_800_000,
    budgetUtilized: 1_700_000,
    progress: 90,
    techStack: ["Networking"],
    startDate: "2026-05-15",
    deadline: "2026-08-20",
    updatedAt: "2026-08-02",
    milestones: [
      { id: "proj-5-m1", label: "Access points installed", dueDate: "2026-07-10", done: true },
      { id: "proj-5-m2", label: "Coverage testing", dueDate: "2026-07-25", done: true },
      { id: "proj-5-m3", label: "IT staff training", dueDate: "2026-08-18", done: false },
    ],
    documents: [
      { id: "proj-5-d1", name: "Coverage Test Report.pdf", category: "Reports", uploadedBy: "Vikram Singh", uploadedAt: "2026-07-26" },
    ],
    activity: [
      { id: "proj-5-a1", type: "Task completed", actor: "Vikram Singh", detail: "Completed coverage testing for hostel blocks", timestamp: "2026-07-25T15:00:00" },
    ],
  },
  {
    id: "proj-6",
    name: "Disaster Recovery Setup",
    client: "Financial Services Client",
    description: "Secondary-site backup and disaster recovery infrastructure for core systems.",
    projectManager: mockUsers[0],
    team: [mockUsers[0], mockUsers[2]],
    priority: "Urgent",
    status: "Planning",
    health: "Critical",
    riskLevel: "High",
    budget: 5_500_000,
    budgetUtilized: 150_000,
    progress: 8,
    techStack: ["Storage", "Servers", "Power Backup"],
    startDate: "2026-08-01",
    deadline: "2026-12-15",
    updatedAt: "2026-08-05",
    milestones: [
      { id: "proj-6-m1", label: "Requirement & risk assessment", dueDate: "2026-08-20", done: false },
      { id: "proj-6-m2", label: "Solution design approved", dueDate: "2026-09-10", done: false },
    ],
    documents: [],
    activity: [
      { id: "proj-6-a1", type: "Project created", actor: "Aditi Rao", detail: "Project created", timestamp: "2026-08-01T09:00:00" },
    ],
  },
  {
    id: "proj-7",
    name: "Power Backup Modernization",
    client: "State Power Utility",
    description: "UPS and voltage stabilizer replacement across regional office buildings.",
    projectManager: mockUsers[2],
    team: [mockUsers[2], mockUsers[3]],
    priority: "Medium",
    status: "On Hold",
    health: "Critical",
    riskLevel: "High",
    budget: 2_700_000,
    budgetUtilized: 800_000,
    progress: 30,
    techStack: ["Power Backup"],
    startDate: "2026-06-01",
    deadline: "2026-10-01",
    updatedAt: "2026-07-30",
    milestones: [
      { id: "proj-7-m1", label: "Site assessment complete", dueDate: "2026-06-20", done: true },
      { id: "proj-7-m2", label: "Budget re-approval", dueDate: "2026-08-15", done: false },
    ],
    documents: [
      { id: "proj-7-d1", name: "Site Assessment Report.pdf", category: "Reports", uploadedBy: "Fatima Sheikh", uploadedAt: "2026-06-20" },
    ],
    activity: [
      { id: "proj-7-a1", type: "Status updated", actor: "Fatima Sheikh", detail: "Moved to On Hold pending budget re-approval", timestamp: "2026-07-30T12:00:00" },
    ],
  },
];

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";

// Kanban columns, Phase 4C brief: To Do / In Progress / Review / Blocked /
// Completed. Renamed from Phase 4B's "In Review"/"Done" and added
// "Blocked" so the personal task list (/dashboard/tasks) and the
// project task board (/dashboard/projects/[id]/tasks) share one
// vocabulary instead of two slightly different ones.
export type TaskStatus = "To Do" | "In Progress" | "Review" | "Blocked" | "Completed";

export type Subtask = { id: string; label: string; done: boolean };

export type MockTask = {
  id: string;
  projectId: string;
  /** Display name kept alongside projectId — existing consumers
   * (src/components/dashboard/TaskTable.tsx) render this directly rather
   * than looking the project up by id. */
  project: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedBy: string;
  assignee: MockUser;
  progress: number;
  subtasks: Subtask[];
  /** IDs of other tasks this one depends on. */
  dependsOn: string[];
  /** "Comments Architecture" per the brief — a count only, no real
   * comment thread exists yet (same pattern as Messages: architecture,
   * not a working backend). */
  commentsCount: number;
};

export const mockTasks: MockTask[] = [
  { id: "t1", projectId: "proj-1", project: "Government Data Center Upgrade", title: "Configure new access switches", description: "Configure and stack the new access-layer switches for the primary data hall.", priority: "High", status: "In Progress", dueDate: "2026-08-10", assignedBy: "Aditi Rao", assignee: mockUsers[3], progress: 60, subtasks: [{ id: "t1-s1", label: "Rack switches", done: true }, { id: "t1-s2", label: "Apply base config", done: true }, { id: "t1-s3", label: "Stack & test uplinks", done: false }], dependsOn: [], commentsCount: 3 },
  { id: "t2", projectId: "proj-1", project: "Government Data Center Upgrade", title: "Install rack PDUs", priority: "Medium", status: "To Do", dueDate: "2026-08-14", assignedBy: "Aditi Rao", assignee: mockUsers[6], progress: 0, subtasks: [], dependsOn: ["t1"], commentsCount: 0 },
  { id: "t3", projectId: "proj-1", project: "Government Data Center Upgrade", title: "Migrate storage volumes", priority: "Urgent", status: "Blocked", dueDate: "2026-08-06", assignedBy: "Aditi Rao", assignee: mockUsers[3], progress: 20, subtasks: [], dependsOn: [], commentsCount: 5 },
  { id: "t4", projectId: "proj-1", project: "Government Data Center Upgrade", title: "Site power readiness sign-off", priority: "High", status: "Review", dueDate: "2026-08-08", assignedBy: "Aditi Rao", assignee: mockUsers[0], progress: 90, subtasks: [], dependsOn: [], commentsCount: 1 },

  { id: "t5", projectId: "proj-2", project: "University Smart Classroom Deployment", title: "Test video conferencing in Block B", priority: "Medium", status: "In Progress", dueDate: "2026-08-09", assignedBy: "Aditi Rao", assignee: mockUsers[5], progress: 50, subtasks: [{ id: "t5-s1", label: "Test 5 rooms", done: true }, { id: "t5-s2", label: "Test remaining 8 rooms", done: false }], dependsOn: [], commentsCount: 2 },
  { id: "t6", projectId: "proj-2", project: "University Smart Classroom Deployment", title: "Prepare faculty training material", priority: "Low", status: "To Do", dueDate: "2026-08-18", assignedBy: "Aditi Rao", assignee: mockUsers[0], progress: 0, subtasks: [], dependsOn: [], commentsCount: 0 },
  { id: "t7", projectId: "proj-2", project: "University Smart Classroom Deployment", title: "Install panels — Block C", priority: "Medium", status: "Completed", dueDate: "2026-07-28", assignedBy: "Aditi Rao", assignee: mockUsers[3], progress: 100, subtasks: [], dependsOn: [], commentsCount: 1 },

  { id: "t8", projectId: "proj-3", project: "Hospital Surveillance Network", title: "Collect vendor quotations", priority: "High", status: "Review", dueDate: "2026-08-07", assignedBy: "Fatima Sheikh", assignee: mockUsers[2], progress: 75, subtasks: [], dependsOn: [], commentsCount: 4 },
  { id: "t9", projectId: "proj-3", project: "Hospital Surveillance Network", title: "Draft camera placement plan", priority: "Medium", status: "In Progress", dueDate: "2026-08-13", assignedBy: "Fatima Sheikh", assignee: mockUsers[3], progress: 30, subtasks: [], dependsOn: [], commentsCount: 0 },

  { id: "t10", projectId: "proj-4", project: "Enterprise Server Infrastructure", title: "Prepare handover documentation", priority: "Low", status: "Completed", dueDate: "2026-06-27", assignedBy: "Rohan Iyer", assignee: mockUsers[3], progress: 100, subtasks: [], dependsOn: [], commentsCount: 2 },

  { id: "t11", projectId: "proj-5", project: "Campus Wi-Fi Deployment", title: "Train IT staff on controller dashboard", priority: "Medium", status: "In Progress", dueDate: "2026-08-16", assignedBy: "Aditi Rao", assignee: mockUsers[5], progress: 40, subtasks: [], dependsOn: [], commentsCount: 1 },
  { id: "t12", projectId: "proj-5", project: "Campus Wi-Fi Deployment", title: "Coverage test — hostel blocks", priority: "Medium", status: "Completed", dueDate: "2026-07-25", assignedBy: "Aditi Rao", assignee: mockUsers[5], progress: 100, subtasks: [], dependsOn: [], commentsCount: 0 },

  { id: "t13", projectId: "proj-6", project: "Disaster Recovery Setup", title: "Draft risk assessment", priority: "Urgent", status: "To Do", dueDate: "2026-08-15", assignedBy: "Aditi Rao", assignee: mockUsers[0], progress: 0, subtasks: [], dependsOn: [], commentsCount: 0 },
  { id: "t14", projectId: "proj-6", project: "Disaster Recovery Setup", title: "Shortlist secondary site vendors", priority: "High", status: "To Do", dueDate: "2026-08-20", assignedBy: "Aditi Rao", assignee: mockUsers[2], progress: 0, subtasks: [], dependsOn: ["t13"], commentsCount: 0 },

  { id: "t15", projectId: "proj-7", project: "Power Backup Modernization", title: "Re-submit budget for approval", priority: "High", status: "Blocked", dueDate: "2026-08-12", assignedBy: "Fatima Sheikh", assignee: mockUsers[2], progress: 10, subtasks: [], dependsOn: [], commentsCount: 2 },
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
  { id: "n2", title: "Project status updated", message: "Hospital Surveillance Network was marked At Risk.", category: "Project", priority: "High", read: false, date: "2026-08-04T16:40:00" },
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
  { id: "e1", title: "Hospital Surveillance Network kickoff", date: "2026-08-06", type: "Meeting" },
  { id: "e2", title: "Q3 vendor invoices due", date: "2026-08-06", type: "Deadline" },
  { id: "e3", title: "Configure new access points", date: "2026-08-10", type: "Task" },
  { id: "e4", title: "Test failover on new switches", date: "2026-08-11", type: "Task" },
  { id: "e5", title: "Fatima Sheikh — leave", date: "2026-08-12", type: "Leave" },
  { id: "e6", title: "Team sync", date: "2026-08-13", type: "Meeting" },
  { id: "e7", title: "Neha Kulkarni's birthday", date: "2026-08-19", type: "Birthday" },
  { id: "e8", title: "Hospital Surveillance Network due", date: "2026-08-30", type: "Deadline" },
];

export type MockDocument = {
  id: string;
  name: string;
  category: string;
  updatedAt: string;
  project?: string;
};

export const mockDocuments: MockDocument[] = [
  { id: "d1", name: "Network Refresh — Site Survey.pdf", category: "Technical", updatedAt: "2026-08-03", project: "Government Data Center Upgrade" },
  { id: "d2", name: "Client Onboarding — Requirements.docx", category: "Planning", updatedAt: "2026-08-02", project: "Hospital Surveillance Network" },
  { id: "d3", name: "Q3 Vendor Invoices.xlsx", category: "Finance", updatedAt: "2026-08-04", project: "Power Backup Modernization" },
  { id: "d4", name: "Server Room Handover Notes.pdf", category: "Technical", updatedAt: "2026-07-09", project: "Enterprise Server Infrastructure" },
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
  { id: "act1", actor: "Aditi Rao", action: "updated status on", target: "Government Data Center Upgrade", timestamp: "2026-08-05T08:40:00" },
  { id: "act2", actor: "Neha Kulkarni", action: "uploaded a document to", target: "Power Backup Modernization", timestamp: "2026-08-04T17:10:00" },
  { id: "act3", actor: "Karan Mehta", action: "sent a message about", target: "Hospital Surveillance Network", timestamp: "2026-08-04T11:05:00" },
  { id: "act4", actor: "You", action: "completed a task on", target: "Enterprise Server Infrastructure", timestamp: "2026-07-09T15:22:00" },
  { id: "act5", actor: "Fatima Sheikh", action: "requested a quote from", target: "Regional hospital network", timestamp: "2026-08-04T09:50:00" },
];
