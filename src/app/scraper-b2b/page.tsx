import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, Sparkles, Zap, CheckCircle2, Search, Filter, Database } from "lucide-react";
import Link from "next/link";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Scraping & Enrichissement B2B : Fichiers de Prospection Clés en Main | Nana Spider",
  description: "Extrayez vos prospects sur LinkedIn et Google Maps, puis enrichissez-les avec des emails professionnels vérifiés. L'outil tout-en-un pour vos fichiers de prospection sans abonnement.",
  keywords: ["scraping et enrichissement b2b", "extraction emails linkedin", "scraper google maps enrichi", "email finder b2b", "base de données prospects", "automatisation prospection"],
};

const faqData = [
  {
    question: "Quelle est la différence entre scraping et enrichissement ?",
    answer: "Le scraping consiste à extraire les données publiques (noms, entreprises, postes). L'enrichissement va plus loin en trouvant les coordonnées directes (emails pros nominatifs, téléphones) qui ne sont pas forcément visibles, puis en les vérifiant pour garantir leur délivrabilité."
  },
  {
    question: "Comment Spider trouve-t-il les adresses emails ?",
    answer: "Spider utilise des algorithmes de prédiction combinés à des bases de données de partenaires et des vérificateurs SMTP en temps réel. Nous ne 'devinons' pas les emails, nous testons leur existence pour éviter tout rebond (bounce) dans vos campagnes."
  },
  {
    question: "Les données Google Maps incluent-elles les emails ?",
    answer: "Google Maps fournit rarement les emails directement. Spider va donc scanner le site web de l'entreprise extraite pour y trouver les contacts pertinents et enrichir votre fichier automatiquement."
  },
  {
    question: "Puis-je importer mon fichier dans mon CRM ?",
    answer: "Oui. Spider livre un fichier CSV/Excel structuré avec des colonnes propres (Prénom, Nom, Poste, Email, LinkedIn, Ville). Il est prêt à être importé dans HubSpot, Salesforce, Pipedrive ou Lemlist."
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
    "description": "Paiement à la performance (Crédits d'enrichissement)"
  },
  "description": "Plateforme tout-en-un de scraping et d'enrichissement de données B2B pour la création de fichiers de prospection qualifiés."
};

