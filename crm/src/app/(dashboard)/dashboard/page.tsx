"use client";

import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Metric } from "@/components/ui/Metric";
import { Box } from "@/components/ui/Box";
import { AreaChart } from "@/components/charts/AreaChart";
import { supabase } from "@/lib/supabase";
import { Sparkles, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    prospectsCount: 0,
    rdvCount: 0,
    pipelineValue: 0,
    conversionRate: 24, // Keep static for now
    topDeals: [] as any[],
    recentProspects: [] as any[],
    campaigns: [] as any[]
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    
    const [
      { count: pCount },
      { count: rCount },
      { data: deals },
      { data: recentP },
      { data: camps }
    ] = await Promise.all([
      supabase.from('prospects').select('*', { count: 'exact', head: true }),
      supabase.from('prospects').select('*', { count: 'exact', head: true }).eq('status', 'Rendez-vous'),
      supabase.from('deals').select('*').order('value', { ascending: false }).limit(5),
      supabase.from('prospects').select('*').order('updated_at', { ascending: false }).limit(4),
      supabase.from('campaigns').select('*').limit(3)
    ]);

    const totalValue = (deals || []).reduce((sum, d) => sum + Number(d.value || 0), 0);

    setStats({
      prospectsCount: pCount || 0,
      rdvCount: rCount || 0,
      pipelineValue: totalValue,
      conversionRate: 24,
      topDeals: deals || [],
      recentProspects: recentP || [],
      campaigns: camps || []
    });

    setLoading(false);
  }

  const kpis = [
    { label: "Prospects", value: stats.prospectsCount.toString(), trend: "+12%", trendVariant: "positive" as const },
    { label: "RDV Bookés", value: stats.rdvCount.toString(), trend: "+5%", trendVariant: "positive" as const },
    { label: "Pipeline", value: Math.round(stats.pipelineValue / 1000).toString(), prefix: "€", suffix: "k", trend: "+18%", trendVariant: "positive" as const },
    { label: "Taux Conv.", value: stats.conversionRate.toString(), suffix: "%", trend: "-2%", trendVariant: "negative" as const },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker={`Aujourd'hui — ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`}
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
        {kpis.map((kpi, index) => (
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
          <AreaChart data={[
            { name: "Sem 1", value: 12 },
            { name: "Sem 2", value: 18 },
            { name: "Sem 3", value: 15 },
            { name: "Sem 4", value: stats.rdvCount },
          ]} height={350} />
        </Box>

        <Box className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-ink pb-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink">
              TOP OPPORTUNITÉS
            </span>
            <ArrowUpRight size={16} className="text-ink-3" />
          </div>
          <div className="flex flex-col gap-6">
            {stats.topDeals.map((opp) => (
              <div key={opp.id} className="flex flex-col gap-1 group cursor-pointer">
                <span className="font-display text-[17px] group-hover:text-orange transition-colors">
                  {opp.name}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-3">€{opp.value}</span>
                  <span className="font-mono text-[11px] text-orange">{opp.stage}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/pipeline" className="mt-auto">
            <Button variant="ghost" size="sm" className="w-full">Voir tout le pipeline</Button>
          </Link>
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
            {stats.recentProspects.map((p) => (
              <div key={p.id} className="flex gap-4 items-start">
                <div className="h-1.5 w-1.5 rounded-full bg-orange mt-[7px]" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] text-ink-4">
                    {new Date(p.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <p className="text-[14px] leading-tight">
                    Mise à jour de <span className="italic font-medium text-ink">{p.name}</span> ({p.company})
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
            {stats.campaigns.map((seq) => (
              <div key={seq.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-medium">{seq.name}</span>
                  <span className="font-mono text-[11px] text-ink-4 uppercase">SÉQUENCE ACTIVE</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-display text-[20px] text-orange">{seq.kpi}</span>
                  <span className="font-mono text-[11px] text-ink-3 uppercase">Taux Réponse</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/campaigns" className="mt-auto">
            <Button variant="ghost" size="sm" className="w-full">Gérer les séquences</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}
