"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type SettingsPanelProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Omit for a read-only panel (no Save action rendered). */
  saveable?: boolean;
};

// The brief's "SettingsPanel" — reused by Company/Branding/Security/
// Notifications, each of which passes its own form fields as children.
// Save is real client interaction (prevents default, shows a state) but
// isn't persisted anywhere — same honest "architecture, not wired up"
// footing as NotificationPreferences (Phase 4B) and every other settings
// surface in this codebase that has no backing table yet.
export function SettingsPanel({ title, description, children, saveable = true }: SettingsPanelProps) {
  const [saved, setSaved] = useState(false);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-h5 text-foreground">{title}</p>
        {description && <p className="text-caption text-muted-foreground">{description}</p>}
      </div>

      {saveable ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
          className="flex flex-col gap-4"
        >
          {children}
          <div className="flex items-center gap-3 border-t border-border pt-4">
            <Button type="submit" variant="primary" size="sm">Save changes</Button>
            {saved && <p className="text-caption text-muted-foreground">Settings storage isn&rsquo;t connected yet — this wasn&rsquo;t saved.</p>}
          </div>
        </form>
      ) : (
        children
      )}
    </Card>
  );
}