export default function ScraperB2BPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />

      {/* Hero Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker="Scraping + Enrichissement B2B"
            title="Ne récupérez plus des listes, obtenez des"
            emphasis="rendez-vous"
            description="Spider extrait vos cibles sur LinkedIn et Google Maps, puis trouve et vérifie les emails professionnels nominatifs. Un flux de données fraîches, enrichies et 100% prêtes à l'emploi pour vos campagnes."
          />
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="https://spider.nana-intelligence.fr/order/new" target="_blank">
              <Button variant="primary" size="lg" icon={<Sparkles size={20} />} trackLabel="hero_launch_spider" sectionId="hero_scraper">
                Lancer mon extraction enrichie
              </Button>
            </Link>
            <Link href="https://spider.nana-intelligence.fr" target="_blank">
              <Button variant="ghost" size="lg" trackLabel="hero_view_spider" sectionId="hero_scraper">
                Tester l&apos;outil gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Capability Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                   <Tag variant="outline" dot>Le Duo Gagnant</Tag>
                   <h2 className="font-display text-[44px] md:text-[56px] leading-tight font-medium">
                     L&apos;intelligence au service de votre <span className="italic text-orange font-normal">data</span>.
                   </h2>
                </div>
                
                <div className="flex flex-col gap-8">
                   <div className="flex gap-6">
                      <div className="h-14 w-14 shrink-0 rounded-xl bg-ink text-cream flex items-center justify-center shadow-sm">
                         <Search size={28} />
                      </div>
                      <div className="flex flex-col gap-2">
                         <h3 className="font-display text-2xl font-medium">1. Scraping Haute Précision</h3>
                         <p className="text-ink-2 leading-relaxed">
                            Nous ciblons les sources les plus fiables (LinkedIn, Google Maps, Annuaires) pour extraire les informations publiques : noms, fonctions, sites web et réseaux sociaux.
                         </p>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="h-14 w-14 shrink-0 rounded-xl bg-orange text-ink flex items-center justify-center shadow-sm">
                         <Zap size={28} />
                      </div>
                      <div className="flex flex-col gap-2">
                         <h3 className="font-display text-2xl font-medium">2. Enrichissement & Vérification</h3>
                         <p className="text-ink-2 leading-relaxed">
                            Spider trouve l&apos;email professionnel nominatif et vérifie sa validité via un test SMTP. Résultat : un taux de bounce proche de zéro pour vos campagnes.
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             <Box className="bg-cream border-[1.5px] p-0 overflow-hidden shadow-2xl rotate-1">
                <div className="bg-ink p-4 flex items-center gap-2">
                   <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                   </div>
                   <div className="h-5 w-64 bg-cream/10 rounded-full mx-auto" />
                </div>
                <div className="p-8 flex flex-col gap-6">
                   <div className="grid grid-cols-4 gap-4 pb-4 border-b border-cream-3 font-mono text-[10px] text-ink-3 uppercase tracking-widest">
                      <div>Contact</div>
                      <div>Poste</div>
                      <div>Email Pro</div>
                      <div>Status</div>
                   </div>
                   <div className="flex flex-col gap-4">
                      {[
                        { name: "Marc A.", role: "CEO", email: "m.arnoud@tech.io", status: "Vérifié" },
                        { name: "Julie D.", role: "CMO", email: "j.dupont@saas.com", status: "Vérifié" },
                        { name: "Thomas L.", role: "Founder", email: "t.legrand@startup.fr", status: "Vérifié" }
                      ].map((row, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 items-center animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                           <div className="text-sm font-medium">{row.name}</div>
                           <div className="text-xs text-ink-3">{row.role}</div>
                           <div className="text-xs font-mono text-orange">{row.email}</div>
                           <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              <span className="text-[10px] font-bold uppercase text-green-600">{row.status}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="mt-4 p-4 bg-orange/5 border border-orange/20 rounded flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-2">Enrichissement en cours...</span>
                      <Sparkles size={16} className="text-orange animate-spin-slow" />
                   </div>
                </div>
             </Box>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
               <div className="h-12 w-12 bg-cream-2 border border-ink flex items-center justify-center">
                  <Filter size={20} />
               </div>
               <h3 className="font-display text-2xl font-medium">Segmentation Fine</h3>
               <p className="text-ink-3 text-sm leading-relaxed">
                  Ne perdez pas de temps sur des cibles hors-sujet. Filtrez par effectif, secteur d&apos;activité exact, et zone géographique précise.
               </p>
            </div>
            <div className="flex flex-col gap-6">
               <div className="h-12 w-12 bg-cream-2 border border-ink flex items-center justify-center">
                  <Database size={20} />
               </div>
               <h3 className="font-display text-2xl font-medium">Clean Data</h3>
               <p className="text-ink-3 text-sm leading-relaxed">
                  Nous nettoyons automatiquement les emojis dans les noms, les majuscules inutiles et les doublons pour un fichier prêt à l&apos;import.
               </p>
            </div>
            <div className="flex flex-col gap-6">
               <div className="h-12 w-12 bg-cream-2 border border-ink flex items-center justify-center">
                  <CheckCircle2 size={20} />
               </div>
               <h3 className="font-display text-2xl font-medium">Conformité RGPD</h3>
               <p className="text-ink-3 text-sm leading-relaxed">
                  Nous ne récoltons que des données professionnelles et publiques, garantissant la légalité de votre prospection commerciale.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="font-display text-[44px] md:text-[64px] font-medium max-w-3xl">La puissance de l&apos;automatisation <span className="italic text-orange font-normal">tout-en-un</span>.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Box className="bg-cream p-10 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                 <span className="font-mono text-[10px] text-ink-3 uppercase tracking-widest">Le Scraper Classique</span>
                 <h4 className="font-display text-3xl font-medium">L&apos;extraction brute</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-sm text-ink-3">
                   <div className="h-1 w-1 rounded-full bg-ink-4" />
                   Récupère uniquement ce qui est visible
                </li>
                <li className="flex items-center gap-3 text-sm text-ink-3">
                   <div className="h-1 w-1 rounded-full bg-ink-4" />
                   Nécessite des outils tiers pour les emails
                </li>
                <li className="flex items-center gap-3 text-sm text-ink-3">
                   <div className="h-1 w-1 rounded-full bg-ink-4" />
                   Données souvent sales (emojis, majuscules)
                </li>
              </ul>
            </Box>
            <Box className="bg-ink p-10 flex flex-col gap-8 border-orange">
              <div className="flex flex-col gap-2">
                 <span className="font-mono text-[10px] text-orange uppercase tracking-widest">Spider by Nana</span>
                 <h4 className="font-display text-3xl font-medium text-cream">L&apos;intelligence intégrée</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-sm text-cream/80">
                   <CheckCircle2 size={16} className="text-orange" />
                   Extraction + Recherche d&apos;emails nominatifs
                </li>
                <li className="flex items-center gap-3 text-sm text-cream/80">
                   <CheckCircle2 size={16} className="text-orange" />
                   Vérification SMTP en temps réel incluse
                </li>
                <li className="flex items-center gap-3 text-sm text-cream/80">
                   <CheckCircle2 size={16} className="text-orange" />
                   Formatage automatique pour votre CRM
                </li>
              </ul>
            </Box>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Tag variant="outline" dot>FAQ</Tag>
            <h2 className="font-display text-[44px] md:text-[56px] leading-tight font-medium">
              Visez la <span className="italic font-normal text-orange">clarté</span>.
            </h2>
            <p className="font-sans text-lg text-ink-2 leading-relaxed">
              Tout ce que vous devez savoir sur notre processus de scraping et d&apos;enrichissement de données B2B.
            </p>
          </div>

          <FAQSection items={faqData} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-10">
           <h2 className="font-display text-[44px] md:text-[80px] text-cream leading-[0.9] font-medium max-w-4xl">
              Transformez le web en votre <span className="italic text-orange font-normal">force de vente</span>.
           </h2>
           <p className="text-cream/60 max-w-xl text-lg">Testez Spider gratuitement dès maintenant. Ne payez que pour les données valides qui vous rapportent des clients.</p>
           <div className="flex flex-col sm:flex-row gap-6">
             <Link href="https://spider.nana-intelligence.fr/order/new" target="_blank">
               <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} trackLabel="final_cta_launch_spider" sectionId="footer_scraper">Démarrer une extraction</Button>
             </Link>
             <Link href="/contact">
               <Button variant="ghost" size="lg" className="text-cream border-cream/20 hover:bg-cream/10" trackLabel="final_cta_contact" sectionId="footer_scraper">Besoin d&apos;un expert ?</Button>
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
