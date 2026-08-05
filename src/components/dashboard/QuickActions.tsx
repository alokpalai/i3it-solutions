import Link from "next/link";
import { PlusCircle, FileText, CalendarPlus, MessageSquarePlus } from "lucide-react";

const ACTIONS = [
  { label: "New task", href: "/dashboard/tasks", icon: PlusCircle },
  { label: "New document", href: "/dashboard/documents", icon: FileText },
  { label: "Schedule meeting", href: "/dashboard/calendar", icon: CalendarPlus },
  { label: "New message", href: "/dashboard/messages", icon: MessageSquarePlus },
];

// Links into the relevant section rather than opening a real "create"
// flow — none of Tasks/Documents/Calendar/Messages have a backend to
// create anything against yet (Phase 4C+).
export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ACTIONS.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex flex-col items-center gap-2 rounded-md border border-border px-3 py-4 text-center transition-colors hover:border-secondary hover:bg-surface"
        >
          <action.icon aria-hidden="true" className="h-5 w-5 text-secondary" />
          <span className="text-caption font-medium text-foreground">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
