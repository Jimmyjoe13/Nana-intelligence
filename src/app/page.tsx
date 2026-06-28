import React from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Metric } from "@/components/ui/Metric";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { homeMetrics, homeServices, homeTestimonials, faqData } from "@/mocks/home";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FAQSection } from "@/components/sections/FAQSection";

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Lead Generation B2B",
  "provider": {
    "@type": "Organization",
    "name": "Nana Intelligence",
    "url": "https://nana-intelligence.fr"
  },
  "areaServed": ["France", "Marseille", "Aix-en-Provence", "Toulon"],
  "description": "Service de Lead Generation B2B : Cold Emailing, Scraping LinkedIn/Google Maps et Automatisation Sales pour générer des RDV qualifiés.",
  "serviceType": "Prospection Commerciale B2B",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "EUR",
      "description": "Audit gratuit de 30 minutes"
    }
  }
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://nana-intelligence.fr"
    }
  ]
};

export const metadata: Metadata = {
  title: "Générez +250 RDV B2B par Mois | Nana Intelligence",
  description: "Agence de Lead Generation B2B à Marseille. Cold Emailing, Scraping et Automatisation Sales pour remplir votre agenda de RDV qualifiés. Audit gratuit 30 min.",
  keywords: [
    "lead generation b2b marseille",
    "agence prospection b2b",
    "cold emailing france",
    "scraping linkedin b2b",
    "automatisation sales",
    "rdv qualifies b2b",
    "nana intelligence"
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {/* Hero Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="max-w-4xl flex flex-col gap-10">
             <div className="flex flex-col gap-6">
                <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">
                  Agence Lead Generation B2B Marseille
                </span>
                <h1 className="font-display text-[64px] md:text-[104px] leading-[0.9] tracking-tight text-ink font-medium">
                  Générez un flux continu de <em className="italic text-orange font-normal">RDV qualifiés</em>.
                </h1>
             </div>
             <p className="font-sans text-xl md:text-2xl text-ink-2 leading-relaxed max-w-2xl">
               Nana Intelligence automatise votre prospection commerciale B2B. Nous construisons votre machine d&apos;acquisition sur-mesure pour remplir votre agenda en automatique.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-6">
               <Link href="/contact">
                 <Button 
                    variant="primary" 
                    size="lg" 
                    icon={<ArrowRight size={20} />}
                    trackLabel="hero_audit_gratuit"
                    sectionId="hero"
                  >
                   Réserver mon audit gratuit (30 min)
                 </Button>
               </Link>
               <Link href="#methode">
                 <Button 
                    variant="ghost" 
                    size="lg"
                    trackLabel="hero_decouvrir_methode"
                    sectionId="hero"
                  >
                   Découvrir notre méthode
                 </Button>
               </Link>
             </div>
          </div>

          {/* Metric Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pt-10 border-t border-cream-3">
            {homeMetrics.map((metric, i) => (
              <Metric 
                key={i}
                label={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                size="md"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink" id="methode">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="flex flex-col gap-4 text-center items-center">
            <Tag variant="outline">Le Problème</Tag>
            <h2 className="font-display text-[44px] md:text-[64px] leading-tight font-medium max-w-3xl">
              Pourquoi votre prospection <span className="italic font-normal text-orange">ne fonctionne pas</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Box className="flex flex-col gap-6 bg-cream">
              <span className="font-mono text-orange font-bold text-lg">/01</span>
              <h3 className="font-display text-2xl font-medium">Emails ignorés</h3>
              <p className="text-ink-3 text-sm leading-relaxed">
                Vos emails finissent en spam ou sont noyés dans la masse. Sans expertise technique (SPF, DKIM, warm-up), votre délivrabilité est compromise.
              </p>
            </Box>
            <Box className="flex flex-col gap-6 bg-cream">
              <span className="font-mono text-orange font-bold text-lg">/02</span>
              <h3 className="font-display text-2xl font-medium">Temps perdu</h3>
              <p className="text-ink-3 text-sm leading-relaxed">
                Vous passez des heures à chercher des prospects, enrichir des données, rédiger des emails... pour quelques réponses décevantes.
              </p>
            </Box>
            <Box className="flex flex-col gap-6 bg-cream">
              <span className="font-mono text-orange font-bold text-lg">/03</span>
              <h3 className="font-display text-2xl font-medium">Résultats imprévisibles</h3>
              <p className="text-ink-3 text-sm leading-relaxed">
                Sans système reproductible, votre acquisition dépend du hasard. Pas de pipeline prévisible = pas de croissance maîtrisée.
              </p>
            </Box>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold">La Solution</span>
              <h2 className="font-display text-[44px] md:text-[64px] leading-[1] font-medium max-w-xl">
                Ce que vous obtenez avec <span className="italic font-normal">Nana Intelligence</span>.
              </h2>
            </div>
            <Link href="/services">
               <Button 
                  variant="ink" 
                  icon={<ArrowRight size={16} />}
                  trackLabel="voir_tous_services"
                  sectionId="solution"
                >
                  Voir tous les services
                </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {homeServices.map((service, i) => (
              <Box key={i} className="flex flex-col gap-8 group hover:border-orange transition-all duration-300 bg-cream">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-ink-3 uppercase tracking-widest">{service.kicker}</span>
                  <Link href={service.link}>
                    <h3 className="font-display text-[28px] font-medium group-hover:text-orange transition-colors">
                      {service.title}
                    </h3>
                  </Link>
                </div>
                <p className="text-ink-2 leading-relaxed text-sm">
                  {service.description}
                </p>
                <div className="mt-auto pt-6 border-t border-cream-3 flex items-center justify-between">
                   <Link href={service.link} className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold hover:underline">
                      Voir : {service.title}
                   </Link>
                   <CheckCircle2 size={18} className="text-orange" />
                </div>
              </Box>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Tag variant="outline" dot>FAQ</Tag>
            <h2 className="font-display text-[44px] md:text-[64px] leading-tight font-medium">
              Questions <span className="italic font-normal text-orange">fréquentes</span>.
            </h2>
            <p className="font-sans text-lg text-ink-2 leading-relaxed">
              Tout ce que vous devez savoir sur notre approche technique de la prospection B2B.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/services" className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold hover:underline">
                → Découvrir nos services de lead generation
              </Link>
            </div>
            <Link href="/contact" className="mt-4">
              <Button 
                variant="ink"
                trackLabel="faq_poser_question"
                sectionId="faq"
              >
                Poser une autre question
              </Button>
            </Link>
          </div>

          <FAQSection items={faqData} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          <div className="flex flex-col items-center text-center gap-6">
            <Tag variant="outline" dot>Témoignages</Tag>
            <h2 className="font-display text-[44px] md:text-[56px] leading-tight font-medium max-w-2xl">
              Ce que disent nos <span className="italic font-normal">clients</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {homeTestimonials.map((t, i) => (
              <div key={i} className="flex flex-col gap-8 p-10 border-[1.5px] border-ink relative bg-cream">
                <div className="absolute -top-4 left-10 bg-orange px-4 py-2 font-mono text-[10px] text-ink font-bold uppercase tracking-widest shadow-sm">
                   Résultat mesuré
                </div>
                <p className="font-hand text-[28px] md:text-[32px] text-orange leading-snug">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex flex-col">
                  <span className="font-display text-[18px] font-medium text-ink">{t.author}</span>
                  <span className="font-mono text-[11px] text-ink-3 uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <Box variant="ink" className="flex flex-col items-center text-center gap-10 py-20 px-10 border-cream/20">
             <div className="flex flex-col gap-6">
                <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Prêt à remplir votre agenda ?</span>
                <h2 className="font-display text-[44px] md:text-[80px] leading-[0.95] text-cream font-medium">
                  Lancez votre <span className="italic text-orange font-normal">machine</span> à leads.
                </h2>
             </div>
             <p className="text-cream/60 max-w-xl text-lg leading-relaxed">
               Réservez votre audit gratuit de 30 minutes. Nous analysons votre potentiel et construisons votre stratégie d&apos;acquisition personnalisée.
             </p>
             <Link href="/contact">
               <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<Sparkles size={20} />}
                  trackLabel="final_cta_audit"
                  sectionId="final_cta"
                >
                 Réserver mon audit gratuit
               </Button>
             </Link>
          </Box>
        </div>
      </section>
    </div>
  );
}
