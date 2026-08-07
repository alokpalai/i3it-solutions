import type { Metadata } from "next";
import { CompanyProfileCard } from "@/components/dashboard/CompanyProfileCard";

export const metadata: Metadata = { title: "Company — Admin" };

export default function AdminCompanyPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Company</h1>
        <p className="text-body-sm text-muted-foreground">Company profile and registration details.</p>
      </div>
      <CompanyProfileCard />
    </div>
  );
}
