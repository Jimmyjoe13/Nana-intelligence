import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { teamMembers, values, history, techStack } from "@/mocks/about";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À Propos | Nana Intelligence — Agence Lead Generation B2B Marseille",
  description: "Nana Intelligence, agence de prospection B2B à Marseille. Fondé par Jimmy Khotsombat. +250 RDV qualifiés/mois, +200 PME accompagnées en région PACA. Cold Emailing, Scraping & Automatisation.",
  keywords: [
    "nana intelligence marseille",
    "agence lead generation b2b",
    "jimmy khotsombat fondateur",
    "prospection b2b france",
    "expert cold emailing",
    "automatisation commerciale"
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "À Propos — Nana Intelligence",
  "description": "Découvrez Nana Intelligence, agence de prospection B2B à Marseille. Fondateur Jimmy Khotsombat, expert en Cold Emailing, Scraping et Automatisation Sales.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Nana Intelligence",
    "url": "https://nana-intelligence.fr",
    "founder": {
      "@type": "Person",
      "name": "Jimmy Khotsombat",
      "jobTitle": "Fondateur & Lead Engineer"
    }
  }
};

export default function AboutPage() {
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
            kicker="Notre ADN"
            title="La Data et l'IA"
            emphasis="au service de votre croissance"
            description="Nana Intelligence n'est pas une agence classique. Nous sommes des ingénieurs de la croissance qui automatisent votre acquisition B2B."
          />
        </div>
      </section>

      {/* Profile Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
             <div className="aspect-square border-[1.5px] border-ink relative overflow-hidden bg-cream grayscale hover:grayscale-0 transition-all duration-700 group">
                <Image 
                  src={teamMembers[0].image} 
                   alt="Jimmy Khotsombat - Fondateur Nana Intelligence, expert Lead Generation B2B à Marseille" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 border-[1.5px] border-transparent group-hover:border-orange transition-all" />
             </div>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold">
                Founder & Lead Engineer
              </span>
              <h2 className="font-display text-[44px] md:text-[64px] leading-[1] font-medium">
                Libérer vos commerciaux <span className="italic font-normal text-orange">du hasard</span>.
              </h2>
            </div>
            <div className="flex flex-col gap-6 font-sans text-lg text-ink-2 leading-relaxed">
              {history.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-cream-3">
               <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-medium">5+</span>
                  <span className="font-mono text-[10px] text-ink-3 uppercase">Années d&apos;exp.</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-medium">100k€+</span>
                  <span className="font-mono text-[10px] text-ink-3 uppercase">Générés / mois</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-medium">50+</span>
                  <span className="font-mono text-[10px] text-ink-3 uppercase">Clients</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold">Outils</span>
            <h2 className="font-display text-[44px] md:text-[64px] leading-[1] font-medium">
              Une architecture <span className="italic font-normal text-orange">Best-in-class</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((tool, i) => (
              <Box key={i} className="flex flex-col gap-6 p-8 group hover:border-orange transition-all bg-cream-2 border-cream-3 hover:border-ink">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-ink font-bold uppercase tracking-widest">{tool.name}</span>
                  <Tag variant="outline">{tool.category}</Tag>
                </div>
                <p className="text-sm text-ink-3 leading-relaxed">
                  {tool.description}
                </p>
              </Box>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="flex flex-col items-center text-center gap-6">
            <Tag variant="outline" dot>Nos Valeurs</Tag>
            <h2 className="font-display text-[44px] md:text-[56px] leading-tight font-medium max-w-2xl">
              Les principes qui guident notre <span className="italic font-normal">méthode</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <Box key={i} className="flex flex-col gap-6 p-10 hover:border-orange transition-colors bg-cream">
                <span className="font-mono text-[14px] text-orange font-bold italic">/{v.title.toUpperCase()}</span>
                <h3 className="font-display text-[28px] font-medium leading-none">{v.title}</h3>
                <p className="text-ink-3 leading-relaxed">{v.description}</p>
              </Box>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
