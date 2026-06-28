import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceDetails } from "@/mocks/serviceDetails";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { FAQSection } from "@/components/sections/FAQSection";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = serviceDetails[params.slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

function getJsonLd(data: typeof serviceDetails[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.heroSubtitle,
    "url": `https://nana-intelligence.fr/services/${data.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "Nana Intelligence",
      "url": "https://nana-intelligence.fr",
    },
    "areaServed": ["France", "Marseille", "Aix-en-Provence", "Toulon", "Nice"],
  };
}

function getBreadcrumb(data: typeof serviceDetails[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://nana-intelligence.fr" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://nana-intelligence.fr/services" },
      { "@type": "ListItem", "position": 3, "name": data.name, "item": `https://nana-intelligence.fr/services/${data.slug}` },
    ],
  };
}

function getFaqJsonLd(data: typeof serviceDetails[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const data = serviceDetails[params.slug];
  if (!data) notFound();

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(data)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumb(data)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(data)) }} />

      {/* Hero */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker={data.kicker}
            title={data.heroTitle}
            description={data.heroSubtitle}
            actions={[
              <Link key="cta" href="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
                  Audit gratuit
                </Button>
              </Link>,
            ]}
          />
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 flex flex-col gap-6 font-sans text-lg text-ink-2 leading-relaxed">
            {data.detailedContent.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="pt-2">
              Ce service s&apos;intègre dans notre offre globale de{" "}
              <Link href="/agence-lead-generation" className="text-orange hover:underline">prospection commerciale B2B</Link>.
              Consultez aussi nos <Link href="/blog" className="text-orange hover:underline">guides prospection B2B</Link>.
              Découvrez aussi nos autres services :{" "}
              <Link href="/services/cold-emailing-b2b" className="text-orange hover:underline">Cold Emailing B2B</Link>,{" "}
              <Link href="/services/scraping-b2b" className="text-orange hover:underline">Scraping B2B</Link> et{" "}
              <Link href="/services/automatisation-sales" className="text-orange hover:underline">Automatisation Sales</Link>.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Box className="bg-cream p-10 flex flex-col gap-8 sticky top-28">
              <Tag variant="orange" dot>Ce que vous obtenez</Tag>
              <div className="flex flex-col gap-4">
                {data.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3 text-ink">
                    <div className="h-5 w-5 mt-0.5 shrink-0 border border-ink flex items-center justify-center bg-cream shadow-[2px_2px_0px_#1a1a1a]">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[14px] font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-2">
                <Button variant="ink" className="w-full" icon={<ArrowRight size={16} />}>
                  Démarrer mon projet
                </Button>
              </Link>
            </Box>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Tag variant="outline" dot>FAQ</Tag>
            <h2 className="font-display text-[44px] md:text-[64px] leading-tight font-medium">
              Questions <span className="italic font-normal text-orange">fréquentes</span>.
            </h2>
            <p className="font-sans text-lg text-ink-2 leading-relaxed">
              Tout ce que vous devez savoir sur notre service de {data.name.toLowerCase()}.
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
              <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Démarrage rapide</span>
              <h2 className="font-display text-[44px] md:text-[80px] leading-[0.95] text-cream font-medium">
                Prêt à lancer votre <span className="italic text-orange font-normal">{data.name.toLowerCase()}</span> ?
              </h2>
            </div>
            <p className="text-cream/60 max-w-xl text-lg leading-relaxed">
              Obtenez une analyse gratuite de votre potentiel d&apos;acquisition.
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

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}
