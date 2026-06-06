import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, Sparkles, Zap, MapPin, Linkedin, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Meilleur Outil Scraping B2B (Google Maps, LinkedIn) | Nana Spider",
  description: "Logiciel de scraping B2B en ligne. Extraction de données Google Maps et LinkedIn, email finder intégré. Fichier de prospection CSV exportable sans abonnement.",
  keywords: ["outil scraping b2b", "scraper google maps", "scraper linkedin", "email finder b2b", "fichier de prospection", "extraction de données", "logiciel sans code"],
};

const faqData = [
  {
    question: "Le scraping B2B est-il légal et conforme au RGPD ?",
    answer: "Oui. En France, le scraping B2B est légal si la donnée est publique, s'il s'agit d'un email professionnel, et si votre démarche commerciale justifie un intérêt légitime. Nana Spider intègre nativement des filtres pour respecter ces 3 piliers."
  },
  {
    question: "Puis-je scraper Google Maps pour des commerces locaux ?",
    answer: "Absolument. Spider est l'un des meilleurs outils pour le scraping Google Maps. Vous pouvez cibler n'importe quel type de commerce (restaurants, agences immobilières, artisans) dans une ville spécifique et récupérer les numéros de téléphone et sites web."
  },
  {
    question: "L'outil propose-t-il un Email Finder pour LinkedIn ?",
    answer: "Oui. Notre algorithme ne se contente pas de scraper LinkedIn, il enrichit automatiquement les profils trouvés (CEO, DRH, etc.) avec leurs adresses emails professionnelles nominatives et vérifiées."
  },
  {
    question: "Faut-il payer un abonnement mensuel ?",
    answer: "Non. Nana Spider fonctionne au paiement à la performance (Pay-As-You-Go). Vous ne payez que pour les leads valides extraits et enrichis. Aucun engagement, aucune carte bancaire pour tester."
  }
];

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nana Spider B2B",
  "operatingSystem": "Web Browser",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Modèle Pay-As-You-Go (Paiement à la performance)"
  },
  "description": "Logiciel de scraping B2B puissant pour extraire des prospects sur Google Maps et LinkedIn avec enrichissement d'adresses email."
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function ScraperB2BPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Hero Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker="Outil de Scraping B2B en Ligne"
            title="Le Meilleur Logiciel de Scraping Google Maps & LinkedIn"
            emphasis="sans abonnement"
            description="L'extracteur de données B2B (Email Finder, Numéros, Postes) qui transforme le web en fichier de prospection CSV prêt à l'emploi. Pas de code, paiement à la performance."
          />
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="https://spider.nana-intelligence.fr/order/new" target="_blank">
              <Button variant="primary" size="lg" icon={<Sparkles size={20} />} trackLabel="hero_launch_spider" sectionId="hero_scraper">
                Lancer une extraction
              </Button>
            </Link>
            <Link href="https://spider.nana-intelligence.fr" target="_blank">
              <Button variant="ghost" size="lg" trackLabel="hero_view_spider" sectionId="hero_scraper">
                Voir l&apos;outil en ligne
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-4 mb-16 text-center items-center">
            <h2 className="font-display text-[44px] leading-tight font-medium">Les fonctionnalités de <span className="text-orange italic">notre extracteur B2B</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <MapPin size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Scraping Google Maps</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Extraction massive des données Google Maps : noms, adresses, numéros de téléphone et sites web des entreprises locales.
              </p>
            </Box>

            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Linkedin size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Scraping LinkedIn</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Ciblez les décideurs sur LinkedIn et Sales Navigator. Exportez les profils, postes et localisations en un clic.
              </p>
            </Box>

            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Mail size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Email Finder B2B</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Enrichissement automatique : nous trouvons et vérifions l&apos;adresse email professionnelle nominative de vos cibles.
              </p>
            </Box>

            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Zap size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Export CSV direct</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Téléchargez un fichier de prospection Excel/CSV propre, nettoyé des doublons, prêt à être importé dans votre CRM.
              </p>
            </Box>
          </div>
        </div>
      </section>

      {/* SEO Use Cases Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3 flex flex-col gap-6">
               <Tag variant="outline">Cas d&apos;usages</Tag>
               <h2 className="font-display text-[40px] leading-tight font-medium">Qui utilise un logiciel de <span className="italic text-orange font-normal">scraping de données</span> ?</h2>
               <p className="text-ink-2 leading-relaxed">
                 Générer des leads qualifiés n&apos;a jamais été aussi stratégique. Nana Spider s&apos;adapte aux besoins spécifiques de chaque métier de la prospection commerciale.
               </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-orange" />
                    <h3 className="font-display text-2xl font-medium">Agences Immobilières</h3>
                 </div>
                 <p className="text-ink-3 text-sm">Scraping de professionnels locaux sur Google Maps pour proposer des services B2B (syndic, gestion de parcs, nettoyage).</p>
               </div>
               <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-orange" />
                    <h3 className="font-display text-2xl font-medium">Cabinets de Recrutement</h3>
                 </div>
                 <p className="text-ink-3 text-sm">Extraction LinkedIn pour identifier les talents ou sourcer de nouvelles entreprises qui recrutent dans la Tech.</p>
               </div>
               <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-orange" />
                    <h3 className="font-display text-2xl font-medium">Agences Web & SEO</h3>
                 </div>
                 <p className="text-ink-3 text-sm">Ciblage des e-commerçants via annuaires ou Google Maps pour proposer la refonte de leur site ou l&apos;optimisation de leur référencement.</p>
               </div>
               <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-orange" />
                    <h3 className="font-display text-2xl font-medium">Startups & SaaS</h3>
                 </div>
                 <p className="text-ink-3 text-sm">Création massive de listes d&apos;emails qualifiés pour alimenter des séquences de Cold Emailing ultra-personnalisées.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & SEO Guide */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Tag variant="outline" dot>FAQ Scraping</Tag>
            <h2 className="font-display text-[44px] md:text-[56px] leading-tight font-medium">
              Questions sur l&apos;<span className="italic font-normal text-orange">extraction de données</span>.
            </h2>
            <p className="font-sans text-lg text-ink-2 leading-relaxed">
              Tout savoir sur la conformité, la légalité et le fonctionnement d&apos;un scraper B2B en ligne sans code.
            </p>
            <div className="mt-4 flex flex-col gap-3 p-6 border-[1.5px] border-ink bg-cream-2">
               <h4 className="font-mono text-sm font-bold uppercase tracking-widest">Ressources Utiles</h4>
               <ul className="flex flex-col gap-2">
                  <li><Link href="/blog/3" className="text-orange hover:underline text-sm font-medium">↳ Le Scraping B2B est-il légal ?</Link></li>
                  <li><Link href="/blog/4" className="text-orange hover:underline text-sm font-medium">↳ Guide complet de l&apos;outil Spider</Link></li>
               </ul>
            </div>
          </div>

          <FAQSection items={faqData} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-10">
           <h2 className="font-display text-[44px] md:text-[64px] text-cream leading-none font-medium">Prêt à télécharger votre <span className="italic text-orange font-normal">fichier CSV</span> ?</h2>
           <p className="text-cream/60 max-w-xl text-lg">Testez le meilleur outil de web scraping gratuitement et ne payez que si les données extraites vous conviennent. Parfait pour vos campagnes de lead generation.</p>
           <div className="flex flex-col sm:flex-row gap-6">
             <Link href="https://spider.nana-intelligence.fr/order/new" target="_blank">
               <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} trackLabel="final_cta_launch_spider" sectionId="footer_scraper">Démarrer une extraction</Button>
             </Link>
             <Link href="/contact">
               <Button variant="ghost" size="lg" className="text-cream border-cream/20 hover:bg-cream/10" trackLabel="final_cta_contact" sectionId="footer_scraper">Déléguer la prospection</Button>
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
