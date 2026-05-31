import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, Sparkles, Zap, Shield, Target, Database } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scraper B2B en ligne : Fichier de Prospection sur Mesure | Nana Intelligence",
  description: "Générez vos fichiers de prospection B2B sans abonnement. Scraping haute qualité, paiement à la performance et données vérifiées. Boostez votre lead generation dès maintenant.",
};

export default function ScraperB2BPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker="Outil de Scraping en Ligne"
            title="Votre Fichier de Prospection B2B"
            emphasis="sans abonnement"
            description="Accédez à la puissance du scraping industriel sans la complexité technique. Extrayez des listes qualifiées, vérifiées et prêtes à l'emploi en quelques clics."
          />
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="https://spider.nana-intelligence.fr/order/new" target="_blank">
              <Button variant="primary" size="lg" icon={<Sparkles size={20} />}>
                Lancer une extraction
              </Button>
            </Link>
            <Link href="https://spider.nana-intelligence.fr" target="_blank">
              <Button variant="ghost" size="lg">
                Voir l&apos;outil en ligne
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Zap size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Paiement à la performance</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Oubliez les abonnements mensuels coûteux. Payez uniquement pour les leads extraits et valides. Pas d&apos;empreinte bancaire inutile.
              </p>
            </Box>

            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Shield size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Qualité vérifiée</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Nos algorithmes nettoient et vérifient chaque donnée en temps réel. Recevez des fichiers propres, sans doublons ni erreurs.
              </p>
            </Box>

            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Target size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Ciblage Chirurgical</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Filtrez par secteur, taille d&apos;entreprise, localisation et bien plus. Obtenez exactement les prospects que vous recherchez.
              </p>
            </Box>

            <Box className="flex flex-col gap-6 bg-cream group hover:border-orange transition-all">
              <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                <Database size={24} />
              </div>
              <h3 className="font-display text-[22px] font-medium">Données Fraîches</h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Contrairement aux bases de données statiques, nous scrapons le web en temps réel pour vous garantir une fraîcheur maximale.
              </p>
            </Box>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="flex flex-col gap-8">
              <h2 className="font-display text-[44px] leading-tight font-medium">La fin des fichiers de prospection <span className="italic text-orange font-normal">périmés</span>.</h2>
              <p className="font-sans text-lg text-ink-2 leading-relaxed">
                Le marché change vite. Un prospect d&apos;hier n&apos;est plus forcément la cible d&apos;aujourd&apos;hui. Notre outil &quot;Spider&quot; parcourt les meilleures sources B2B (Google Maps, Annuaires professionnels, Réseaux sociaux) pour construire votre liste en direct.
              </p>
              <div className="flex flex-wrap gap-4">
                 <Tag variant="outline">Google Maps Scraping</Tag>
                 <Tag variant="outline">B2B Lead Gen</Tag>
                 <Tag variant="outline">Email Finding</Tag>
                 <Tag variant="outline">Verification Temps Réel</Tag>
              </div>
           </div>
           <div className="aspect-[16/9] border-[1.5px] border-ink bg-cream-2 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full p-8 flex flex-col gap-4">
                 <div className="h-4 w-3/4 bg-ink/10 rounded" />
                 <div className="h-4 w-1/2 bg-ink/10 rounded" />
                 <div className="h-4 w-5/6 bg-ink/10 rounded" />
                 <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="h-20 bg-orange/20 border border-orange/30 rounded" />
                    <div className="h-20 bg-orange/20 border border-orange/30 rounded" />
                    <div className="h-20 bg-orange/20 border border-orange/30 rounded" />
                    <div className="h-20 bg-orange/20 border border-orange/30 rounded" />
                 </div>
                 <div className="mt-4 h-32 bg-ink/5 border border-ink/10 rounded flex items-center justify-center font-mono text-[10px] text-ink/40 uppercase tracking-widest">
                    Aperçu des données en cours...
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-16">
          <h2 className="font-display text-[44px] text-center font-medium">Pourquoi choisir <span className="text-orange">Nana Spider</span> ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Box className="bg-cream p-10 flex flex-col gap-6 border-l-4 border-l-ink">
              <h4 className="font-display text-[24px] font-medium">Bases de données classiques</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-ink-4 shrink-0" />
                  Données souvent obsolètes (mises à jour trimestrielles)
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-ink-4 shrink-0" />
                  Abonnements mensuels obligatoires (engagement)
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-ink-4 shrink-0" />
                  Export limité par des &quot;crédits&quot; complexes
                </li>
              </ul>
            </Box>
            <Box className="bg-cream p-10 flex flex-col gap-6 border-l-4 border-l-orange">
              <h4 className="font-display text-[24px] font-medium text-orange">L&apos;approche Nana Spider</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
                  Extraction en temps réel (données d&apos;aujourd&apos;hui)
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
                  Paiement à l&apos;acte (pas de frais fixes)
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
                  Zéro configuration technique requise
                </li>
              </ul>
            </Box>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-10">
           <h2 className="font-display text-[44px] md:text-[64px] text-cream leading-none font-medium">Prêt à scraper vos <span className="italic text-orange font-normal">premiers leads</span> ?</h2>
           <p className="text-cream/60 max-w-xl text-lg">Testez notre outil gratuitement et ne payez que si les résultats vous conviennent. Pas de carte bancaire requise pour commencer.</p>
           <div className="flex flex-col sm:flex-row gap-6">
             <Link href="https://spider.nana-intelligence.fr/order/new" target="_blank">
               <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>Démarrer une extraction</Button>
             </Link>
             <Link href="/contact">
               <Button variant="ghost" size="lg" className="text-cream border-cream/20 hover:bg-cream/10">Besoin d&apos;un accompagnement ?</Button>
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
