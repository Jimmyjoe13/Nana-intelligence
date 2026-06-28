export interface ServiceDetail {
  slug: string;
  name: string;
  kicker: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  detailedContent: string[];
  faq: { question: string; answer: string }[];
  relatedCities: { slug: string; label: string }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "cold-emailing-b2b": {
    slug: "cold-emailing-b2b",
    name: "Cold Emailing B2B",
    kicker: "Acquisition Outbound",
    heroTitle: "Agence Cold Emailing B2B",
    heroSubtitle: "Notre service de cold emailing B2B génère des rendez-vous qualifiés grâce à des séquences personnalisées et une infrastructure de délivrabilité maîtrisée — vos messages arrivent en boîte de réception, pas en spam.",
    metaTitle: "Agence Cold Emailing B2B : RDV Qualifiés | Nana Intelligence",
    metaDescription: "Service de cold emailing B2B haute délivrabilité : setup technique (SPF/DKIM/DMARC), copywriting et relances automatisées. RDV qualifiés garantis.",
    features: [
      "Setup technique complet (SPF, DKIM, DMARC, warm-up)",
      "Copywriting de conversion et A/B testing",
      "Séquences multi-touch automatisées",
      "Reporting détaillé : ouvertures, réponses, RDV",
    ],
    detailedContent: [
      "Le cold emailing B2B reste le canal d'acquisition au meilleur retour sur investissement pour atteindre directement des décideurs — à condition d'être exécuté correctement. La plupart des campagnes échouent non pas à cause du message, mais à cause de la délivrabilité : des emails qui finissent en spam ne génèrent jamais de réponse. Notre agence de cold emailing B2B traite ce problème à la racine.",
      "Avant le premier envoi, nous configurons toute l'infrastructure technique : authentification des domaines (SPF, DKIM, DMARC), utilisation de domaines d'envoi secondaires pour protéger votre domaine principal, et warm-up progressif des boîtes pour bâtir une réputation d'expéditeur saine. C'est cette rigueur technique qui fait la différence entre une campagne qui convertit et une campagne qui brûle votre domaine.",
      "Côté message, nous appliquons les principes du copywriting de conversion : accroche centrée sur le problème du prospect, proposition de valeur claire, et appel à l'action unique. Chaque séquence est testée en A/B sur l'objet, l'angle et le call-to-action pour identifier ce qui déclenche le plus de réponses dans votre marché.",
      "Le cold emailing B2B est parfaitement légal en France dans un cadre professionnel : la prospection sans opt-in préalable est autorisée dès lors que l'offre est en lien direct avec la fonction de l'interlocuteur, avec un lien de désinscription systématique. Nous opérons en conformité RGPD sur l'ensemble de nos campagnes.",
      "Concrètement, vous recevez un flux de rendez-vous qualifiés directement dans votre agenda, sans avoir à gérer la technique, la rédaction ou les relances. Notre reporting vous donne une visibilité totale : nombre de prospects contactés, taux d'ouverture, taux de réponse et rendez-vous obtenus. Ce service s'articule naturellement avec notre offre de scraping et enrichissement B2B, qui alimente vos campagnes en données fraîches et vérifiées. Nous déployons ce service localement : découvrez notre agence de cold emailing à Marseille, à Aix-en-Provence, à Toulon ou à Nice.",
    ],
    relatedCities: [
      { slug: "marseille", label: "Marseille" },
      { slug: "aix-en-provence", label: "Aix-en-provence" },
      { slug: "toulon", label: "Toulon" },
      { slug: "nice", label: "Nice" },
    ],
    faq: [
      {
        question: "Le cold emailing B2B est-il légal en France ?",
        answer: "Oui. En B2B, la prospection par email sans consentement préalable est autorisée dès lors que l'offre est en rapport direct avec la profession du destinataire, et qu'un lien de désinscription est présent. Nous opérons en conformité RGPD.",
      },
      {
        question: "Comment évitez-vous que les emails finissent en spam ?",
        answer: "Nous configurons l'authentification technique (SPF, DKIM, DMARC), utilisons des domaines d'envoi dédiés et appliquons un warm-up progressif. Cette infrastructure garantit une délivrabilité élevée et protège votre domaine principal.",
      },
      {
        question: "Combien de rendez-vous puis-je espérer ?",
        answer: "Cela dépend de votre marché, de votre offre et du volume d'envoi. Un audit gratuit de 30 minutes permet d'estimer un objectif réaliste de RDV qualifiés par mois pour votre cas précis.",
      },
      {
        question: "Le cold emailing fonctionne-t-il pour mon secteur ?",
        answer: "Le cold emailing B2B est efficace dès que votre client cible est une entreprise avec des décideurs identifiables (Tech, services, industrie, immobilier d'entreprise…). Il est moins adapté au B2C ou aux paniers très faibles.",
      },
    ],
  },
  "scraping-b2b": {
    slug: "scraping-b2b",
    name: "Scraping & Enrichissement B2B",
    kicker: "Data & Ciblage",
    heroTitle: "Scraping B2B & Enrichissement de Données",
    heroSubtitle: "Notre service de scraping B2B extrait des prospects ciblés sur LinkedIn et Google Maps, puis enrichit chaque contact avec des emails professionnels vérifiés — la matière première d'une prospection qui convertit.",
    metaTitle: "Scraping B2B : LinkedIn, Google Maps & Enrichissement | Nana",
    metaDescription: "Service de scraping B2B : extraction ciblée sur LinkedIn et Google Maps, enrichissement d'emails professionnels vérifiés et conformité RGPD.",
    features: [
      "Extraction LinkedIn & Google Maps ciblée",
      "Enrichissement d'emails professionnels vérifiés (SMTP)",
      "Segmentation par secteur, taille, fonction, zone",
      "Données fraîches et dédupliquées, prêtes à l'emploi",
    ],
    detailedContent: [
      "Une campagne de prospection ne vaut que par la qualité de sa donnée. Cibler les mauvaises entreprises ou envoyer des emails à des adresses obsolètes, c'est gaspiller son budget et abîmer sa réputation d'expéditeur. Notre service de scraping B2B vous fournit une base de prospects précise, fraîche et exploitable immédiatement.",
      "Nous extrayons les données là où se trouvent vos prospects : sur LinkedIn pour cibler par fonction, secteur et taille d'entreprise, et sur Google Maps pour les approches géolocalisées (commerces, agences, entreprises locales). Notre infrastructure de scraping est conçue pour collecter à grande échelle tout en respectant les bonnes pratiques techniques.",
      "L'extraction n'est que la première étape. Chaque contact est ensuite enrichi avec un email professionnel vérifié par validation SMTP, ce qui réduit drastiquement le taux de bounce de vos campagnes. Nous dédupliquons et nettoyons la base pour vous livrer une liste prête à l'emploi, segmentée selon vos critères (secteur, effectif, intitulé de poste, zone géographique).",
      "Le scraping B2B est encadré : nous ne collectons que des données professionnelles publiques et nous appuyons sur l'intérêt légitime de la prospection, dans le respect du RGPD. Cette approche protège votre entreprise tout en alimentant votre machine commerciale.",
      "Cette donnée constitue le carburant de vos campagnes de cold emailing : un ciblage chirurgical permet des messages plus pertinents, donc des taux de réponse supérieurs. Pour les besoins récurrents, notre outil en ligne Spider permet de scraper et d'enrichir à la demande, en mode pay-as-you-go. Découvrez aussi notre guide complet sur le scraping B2B pour comprendre la méthode en détail. Nous couvrez le scraping de données ciblées sur les bassins de Marseille, Aix-en-Provence, Toulon et Nice.",
    ],
    relatedCities: [
      { slug: "marseille", label: "Marseille" },
      { slug: "aix-en-provence", label: "Aix-en-provence" },
      { slug: "toulon", label: "Toulon" },
      { slug: "nice", label: "Nice" },
    ],
    faq: [
      {
        question: "Le scraping B2B est-il légal et conforme au RGPD ?",
        answer: "Oui, lorsqu'il porte sur des données professionnelles publiques et s'appuie sur l'intérêt légitime de la prospection, avec possibilité de désinscription. Nous ne collectons pas de données personnelles sensibles.",
      },
      {
        question: "Quelles données extrayez-vous exactement ?",
        answer: "Nom, fonction, entreprise, secteur, taille, zone géographique et email professionnel vérifié. La segmentation est définie avec vous selon votre client idéal (ICP).",
      },
      {
        question: "Comment garantissez-vous la qualité des emails ?",
        answer: "Chaque email est vérifié par validation SMTP avant livraison, ce qui minimise le taux de bounce et protège la réputation de votre domaine d'envoi.",
      },
      {
        question: "Puis-je scraper moi-même avec votre outil ?",
        answer: "Oui, notre outil en ligne Spider permet de scraper Google Maps et LinkedIn puis d'enrichir les profils en mode pay-as-you-go, sans abonnement.",
      },
    ],
  },
  "automatisation-sales": {
    slug: "automatisation-sales",
    name: "Automatisation Sales",
    kicker: "Infrastructure Commerciale",
    heroTitle: "Automatisation Sales & Commerciale B2B",
    heroSubtitle: "Notre service d'automatisation sales connecte votre CRM, automatise vos relances et votre nurturing, et libère vos commerciaux des tâches répétitives pour qu'ils se concentrent sur la vente.",
    metaTitle: "Automatisation Sales B2B : CRM & Workflows | Nana Intelligence",
    metaDescription: "Service d'automatisation sales B2B : connexion CRM (HubSpot, Pipedrive), workflows automatisés (Make/n8n) et nurturing. Libérez vos commerciaux.",
    features: [
      "Connexion CRM (HubSpot, Salesforce, Pipedrive)",
      "Workflows automatisés (Zapier, Make, n8n)",
      "Séquences de nurturing et relances automatiques",
      "Agents IA et reporting temps réel",
    ],
    detailedContent: [
      "Vos commerciaux passent trop de temps sur des tâches répétitives : saisie dans le CRM, relances manuelles, qualification, reporting. Chaque heure consacrée à l'administratif est une heure de moins passée à vendre. Notre service d'automatisation sales transforme votre processus commercial en une infrastructure fluide où la donnée circule seule.",
      "Nous commençons par cartographier votre flux commercial actuel, de la génération du lead à la signature. Nous identifions ensuite les points de friction et les tâches automatisables : création automatique de fiches CRM, attribution des leads, déclenchement de relances selon le comportement du prospect, mise à jour des statuts. L'objectif est que vos commerciaux n'aient plus qu'à intervenir au moment décisif : l'échange humain qui conclut la vente.",
      "Concrètement, nous connectons vos outils (CRM type HubSpot, Salesforce ou Pipedrive) via des plateformes d'automatisation comme Zapier, Make ou n8n. Nous mettons en place des workflows de nurturing qui entretiennent automatiquement les leads non encore prêts à acheter, ainsi que des séquences de relance qui ne laissent plus aucune opportunité refroidir faute de suivi.",
      "Là où c'est pertinent, nous intégrons des agents IA pour qualifier les leads entrants, répondre aux premières questions ou enrichir les fiches en temps réel. Le tout est piloté par un reporting clair qui vous montre où en est chaque opportunité et où se situent les goulots d'étranglement de votre pipeline.",
      "Cette automatisation est le prolongement naturel d'une stratégie d'acquisition : une fois que le cold emailing et le scraping remplissent le haut de votre pipeline, l'automatisation sales garantit qu'aucun lead ne se perd et que votre équipe travaille à plein régime sur ce qui compte vraiment — convertir. Nous automatisons les pipelines commerciaux des PME à Marseille, Aix-en-Provence, Toulon et Nice.",
    ],
    relatedCities: [
      { slug: "marseille", label: "Marseille" },
      { slug: "aix-en-provence", label: "Aix-en-provence" },
      { slug: "toulon", label: "Toulon" },
      { slug: "nice", label: "Nice" },
    ],
    faq: [
      {
        question: "Avec quels CRM et outils travaillez-vous ?",
        answer: "Nous intégrons les principaux CRM (HubSpot, Salesforce, Pipedrive) et plateformes d'automatisation (Zapier, Make, n8n). Nous nous adaptons à votre stack existant plutôt que de vous imposer un changement d'outils.",
      },
      {
        question: "L'automatisation va-t-elle remplacer mes commerciaux ?",
        answer: "Non. Elle les libère des tâches répétitives pour qu'ils se concentrent sur la relation et le closing. L'humain reste central ; l'automatisation gère l'administratif et le suivi.",
      },
      {
        question: "Combien de temps pour mettre en place l'automatisation ?",
        answer: "Selon la complexité de votre flux, un premier socle de workflows est généralement opérationnel en quelques jours à deux semaines après l'audit initial.",
      },
      {
        question: "Peut-on intégrer des agents IA dans le processus ?",
        answer: "Oui. Nous intégrons des agents IA pour la qualification des leads, les premières réponses ou l'enrichissement des fiches, lorsque cela apporte un gain réel sans dégrader l'expérience prospect.",
      },
    ],
  },
};
