"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";

const BRAND_COLORS = [
  { label: "Primary", token: "--color-primary", hex: "#0b3d91", description: "Navy — headers, primary actions." },
  { label: "Secondary", token: "--color-secondary", hex: "#1e73be", description: "Blue — links, secondary emphasis." },
  { label: "Accent", token: "--color-accent", hex: "#b04c00", description: "Deep orange — rare priority markers only." },
];

type LogoSlot = { id: string; label: string; previewSrc?: string };

const LOGO_SLOTS: LogoSlot[] = [
  { id: "light", label: "Light Logo", previewSrc: "/logo.jpeg" },
  { id: "dark", label: "Dark Logo" },
  { id: "favicon", label: "Favicon" },
  { id: "email", label: "Email Logo" },
];

function LogoUploadSlot({ slot }: { slot: LogoSlot }) {
  const [notice, setNotice] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`logo-${slot.id}`}
        className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-border text-center hover:border-secondary"
      >
        {slot.previewSrc ? (
          <Image src={slot.previewSrc} alt="" width={64} height={64} className="h-14 w-14 rounded-sm object-contain" />
        ) : (
          <Upload aria-hidden="true" className="h-6 w-6 text-muted-foreground" />
        )}
        <span className="text-caption text-muted-foreground">{slot.previewSrc ? "Replace" : "Upload"}</span>
      </label>
      <input
        id={`logo-${slot.id}`}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => e.target.files?.[0] && setNotice(true)}
      />
      <p className="text-center text-caption font-medium text-foreground">{slot.label}</p>
      {notice && <p className="text-center text-caption text-muted-foreground">Not connected — this wasn&rsquo;t saved.</p>}
    </div>
  );
}

// The brief's "BrandingPanel" — "Allow future configuration of" every
// field it lists. Colors shown are the real, currently-live design
// tokens (src/app/globals.css), not fabricated swatches — this page
// documents the actual brand, it doesn't invent one. Light Logo previews
// the real public/logo.jpeg; the other three slots have no real asset
// yet, so they show an honest empty upload state rather than a
// placeholder image standing in for a real one.
export function BrandingPanel() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsPanel title="Logos & favicon" description="Used across the platform, generated documents and email templates.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {LOGO_SLOTS.map((slot) => <LogoUploadSlot key={slot.id} slot={slot} />)}
        </div>
      </SettingsPanel>

      <SettingsPanel title="Brand colors" description="Currently live in src/app/globals.css — editing here isn't wired up yet." saveable={false}>
        <div className="grid gap-4 sm:grid-cols-3">
          {BRAND_COLORS.map((color) => (
            <div key={color.token} className="flex items-center gap-3 rounded-md border border-border p-3">
              <span aria-hidden="true" className="h-10 w-10 shrink-0 rounded-md border border-border" style={{ backgroundColor: color.hex }} />
              <div className="flex flex-col">
                <span className="text-body-sm font-medium text-foreground">{color.label}</span>
                <span className="font-mono text-caption text-muted-foreground">{color.hex}</span>
                <span className="text-caption text-muted-foreground">{color.description}</span>
              </div>
            </div>
          ))}
        </div>
      </SettingsPanel>

      <SettingsPanel title="Typography" description="Currently live — same source." saveable={false}>
        <p className="text-body-sm text-foreground">
          <span className="font-medium">IBM Plex Sans</span> (with Source Sans 3 as a fallback), loaded via
          next/font in src/app/layout.tsx.
        </p>
      </SettingsPanel>
    </div>
  );
}
