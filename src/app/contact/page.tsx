import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { Mail, MessageSquare, Globe } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Audit Gratuit 30 min | Nana Intelligence",
  description: "Contactez Nana Intelligence pour un audit gratuit de 30 minutes. Agence de Lead Generation B2B a Marseille, specialisee en Cold Emailing, Scraping et Automatisation Sales.",
  keywords: [
    "contact agence lead generation",
    "audit gratuit prospection B2B",
    "agence lead generation marseille contact",
    "devis cold emailing B2B",
    "consultant prospection commerciale PACA",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact \u2014 Nana Intelligence",
  "description": "Contactez Nana Intelligence pour un audit gratuit de 30 minutes. Agence de Lead Generation B2B a Marseille.",
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

export default function ContactPage() {
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
            title="Demarrer votre"
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
                  Pas de bla-bla commercial. On discute infrastructure, data, copywriting et ROI. On repond generalement en moins de 24 heures.
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

            {/* Right Side: Form (Client Component) */}
            <div className="lg:col-span-7">
              <ContactForm />
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
                 &quot;Le Cold Emailing B2B en France autorise la prospection sans opt-in prealable des lors que l&apos;offre est en lien direct avec la profession de l&apos;interlocuteur.&quot;
               </p>
               <span className="font-mono text-[12px] font-bold uppercase text-orange">Nana Intelligence \u2014 RGPD Compliant</span>
            </div>
         </div>
      </section>
    </div>
  );
}
