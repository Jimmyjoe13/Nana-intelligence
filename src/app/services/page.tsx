import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Metric } from "@/components/ui/Metric";
import { Tag } from "@/components/ui/Tag";
import { detailedServices, processSteps } from "@/mocks/services";
import { ArrowRight, Check, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

// Mappe les blocs du hub vers leurs landing pages d\u00e9di\u00e9es (maillage interne / SEO)
const serviceLinks: Record<string, { href: string; label: string }> = {
  "cold-email": { href: "/services/cold-emailing-b2b", label: "Cold Emailing B2B" },
  "automation": { href: "/services/automatisation-sales", label: "Automatisation Sales" },
  "accompagnement-seo": { href: "/services/accompagnement-seo", label: "Accompagnement SEO" },
};

const detailedServicePages = [
  { href: "/services/cold-emailing-b2b", label: "Cold Emailing B2B" },
  { href: "/services/scraping-b2b", label: "Scraping & Enrichissement B2B" },
  { href: "/services/automatisation-sales", label: "Automatisation Sales" },
  { href: "/services/accompagnement-seo", label: "Accompagnement SEO" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/services/" },
  title: "Services Prospection & Acquisition B2B | Nana Intelligence",
description: "Services de prospection B2B : Cold Emailing, Scraping, Automatisation Sales & SEO. Boostez vos rendez-vous commerciaux. Réservez votre audit offert.",
  keywords: [
    "service lead generation b2b",
    "cold emailing france",
    "scraping linkedin google maps",
    "automatisation sales crm",
    "agence prospection b2b marseille",
    "accompagnement seo b2b",
    "audit seo gratuit",
    "rdv qualifies"
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Services de Prospection B2B",
  "provider": {
    "@type": "Organization",
    "name": "Nana Intelligence",
    "url": "https://nana-intelligence.fr"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Lead Generation B2B",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cold Emailing B2B",
          "description": "S\u00e9quences de cold email personnalis\u00e9es avec setup technique complet (SPF, DKIM, warm-up) pour maximiser la d\u00e9livrabilit\u00e9."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Scraping & Enrichissement B2B",
          "description": "Extraction de donn\u00e9es prospects sur LinkedIn et Google Maps, enrichissement avec emails professionnels v\u00e9rifi\u00e9s."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Automatisation Sales",
          "description": "Connexion CRM, workflows automatis\u00e9s et reporting en temps r\u00e9el pour lib\u00e9rer vos commerciaux des t\u00e2ches r\u00e9p\u00e9titives."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Accompagnement SEO",
          "description": "Audit technique, optimisation on-page, stratégie de contenu et suivi de positions pour générer un trafic Google qualifié et durable."
        }
      }
    ]
  },
  "areaServed": ["France", "Marseille", "Aix-en-Provence", "Toulon"]
};

