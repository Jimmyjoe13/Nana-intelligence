"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Box } from "@/components/ui/Box";
import { Field } from "@/components/ui/Field";
import { domainsData, integrationsData, teamData } from "@/mocks/settings";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Compte");

  const tabs = ["Compte", "Domaines", "Intégrations", "Équipe", "Facturation"];

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Configuration"
        title="Settings"
        description="Gérez votre compte, vos domaines et vos intégrations."
      />

      <div className="flex flex-col gap-10">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b-[1.5px] border-cream-3 pb-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 font-mono text-[12px] font-medium uppercase tracking-widest transition-all relative whitespace-nowrap",
                activeTab === tab ? "text-orange" : "text-ink-4 hover:text-ink"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === "Compte" && (
            <div className="flex flex-col gap-10 max-w-2xl">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-none border-[1.5px] border-ink bg-cream-2 flex items-center justify-center relative overflow-hidden">
                   <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jimmy" alt="Avatar" fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="sm">Changer l&apos;avatar</Button>
                  <span className="font-mono text-[10px] text-ink-4 uppercase">JPG, PNG OU SVG. MAX 2MB.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Prénom" defaultValue="Jimmy" />
                <Field label="Nom" defaultValue="Doe" />
                <div className="md:col-span-2">
                  <Field label="Email" defaultValue="jimmy@nana.ai" disabled />
                </div>
              </div>

              <div className="pt-6 border-t border-cream-3 flex justify-end">
                <Button variant="ink">Sauvegarder les modifications</Button>
              </div>
            </div>
          )}

          {activeTab === "Domaines" && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[22px] font-medium">Domaines d&apos;envoi</h3>
                <Button variant="primary" size="sm">Ajouter un domaine</Button>
              </div>
              
              <div className="border-[1.5px] border-ink overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-cream-2 border-b-[1.5px] border-ink font-mono text-[11px] text-ink-3 uppercase">
                      <th className="px-6 py-4">Domaine</th>
                      <th className="px-6 py-4">Statut</th>
                      <th className="px-6 py-4">Warm-up</th>
                      <th className="px-6 py-4">SPF</th>
                      <th className="px-6 py-4">DKIM</th>
                      <th className="px-6 py-4">DMARC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domainsData.map((domain, i) => (
                      <tr key={i} className="border-b border-cream-3">
                        <td className="px-6 py-4 font-medium">{domain.name}</td>
                        <td className="px-6 py-4">
                          <Tag variant={domain.status === 'Active' ? 'outline' : 'solid'}>{domain.status}</Tag>
                        </td>
                        <td className="px-6 py-4 font-mono text-[13px]">{domain.warmup}</td>
                        <td className="px-6 py-4">{domain.spf ? <Check className="text-orange" size={16} /> : <X className="text-error" size={16} />}</td>
                        <td className="px-6 py-4">{domain.dkim ? <Check className="text-orange" size={16} /> : <X className="text-error" size={16} />}</td>
                        <td className="px-6 py-4">{domain.dmarc ? <Check className="text-orange" size={16} /> : <X className="text-error" size={16} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Intégrations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrationsData.map((int, i) => (
                <Box key={i} className="flex flex-col gap-6 group hover:border-orange transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-cream-2 border-[1.5px] border-ink flex items-center justify-center font-bold text-lg italic">
                      {int.name[0]}
                    </div>
                    <Tag variant={int.status === 'Connected' ? 'orange' : 'outline'}>{int.status}</Tag>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[18px]">{int.name}</span>
                    <span className="text-xs text-ink-3">Synchronisez vos contacts et activités automatiquement.</span>
                  </div>
                  <Button variant={int.status === 'Connected' ? 'ghost' : 'ink'} size="sm">
                    {int.status === 'Connected' ? 'Configurer' : 'Connecter'}
                  </Button>
                </Box>
              ))}
            </div>
          )}

          {activeTab === "Équipe" && (
            <div className="flex flex-col gap-8">
               <div className="flex items-center justify-between">
                <h3 className="font-display text-[22px] font-medium">Membres de l&apos;équipe</h3>
                <Button variant="primary" size="sm">Inviter un membre</Button>
              </div>
              <div className="border-[1.5px] border-ink overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-cream-2 border-b-[1.5px] border-ink font-mono text-[11px] text-ink-3 uppercase">
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Rôle</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.map((m, i) => (
                      <tr key={i} className="border-b border-cream-3">
                        <td className="px-6 py-4 font-display text-[17px]">{m.name}</td>
                        <td className="px-6 py-4 text-sm text-ink-3 font-mono">{m.email}</td>
                        <td className="px-6 py-4"><Tag>{m.role}</Tag></td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 p-0 px-2 text-[10px]">Gérer</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Facturation" && (
            <div className="flex flex-col gap-10">
              <Box variant="ink" className="flex items-center justify-between p-10">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-orange uppercase tracking-widest">PLAN ACTUEL</span>
                  <h3 className="font-display text-[32px] font-medium">Growth Agency</h3>
                  <span className="text-cream/60 text-sm">€199 / mois · Facturation mensuelle</span>
                </div>
                <Button variant="primary">Changer de plan</Button>
              </Box>

              <div className="flex flex-col gap-6">
                <h3 className="font-display text-[22px] font-medium border-b border-cream-3 pb-4">Historique des factures</h3>
                <div className="flex flex-col gap-4 font-mono text-[11px] text-ink-3 uppercase">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-cream-3 pb-4">
                      <span>FACT_2026_0{6-i}.PDF</span>
                      <span>15/0{6-i}/2026</span>
                      <span>€199.00</span>
                      <Button variant="ghost" size="sm" className="h-6 p-0 px-2 text-[10px]">TÉLÉCHARGER</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
