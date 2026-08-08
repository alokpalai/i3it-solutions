import { CRMLayout } from "@/components/dashboard/CRMLayout";

export default function CrmRootLayout({ children }: { children: React.ReactNode }) {
  return <CRMLayout>{children}</CRMLayout>;
}
