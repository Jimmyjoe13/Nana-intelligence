"use client";

import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Box } from "@/components/ui/Box";
import { Metric } from "@/components/ui/Metric";
import { Field } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowRight, Sparkles } from "lucide-react";

export default function DesignSystemPage() {
  return (
    <div className="flex flex-col gap-20 p-10 bg-cream min-h-screen">
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          01. Page Header
        </h2>
        <PageHeader
          kicker="Nos expertises"
          title="Services de"
          emphasis="prospection"
          description="Découvrez comment nous pouvons vous aider à accélérer votre croissance grâce à une ingénierie commerciale de pointe."
          actions={[
            <Button key="audit" variant="primary" icon={<Sparkles size={16} />}>
              Audit Gratuit
            </Button>
          ]}
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <section className="flex flex-col gap-8">
          <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
            02. Buttons
          </h2>
          <div className="flex flex-wrap gap-4 items-end">
            <Button variant="primary">Demander un audit</Button>
            <Button variant="ink">Nos Services</Button>
            <Button variant="ghost">En savoir plus</Button>
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
            <Tag variant="outline">Prospection</Tag>
            <Tag variant="solid">B2B</Tag>
            <Tag variant="orange">Nouveau</Tag>
            <Tag variant="outline" dot>Live Results</Tag>
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          04. Metrics (Social Proof)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Metric label="RDV générés / an" value="2,500" suffix="+" trend="+18% vs 2025" trendVariant="positive" />
          <Metric label="Taux de conversion" value="12.4" suffix="%" trend="+3pt au-dessus du marché" trendVariant="positive" />
          <Metric label="ROI moyen" value="4.5" prefix="x" trend="Mesuré sur 150 campagnes" />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          05. Boxes & Containers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Box variant="default">
            <h3 className="font-display text-xl mb-4">Box Standard</h3>
            <p className="text-sm">Utilisée pour les cartes de services ou les blocs de contenu sur fond crème.</p>
          </Box>
          <Box variant="soft">
            <h3 className="font-display text-xl mb-4">Box Soft</h3>
            <p className="text-sm">Fond crème alternatif pour créer du contraste entre les sections.</p>
          </Box>
          <Box variant="ink" className="md:col-span-2">
            <h3 className="font-display text-2xl mb-4">Box Ink (Hero / CTA)</h3>
            <p className="text-lg opacity-80 max-w-xl">Un bloc à fort impact pour les sections d&apos;appel à l&apos;action finales ou les mises en avant majeures.</p>
            <Button variant="primary" className="mt-8">Démarrer maintenant</Button>
          </Box>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          06. Fields (Lead Gen)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px]">
          <Field label="Nom complet" placeholder="ex: Jean Dupont" />
          <Field label="Email professionnel" placeholder="jean@entreprise.ai" helperText="Nous respectons votre vie privée." />
          <Field label="Entreprise" placeholder="Nom de votre société" error="Ce champ est requis" />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[12px] uppercase text-ink-4 border-b border-ink-4 pb-2">
          07. Empty State
        </h2>
        <Box variant="soft" className="flex items-center justify-center min-h-[300px]">
          <EmptyState
            title="Aucun article trouvé"
            description="Revenez plus tard pour découvrir nos analyses et conseils sur la prospection B2B."
            action={<Button variant="ghost">Retour à l&apos;accueil</Button>}
          />
        </Box>
      </section>
    </div>
  );
}
