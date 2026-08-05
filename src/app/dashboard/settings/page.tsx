import type { Metadata } from "next";
import Link from "next/link";
import { Moon, KeyRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { NotificationPreferences } from "@/components/dashboard/NotificationPreferences";

// Not in the Phase 4B brief's explicit ROUTES list, but Settings is a
// required Sidebar item — see src/app/dashboard/documents for the same
// reconciliation note.
export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Settings</h1>
        <p className="text-body-sm text-muted-foreground">Notification preferences and account security.</p>
      </div>

      <Card className="flex flex-col gap-4">
        <p className="text-h5 text-foreground">Notifications</p>
        <NotificationPreferences />
      </Card>

      <Card className="flex flex-col gap-4">
        <p className="text-h5 text-foreground">Appearance</p>
        <div className="flex items-center gap-3">
          <Moon aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">
            Toggle dark mode from the icon in the top navigation bar.
          </p>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <p className="text-h5 text-foreground">Security</p>
        <Link
          href="/account"
          className="inline-flex w-fit items-center gap-2 text-body-sm font-medium text-primary hover:underline"
        >
          <KeyRound aria-hidden="true" className="h-4 w-4" />
          Change your password
        </Link>
      </Card>
    </div>
  );
}
