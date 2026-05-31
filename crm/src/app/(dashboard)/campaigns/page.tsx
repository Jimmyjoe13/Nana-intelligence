"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Metric } from "@/components/ui/Metric";
import { Box } from "@/components/ui/Box";
import { LineChart } from "@/components/charts/LineChart";
import { supabase } from "@/lib/supabase";
import { Plus, ArrowLeft, MoreHorizontal, ExternalLink, Users, Loader2 } from "lucide-react";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingCampaign, setViewingCampaign] = useState<any | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    setLoading(true);
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('started_at', { ascending: false });
    
    if (error) console.error('Error fetching campaigns:', error);
    else setCampaigns(data || []);
    setLoading(false);
  }

  if (viewingCampaign !== null) {
    const campaign = viewingCampaign;
    const details = campaign.details || {};
    return (
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewingCampaign(null)}
            className="h-10 w-10 border-[1.5px] border-ink flex items-center justify-center hover:bg-cream-2 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-orange uppercase tracking-widest">DÉTAIL CAMPAGNE</span>
            <h2 className="font-display text-[24px] font-medium leading-none">{campaign.name}</h2>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="sm">Pause</Button>
            <Button variant="primary" size="sm">Edit Campaign</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {(details.kpis || []).map((kpi: any, index: number) => (
            <Metric
              key={index}
              label={kpi.label}
              value={kpi.value}
              suffix={kpi.suffix}
              size="sm"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Box className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">       
                ENVOIS CUMULÉS / 7 JOURS
              </span>
            </div>
            <LineChart data={details.chartData || []} height={300} />
          </Box>

          <Box className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-ink pb-4">
              <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink">
                RÉSUMÉ CONFIG
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-ink-4 uppercase">SÉQUENCE</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {campaign.sequence} <ExternalLink size={12} className="text-orange" />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-ink-4 uppercase">BASE UTILISÉE</span>
                <span className="text-sm font-medium">{campaign.base}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-ink-4 uppercase">DOMAINES</span>
                <div className="flex wrap gap-2 mt-1">
                  <Tag variant="outline">nana-intelligence.ai</Tag>
                  <Tag variant="outline">nana-ops.fr</Tag>                </div>
              </div>
            </div>
          </Box>
        </div>

        <div className="border-[1.5px] border-ink bg-cream overflow-hidden">
          <div className="bg-cream-2 border-b-[1.5px] border-ink px-6 py-4 flex items-center justify-between">  
            <span className="font-mono text-[11px] font-bold text-ink uppercase">Derniers prospects engagés</span>
            <Button variant="ghost" size="sm">Voir tous</Button>
          </div>
          <table className="w-full text-left border-collapse">
            <tbody>
              {(details.prospects || []).map((prospect: any, index: number) => (
                <tr key={index} className="border-b border-cream-3 hover:bg-cream-2 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-display text-[16px]">{prospect.name}</span>
                    <span className="text-xs text-ink-3 ml-2">{prospect.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Tag variant="outline">{prospect.step}</Tag>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Tag variant={prospect.status === 'Replied' ? 'orange' : 'outline'}>
                      {prospect.status}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Exécution"
        title="Campagnes"
        description="Lancez vos séquences sur vos listes de prospects."
        actions={[
          <Button key="add" variant="primary" icon={<Plus size={16} />}>
            Lancer une campagne
          </Button>
        ]}
      />

      <div className="border-[1.5px] border-ink bg-cream overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange" size={32} />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-[1.5px] border-ink bg-cream-2">
                <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Nom</th>
                <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Séquence</th>
                <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Base</th>
                <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Démarré le</th>
                <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Statut</th>
                <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 text-right">KPI</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp) => (
                <tr
                  key={camp.id}
                  className="border-b border-cream-3 hover:bg-cream-2 transition-colors cursor-pointer group"     
                  onClick={() => setViewingCampaign(camp)}
                >
                  <td className="px-6 py-5">
                    <span className="font-display text-[18px] group-hover:text-orange transition-colors">{camp.name}</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-ink-2">{camp.sequence}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-ink-3">
                      <Users size={14} />
                      <span className="font-mono text-[11px]">{camp.base}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-[11px] text-ink-4 uppercase">{new Date(camp.started_at).toLocaleDateString()}</td>      
                  <td className="px-6 py-5">
                    <Tag variant={camp.status === 'Live' ? 'orange' : 'outline'} dot={camp.status === 'Live'}>    
                      {camp.status}
                    </Tag>
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-[13px] font-medium text-orange">{camp.kpi}</td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
