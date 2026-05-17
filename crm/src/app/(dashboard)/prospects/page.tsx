"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { prospectsData, prospectDetail } from "@/mocks/prospects";
import { Plus, Search, Filter, Mail, Kanban, Archive, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProspectsPage() {
  const [selectedProspect, setSelectedProspect] = useState<typeof prospectDetail | null>(null);

  return (
    <div className="flex flex-col gap-10 relative h-full">
      <PageHeader
        kicker="Gestion des bases"
        title="Prospects"
        description="Gérez votre base de contacts et suivez leur engagement."
        actions={[
          <Button key="add" variant="primary" icon={<Plus size={16} />}>
            Importer un CSV
          </Button>
        ]}
      />

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-4" />
            <input 
              type="text" 
              placeholder="RECHERCHER..." 
              className="w-full bg-cream-2 border-[1.5px] border-ink px-10 py-3 font-mono text-[11px] focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Tag variant="outline" className="cursor-pointer hover:bg-cream-3">STATUT</Tag>
            <Tag variant="outline" className="cursor-pointer hover:bg-cream-3">SECTEUR</Tag>
            <Tag variant="outline" className="cursor-pointer hover:bg-cream-3">SCORE</Tag>
          </div>
        </div>
        <Button variant="ghost" size="sm" icon={<Filter size={14} />}>Filtres avancés</Button>
      </div>

      <div className="border-[1.5px] border-ink bg-cream overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[1.5px] border-ink bg-cream-2">
              <th className="px-6 py-4 w-10">
                <input type="checkbox" className="accent-orange" />
              </th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Nom</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Entreprise</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Poste</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Statut</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 text-right">Score</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Dernière Action</th>
            </tr>
          </thead>
          <tbody>
            {prospectsData.map((prospect) => (
              <tr 
                key={prospect.id} 
                className="border-b border-cream-3 hover:bg-cream-2 transition-colors cursor-pointer group"
                onClick={() => setSelectedProspect(prospectDetail)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="accent-orange" />
                </td>
                <td className="px-6 py-4">
                  <span className="font-display text-[17px] group-hover:text-orange transition-colors">{prospect.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-ink-2">{prospect.company}</td>
                <td className="px-6 py-4 text-sm text-ink-3">{prospect.role}</td>
                <td className="px-6 py-4">
                  <Tag variant={prospect.status === "Rendez-vous" ? "orange" : "outline"} dot={prospect.status === "Rendez-vous"}>
                    {prospect.status}
                  </Tag>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={cn(
                    "font-mono text-[13px] font-medium",
                    prospect.score > 80 ? "text-orange" : "text-ink"
                  )}>
                    {prospect.score}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-ink-4 font-mono uppercase text-[11px]">
                  {prospect.lastAction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-6 font-mono text-[11px] tracking-widest text-ink-3 uppercase py-4">
        <span className="text-ink cursor-pointer">1</span>
        <span className="hover:text-ink cursor-pointer">2</span>
        <span className="hover:text-ink cursor-pointer">3</span>
        <span>...</span>
        <span className="hover:text-ink cursor-pointer">42</span>
        <span className="hover:text-orange cursor-pointer transition-colors ml-4">SUIVANT →</span>
      </div>

      {selectedProspect && (
        <>
          <div 
            className="fixed inset-0 bg-ink/60 z-40 animate-in fade-in duration-300"
            onClick={() => setSelectedProspect(null)}
          />
          <aside className="fixed right-0 top-0 bottom-0 w-[500px] bg-cream border-l-[1.5px] border-ink z-50 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-cream border-b-[1.5px] border-ink p-8 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] text-orange uppercase tracking-wider">Fiche Prospect</span>
                <h3 className="font-display text-[28px] font-medium leading-none">{selectedProspect.name}</h3>
                <span className="text-ink-3 text-sm">{selectedProspect.company} — {selectedProspect.role}</span>
              </div>
              <button 
                onClick={() => setSelectedProspect(null)}
                className="h-10 w-10 border-[1.5px] border-ink flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-10">
              <div className="flex items-center gap-3">
                <Button variant="primary" size="sm" icon={<Mail size={14} />}>Email</Button>
                <Button variant="ink" size="sm" icon={<Kanban size={14} />}>Pipeline</Button>
                <Button variant="ghost" size="sm" icon={<Archive size={14} />}>Archiver</Button>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="font-mono text-[11px] border-b border-ink-4 pb-2 uppercase text-ink-3">Informations</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(selectedProspect.info).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-ink-4 uppercase">{key}</span>
                      <span className="text-[14px] flex items-center gap-2">
                        {value}
                        {key === 'linkedin' && <ExternalLink size={12} className="text-orange" />}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="font-mono text-[11px] border-b border-ink-4 pb-2 uppercase text-ink-3">Activité récente</h4>
                <div className="flex flex-col gap-8 relative pl-4">
                  <div className="absolute left-[3px] top-1 bottom-1 w-[1.5px] bg-cream-3" />
                  {selectedProspect.activity.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1 relative">
                      <div className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full border border-ink bg-orange" />
                      <span className="font-mono text-[10px] text-ink-4 uppercase">{item.date}</span>
                      <span className="font-medium text-[15px]">{item.action}</span>
                      <p className="text-sm text-ink-3 leading-tight">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
