export interface AgencyData {
  slug: string;
  cityName: string;
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  faq: { question: string; answer: string }[];
}

export const agenciesData: Record<string, AgencyData> = {
  marseille: {
    slug: "marseille",
    cityName: "Marseille",
    badge: "Agence Acquisition Marseille",
    heroTitle: "Agence Prospection B2B à Marseille",
    heroSubtitle: "Boostez votre croissance phocéenne. Nous aidons les PME et startups de Marseille à automatiser leur acquisition client via le Cold Emailing et le Scraping intelligent.",
    metaTitle: "Agence Prospection B2B Marseille | +250 RDV Qualifiés / Mois",
    metaDescription: "Agence de prospection B2B à Marseille. +250 RDV qualifiés/mois pour nos clients PME. Cold Emailing, Scraping LinkedIn & Automatisation. 🎁 Audit gratuit 30 min →",
    faq: [
      {
        question: "Qu'est-ce qu'une agence de prospection commerciale B2B à Marseille ?",
        answer: "Une agence de prospection commerciale B2B à Marseille vous aide à identifier des prospects qualifiés dans les Bouches-du-Rhône et à générer des rendez-vous commerciaux grâce à des stratégies comme le cold emailing, le scraping B2B et l'automatisation sales ciblée sur le tissu économique phocéen."
      },
      {
        question: "Combien coûte une campagne de lead generation B2B à Marseille ?",
        answer: "Nos campagnes de cold emailing à Marseille fonctionnent majoritairement à la performance. Un audit gratuit de 30 minutes permet de chiffrer précisément votre besoin selon votre secteur (Tech, Logistique, Immobilier, Services)."
      },
      {
        question: "Pourquoi choisir Nana Intelligence pour sa prospection à Marseille ?",
        answer: "Basés à Marseille, nous maîtrisons les codes du business local. Nous aidons les entreprises marseillaises à sortir du cadre régional pour conquérir des parts de marché nationales et internationales via des outils digitaux de pointe."
      }
    ]
  },
  aix: {
    slug: "aix-en-provence",
    cityName: "Aix-en-Provence",
    badge: "Agence Acquisition Aix-en-Provence",
    heroTitle: "Agence Lead Generation B2B à Aix-en-Provence",
    heroSubtitle: "Agence spécialisée en prospection B2B. Nous aidons les entreprises du Pays d'Aix et de la région PACA à accélérer leur développement commercial.",
    metaTitle: "Boostez vos Ventes B2B | Agence Lead Generation Aix-en-Provence",
    metaDescription: "Agence Lead Generation B2B à Aix-en-Provence. Prospection commerciale automatisée pour PME du Pays d'Aix. Cold Emailing & Scraping ciblé. Audit gratuit 30 min →",
    faq: [
      {
        question: "Qu'est-ce qu'une agence de lead generation B2B à Aix-en-Provence ?",
        answer: "Une agence de lead generation B2B à Aix-en-Provence vous aide à identifier des prospects qualifiés et à générer des rendez-vous commerciaux grâce à des stratégies comme le cold emailing, le scraping B2B et la prospection ciblée, particulièrement sur Aix-en-Provence et le bassin aixois."
      },
      {
        question: "Combien coûte une campagne de cold emailing B2B à Aix-en-Provence ?",
        answer: "Nos campagnes de cold emailing fonctionnent majoritairement à la performance ou via un abonnement fixe très inférieur au coût publicitaire LinkedIn. Un audit gratuit de 30 minutes permet de chiffrer précisément votre besoin."
      },
      {
        question: "Pourquoi choisir une agence implantée à Aix-en-Provence ?",
        answer: "Être implanté dans le bassin aixois nous permet d'avoir une connaissance approfondie du tissu économique local — startups, PME et grandes entreprises du Pays d'Aix — pour affiner votre ciblage commercial."
      }
    ]
  },
  toulon: {
    slug: "toulon",
    cityName: "Toulon",
    badge: "Agence Acquisition Toulon & Var",
    heroTitle: "Agence Prospection Commerciale B2B à Toulon",
    heroSubtitle: "Agence spécialisée en lead generation B2B. Nous aidons les entreprises de Toulon et du Var à remplir leur agenda de rendez-vous qualifiés grâce au Cold Emailing et au Scraping B2B.",
    metaTitle: "Générez + de Leads B2B | Agence Prospection Toulon | Nana Intelligence",
    metaDescription: "Agence de prospection commerciale B2B à Toulon. Cold Emailing & Scraping pour entreprises du Var. +150 RDV qualifiés/mois. Démarrage sous 48h. 🎁 Audit gratuit →",
    faq: [
      {
        question: "Qu'est-ce qu'une agence de prospection commerciale B2B à Toulon ?",
        answer: "Une agence de prospection commerciale B2B à Toulon vous aide à identifier des prospects qualifiés dans le Var et à générer des rendez-vous commerciaux grâce à des stratégies comme le cold emailing, le scraping B2B et la prospection ciblée sur le tissu économique toulonnais."
      },
      {
        question: "Combien coûte une campagne de lead generation B2B à Toulon ?",
        answer: "Nos campagnes de cold emailing fonctionnent majoritairement à la performance ou via un abonnement fixe très inférieur au coût publicitaire LinkedIn. Un audit gratuit de 30 minutes permet de chiffrer précisément votre besoin selon votre secteur dans le Var."
      },
      {
        question: "Pourquoi choisir Nana Intelligence pour sa prospection B2B à Toulon ?",
        answer: "Spécialisés dans la prospection B2B en région PACA, nous connaissons le tissu économique du Var — industries navales, tech, BTP, services aux entreprises — pour affiner votre ciblage et maximiser votre taux de conversion."
      }
    ]
  }
};
