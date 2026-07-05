export const detailedServices = [
  {
    id: "cold-email",
    title: "Prospection &",
    emphasis: "Cold Emailing",
    kicker: "01. CONVERSION",
    description: "Génération de leads qualifiés via des campagnes Cold Emailing ultra-ciblées et optimisées pour la délivrabilité.",
    features: [
      "Scraping & Enrichissement de données",
      "Copywriting de conversion et A/B Testing",
      "Délivrabilité technique (SPF, DKIM, DMARC)",
      "Séquences multi-touch automatisées",
    ],
    metric: { label: "Taux d'ouverture moyen", value: "45", suffix: "%" }
  },
  {
    id: "automation",
    title: "Automatisation",
    emphasis: "Commerciale",
    kicker: "02. INFRASTRUCTURE",
    description: "Ne perdez plus de temps sur les tâches répétitives. Automatisez votre CRM et vos relances pour plus d'efficacité.",
    features: [
      "Connexion CRM (HubSpot, Salesforce, Pipedrive)",
      "Automatisation Zapier / Make / n8n",
      "Workflows de nurturing automatiques",
      "Intégration d'agents IA personnalisés",
    ],
    metric: { label: "Efficacité équipe", value: "+200", suffix: "%" }
  },
  {
    id: "accompagnement-seo",
    title: "Accompagnement",
    emphasis: "SEO",
    kicker: "03. VISIBILITÉ",
    description: "Générez du trafic Google qualifié et durable grâce à un accompagnement SEO complet : audit technique, optimisation on-page et stratégie de contenu.",
    features: [
      "Audit SEO technique complet (crawl, indexation, CWV)",
      "Optimisation on-page et maillage interne",
      "Stratégie de contenu ciblée sur vos requêtes",
      "Suivi mensuel des positions et reporting",
    ],
    metric: { label: "Multiplicateur de trafic organique", value: "3.5", prefix: "x" }
  },
  {
    id: "formation-ia",
    title: "Formation",
    emphasis: "IA appliquée",
    kicker: "04. SCALING",
    description: "Formez vos équipes aux outils d'IA générative et aux workflows automatisés pour accélérer la prospection sans sacrifier la qualité.",
    features: [
      "Prompt Engineering pour SDR & BDR",
      "Stack d'IA opérationnelle (Claude, GPT, Mistral)",
      "Création d'agents IA sur mesure (RAG, tool-use)",
      "Automatisation de la recherche de prospects",
    ],
    metric: { label: "Productivité SDR moyenne", value: "+65", suffix: "%" }
  },
  {
    id: "automatisation-roi",
    title: "Automatisations",
    emphasis: "orientées ROI",
    kicker: "05. ROI",
    description: "Concevez des workflows automatisés qui génèrent un ROI mesurable : nurturing, scoring, relances et reporting en temps réel.",
    features: [
      "Workflows no-code (Make, n8n, Zapier)",
      "Intégrations CRM / Slack / Sheets",
      "Tableaux de bord ROI en temps réel",
      "SLA & monitoring des taux de conversion",
    ],
    metric: { label: "ROI moyen mois 1", value: "x4", prefix: "" }
  }
];

export const processSteps = [
  {
    title: "Audit & Stratégie",
    text: "Analyse de votre offre et de vos clients idéaux pour définir le ciblage optimal."
  },
  {
    title: "Construction Base",
    text: "Scraping ciblé et enrichissement des données avec vérification des emails."
  },
  {
    title: "Lancement Campagnes",
    text: "Configuration technique et déploiement des séquences avec A/B testing."
  },
  {
    title: "Optimisation & Scaling",
    text: "Analyse des performances et augmentation des volumes pour remplir votre pipeline."
  }
];
