import React from "react";
import { Metadata } from "next";
import { blogPosts } from "@/mocks/blog";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/ui/EmptyState";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id);
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return {};

  return {
    title: `${post.title} | Nana`,
    description: post.excerpt,
  };
}

function getArticleJsonLd(post: typeof blogPosts[number], id: number) {
  const plainText = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText.split(/\s+/).length;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Nana Intelligence",
      "url": "https://nana-intelligence.fr"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nana Intelligence",
      "url": "https://nana-intelligence.fr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nana-intelligence.fr/img/logo-icon.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "image": post.image,
    "url": `https://nana-intelligence.fr/blog/${id}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nana-intelligence.fr/blog/${id}`
    },
    "articleSection": post.category,
    "keywords": post.category,
    "wordCount": wordCount,
    "inLanguage": "fr-FR",
    ...(post.structuredInternalLinks && post.structuredInternalLinks.length > 0
      ? { "relatedLink": post.structuredInternalLinks }
      : {})
  };
}

export default function BlogPostPage({ params }: Props) {
  const id = parseInt(params.id);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32 flex flex-col items-center justify-center">
        <EmptyState
          title="Article introuvable"
          description="L'article que vous recherchez n'existe pas ou a été déplacé."
          action={
            <Link href="/blog">
              <Button variant="ink" icon={<ArrowLeft size={16} />}>
                ← Blog prospection B2B
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(post, id)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://nana-intelligence.fr" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nana-intelligence.fr/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://nana-intelligence.fr/blog/${id}` }
          ]
        }) }}
      />
      {/* Article Header */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 flex flex-col gap-10">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink-3 hover:text-orange transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Retour aux articles
          </Link>
          
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Tag variant="orange">{post.category}</Tag>
              <div className="flex items-center gap-2 font-mono text-[10px] text-ink-4 uppercase">
                <Calendar size={12} /> {post.date}
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-ink-4 uppercase">
                <Clock size={12} /> {post.readTime} READ
              </div>
            </div>

            <h1 className="font-display text-[44px] md:text-[64px] leading-[1] font-medium text-ink">
              {post.title}
            </h1>
            
            <p className="font-sans text-xl text-ink-2 leading-relaxed italic border-l-[3px] border-orange pl-6">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-cream-2 py-20 md:py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Column */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="aspect-[21/9] border-[1.5px] border-ink relative overflow-hidden bg-cream mb-10">
               <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                unoptimized
               />
            </div>

            <div 
              className="prose prose-lg max-w-none 
                prose-headings:font-display prose-headings:font-medium prose-headings:text-ink
                prose-p:font-sans prose-p:text-ink-2 prose-p:leading-relaxed
                prose-strong:text-ink prose-strong:font-bold
                prose-h2:text-[32px] prose-h2:border-b-[1.5px] prose-h2:border-ink prose-h2:pb-4 prose-h2:mt-16
                prose-h3:text-[24px]
                prose-li:text-ink-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 pt-10 border-t border-cream-3 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-ink-3 uppercase font-bold">Partager :</span>
                  <button className="h-10 w-10 border border-ink/20 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"><Share2 size={16} /></button>
               </div>
               <Link href="/contact">
                  <Button variant="primary" icon={<Sparkles size={16} />}>Audit Gratuit</Button>
               </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-10">
            <Box variant="default" className="p-10 flex flex-col gap-8 sticky top-32 bg-cream">
               <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] text-orange uppercase font-bold tracking-widest">Newsletter</span>
                  <h3 className="font-display text-[24px] leading-tight">Recevez nos <span className="italic">deep-dives</span>.</h3>
               </div>
               <p className="text-sm text-ink-3 leading-relaxed">
                  Chaque semaine, une analyse technique pour optimiser votre machine de vente.
               </p>
               <div className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    placeholder="VOTRE@EMAIL.COM" 
                    className="w-full bg-cream-2 border-[1.5px] border-ink px-4 py-3 font-mono text-[11px] focus:outline-none focus:border-orange transition-colors"
                  />
                  <Button variant="ink" className="w-full">S&apos;abonner</Button>
               </div>
            </Box>

            <div className="flex flex-col gap-6 p-2">
               <span className="font-mono text-[11px] text-ink-3 uppercase font-bold border-b border-cream-3 pb-2">Articles récents</span>
               {blogPosts.filter(p => p.id !== id).map(p => (
                 <Link key={p.id} href={`/blog/${p.id}`} className="flex flex-col gap-1 group">
                    <span className="font-display text-[17px] group-hover:text-orange transition-colors leading-tight">{p.title}</span>
                    <span className="font-mono text-[10px] text-ink-4 uppercase">{p.date}</span>
                 </Link>
               ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Related Services — internal linking */}
      <section className="bg-cream-2 border-b-[1.5px] border-ink py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">Services associés</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/services/cold-emailing-b2b" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Cold Emailing B2B →</Link>
              <Link href="/services/scraping-b2b" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Scraping B2B →</Link>
              <Link href="/services/automatisation-sales" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Automatisation Sales →</Link>
              <Link href="/agence-lead-generation" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Agence Lead PACA →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}
