"use client";

import { useState } from "react";

type Preference = { id: string; label: string; description: string; defaultOn: boolean };

const PREFERENCES: Preference[] = [
  { id: "task-due", label: "Task due reminders", description: "Get notified before a task is due.", defaultOn: true },
  { id: "project-updates", label: "Project status changes", description: "When a project you're on changes status.", defaultOn: true },
  { id: "messages", label: "New messages", description: "When someone sends you a message.", defaultOn: true },
  { id: "announcements", label: "Company announcements", description: "Office-wide announcements and news.", defaultOn: false },
];

// Toggles respond locally (real client state) but aren't persisted
// anywhere — there's no user-preferences table yet (Phase 4A's schema
// only covers auth). Architecture only, same as the rest of this phase's
// "no backend" pieces, but functional enough to demonstrate the UI.
export function NotificationPreferences() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFERENCES.map((p) => [p.id, p.defaultOn])),
  );

  return (
    <ul className="flex flex-col divide-y divide-border">
      {PREFERENCES.map((pref) => (
        <li key={pref.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
          <div className="flex flex-col">
            <span className="text-body-sm font-medium text-foreground">{pref.label}</span>
            <span className="text-caption text-muted-foreground">{pref.description}</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={state[pref.id]}
            aria-label={pref.label}
            onClick={() => setState((s) => ({ ...s, [pref.id]: !s[pref.id] }))}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              state[pref.id] ? "bg-primary" : "bg-border-strong"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${
                state[pref.id] ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
