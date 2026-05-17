export const kpiData = [
  { label: "RDV / 30j", value: "250", suffix: "+", trend: "+18% vs M-1", trendVariant: "positive" as const },
  { label: "Ouverture", value: "45", suffix: "%", trend: "+3pt vs M-1", trendVariant: "positive" as const },
  { label: "Réponse", value: "12.4", suffix: "%", trend: "+1.2pt vs M-1", trendVariant: "positive" as const },
  { label: "Pipeline €", value: "184", prefix: "€", suffix: "k", trend: "12 deals en cours", trendVariant: "neutral" as const },
];

export const rdvChartData = [
  { name: "01/05", value: 5 },
  { name: "05/05", value: 12 },
  { name: "10/05", value: 8 },
  { name: "15/05", value: 15 },
  { name: "20/05", value: 18 },
  { name: "25/05", value: 22 },
  { name: "30/05", value: 25 },
];

export const topOpportunities = [
  { id: 1, name: "Agence Web Flux", value: "24,000", status: "Négociation" },
  { id: 2, name: "ESN Paris Tech", value: "18,500", status: "Proposition" },
  { id: 3, name: "SaaS Rocket", value: "12,000", status: "Audit" },
  { id: 4, name: "Consulting Co", value: "9,000", status: "Proposition" },
];

export const recentActivity = [
  { id: 1, time: "14:32", text: "RDV booké avec", emphasis: "Jean de Agence Web Flux", type: "appointment" },
  { id: 2, time: "14:18", text: "Réponse positive de", emphasis: "Marie @ ESN Paris", type: "response" },
  { id: 3, time: "13:54", text: "A/B test win sur la séquence", emphasis: "S03 - Outreach Cold", type: "info" },
  { id: 4, time: "11:20", text: "Nouveau prospect qualifié", emphasis: "SaaS Rocket", type: "prospect" },
];

export const sequencePerformance = [
  { id: 1, name: "Séquence S03 - Cold Outreach", rate: "12.4%", label: "RÉPONSE" },
  { id: 2, name: "Séquence S02 - Relance LinkedIn", rate: "8.1%", label: "RÉPONSE" },
  { id: 3, name: "Séquence S01 - Inbound Followup", rate: "5.9%", label: "RÉPONSE" },
];
