import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { agenciesData } from "@/mocks/agencies";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { FAQSection } from "@/components/sections/FAQSection";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Maillage interne : services liés à cette ville
const cityServiceLinks = [
  { href: "/services/cold-emailing-b2b", label: "Cold Emailing B2B" },
  { href: "/services/scraping-b2b", label: "Scraping & Enrichissement B2B" },
  { href: "/services/automatisation-sales", label: "Automatisation Sales" },
];

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = agenciesData[params.slug];
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

function getJsonLd(data: typeof agenciesData[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Nana Intelligence - Agence ${data.cityName}`,
    "description": data.heroSubtitle,
    "url": `https://nana-intelligence.fr/agence-lead-generation/${data.slug}`,
    "parentOrganization": {
      "@type": "Organization",
      "name": "Nana Intelligence",
      "url": "https://nana-intelligence.fr"
    },
    "areaServed": { "@type": "City", "name": data.cityName },
    "serviceArea": { "@type": "State", "name": "Provence-Alpes-Côte d'Azur" }
  };
}

function getBreadcrumb(data: typeof agenciesData[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://nana-intelligence.fr" },
      { "@type": "ListItem", "position": 2, "name": "Agences", "item": "https://nana-intelligence.fr/agence-lead-generation" },
      { "@type": "ListItem", "position": 3, "name": data.cityName, "item": `https://nana-intelligence.fr/agence-lead-generation/${data.slug}` }
    ]
  };
}

export default function AgencyCityPage({ params }: Props) {
  const data = agenciesData[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(data)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumb(data)) }}
      />
      {/* Hero Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-12">
          <PageHeader
            kicker={data.badge}
            title={data.heroTitle}
            description={data.heroSubtitle}
            actions={[
              <Link key="cta" href="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
                  Audit Gratuit {data.cityName}
                </Button>
              </Link>
            ]}
          />
        </div>
      </section>

      {/* Local Content Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="font-display text-[44px] md:text-[56px] leading-[1.1] font-medium">
                Pourquoi externaliser sa prospection à <span className="italic text-orange font-normal">{data.cityName}</span> ?
              </h2>
              <div className="flex flex-col gap-6 font-sans text-lg text-ink-2 leading-relaxed">
                {data.detailedContent.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p>
                  Découvrez également nos guides experts sur le <Link href="/blog/2" className="text-orange hover:underline">Cold Emailing</Link> et le <Link href="/blog/3" className="text-orange hover:underline">Scraping B2B</Link> pour optimiser votre machine de vente.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="text-sm font-mono uppercase tracking-wider text-ink-2">Nos services à {data.cityName} :</span>
                  {cityServiceLinks.map((s) => (
                    <Link key={s.href} href={s.href}>
                      <Tag variant="outline" className="hover:border-orange hover:text-orange transition-colors cursor-pointer">
                        {s.label} →
                      </Tag>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                 <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange mt-1 shrink-0" />
                    <span className="text-sm font-medium uppercase font-mono">Ciblage local ultra-précis</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange mt-1 shrink-0" />
                    <span className="text-sm font-medium uppercase font-mono">Expertise PACA & National</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange mt-1 shrink-0" />
                    <span className="text-sm font-medium uppercase font-mono">ROI Mesurable en 15 jours</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange mt-1 shrink-0" />
                    <span className="text-sm font-medium uppercase font-mono">Infrastructure 100% Managée</span>
                 </div>
              </div>
            </div>
            <Box className="bg-cream p-10 flex flex-col gap-8">
               <h3 className="font-display text-2xl font-medium border-b border-ink pb-4">Zone d&apos;intervention</h3>
               <p className="text-ink-3">Nous opérons depuis la cité phocéenne pour rayonner sur toute la région PACA et accompagner des clients dans toute la France.</p>
               <div className="flex flex-wrap gap-2">
                  {["Marseille", "Aix-en-Provence", "Aubagne", "Vitrolles", "Toulon", "Nice", "Var", "France"].map(city => (
                    <Tag key={city} variant="outline" className={city === data.cityName ? "border-orange text-orange" : ""}>{city}</Tag>
                  ))}
               </div>
            </Box>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Tag variant="outline" dot>FAQ {data.cityName}</Tag>
            <h2 className="font-display text-[44px] md:text-[64px] leading-tight font-medium">
              Questions <span className="italic font-normal text-orange">fréquentes</span>.
            </h2>
            <p className="font-sans text-lg text-ink-2 leading-relaxed">
              Tout ce que vous devez savoir sur notre approche locale à {data.cityName}.
            </p>
          </div>
          <FAQSection items={data.faq} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <Box variant="ink" className="flex flex-col items-center text-center gap-10 py-20 px-10 border-cream/20">
             <div className="flex flex-col gap-6">
                <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Démarrage immédiat</span>
                <h2 className="font-display text-[44px] md:text-[80px] leading-[0.95] text-cream font-medium">
                  Prêt à dominer le marché de <span className="italic text-orange font-normal">{data.cityName}</span> ?
                </h2>
             </div>
             <p className="text-cream/60 max-w-xl text-lg leading-relaxed">
               Obtenez une analyse gratuite de votre potentiel de génération de leads.
             </p>
             <Link href="/contact">
               <Button variant="primary" size="lg" icon={<Sparkles size={20} />}>
                 Réserver mon audit gratuit
               </Button>
             </Link>
          </Box>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(agenciesData).map((slug) => ({
    slug: slug,
  }));
}
