import type { Metadata } from "next";
import { BrandingPanel } from "@/components/dashboard/BrandingPanel";

export const metadata: Metadata = { title: "Branding — Admin" };

export default function AdminBrandingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Branding</h1>
        <p className="text-body-sm text-muted-foreground">Logos, favicon, brand colors and typography.</p>
      </div>
      <BrandingPanel />
    </div>
  );
}
