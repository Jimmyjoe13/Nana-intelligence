"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Metric } from "@/components/ui/Metric";
import { Box } from "@/components/ui/Box";
import { supabase } from "@/lib/supabase";
import { Plus, MoreVertical, LayoutGrid, List, BarChart2, Loader2, GripVertical } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const STAGES = [
  { id: "audit", title: "Audit" },
  { id: "proposition", title: "Proposition" },
  { id: "negotiation", title: "Négociation" },
  { id: "won", title: "Gagné" },
  { id: "lost", title: "Perdu" },
];

function SortableDeal({ deal }: { deal: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Box
        className="p-5 flex flex-col gap-4 hover:border-orange transition-colors group bg-cream relative"
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
          <div className="flex items-center gap-2">
            <div {...listeners} className="cursor-grab active:cursor-grabbing text-ink-4 hover:text-ink">
              <GripVertical size={16} />
            </div>
            <MoreVertical size={16} className="text-ink-4 cursor-pointer hover:text-ink" />
          </div>
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
    </div>
  );
}

export default function PipelinePage() {
  const [view, setView] = useState<"kanban" | "list" | "forecast">("kanban");
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    setLoading(true);
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('value', { ascending: false });
    
    if (error) console.error('Error fetching deals:', error);
    else setDeals(data || []);
    setLoading(false);
  }

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = async (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeDeal = deals.find((d) => d.id === active.id);
    const overId = over.id;

    // Logic to handle dropping into a column or over another item
    const isOverAColumn = STAGES.some((s) => s.id === overId);
    const overDeal = deals.find((d) => d.id === overId);
    
    const newStage = isOverAColumn ? overId : overDeal?.stage;

    if (activeDeal && newStage && activeDeal.stage !== newStage) {
      // Optimistic update
      setDeals((prev) =>
        prev.map((d) =>
          d.id === active.id ? { ...d, stage: newStage } : d
        )
      );

      // DB update
      const { error } = await supabase
        .from("deals")
        .update({ stage: newStage })
        .eq("id", active.id);

      if (error) {
        console.error("Error updating deal stage:", error);
        fetchDeals(); // Rollback
      }
    }
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
  };

  const groupedDeals = STAGES.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.id);
    const totalValue = stageDeals.reduce((sum, d) => sum + Number(d.value || 0), 0);
    return {
      ...stage,
      count: stageDeals.length,
      total: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(totalValue),
      deals: stageDeals
    };
  });

  const totalPipeline = deals.reduce((sum, d) => sum + Number(d.value || 0), 0);
  const kpis = [
    { label: "Total Pipeline", value: Math.round(totalPipeline/1000).toString(), prefix: "€", suffix: "k" },
    { label: "Pipeline Mois", value: "52", prefix: "€", suffix: "k" },
    { label: "Taux Conv.", value: "24", suffix: "%" },
    { label: "Cycle Moyen", value: "18", suffix: "J" },
  ];

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
        {kpis.map((kpi, index) => (
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

      {loading ? (
        <div className="flex items-center justify-center py-20 min-h-[400px]">
          <Loader2 className="animate-spin text-orange" size={32} />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-10 min-h-[600px]">
            {groupedDeals.map((column) => (
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

                <SortableContext
                  id={column.id}
                  items={column.deals.map((d) => d.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-4 min-h-[150px]">
                    {column.deals.map((deal) => (
                      <SortableDeal key={deal.id} deal={deal} />
                    ))}

                    <button className="w-full py-4 border-[1.5px] border-dashed border-ink-4 text-ink-4 font-mono text-[11px] hover:border-orange hover:text-orange transition-colors">
                      + AJOUTER UN DEAL
                    </button>
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>
          
          <DragOverlay>
            {activeId ? (
              <Box className="p-5 flex flex-col gap-4 border-orange shadow-xl bg-cream cursor-grabbing">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[17px] leading-tight text-orange">
                      {deals.find(d => d.id === activeId)?.name}
                    </span>
                    <span className="text-sm text-ink-3">
                      {deals.find(d => d.id === activeId)?.company}
                    </span>
                  </div>
                  <GripVertical size={16} className="text-orange" />
                </div>
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
