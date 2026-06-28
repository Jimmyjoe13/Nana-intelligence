export interface AgencyData {
  slug: string;
  cityName: string;
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  detailedContent: string[];
  faq: { question: string; answer: string }[];
  relatedServices: { slug: string; label: string }[];
}

export const agenciesData: Record<string, AgencyData> = {
  marseille: {
    slug: "marseille",
    cityName: "Marseille",
    badge: "Agence Acquisition Marseille",
    heroTitle: "Agence de Prospection Commerciale B2B à Marseille",
    heroSubtitle: "Notre agence de prospection commerciale B2B à Marseille aide les PME et startups phocéennes à remplir leur agenda de RDV qualifiés grâce au Cold Emailing, au Scraping LinkedIn et à l'automatisation sales.",
    metaTitle: "Agence Prospection Commerciale B2B Marseille | Nana Intelligence",
    metaDescription: "Agence de prospection B2B à Marseille. Générez +250 RDV/mois pour vos commerciaux. Cold Emailing, Scraping LinkedIn et Automatisation Sales.",
    detailedContent: [
      "Marseille est un hub économique dynamique, mais la concurrence y est féroce. Pour émerger dans la cité phocéenne, une simple présence digitale ne suffit plus. En tant qu'agence de prospection commerciale B2B à Marseille, nous déployons des stratégies d'acquisition sortante (Outbound) qui court-circuitent les cycles de vente traditionnels et placent vos commerciaux face à des décideurs réellement intéressés.",
      "Nous maîtrisons les spécificités du marché local, des zones industrielles de l'Est marseillais aux startups de la French Tech Méditerranée, en passant par le port et la logistique du quartier d'affaires d'Euroméditerranée. Notre approche repose sur trois piliers : la qualité de la donnée extraite (Scraping), la pertinence du message (Copywriting) et la maîtrise technique de l'infrastructure d'envoi qui garantit une délivrabilité maximale.",
      "Concrètement, notre prospection B2B à Marseille se déroule en quatre temps : nous définissons votre client idéal (ICP) avec vous, nous extrayons et enrichissons une base de prospects qualifiés sur Marseille et les Bouches-du-Rhône, nous rédigeons des séquences de Cold Emailing personnalisées, puis nous pilotons les campagnes jusqu'à la prise de rendez-vous. Vous ne récupérez que les leads chauds, prêts à échanger.",
      "Ce modèle convient particulièrement aux entreprises marseillaises des secteurs Tech, SaaS, services aux entreprises, immobilier d'entreprise et logistique, dont le panier moyen justifie une approche directe des décideurs plutôt qu'une publicité de masse coûteuse et peu ciblée.",
      "En travaillant avec Nana Intelligence à Marseille, vous bénéficiez d'un partenaire de proximité capable de scaler votre prospection au niveau national tout en gardant une agilité propre aux structures expertes. Notre rémunération s'appuie largement sur la performance : notre intérêt est aligné sur le vôtre, générer des rendez-vous qui se transforment en clients. Nos trois piliers sur Marseille : le Cold Emailing B2B pour la prise de contact, le Scraping B2B pour le ciblage, et l'Automatisation Sales pour ne laisser aucune opportunité se perdre."
    ],
    relatedServices: [
      { slug: "cold-emailing-b2b", label: "Cold Emailing B2B" },
      { slug: "scraping-b2b", label: "Scraping B2B" },
      { slug: "automatisation-sales", label: "Automatisation Sales" },
    ],
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
      },
      {
        question: "Le scraping LinkedIn est-il légal pour une entreprise marseillaise ?",
        answer: "Oui, tant qu'il respecte le RGPD. Nous ne collectons que des données professionnelles publiques et utilisons un intérêt légitime pour la prospection, incluant systématiquement un lien de désinscription."
      }
    ]
  },
  "aix-en-provence": {
    slug: "aix-en-provence",
    cityName: "Aix-en-Provence",
    badge: "Agence Acquisition Aix-en-Provence",
    heroTitle: "Agence de Prospection Commerciale B2B à Aix-en-Provence",
    heroSubtitle: "Notre agence de prospection commerciale B2B à Aix-en-Provence aide les entreprises du Pays d'Aix et de la région PACA à générer des rendez-vous qualifiés via le Cold Emailing et le Scraping ciblé.",
    metaTitle: "Agence Prospection Commerciale B2B Aix-en-Provence | Nana",
    metaDescription: "Agence de prospection B2B à Aix-en-Provence. Acquisition et génération de leads pour PME. Cold Emailing et Scraping de données.",
    detailedContent: [
      "Le bassin aixois regroupe des entreprises à forte valeur ajoutée technologique et tertiaire. Pour ces acteurs, le défi n'est pas le volume mais la qualité : trouver des interlocuteurs de haut niveau (C-Level, fondateurs, directeurs achats). En tant qu'agence de prospection commerciale B2B à Aix-en-Provence, nous nous spécialisons dans l'approche chirurgicale de ces décideurs difficiles à atteindre.",
      "Nous construisons des tunnels de prospection qui imitent le comportement humain tout en bénéficiant de la puissance de l'automatisation. Notre expertise en Cold Emailing haute délivrabilité garantit que vos messages arrivent en boîte de réception principale, et non en spam — un point critique quand on s'adresse à des dirigeants sur-sollicités.",
      "Le tissu économique du Pays d'Aix — du pôle d'activités d'Aix-les-Milles aux entreprises innovantes de la Duranne, en passant par le secteur tertiaire du centre-ville — se prête particulièrement à une prospection B2B ciblée. Nous identifions les entreprises qui correspondent exactement à votre client idéal, puis nous engageons la conversation à votre place.",
      "Notre méthode combine extraction de données (Scraping Google Maps et LinkedIn), enrichissement des emails professionnels vérifiés, et séquences de relances multicanales. Chaque campagne est mesurée : taux d'ouverture, taux de réponse, rendez-vous obtenus — vous gardez une visibilité totale sur votre retour sur investissement.",
      "Situés au cœur de la Provence, nous accompagnons les PME aixoises pour transformer leur CRM en une véritable machine à revenus prévisibles, sans recruter ni former une équipe commerciale en interne. Trois services modulables à Aix : le Cold Emailing B2B pour vos premiers messages, le Scraping B2B pour constituer votre base de prospects, et l'Automatisation Sales pour industrialiser le suivi."
    ],
    relatedServices: [
      { slug: "cold-emailing-b2b", label: "Cold Emailing B2B" },
      { slug: "scraping-b2b", label: "Scraping B2B" },
      { slug: "automatisation-sales", label: "Automatisation Sales" },
    ],
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
      },
      {
        question: "Quels outils utilisez-vous pour la prospection à Aix ?",
        answer: "Nous utilisons un stack d'outils d'ingénierie commerciale incluant Lemlist pour l'envoi, Apollo pour la donnée, et nos propres scripts de scraping sur-mesure pour Google Maps et LinkedIn."
      }
    ]
  },
  toulon: {
    slug: "toulon",
    cityName: "Toulon",
    badge: "Agence Acquisition Toulon & Var",
    heroTitle: "Agence Prospection Commerciale B2B à Toulon",
    heroSubtitle: "Agence spécialisée en lead generation B2B. Nous aidons les entreprises de Toulon et du Var à remplir leur agenda de rendez-vous qualifiés grâce au Cold Emailing et au Scraping B2B.",
    metaTitle: "Agence Prospection Commerciale B2B Toulon | Nana",
    metaDescription: "Agence de prospection commerciale B2B à Toulon. Cold Emailing et Scraping ciblés pour générer vos RDV qualifiés dans le Var.",
    detailedContent: [
      "Le Var possède un tissu économique unique, porté par l'industrie navale, la défense, le tourisme et un secteur tertiaire en plein essor. À Toulon, notre agence de prospection commerciale B2B aide les chefs d'entreprise à sortir de la prospection « traditionnelle » — chronophage et aléatoire — pour adopter des méthodes data-driven, mesurables et scalables.",
      "Notre infrastructure permet de générer un flux régulier de rendez-vous qualifiés sans que vous ayez à décrocher votre téléphone ni à passer vos soirées sur LinkedIn. Nous nous occupons de toute la chaîne : de l'identification précise de la cible dans le Var et la métropole Toulon-Provence-Méditerranée jusqu'à la rédaction du premier message accrocheur et des relances.",
      "La prospection B2B à Toulon présente une spécificité : un marché de taille intermédiaire où la réputation et la proximité comptent. C'est pourquoi nous privilégions des messages personnalisés et pertinents plutôt que du volume générique — une approche qui protège votre image de marque tout en remplissant votre pipeline commercial.",
      "Nos campagnes s'appuient sur un Cold Emailing à haute délivrabilité, un scraping ciblé des entreprises varoises correspondant à votre client idéal, et un enrichissement des contacts avec des emails professionnels vérifiés. Vous recevez un reporting clair à chaque étape : prospects contactés, taux de réponse, rendez-vous bookés.",
      "L'objectif de notre agence toulonnaise est simple : vous libérer du temps pour que vous puissiez vous concentrer sur votre cœur de métier — la vente et le conseil — pendant que nous alimentons votre pipeline de prospects qualifiés, mois après mois. Nous combinons sur Toulon le Cold Emailing B2B, le Scraping B2B et l'Automatisation Sales pour un pipeline 100 % managé."
    ],
    relatedServices: [
      { slug: "cold-emailing-b2b", label: "Cold Emailing B2B" },
      { slug: "scraping-b2b", label: "Scraping B2B" },
      { slug: "automatisation-sales", label: "Automatisation Sales" },
    ],
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
      },
      {
        question: "Peut-on cibler des entreprises hors du Var depuis Toulon ?",
        answer: "Absolument. Notre infrastructure est conçue pour prospecter sur toute la France et l'Europe, quel que soit votre lieu d'implantation."
      }
    ]
  },
  nice: {
    slug: "nice",
    cityName: "Nice",
    badge: "Agence Acquisition Nice & Côte d'Azur",
    heroTitle: "Agence de Prospection Commerciale B2B à Nice",
    heroSubtitle: "Notre agence de prospection commerciale B2B à Nice aide les entreprises des Alpes-Maritimes et de la Côte d'Azur à générer des rendez-vous qualifiés grâce au Cold Emailing, au Scraping LinkedIn et à l'automatisation sales.",
    metaTitle: "Agence Prospection Commerciale B2B Nice | Nana Intelligence",
    metaDescription: "Agence de prospection B2B à Nice. RDV qualifiés pour PME des Alpes-Maritimes et de Sophia Antipolis. Cold Emailing et Scraping ciblés.",
    detailedContent: [
      "Nice et la Côte d'Azur concentrent un écosystème B2B singulier : la technopole de Sophia Antipolis, le tourisme d'affaires, l'immobilier haut de gamme, les services aux entreprises et un tissu dense de PME innovantes. Dans cet environnement très concurrentiel, notre agence de prospection commerciale B2B à Nice permet aux entreprises azuréennes de capter l'attention des bons décideurs avant leurs concurrents.",
      "La prospection traditionnelle (phoning à froid, salons, bouche-à-oreille) atteint vite ses limites sur un marché aussi étendu que les Alpes-Maritimes. Nous y répondons par une approche outbound automatisée : identification précise de votre client idéal, extraction et enrichissement d'une base de prospects locaux, puis séquences de Cold Emailing personnalisées qui déclenchent des conversations commerciales réelles.",
      "Sophia Antipolis, première technopole d'Europe, regroupe des milliers d'entreprises Tech, SaaS et deep-tech : un terrain idéal pour une prospection ciblée par secteur et par fonction. Nous savons aussi adresser les acteurs du tourisme, de l'événementiel et des services premium qui font la spécificité de l'économie niçoise.",
      "Notre méthode est entièrement mesurable : chaque campagne de lead generation à Nice est suivie en temps réel (taux d'ouverture, taux de réponse, rendez-vous obtenus). Notre infrastructure de Cold Emailing à haute délivrabilité garantit que vos messages atteignent la boîte de réception principale, condition indispensable pour convertir des décideurs sollicités de toutes parts.",
      "Que vous soyez une startup de Sophia, une PME de services à Nice ou un acteur de la Côte d'Azur visant un développement national, nous construisons une machine d'acquisition prévisible. Vous ne récupérez que des leads chauds, et notre modèle largement basé sur la performance aligne nos intérêts sur vos résultats commerciaux. Nos trois expertises déployées à Nice et sur la Côte d'Azur : le Cold Emailing B2B, le Scraping B2B et l'Automatisation Sales."
    ],
    relatedServices: [
      { slug: "cold-emailing-b2b", label: "Cold Emailing B2B" },
      { slug: "scraping-b2b", label: "Scraping B2B" },
      { slug: "automatisation-sales", label: "Automatisation Sales" },
    ],
    faq: [
      {
        question: "Qu'est-ce qu'une agence de prospection commerciale B2B à Nice ?",
        answer: "Une agence de prospection commerciale B2B à Nice vous aide à identifier des prospects qualifiés dans les Alpes-Maritimes et sur la Côte d'Azur, puis à générer des rendez-vous commerciaux grâce au cold emailing, au scraping B2B et à l'automatisation sales ciblée sur le tissu économique azuréen (Sophia Antipolis, services, tourisme d'affaires)."
      },
      {
        question: "Combien coûte une campagne de prospection B2B à Nice ?",
        answer: "Nos campagnes de cold emailing à Nice fonctionnent majoritairement à la performance. Un audit gratuit de 30 minutes permet de chiffrer précisément votre besoin selon votre secteur et votre cible sur la Côte d'Azur."
      },
      {
        question: "Pourquoi externaliser sa prospection commerciale à Nice ?",
        answer: "Externaliser permet d'obtenir un flux de rendez-vous qualifiés sans recruter ni former une équipe commerciale. Vous bénéficiez immédiatement de notre infrastructure, de notre data et de notre expertise en délivrabilité, pour un coût inférieur à celui d'un commercial interne."
      },
      {
        question: "Ciblez-vous Sophia Antipolis et toute la Côte d'Azur ?",
        answer: "Oui. Nous couvrons Nice, Sophia Antipolis, Antibes, Cannes et l'ensemble des Alpes-Maritimes, et notre infrastructure permet aussi de prospecter à l'échelle nationale et européenne depuis la Côte d'Azur."
      }
    ]
  }
};
