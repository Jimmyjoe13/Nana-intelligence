import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { agenciesData } from "@/mocks/agencies";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/agence-lead-generation/" },
  title: "Agence de prospection B2B : RDV qualifiés en 15 jours | Nana",
  description: "Agence de prospection B2B : cold emailing, scraping et automatisation sales. Premiers RDV qualifiés en 15 jours, partout en France. Audit 30 min offert.",
  keywords: [
    "agence de prospection b2b",
    "agence prospection commerciale b2b",
    "agence lead generation b2b",
    "agence prospection commerciale b2b marseille",
    "agence prospection commerciale b2b aix en provence",
    "agence prospection commerciale b2b toulon",
    "agence prospection commerciale b2b nice",
    "lead generation region paca",
    "prospection commerciale b2b sud france",
    "agence cold emailing paca"
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Agences Nana Intelligence en région PACA",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Agence Prospection B2B Marseille",
      "url": "https://nana-intelligence.fr/agence-lead-generation/marseille"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Agence Lead Generation Aix-en-Provence",
      "url": "https://nana-intelligence.fr/agence-lead-generation/aix-en-provence"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Agence Prospection B2B Toulon",
      "url": "https://nana-intelligence.fr/agence-lead-generation/toulon"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Agence Prospection B2B Nice",
      "url": "https://nana-intelligence.fr/agence-lead-generation/nice"
    }
  ]
};

export default function AgencyPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker="Réseau National"
            title="Agence de prospection B2B"
            emphasis="de proximité"
            description="Cold emailing, scraping et automatisation sales : des rendez-vous qualifiés en 15 jours partout en France, avec un ancrage fort en région PACA. Audit stratégique 30 min offert."
          />
          {/* Preuve sociale — bandeau placé AVANT le CTA principal */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink">+250 RDV qualifiés / mois</span>
            <span aria-hidden="true" className="hidden sm:block h-3 w-px bg-ink/20" />
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink">Premiers RDV en 15 jours</span>
            <span aria-hidden="true" className="hidden sm:block h-3 w-px bg-ink/20" />
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink">40+ audits offerts en 2026</span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center">
            <Link href="/contact/#contact-form">
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} trackLabel="agence_hero_audit" sectionId="agence_hero" className="mt-4">
                Obtenir mon audit gratuit 30 min
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
            Réponse sous 24 h · Données jamais partagées · Sans engagement
          </p>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {Object.values(agenciesData).map((agency) => (
              <Box key={agency.slug} className="flex flex-col gap-8 group hover:border-orange transition-all bg-cream">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-orange font-mono text-[10px] font-bold uppercase tracking-widest">
                     <MapPin size={12} />
                     {agency.cityName}
                  </div>
                  <h3 className="font-display text-[28px] font-medium group-hover:text-orange transition-colors">
                    {agency.heroTitle.replace('Agence ', '')}
                  </h3>
                </div>
                <p className="text-ink-2 text-sm leading-relaxed line-clamp-3">
                  {agency.heroSubtitle}
                </p>
                <Link href={`/agence-lead-generation/${agency.slug}`} className="mt-auto">
                  <Button variant="ink" className="w-full" icon={<ArrowRight size={16} />} trackLabel={`agence_card_${agency.slug}`} sectionId="agence_cities">Générer des leads à {agency.cityName}</Button>
                </Link>
              </Box>
            ))}
          </div>
        </div>
      </section>

      {/* Map/Global Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="flex flex-col gap-8">
              <h2 className="font-display text-[44px] leading-tight font-medium">Une couverture <span className="italic text-orange font-normal">nationale</span>, un esprit local.</h2>
              <p className="font-sans text-lg text-ink-2 leading-relaxed">
                Bien que nos bureaux principaux soient situés dans le Sud de la France, nous pilotons des campagnes de prospection pour des entreprises basées à Paris, Lyon, Bordeaux et partout en Europe. Notre infrastructure cloud nous permet d&apos;intervenir sans limites géographiques.
              </p>
              <div className="flex gap-4">
                 <Tag variant="outline">Marseille (HQ)</Tag>
                 <Tag variant="outline">Aix-en-Provence</Tag>
                 <Tag variant="outline">Toulon</Tag>
                 <Tag variant="outline">Remote</Tag>
              </div>
           </div>
           <div className="aspect-[16/9] border-[1.5px] border-ink bg-cream-2 flex flex-col items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-4 text-center px-6">
              <MapPin size={22} className="text-orange" />
              <span className="text-ink font-bold">Marseille · Aix-en-Provence · Toulon · Nice</span>
              <span>Campagnes déployées partout en France et en Europe</span>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-10">
           <h2 className="font-display text-[44px] md:text-[64px] text-cream leading-none font-medium">Vous ne trouvez pas votre ville ?</h2>
           <p className="text-cream/60 max-w-xl text-lg">Nous accompagnons les entreprises sur toute la France. Discutons de votre projet dès maintenant.</p>
           <div className="flex flex-wrap gap-4 justify-center">
             <Link href="/contact/#contact-form">
               <Button variant="primary" size="lg" icon={<Sparkles size={20} />} trackLabel="agence_footer_audit" sectionId="agence_footer">Obtenir mon audit gratuit 30 min</Button>
             </Link>
           </div>
           <p className="font-mono text-[11px] text-cream/50 uppercase tracking-[0.12em]">Réponse sous 24 h · Sans engagement · Données jamais partagées</p>
        </div>
      </section>
    </div>
  );
}
