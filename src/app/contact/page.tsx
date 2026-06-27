"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Field } from "@/components/ui/Field";
import { Mail, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { trackEvent } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact — Nana Intelligence",
  "description": "Contactez Nana Intelligence pour un audit gratuit de 30 minutes. Agence de Lead Generation B2B à Marseille.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Nana Intelligence",
    "url": "https://nana-intelligence.fr",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@nana-intelligence.fr",
      "contactType": "sales",
      "areaServed": ["FR"],
      "availableLanguage": ["French"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marseille",
      "addressCountry": "FR"
    }
  }
};

// Webhook de réception des leads (n8n). L'URL est publique (appelée côté navigateur).
const LEAD_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://n8n.nana-intelligence.fr/webhook/0182624b-bac0-4b3b-a258-8b62f851b5df";

export default function ContactPage() {
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
    // Récupère les valeurs via les attributs name des champs
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

      trackEvent("generate_lead"); // Conversion — à marquer comme key event dans GA4
      setStatus("success");
      form.reset();
      setFormStarted(false);
    } catch (err) {
      trackEvent("form_error", { message: String(err) });
      setStatus("error");
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker="Contact & Audit"
            title="Démarrer votre"
            emphasis="audit gratuit"
            description="Parlez-nous de vos objectifs de croissance. On analyse votre potentiel et on vous montre comment automatiser votre acquisition B2B."
          />
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left Side: Editorial & Info */}
            <div className="lg:col-span-5 flex flex-col gap-16">
              <div className="flex flex-col gap-8">
                <h2 className="font-display text-[36px] md:text-[44px] leading-tight font-medium text-ink">
                  Une approche <span className="italic text-orange font-normal">technique</span> de la vente.
                </h2>
                <p className="font-sans text-lg text-ink-2 leading-relaxed">
                  Pas de bla-bla commercial. On discute infrastructure, data, copywriting et ROI. On répond généralement en moins de 24 heures.
                </p>
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex items-start gap-6 group">
                  <div className="h-12 w-12 border-[1.5px] border-ink bg-cream flex items-center justify-center group-hover:bg-orange transition-colors">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] text-ink-3 uppercase font-bold">Email Direct</span>
                    <span className="font-display text-[20px]">contact@nana-intelligence.fr</span>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="h-12 w-12 border-[1.5px] border-ink bg-cream flex items-center justify-center group-hover:bg-orange transition-colors">
                    <Globe size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] text-ink-3 uppercase font-bold">Localisation</span>
                    <span className="font-display text-[20px]">Marseille, France</span>
                  </div>
                </div>
              </div>

              <Box variant="ink" className="p-10 flex flex-col gap-6 border-none">
                 <h4 className="font-display text-[22px]">Expertise Locale & Nationale</h4>
                 <p className="text-sm text-cream/60 leading-relaxed">
                   Basés à Marseille, nous accompagnons les entreprises en région PACA et dans toute la France pour dominer leur marché.
                 </p>
                 <div className="flex flex-wrap gap-2">
                    <Tag className="bg-white/10 border-cream/20 text-cream">Marseille</Tag>
                    <Tag className="bg-white/10 border-cream/20 text-cream">Aix-en-Provence</Tag>
                    <Tag className="bg-white/10 border-cream/20 text-cream">PACA</Tag>
                 </div>
              </Box>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-7">
               <Box className="bg-cream p-10 md:p-16 flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                     <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Audit de 30 minutes</span>
                     <h3 className="font-display text-[32px] font-medium">Réservez votre créneau.</h3>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <Field
                      label="Prénom"
                      name="prenom"
                      placeholder="ex: Jean"
                      required
                      onFocus={handleFormStart}
                    />
                    <Field
                      label="Nom (Optionnel)"
                      name="nom"
                      placeholder="ex: Dupont"
                      onFocus={handleFormStart}
                    />
                    <div className="md:col-span-2">
                      <Field
                        label="Email professionnel"
                        name="email"
                        type="email"
                        placeholder="jean@entreprise.ai"
                        required
                        onFocus={handleFormStart}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Field
                        label="Entreprise"
                        name="entreprise"
                        placeholder="Nom de votre société"
                        required
                        onFocus={handleFormStart}
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                       <label className="font-mono text-[11px] font-bold uppercase text-ink">Vos Besoins</label>
                       <textarea
                        name="besoins"
                        rows={6}
                        className="w-full bg-cream-2 border-[1.5px] border-ink px-4 py-4 font-mono text-[13px] focus:outline-none focus:border-orange transition-colors"
                        placeholder="Quels sont vos défis actuels (Lead Gen, Automatisation, SEO...) ?"
                        onFocus={handleFormStart}
                       />
                    </div>

                    <div className="md:col-span-2 pt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        loading={status === "sending"}
                        icon={<ArrowRight size={18} />}
                        trackLabel="envoyer_demande_audit"
                        sectionId="contact_form"
                      >
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
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-cream py-32">
         <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
            <div className="flex flex-col items-center gap-10 max-w-3xl text-center">
               <MessageSquare size={40} className="text-orange opacity-20" />
               <p className="font-display text-[28px] md:text-[36px] italic font-medium leading-snug text-ink">
                 &quot;Le Cold Emailing B2B en France autorise la prospection sans opt-in préalable dès lors que l&apos;offre est en lien direct avec la profession de l&apos;interlocuteur.&quot;
               </p>
               <span className="font-mono text-[12px] font-bold uppercase text-orange">Nana Intelligence — RGPD Compliant</span>
            </div>
         </div>
      </section>
    </div>
  );
}
