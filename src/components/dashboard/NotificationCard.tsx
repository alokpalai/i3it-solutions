"use client";

import { useState } from "react";
import type { MockNotificationChannel } from "@/config/adminMockData";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";

const STATUS_STYLE: Record<MockNotificationChannel["status"], string> = {
  Active: "border-success/30 bg-success/10 text-success",
  Placeholder: "border-border-strong bg-surface-muted text-muted-foreground",
  Planned: "border-secondary/30 bg-secondary/10 text-secondary",
};

function ChannelToggle({ channel }: { channel: MockNotificationChannel }) {
  const [enabled, setEnabled] = useState(channel.status === "Active");

  return (
    <li className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-body-sm font-medium text-foreground">{channel.name}</span>
          <span className={`inline-flex w-fit items-center rounded-sm border px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_STYLE[channel.status]}`}>
            {channel.status}
          </span>
        </div>
        <span className="text-caption text-muted-foreground">{channel.description}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`${channel.name} notifications`}
        disabled={channel.status === "Planned"}
        onClick={() => setEnabled((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          enabled ? "bg-primary" : "bg-border-strong"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </li>
  );
}

// The brief's "NotificationCard" — per-channel toggle, same switch
// styling as NotificationPreferences (Phase 4B). Only "In-App" is real
// (the notification bell/list already exist); Email/SMS/WhatsApp are
// architecture placeholders and Push is future — toggling any of them
// is real client state but isn't persisted, matching every other
// settings surface in this codebase without a backing table yet.
export function NotificationCard({ channels }: { channels: MockNotificationChannel[] }) {
  return (
    <SettingsPanel title="Notification channels" saveable={false}>
      <ul className="flex flex-col divide-y divide-border">
        {channels.map((channel) => <ChannelToggle key={channel.id} channel={channel} />)}
      </ul>
    </SettingsPanel>
  );
}
