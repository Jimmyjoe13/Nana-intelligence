"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Box } from "@/components/ui/Box";
import { Field } from "@/components/ui/Field";
import { sequencesData, sequenceSteps } from "@/mocks/sequences";
import { Plus, Play, Pause, Edit2, Trash2, ArrowLeft, Mail, Clock, Settings, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SequencesPage() {
  const [editingSequence, setEditingSequence] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  if (editingSequence !== null) {
    const sequence = sequencesData.find(s => s.id === editingSequence);
    return (
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setEditingSequence(null)}
            className="h-10 w-10 border-[1.5px] border-ink flex items-center justify-center hover:bg-cream-2 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-orange uppercase tracking-widest">ÉDITEUR DE SÉQUENCE</span>
            <h2 className="font-display text-[24px] font-medium leading-none">{sequence?.name}</h2>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="sm" icon={<Settings size={14} />}>Settings</Button>
            <Button variant="primary" size="sm" icon={<Play size={14} />}>Lancer la séquence</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px]">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {sequenceSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={cn(
                    "relative flex gap-4 p-5 border-[1.5px] cursor-pointer transition-all group",
                    activeStep === index ? "border-orange bg-orange-soft/30" : "border-ink bg-cream hover:border-orange/50"
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "h-8 w-8 rounded-none border-[1.5px] flex items-center justify-center font-mono text-[12px] font-bold",
                      activeStep === index ? "border-orange bg-orange text-ink" : "border-ink bg-cream-2 text-ink-3"
                    )}>
                      {index + 1}
                    </div>
                    {index < sequenceSteps.length - 1 && (
                      <div className="w-[1.5px] flex-1 bg-ink-4 my-1" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider">{step.title}</span>
                      <span className="font-mono text-[10px] text-ink-4 uppercase">{step.delay}</span>
                    </div>
                    <span className="text-[14px] font-medium truncate max-w-[180px]">{step.subject === '-' ? step.body : step.subject}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {step.type === 'Email' ? <Mail size={12} className="text-ink-3" /> : <Linkedin size={12} className="text-ink-3" />}
                      <span className="font-mono text-[10px] text-ink-4 uppercase">{step.type}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border-[1.5px] border-dashed border-ink-4 text-ink-4 font-mono text-[11px] hover:border-orange hover:text-orange transition-colors">
                + AJOUTER UNE ÉTAPE
              </button>
            </div>
          </div>

          <Box className="lg:col-span-8 flex flex-col gap-8 p-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-ink-4 pb-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-[22px] font-medium">Étape {activeStep + 1} — {sequenceSteps[activeStep].type}</h3>
                  <Tag variant="outline">{sequenceSteps[activeStep].delay}</Tag>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} className="text-error border-error hover:bg-error hover:text-cream">Supprimer</Button>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {sequenceSteps[activeStep].type === 'Email' && (
                  <Field 
                    label="Objet de l'email" 
                    defaultValue={sequenceSteps[activeStep].subject}
                  />
                )}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink">Corps du message</label>
                  <textarea 
                    rows={12}
                    className="w-full border-[1.5px] border-ink bg-cream-2 px-4 py-4 font-mono text-[13px] text-ink focus:border-orange focus:outline-none transition-colors"
                    defaultValue={sequenceSteps[activeStep].body}
                  />
                  <div className="flex gap-2 mt-2">
                    <span className="font-mono text-[10px] px-2 py-1 bg-ink text-cream cursor-pointer hover:bg-orange transition-colors">{"{{firstName}}"}</span>
                    <span className="font-mono text-[10px] px-2 py-1 bg-ink text-cream cursor-pointer hover:bg-orange transition-colors">{"{{company}}"}</span>
                    <span className="font-mono text-[10px] px-2 py-1 bg-ink text-cream cursor-pointer hover:bg-orange transition-colors">{"{{industry}}"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-cream-3 flex items-center justify-between">
              <div className="flex items-center gap-4 text-ink-3 font-mono text-[11px] uppercase">
                <Clock size={14} />
                Délai d&apos;envoi : {sequenceSteps[activeStep].delay}
              </div>
              <Button variant="ink" icon={<Edit2 size={16} />}>Sauvegarder l&apos;étape</Button>
            </div>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Automatisation"
        title="Séquences"
        description="Créez et gérez vos scénarios de relance automatisés."
        actions={[
          <Button key="add" variant="primary" icon={<Plus size={16} />}>
            Nouvelle séquence
          </Button>
        ]}
      />

      <div className="border-[1.5px] border-ink bg-cream overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[1.5px] border-ink bg-cream-2">
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Nom de la séquence</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">Statut</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 text-right">Touches</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 text-right">Envoyés</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 text-right">Ouverture</th>
              <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 text-right">Réponse</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {sequencesData.map((seq) => (
              <tr 
                key={seq.id} 
                className="border-b border-cream-3 hover:bg-cream-2 transition-colors cursor-pointer group"
                onClick={() => setEditingSequence(seq.id)}
              >
                <td className="px-6 py-5">
                  <span className="font-display text-[18px] group-hover:text-orange transition-colors">{seq.name}</span>
                </td>
                <td className="px-6 py-5">
                  <Tag variant={seq.status === 'Active' ? 'orange' : 'outline'} dot={seq.status === 'Active'}>
                    {seq.status}
                  </Tag>
                </td>
                <td className="px-6 py-5 text-right font-mono text-[13px]">{seq.touches}</td>
                <td className="px-6 py-5 text-right font-mono text-[13px] text-ink-3">{seq.sent}</td>
                <td className="px-6 py-5 text-right font-mono text-[13px] font-medium text-ink">{seq.open}</td>
                <td className="px-6 py-5 text-right font-mono text-[13px] font-medium text-orange">{seq.reply}</td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                      {seq.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                      <Edit2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
