import type { Metadata } from "next";
import { MessagesInbox } from "@/components/dashboard/MessagesInbox";
import { mockConversations } from "@/config/dashboardMockData";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Messages</h1>
        <p className="text-body-sm text-muted-foreground">
          Internal messaging architecture — not yet connected to a live backend.
        </p>
      </div>

      <MessagesInbox conversations={mockConversations} />
    </div>
  );
}
