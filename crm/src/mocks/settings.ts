export const domainsData = [
  { name: "nana-intelligence.ai", status: "Active", warmup: "98%", spf: true, dkim: true, dmarc: true },
  { name: "nana-ops.fr", status: "Active", warmup: "45%", spf: true, dkim: true, dmarc: false },
  { name: "outreach-nana.com", status: "Warm-up", warmup: "12%", spf: true, dkim: false, dmarc: false },
];

export const integrationsData = [
  { name: "HubSpot", status: "Connected", icon: "hubspot" },
  { name: "Pipedrive", status: "Not Connected", icon: "pipedrive" },
  { name: "Calendly", status: "Connected", icon: "calendly" },
  { name: "Slack", status: "Connected", icon: "slack" },
  { name: "Make", status: "Not Connected", icon: "make" },
];

export const teamData = [
  { name: "Jimmy Doe", role: "Admin", email: "jimmy@nana.ai" },
  { name: "Sarah Smith", role: "Sales", email: "sarah@nana.ai" },
  { name: "Alex Jones", role: "Sales", email: "alex@nana.ai" },
];
