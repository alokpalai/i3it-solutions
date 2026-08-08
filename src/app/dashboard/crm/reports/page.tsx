import type { Metadata } from "next";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ReportChart } from "@/components/dashboard/ReportChart";
import {
  leadSourceDistribution,
  industryDistribution,
  conversionFunnel,
  pipelineByStage,
  monthlyOpportunities,
  wonVsLost,
  formatCurrency,
} from "@/lib/crmMetrics";

export const metadata: Metadata = { title: "Reports — CRM" };

export default function CrmReportsPage() {
  const sources = leadSourceDistribution();
  const industries = industryDistribution();
  const funnel = conversionFunnel();
  const pipeline = pipelineByStage();
  const monthly = monthlyOpportunities();
  const { won, lost } = wonVsLost();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h3 text-foreground">Reports</h1>
        <p className="text-body-sm text-muted-foreground">Mock calculations over the current CRM dataset — not a live analytics feed.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Lead sources">
          <ReportChart data={sources.map((s) => ({ label: s.source, value: s.count }))} />
        </DashboardCard>

        <DashboardCard title="Industry distribution">
          <ReportChart data={industries.map((i) => ({ label: i.industry, value: i.count }))} colorClassName="bg-accent" />
        </DashboardCard>

        <DashboardCard title="Conversion funnel">
          <ReportChart data={funnel.map((f) => ({ label: f.stage, value: f.count }))} />
        </DashboardCard>

        <DashboardCard title="Sales pipeline by stage">
          <ReportChart
            data={pipeline.map((p) => ({ label: p.stage, value: p.value, sublabel: `${p.count} deal${p.count === 1 ? "" : "s"}` }))}
            valueFormatter={formatCurrency}
            colorClassName="bg-accent"
          />
        </DashboardCard>

        <DashboardCard title="Monthly opportunities created">
          <ReportChart data={monthly.map((m) => ({ label: m.month, value: m.count }))} />
        </DashboardCard>

        <DashboardCard title="Won vs Lost">
          <ReportChart
            data={[
              { label: "Won", value: won, colorClassName: "bg-success" },
              { label: "Lost", value: lost, colorClassName: "bg-error" },
            ]}
          />
          <p className="mt-3 text-caption text-muted-foreground">
            {won + lost === 0 ? "No closed opportunities yet." : `${Math.round((won / (won + lost)) * 100)}% win rate.`}
          </p>
        </DashboardCard>
      </div>
    </div>
  );
}
