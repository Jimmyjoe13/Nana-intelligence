"use client";

import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Box } from "@/components/ui/Box";
import { Metric } from "@/components/ui/Metric";
import { Field } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowRight, Plus, Download } from "lucide-react";

export default function DesignSystemPage() {
  return (
    <div className="flex flex-col gap-20 p-10 bg-cream min-h-screen">
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          01. Page Header
        </h2>
        <PageHeader
          kicker="Vue d'ensemble"
          title="Pipeline"
          emphasis="opportunités"
          description="Où en sont vos deals. Suivez chaque étape de votre tunnel de vente avec précision."
          actions={[
            <Button key="add" variant="primary" icon={<Plus size={16} />}>
              Ajouter
            </Button>,
            <Button key="export" variant="ink" icon={<Download size={16} />}>
              Exporter
            </Button>,
          ]}
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <section className="flex flex-col gap-8">
          <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
            02. Buttons
          </h2>
          <div className="flex flex-wrap gap-4 items-end">
            <Button variant="primary">Primary Button</Button>
            <Button variant="ink">Ink Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            <Button variant="primary" icon={<ArrowRight size={16} />}>With Icon</Button>
            <Button variant="primary" loading>Loading</Button>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
            03. Tags
          </h2>
          <div className="flex flex-wrap gap-4">
            <Tag variant="outline">Délivrabilité</Tag>
            <Tag variant="solid">Premium</Tag>
            <Tag variant="orange">À la une</Tag>
            <Tag variant="outline" dot>Live</Tag>
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          04. Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Metric label="RDV / 30 jours" value="250" suffix="+" trend="+18% vs M-1" trendVariant="positive" />
          <Metric label="Taux d'ouverture" value="45" suffix="%" trend="+3pt vs M-1" trendVariant="positive" />
          <Metric label="Réponse" value="12.4" suffix="%" trend="-0.5pt vs M-1" trendVariant="negative" />
          <Metric label="Pipeline" value="184" prefix="€" suffix="k" trend="12 deals en cours" />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          05. Boxes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Box variant="default">
            <h3 className="font-display text-xl mb-4">Default Box</h3>
            <p className="text-sm">Contenu sur fond crème standard.</p>
          </Box>
          <Box variant="soft">
            <h3 className="font-display text-xl mb-4">Soft Box</h3>
            <p className="text-sm">Contenu sur fond crème alternatif.</p>
          </Box>
          <Box variant="ink">
            <h3 className="font-display text-xl mb-4">Ink Box</h3>
            <p className="text-sm opacity-80">Contenu sur fond ink avec texte clair.</p>
          </Box>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          06. Fields
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px]">
          <Field label="Nom complet" placeholder="ex: Jimmy Doe" />
          <Field label="Email professionnel" placeholder="jimmy@nana.ai" helperText="Nous ne spammons jamais." />
          <Field label="Téléphone" placeholder="+33 6 ..." error="Format de numéro invalide" />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          07. Empty State
        </h2>
        <Box variant="soft" className="flex items-center justify-center min-h-[400px]">
          <EmptyState
            title="Aucun prospect ici"
            description="Importez votre première base de données pour commencer à prospecter avec Nana Intelligence."
            action={<Button variant="primary" icon={<Plus size={16} />}>Importer un CSV</Button>}
          />
        </Box>
      </section>
    </div>
  );
}
