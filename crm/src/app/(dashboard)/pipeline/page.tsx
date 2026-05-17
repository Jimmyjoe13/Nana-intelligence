"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Metric } from "@/components/ui/Metric";
import { Box } from "@/components/ui/Box";
import { pipelineData, pipelineKPIs } from "@/mocks/pipeline";
import { Plus, MoreVertical, LayoutGrid, List, BarChart2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PipelinePage() {
  const [view, setView] = useState<"kanban" | "list" | "forecast">("kanban");

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Vue d'ensemble"
        title="Pipeline"
        emphasis="opportunités"
        description="Suivez l'avancement de vos deals à travers les différentes étapes de votre cycle de vente."
        actions={[
          <div key="toggle" className="flex border-[1.5px] border-ink bg-cream-2 p-1 mr-4">
            <button 
              onClick={() => setView("kanban")}
              className={cn(
                "p-2 hover:bg-cream transition-colors",
                view === "kanban" && "bg-cream text-orange"
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn(
                "p-2 hover:bg-cream transition-colors",
                view === "list" && "bg-cream text-orange"
              )}
            >
              <List size={16} />
            </button>
            <button 
              onClick={() => setView("forecast")}
              className={cn(
                "p-2 hover:bg-cream transition-colors",
                view === "forecast" && "bg-cream text-orange"
              )}
            >
              <BarChart2 size={16} />
            </button>
          </div>,
          <Button key="add" variant="primary" icon={<Plus size={16} />}>
            Nouveau Deal
          </Button>
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {pipelineKPIs.map((kpi, index) => (
          <Metric 
            key={index}
            label={kpi.label}
            value={kpi.value}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
            size="sm"
          />
        ))}
      </div>

      <div className="flex gap-6 overflow-x-auto pb-10 min-h-[600px]">
        {pipelineData.map((column) => (
          <div key={column.id} className="flex-1 min-w-[280px] flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b-[1.5px] border-ink pb-4 px-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] font-bold tracking-wider text-ink">
                  {column.title.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] text-ink-4">
                  {column.count} CARDS
                </span>
              </div>
              <span className="font-display text-[18px] text-orange italic">
                {column.total}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {column.deals.map((deal) => (
                <Box 
                  key={deal.id} 
                  className="p-5 flex flex-col gap-4 cursor-grab active:cursor-grabbing hover:border-orange transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-[17px] leading-tight group-hover:text-orange transition-colors">
                        {deal.name}
                      </span>
                      <span className="text-sm text-ink-3">
                        {deal.company}
                      </span>
                    </div>
                    <MoreVertical size={16} className="text-ink-4 cursor-pointer hover:text-ink" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-[13px] font-medium text-ink">
                      €{deal.value}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-4 uppercase">
                        {deal.days}J
                      </span>
                      <div className="h-6 w-6 rounded-full border border-ink overflow-hidden relative bg-cream-2">
                        <Image 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${deal.owner}`} 
                          alt={deal.owner} 
                          fill
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
              
              <button className="w-full py-4 border-[1.5px] border-dashed border-ink-4 text-ink-4 font-mono text-[11px] hover:border-orange hover:text-orange transition-colors">
                + AJOUTER UN DEAL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
