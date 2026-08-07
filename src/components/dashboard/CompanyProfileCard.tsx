import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { siteConfig } from "@/config/site";

// The brief's "CompanyProfileCard." Only Company Name/Description are
// pre-filled — with the real, verified values from src/config/site.ts —
// everything else (GST/PAN/address/phone/business hours/social media)
// is left genuinely empty with a placeholder hint, never a fabricated
// example value. Unlike Projects/CRM/Procurement's fictional demo data,
// these fields represent real facts about the real company; inventing a
// GST number or address here would be actively misleading if anyone
// ever mistook it for real, so the same docs/DECISIONS.md A13 "never
// invent" rule applies more strictly than to a made-up vendor name.
export function CompanyProfileCard() {
  return (
    <SettingsPanel title="Company profile" description="Shown across the platform and on generated documents.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input id="company-name" defaultValue={siteConfig.name} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="company-description">Description</Label>
          <Textarea id="company-description" defaultValue={siteConfig.description} rows={2} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company-gst">GST Number</Label>
          <Input id="company-gst" placeholder="e.g. 22AAAAA0000A1Z5" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company-pan">PAN Number</Label>
          <Input id="company-pan" placeholder="e.g. AAAAA0000A" />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="company-address">Address</Label>
          <Textarea id="company-address" placeholder="Registered office address" rows={2} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company-email">Contact Email</Label>
          <Input id="company-email" type="email" placeholder="contact@example.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company-phone">Contact Phone</Label>
          <Input id="company-phone" type="tel" placeholder="+91 00000 00000" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company-website">Website</Label>
          <Input id="company-website" type="url" placeholder="https://" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company-hours">Business Hours</Label>
          <Input id="company-hours" placeholder="e.g. Mon–Fri, 9:30 AM – 6:30 PM IST" />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="company-social">Social Media</Label>
          <Input id="company-social" placeholder="LinkedIn, X/Twitter URLs, comma-separated" />
        </div>
      </div>
    </SettingsPanel>
  );
}
