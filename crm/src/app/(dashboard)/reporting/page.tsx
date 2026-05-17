"use client";

import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { Ring } from "@/components/charts/Ring";
import { 
  rdvMonthlyData, 
  sequenceOpenRates, 
  pipelineCumulative, 
  ownerPerformance 
} from "@/mocks/reporting";
import { Download, Calendar, ArrowRight } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

export default function ReportingPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Analytics"
        title="Reporting"
        emphasis="consolidé"
        description="Analysez vos performances de prospection et votre ROI."
        actions={[
          <div key="range" className="flex items-center gap-2 border-[1.5px] border-ink px-4 py-2 bg-cream-2 mr-4 cursor-pointer hover:bg-cream transition-colors group">
            <Calendar size={14} className="text-ink-3" />
            <span className="font-mono text-[11px] uppercase text-ink group-hover:text-orange">Derniers 30 Jours</span>
          </div>,
          <Button key="export" variant="ink" icon={<Download size={16} />}>
            Exporter PDF
          </Button>
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Box className="flex flex-col gap-6">
          <span className="font-mono text-[11px] text-ink-3 uppercase border-b border-cream-3 pb-2">RDV par mois</span>
          <BarChart data={rdvMonthlyData} height={200} />
        </Box>

        <Box className="flex flex-col gap-6">
          <span className="font-mono text-[11px] text-ink-3 uppercase border-b border-cream-3 pb-2">Ouverture par séquence (%)</span>
          <BarChart data={sequenceOpenRates} height={200} />
        </Box>

        <Box className="flex flex-col gap-6">
          <span className="font-mono text-[11px] text-ink-3 uppercase border-b border-cream-3 pb-2">Pipeline cumulé (€k)</span>
          <LineChart data={pipelineCumulative} height={200} />
        </Box>

        <Box className="flex flex-col gap-6 items-center">
          <span className="font-mono text-[11px] text-ink-3 uppercase border-b border-cream-3 pb-2 w-full">Top Secteurs</span>
          <div className="py-4">
            <Ring value={45} label="Tech/SaaS" size={160} />
          </div>
          <div className="flex flex-col gap-2 w-full">
             <div className="flex justify-between text-xs font-mono"><span className="text-ink-3">INDUSTRIE</span><span>25%</span></div>
             <div className="flex justify-between text-xs font-mono"><span className="text-ink-3">SERVICES</span><span>20%</span></div>
          </div>
        </Box>

        <Box className="flex flex-col gap-6 lg:col-span-2">
          <span className="font-mono text-[11px] text-ink-3 uppercase border-b border-cream-3 pb-2">Performance par owner (€)</span>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart 
                data={ownerPerformance} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#1a1a1a", fontSize: 12, fontFamily: "var(--font-display)" }}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: "#f4f1ea", border: "1.5px solid #1a1a1a", borderRadius: 0, fontFamily: "var(--font-mono)", fontSize: 11 }}
                />
                <Bar dataKey="value" fill="#1a1a1a" barSize={20}>
                  {ownerPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#ff5b22" : "#1a1a1a"} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </Box>
      </div>

      <Box variant="soft" className="p-10 flex flex-col items-center gap-6">
        <h3 className="font-display text-[24px] text-center">Votre taux de conversion moyen est en <span className="italic text-orange">hausse de 12%</span> par rapport au trimestre dernier.</h3>
        <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />}>Voir l&apos;analyse détaillée par segment</Button>
      </Box>
    </div>
  );
}
