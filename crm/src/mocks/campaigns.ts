export const campaignsData = [
  {
    id: 1,
    name: "Outreach ESN Paris Q2",
    sequence: "S03 - Cold Outreach Tech",
    base: "List_ESN_75",
    startedAt: "10/05/2026",
    status: "Live",
    kpi: "12.4% R",
  },
  {
    id: 2,
    name: "Relance Salon Vivatech",
    sequence: "S02 - Relance LinkedIn",
    base: "Vivatech_2026_Leads",
    startedAt: "12/05/2026",
    status: "Warm-up",
    kpi: "8.1%",
  },
  {
    id: 3,
    name: "Inbound Marketing Leads",
    sequence: "S01 - Inbound Followup",
    base: "Inbound_Daily",
    startedAt: "01/04/2026",
    status: "Live",
    kpi: "5.9%",
  },
];

export const campaignDetail = {
  id: 1,
  name: "Outreach ESN Paris Q2",
  kpis: [
    { label: "Prospects", value: "850" },
    { label: "Délivrés", value: "98", suffix: "%" },
    { label: "Ouverts", value: "45", suffix: "%" },
    { label: "Réponses", value: "12.4", suffix: "%" },
  ],
  chartData: [
    { name: "10/05", value: 50 },
    { name: "11/05", value: 120 },
    { name: "12/05", value: 200 },
    { name: "13/05", value: 180 },
    { name: "14/05", value: 250 },
    { name: "15/05", value: 310 },
    { name: "16/05", value: 280 },
  ],
  prospects: [
    { name: "Marc Aubert", company: "Capgemini", step: "Touch 3", status: "Sent" },
    { name: "Elise Petit", company: "Sopra Steria", step: "Touch 2", status: "Replied" },
    { name: "Lucas Vidal", company: "Atos", step: "Touch 4", status: "Opened" },
  ]
};
