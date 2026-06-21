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
  title: "Agence Lead Generation B2B Marseille, Aix, Toulon | Nana",
  description: "Agence de prospection B2B à Marseille, Aix-en-Provence et Toulon. +200 PME accompagnées en région PACA. Cold Emailing, Scraping LinkedIn & Automatisation Sales. Audit gratuit 30 min →",
  keywords: [
    "agence lead generation b2b marseille",
    "agence prospection b2b aix en provence",
    "agence cold emailing toulon",
    "lead generation region paca",
    "prospection commerciale b2b sud france",
    "agence de prospection commerciale marseille",
    "agence lead gen marseille"
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
            title="Nos Agences"
            emphasis="de proximité"
            description="Nana Intelligence rayonne sur toute la France avec un ancrage fort en région PACA. Trouvez l'expertise locale adaptée à votre marché."
          />
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
                  <Button variant="ink" className="w-full" icon={<ArrowRight size={16} />}>Découvrir l&apos;agence</Button>
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
           <div className="aspect-[16/9] border-[1.5px] border-ink bg-cream-2 flex items-center justify-center font-mono text-ink-4 text-[11px]">
              [CARTE_INTERACTIVE_PLACEHOLDER]
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-10">
           <h2 className="font-display text-[44px] md:text-[64px] text-cream leading-none font-medium">Vous ne trouvez pas votre ville ?</h2>
           <p className="text-cream/60 max-w-xl text-lg">Nous accompagnons les entreprises sur toute la France. Discutons de votre projet dès maintenant.</p>
           <Link href="/contact">
             <Button variant="primary" size="lg" icon={<Sparkles size={20} />}>Démarrer un Audit Global</Button>
           </Link>
        </div>
      </section>
    </div>
  );
}
