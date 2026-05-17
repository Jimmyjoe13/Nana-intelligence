import { PageHeader } from "@/components/ui/PageHeader";

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        kicker="Support"
        title="Aide &"
        emphasis="documentation"
        description="Besoin d'un coup de main ? Retrouvez nos guides et contactez le support."
      />
    </div>
  );
}
