import type { Metadata } from "next";
import Link from "next/link";
import { Building, Palette, Lock, Bell, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";

export const metadata: Metadata = { title: "Settings — Admin" };

const SECTIONS = [
  { label: "Company", description: "Company profile, address and contact information.", href: "/dashboard/admin/company", icon: Building },
  { label: "Branding", description: "Logos, favicon and brand colors.", href: "/dashboard/admin/branding", icon: Palette },
  { label: "Security", description: "Password policy, sessions, MFA and rate limiting.", href: "/dashboard/admin/security", icon: Lock },
  { label: "Notifications", description: "Email, in-app, SMS and WhatsApp channels.", href: "/dashboard/admin/notifications", icon: Bell },
];

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h3 text-foreground">Settings</h1>
        <p className="text-body-sm text-muted-foreground">System-wide configuration for the enterprise platform.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center gap-3 rounded-md border border-border bg-background p-4 transition-colors hover:border-secondary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-muted">
              <section.icon aria-hidden="true" className="h-5 w-5 text-secondary" />
            </span>
            <div className="flex flex-1 flex-col">
              <span className="text-body-sm font-medium text-foreground">{section.label}</span>
              <span className="text-caption text-muted-foreground">{section.description}</span>
            </div>
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <SettingsPanel title="System configuration" description="Platform-wide defaults.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="timezone">Default timezone</Label>
            <Select id="timezone" defaultValue="Asia/Kolkata">
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="locale">Default locale</Label>
            <Select id="locale" defaultValue="en-IN">
              <option value="en-IN">English (India)</option>
            </Select>
          </div>
        </div>
      </SettingsPanel>
    </div>
  );
}