export default function ServicesPage() {
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
            kicker="Nos expertises"
            title="Services de"
            emphasis="prospection B2B"
            description="G\u00e9n\u00e9rez des opportunit\u00e9s qualifi\u00e9es sans effort gr\u00e2ce \u00e0 nos services de Lead Generation sp\u00e9cialis\u00e9s."
          />
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="mt-4">
                Demandez votre audit gratuit
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 pt-10">
            {detailedServicePages.map((s) => (
              <Link key={s.href} href={s.href}>
                <Tag variant="outline" className="hover:border-orange hover:text-orange transition-colors cursor-pointer">
                  {s.label} \u2192
                </Tag>
              </Link>
            ))}
            <p className="text-cream/80 text-sm mt-2 w-full">Réponse sous 24 h, sans engagement.</p>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-24">
          {detailedServices.map((service) => (
            <div 
              key={service.id} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start"
            >
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold">
                    {service.kicker}
                  </span>
                  <h2 className="font-display text-[44px] md:text-[56px] leading-[0.95] font-medium">
                    {service.title} <span className="italic text-orange font-normal">{service.emphasis}</span>
                  </h2>
                </div>
                <p className="font-sans text-lg text-ink-2 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-col gap-4 pt-4">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-ink">
                      <div className="h-5 w-5 rounded-none border border-ink flex items-center justify-center bg-cream shadow-[2px_2px_0px_#1a1a1a]">
                         <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-[15px] font-medium uppercase tracking-tight font-mono">{feature}</span>
                    </div>
                  ))}
                </div>
                {serviceLinks[service.id] && (
<>
                    <Link href={serviceLinks[service.id].href} className="pt-2 w-fit">
                      <span className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-orange hover:gap-3 transition-all">
                        → {serviceLinks[service.id].label} : détail de l&apos;offre <ArrowRight size={14} />
                      </span>
                    </Link>
                    <p className="text-cream/80 text-sm mt-2">Réponse sous 24 h, sans engagement.</p>
                  </>
                )}
              </div>

              <div className="lg:col-span-7">
                <Box variant="default" className="p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-orange transition-all bg-cream">
                  <div className="flex flex-col gap-8 flex-1">
                     <Tag variant="orange" dot>Objectif Business</Tag>
                     <Metric 
                        label={service.metric.label}
                        value={service.metric.value}
                        suffix={service.metric.suffix}
                        prefix={service.metric.prefix}
                        size="lg"
                     />
                  </div>
                  <div className="h-[2px] w-12 bg-ink-4 hidden md:block" />
                  <div className="flex-1 flex flex-col gap-6">
                    <p className="text-sm italic text-ink-3">
                      « Notre machine d&apos;acquisition est maintenant 100% prévisible. »
                    </p>
                    <Link href="/contact">
                      <Button variant="primary" icon={<ArrowRight size={16} />}>D\u00e9marrer mon projet</Button>
                    </Link>
                <p className="text-cream/80 text-sm mt-2">Réponse sous 24 h, sans engagement.</p>
                  </div>
                </Box>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">La M\u00e9thode</span>
            <h2 className="font-display text-[44px] md:text-[64px] leading-tight font-medium max-w-3xl">
              Comment on travaille <span className="italic font-normal">ensemble</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-6 p-8 border-[1.5px] border-ink bg-cream-2 relative group hover:bg-ink hover:text-cream transition-all duration-300">
                <div className="font-mono text-[40px] font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                  0{i + 1}
                </div>
                <div className="flex flex-col gap-2">
                   <h3 className="font-display text-[22px] font-medium">{step.title}</h3>
                   <p className="text-sm opacity-80 leading-relaxed">{step.text}</p>
                </div>
                <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Zap size={20} className="text-orange" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-[44px] md:text-[56px] text-center mb-12">Ce que disent nos clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Box variant="default" className="p-6">
              <p className="italic">\u201cNana Intelligence a tripl\u00e9 nos RDV qualifi\u00e9s en 45 jours.\u201d</p>
              <p className="mt-4 font-medium text-right">- PME marseillaise, 22 employ\u00e9s</p>
            </Box>
            <Box variant="default" className="p-6">
              <p className="italic">\u201cLeur automatisation nous a lib\u00e9r\u00e9 20h/semaine.\u201d</p>
              <p className="mt-4 font-medium text-right">- Startup SaaS</p>
            </Box>
            <Box variant="default" className="p-6">
              <p className="italic">\u201cDes leads ultra\u2011qualifi\u00e9s, pr\u00eats \u00e0 acheter.\u201d</p>
              <p className="mt-4 font-medium text-right">- Scale\u2011up B2B</p>
            </Box>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <Box variant="ink" className="flex flex-col items-center text-center gap-10 py-20 px-10 border-cream/20">
             <div className="flex flex-col gap-6">
                <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Audit gratuit</span>
                <h2 className="font-display text-[44px] md:text-[80px] leading-[0.95] text-cream font-medium">
                  Besoin d&apos;un service <span className="italic text-orange font-normal">sur-mesure</span> ?
                </h2>
             </div>
             <p className="text-cream/60 max-w-xl text-lg leading-relaxed">
               Discutons de vos besoins pour construire une solution adapt\u00e9e \u00e0 vos objectifs commerciaux.
             </p>
             <Link href="/contact">
               <Button variant="primary" size="lg" icon={<Sparkles size={20} />}>
                 Demander un devis
               </Button>
             </Link>
                <p className="text-cream/80 text-sm mt-2">Réponse sous 24 h, sans engagement.</p>
          </Box>
        </div>
      </section>
    </div>
  );
}
