"use client";

import { useState } from "react";
import { Search, Send } from "lucide-react";
import type { MockConversation } from "@/config/dashboardMockData";
import { formatRelativeTime } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

// Inbox UI only — "No backend yet. Architecture only" per the brief.
// Selecting a conversation shows its last known mock message; there's no
// message store to actually send into, so the composer says so rather
// than pretending to work (same honest pattern as AvatarUploader).
export function MessagesInbox({ conversations }: { conversations: MockConversation[] }) {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? null);
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="grid gap-0 overflow-hidden rounded-md border border-border lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
        <div className="relative border-b border-border p-3">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Search conversations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search conversations"
            className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-body-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <ul className="max-h-[28rem] overflow-y-auto lg:max-h-[32rem]">
          {filtered.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => setSelectedId(conversation.id)}
                aria-current={selectedId === conversation.id ? "true" : undefined}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface",
                  selectedId === conversation.id && "bg-surface-muted",
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-caption font-semibold text-primary">
                  {conversation.participant.initials}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-body-sm font-medium text-foreground">
                      {conversation.participant.name}
                    </span>
                    <span className="shrink-0 text-caption text-muted-foreground">
                      {formatRelativeTime(conversation.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-caption text-muted-foreground">
                      {conversation.lastMessage}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        {selected ? (
          <>
            <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-caption font-semibold text-primary">
                {selected.participant.initials}
              </span>
              <div className="flex flex-col">
                <span className="text-body-sm font-medium text-foreground">{selected.participant.name}</span>
                <span className="text-caption text-muted-foreground">{selected.participant.role}</span>
              </div>
            </div>
            <div className="flex-1 px-5 py-6">
              <div className="max-w-md rounded-md bg-surface-muted px-4 py-3 text-body-sm text-foreground">
                {selected.lastMessage}
              </div>
              <p className="mt-2 text-caption text-muted-foreground">
                {formatRelativeTime(selected.timestamp)}
              </p>
            </div>
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  disabled
                  placeholder="Messaging isn't connected yet"
                  className="h-10 flex-1 rounded-md border border-border bg-surface px-3 text-body-sm text-muted-foreground disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled
                  aria-label="Send"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-muted text-muted-foreground disabled:cursor-not-allowed"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8">
            <p className="text-body-sm text-muted-foreground">Select a conversation to view it.</p>
          </div>
        )}
      </div>
    </div>
  );
}
