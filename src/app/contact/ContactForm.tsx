"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Field } from "@/components/ui/Field";
import { ArrowRight, Clock, ShieldCheck, Users } from "lucide-react";
import { trackEvent } from "@/lib/utils";

const LEAD_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://n8n.nana-intelligence.fr/webhook/0182624b-bac0-4b3b-a258-8b62f851b5df";

export default function ContactForm() {
  const [formStarted, setFormStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleFormStart = () => {
    if (!formStarted) {
      trackEvent("form_start");
      setFormStarted(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      if (!LEAD_WEBHOOK_URL) throw new Error("Webhook non configuré");
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact_form", page: "/contact" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      trackEvent("generate_lead");
      setStatus("success");
      form.reset();
      setFormStarted(false);
    } catch (err) {
      trackEvent("form_error", { message: String(err) });
      setStatus("error");
    }
  };

  return (
    <Box id="contact-form" className="bg-cream p-10 md:p-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">
          Audit stratégique gratuit — sans engagement
        </span>
        <h3 className="font-display text-[32px] font-medium">On analyse votre potentiel B2B en 30 min.</h3>
      </div>

      {/* Réassurance — indicateurs de confiance */}
      <div className="grid grid-cols-3 gap-4 border-b border-ink/10 pb-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <Clock size={18} className="text-orange" />
          <span className="font-mono text-[11px] font-bold text-ink uppercase">30 sec</span>
          <span className="font-mono text-[10px] text-ink-3">pour remplir</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Users size={18} className="text-orange" />
          <span className="font-mono text-[11px] font-bold text-ink uppercase">+40 audits</span>
          <span className="font-mono text-[10px] text-ink-3">réalisés en 2026</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <ShieldCheck size={18} className="text-orange" />
          <span className="font-mono text-[11px] font-bold text-ink uppercase">0 spam</span>
          <span className="font-mono text-[10px] text-ink-3">données protégées</span>
        </div>
      </div>

      {/* Micro-témoignage */}
      <div className="bg-orange/10 border-[1.5px] border-orange/30 px-6 py-4 flex flex-col gap-2">
          <p className="font-sans text-[13px] text-ink-2 font-medium leading-relaxed">
            ⚡ Places limitées — On programme votre audit cette semaine.
          </p>
        <p className="font-sans text-[13px] text-ink-2 italic leading-relaxed">
          &quot;En 3 semaines, Nana Intelligence nous a généré 12 RDV qualifiés avec des décideurs C-Level. Le ROI a été immédiat.&quot;
        </p>
        <span className="font-mono text-[10px] text-ink-3 uppercase font-bold">
          — Directeur Commercial, PME Tech Marseille
        </span>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <Field label="Prénom" name="prenom" placeholder="ex: Jean" required onFocus={handleFormStart} />
        <div className="md:col-span-2">
          <Field label="Email professionnel" name="email" type="email" placeholder="jean@entreprise.ai" required onFocus={handleFormStart} />
        </div>
        <div className="md:col-span-2">
          <Field label="Téléphone (optionnel)" name="telephone" type="tel" placeholder="ex: 06 12 34 56 78" onFocus={handleFormStart} />
        </div>
        <div className="md:col-span-2">
          <Field label="Entreprise (optionnel)" name="entreprise" placeholder="Nom de votre société" onFocus={handleFormStart} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          <Button type="submit" variant="primary" size="lg" className="w-full" loading={status === "sending"} icon={<ArrowRight size={18} />} trackLabel="envoyer_demande_audit" sectionId="contact_form">
            Obtenir mon audit gratuit 30 min
          </Button>
          <p className="text-[12px] text-ink-3 font-sans text-center">
            Zéro engagement · Réponse sous 24h · Données jamais partagées
          </p>
          {status === "success" && (
            <p className="mt-4 text-[12px] font-mono uppercase text-center text-orange font-bold leading-relaxed">
              Demande envoyée ✓ On vous envoie un email de confirmation dans les 5 minutes.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-[12px] font-mono uppercase text-center text-error font-bold leading-relaxed">
              Une erreur est survenue. Écrivez-nous à contact@nana-intelligence.fr
            </p>
          )}
          <p className="text-[12px] text-ink-3 font-sans text-center mt-2">            ou écrivez-nous à <a href="mailto:contact@nana-intelligence.fr" className="underline hover:text-orange">contact@nana-intelligence.fr</a>
          </p>
        </div>
      </form>
    </Box>
  );
}
