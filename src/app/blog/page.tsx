import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { blogPosts, blogCategories } from "@/mocks/blog";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Le Blog de l'Acquisition B2B | Nana Intelligence",
  description: "Découvrez nos guides sur le Cold Emailing, le scraping et l'automatisation sales pour générer des rendez-vous qualifiés B2B.",
  keywords: [
    "blog lead generation b2b",
    "guide cold emailing",
    "scraping linkedin google maps",
    "automatisation sales",
    "conseils prospection b2b",
    "rdv qualifies"
  ],
};

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <PageHeader
            kicker="Ressources & Articles"
            title="Le blog de"
            emphasis="l'ingénierie"
            description="Analyses, conseils et stratégies pour transformer votre prospection B2B en une machine de guerre prévisible."
          />
        </div>
      </section>

      <BlogList posts={blogPosts} categories={blogCategories} />

      {/* Newsletter Signup */}
      <section className="bg-cream-2 py-40">
         <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
               <div className="lg:col-span-7 flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Deep Dive Newsletter</span>
                    <h2 className="font-display text-[44px] md:text-[64px] leading-[0.95] font-medium text-ink">
                      Ne ratez plus aucun <span className="italic text-orange font-normal">insight</span>.
                    </h2>
                  </div>
                  <p className="font-sans text-xl text-ink-2 max-w-xl">
                    Chaque semaine, nous envoyons une analyse technique sur les dernières tendances de la prospection B2B. Réservé à ceux qui veulent une machine performante.
                  </p>
               </div>
               <div className="lg:col-span-5">
                  <Box className="p-10 flex flex-col gap-6 bg-cream border-ink">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[11px] font-bold uppercase text-ink">Email Professionnel</label>
                      <input 
                        type="email" 
                        placeholder="VOTRE@ENTREPRISE.AI" 
                        className="w-full bg-cream-2 border-[1.5px] border-ink px-4 py-4 font-mono text-[12px] focus:outline-none focus:border-orange transition-colors"
                      />
                    </div>
                    <Button variant="primary" size="lg" className="w-full text-ink">M&apos;abonner à l&apos;ingénierie</Button>
                    <p className="text-[10px] text-ink-4 font-mono uppercase text-center">ZÉRO SPAM. DÉSINSCRIPTION EN 1 CLIC.</p>
                  </Box>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
