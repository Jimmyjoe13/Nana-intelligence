"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Field } from "@/components/ui/Field";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/utils";

const LEAD_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://n8n.nana-intelligence.fr/webhook/0182624b-bac0-4b3b-a258-8b62f851b5df";

export default function ContactForm() {
  const [formStarted, setFormStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
    <Box className="bg-cream p-10 md:p-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Audit de 30 minutes</span>
        <h3 className="font-display text-[32px] font-medium">Réservez votre créneau.</h3>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <Field label="Prénom" name="prenom" placeholder="ex: Jean" required onFocus={handleFormStart} />
        <Field label="Nom (Optionnel)" name="nom" placeholder="ex: Dupont" onFocus={handleFormStart} />
        <div className="md:col-span-2">
          <Field label="Email professionnel" name="email" type="email" placeholder="jean@entreprise.ai" required onFocus={handleFormStart} />
        </div>
        <div className="md:col-span-2">
          <Field label="Entreprise" name="entreprise" placeholder="Nom de votre société" required onFocus={handleFormStart} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          <Button type="submit" variant="primary" size="lg" className="w-full" loading={status === "sending"} icon={<ArrowRight size={18} />} trackLabel="envoyer_demande_audit" sectionId="contact_form">
            Envoyer ma demande d&apos;audit
          </Button>
          {status === "success" && (
            <p className="mt-6 text-[12px] font-mono uppercase text-center text-orange font-bold leading-relaxed">
              Demande envoyée ✓ On revient vers vous sous 24h.
            </p>
          )}
          {status === "error" && (
            <p className="mt-6 text-[12px] font-mono uppercase text-center text-error font-bold leading-relaxed">
              Une erreur est survenue. Écrivez-nous à contact@nana-intelligence.fr
            </p>
          )}
          <p className="mt-6 text-[11px] text-ink-4 font-mono uppercase text-center leading-relaxed">
            Zéro engagement. Uniquement de la valeur ajoutée.
          </p>
        </div>
      </form>
    </Box>
  );
}
