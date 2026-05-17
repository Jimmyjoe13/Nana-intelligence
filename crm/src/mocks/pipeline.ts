export const pipelineData = [
  {
    id: "audit",
    title: "Audit",
    count: 3,
    total: "€42,000",
    deals: [
      { id: 1, name: "SaaS Rocket", company: "Rocket Inc", value: "12,000", owner: "Jimmy", days: 3 },
      { id: 2, name: "Consulting Co", company: "Consulting Group", value: "15,000", owner: "Jimmy", days: 12 },
      { id: 3, name: "AI Startup", company: "Future Labs", value: "15,000", owner: "Jimmy", days: 1 },
    ],
  },
  {
    id: "proposition",
    title: "Proposition",
    count: 2,
    total: "€27,500",
    deals: [
      { id: 4, name: "ESN Paris Tech", company: "Paris Tech", value: "18,500", owner: "Jimmy", days: 15 },
      { id: 5, name: "Web Agency", company: "Flow Web", value: "9,000", owner: "Jimmy", days: 4 },
    ],
  },
  {
    id: "negotiation",
    title: "Négociation",
    count: 1,
    total: "€24,000",
    deals: [
      { id: 6, name: "Agence Web Flux", company: "Flux Corp", value: "24,000", owner: "Jimmy", days: 32 },
    ],
  },
  {
    id: "won",
    title: "Gagné",
    count: 8,
    total: "€142,000",
    deals: [],
  },
  {
    id: "lost",
    title: "Perdu",
    count: 4,
    total: "€56,000",
    deals: [],
  },
];

export const pipelineKPIs = [
  { label: "Total Pipeline", value: "184", prefix: "€", suffix: "k" },
  { label: "Pipeline Mois", value: "52", prefix: "€", suffix: "k" },
  { label: "Taux Conv.", value: "24", suffix: "%" },
  { label: "Cycle Moyen", value: "18", suffix: "J" },
];
