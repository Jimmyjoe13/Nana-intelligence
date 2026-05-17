"use client";

import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Metric } from "@/components/ui/Metric";
import { Box } from "@/components/ui/Box";
import { AreaChart } from "@/components/charts/AreaChart";
import { 
  kpiData, 
  rdvChartData, 
  topOpportunities, 
  recentActivity, 
  sequencePerformance 
} from "@/mocks/dashboard";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Aujourd'hui — 16 Mai 2026"
        title="Bonjour,"
        emphasis="Jimmy."
        description="Voici un aperçu de votre activité de prospection pour aujourd'hui."
        actions={[
          <Button key="audit" variant="primary" icon={<Sparkles size={16} />}>
            Audit gratuit
          </Button>
        ]}
      />

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {kpiData.map((kpi, index) => (
          <Metric 
            key={index}
            label={kpi.label}
            value={kpi.value}
            suffix={kpi.suffix}
            prefix={kpi.prefix}
            trend={kpi.trend}
            trendVariant={kpi.trendVariant}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Box className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">
              RDV BOOKÉS / 30 JOURS
            </span>
          </div>
          <AreaChart data={rdvChartData} height={350} />
        </Box>

        <Box className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-ink pb-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink">
              TOP OPPORTUNITÉS
            </span>
            <ArrowUpRight size={16} className="text-ink-3" />
          </div>
          <div className="flex flex-col gap-6">
            {topOpportunities.map((opp) => (
              <div key={opp.id} className="flex flex-col gap-1 group cursor-pointer">
                <span className="font-display text-[17px] group-hover:text-orange transition-colors">
                  {opp.name}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-3">€{opp.value}</span>
                  <span className="font-mono text-[11px] text-orange">{opp.status}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-auto">Voir tout le pipeline</Button>
        </Box>
      </div>

      {/* Activity & Sequences Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Box className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-ink pb-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink">
              ACTIVITÉ RÉCENTE
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className="h-1.5 w-1.5 rounded-full bg-orange mt-[7px]" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] text-ink-4">
                    {activity.time}
                  </span>
                  <p className="text-[14px] leading-tight">
                    {activity.text}{" "}
                    <span className="italic font-medium text-ink">
                      {activity.emphasis}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Box>

        <Box className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-ink pb-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink">
              SÉQUENCES PERF.
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {sequencePerformance.map((seq) => (
              <div key={seq.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-medium">{seq.name}</span>
                  <span className="font-mono text-[11px] text-ink-4 uppercase">SÉQUENCE ACTIVE</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-display text-[20px] text-orange">{seq.rate}</span>
                  <span className="font-mono text-[11px] text-ink-3 uppercase">{seq.label}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-auto">Gérer les séquences</Button>
        </Box>
      </div>
    </div>
  );
}
