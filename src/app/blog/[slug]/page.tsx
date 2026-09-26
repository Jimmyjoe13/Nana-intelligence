import React from "react";
import { Metadata } from "next";
import { blogPosts, type BlogPostSeo } from "@/mocks/blog";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/ui/EmptyState";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug || p.id.toString() === params.slug);
  if (!post) return {};

  const targetSlug = post.slug || post.id.toString();
  const canonicalUrl = `/blog/${targetSlug}/`;

  const seo = post as typeof post & BlogPostSeo;

  return {
    title: seo.metaTitle ? `${seo.metaTitle} | Nana` : `${post.title} | Nana`,
    description: seo.metaDescription || post.excerpt,
    alternates: { canonical: canonicalUrl },
  };
}

function getArticleJsonLd(post: typeof blogPosts[number], canonicalSlug: string) {
  const plainText = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText.split(/\s+/).length;
  const canonicalUrl = `https://nana-intelligence.fr/blog/${canonicalSlug}/`;

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
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
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

function getFAQJsonLd(post: typeof blogPosts[number]) {
  const mainEntity: { "@type": string; "name": string; "acceptedAnswer": { "@type": string; "text": string } }[] = [];
  const regex = /<h[23][^>]*>(.*?)<\/h[23]>\s*([\s\S]*?)(?=<h[23]|$)/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(post.content)) !== null && mainEntity.length < 5) {
    const headingText = match[1].replace(/<[^>]*>/g, "").trim();
    if (!headingText.includes("?")) continue;
    const question = headingText.replace(/^\d+\.\s*/, "");
    const answerHtml = match[2].trim();
    const answer = answerHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (answer) {
      mainEntity.push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": { "@type": "Answer", "text": answer }
      });
    }
  }

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };
}

function getSpeakableJsonLd(post: typeof blogPosts[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": post.title,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".font-display", ".article-content p:first-of-type"]
    }
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug || p.id.toString() === params.slug);

  if (!post) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32 flex flex-col items-center justify-center">
        <EmptyState
          title="Article introuvable"
          description="L'article que vous recherchez n'existe pas ou a été déplacé."
          action={
            <Link href="/blog/">
              <Button variant="ink" icon={<ArrowLeft size={16} />}>
                ← Blog prospection B2B
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const canonicalSlug = post.slug || post.id.toString();
  const isLegacyId = params.slug === post.id.toString() && Boolean(post.slug);

  // Si accédé par l'ancien ID numérique, page de redirection instantanée
  if (isLegacyId) {
    const targetUrl = `/blog/${post.slug}/`;
    return (
      <div className="max-w-[800px] mx-auto px-6 py-32 text-center flex flex-col items-center gap-6">
        <meta httpEquiv="refresh" content={`0;url=${targetUrl}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace("${targetUrl}");`,
          }}
        />
        <h1 className="font-display text-2xl font-medium">Redirection vers l&apos;article...</h1>
        <p className="text-ink-3">
          Cet article a été déplacé vers une nouvelle adresse optimisée :
        </p>
        <Link href={targetUrl}>
          <Button variant="primary">Accéder à l&apos;article →</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(post, canonicalSlug)) }}
      />
      {getFAQJsonLd(post) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQJsonLd(post)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSpeakableJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://nana-intelligence.fr" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nana-intelligence.fr/blog/" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://nana-intelligence.fr/blog/${canonicalSlug}/` }
          ]
        }) }}
      />
      {/* Article Header */}
      <section className="bg-cream pt-20 pb-32 border-b-[1.5px] border-ink">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 flex flex-col gap-10">
          <Link 
            href="/blog/" 
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
                priority
               />
            </div>

            <div 
              className="article-content max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 pt-10 border-t border-cream-3 flex flex-col gap-8">
               <Box className="bg-cream p-10 flex flex-col gap-6 border-[1.5px] border-ink/10">
                 <div className="flex flex-col gap-2">
                   <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">
                     Audit stratégique offert
                   </span>
                   <h3 className="font-display text-[28px] font-medium">
                     Prêt à générer des RDV qualifiés ?
                   </h3>
                 </div>
                 <p className="text-ink-2 leading-relaxed text-sm">
                   Réservez votre audit gratuit de 30 minutes. Nous analysons votre potentiel et construisons votre stratégie d&apos;acquisition personnalisée.
                 </p>
                 <div className="grid grid-cols-3 gap-4 border-b border-ink/10 pb-6">
                   <div className="flex flex-col items-center gap-1 text-center">
                     <Clock size={18} className="text-orange" />
                     <span className="font-mono text-[11px] font-bold text-ink uppercase">30 sec</span>
                     <span className="font-mono text-[10px] text-ink-3">pour remplir</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-center">
                     <Users size={18} className="text-orange" />
                     <span className="font-mono text-[11px] font-bold text-ink uppercase">+40 audits</span>
                     <span className="font-mono text-[10px] text-ink-3">réalisés en 2026</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-center">
                     <ShieldCheck size={18} className="text-orange" />
                     <span className="font-mono text-[11px] font-bold text-ink uppercase">0 spam</span>
                     <span className="font-mono text-[10px] text-ink-3">données protégées</span>
                   </div>
                 </div>
                 <p className="font-mono text-[11px] text-orange uppercase tracking-[0.12em] font-bold">
                   Places limitées cette semaine
                 </p>
                 <Link href="/contact/">
                   <Button variant="primary" icon={<Sparkles size={16} />} className="w-full">
                     Obtenir mon audit gratuit 30 min
                   </Button>
                 </Link>
                 <p className="font-mono text-[11px] text-ink-3 uppercase tracking-[0.12em] text-center">
                   Zéro engagement · Réponse sous 24h · Données jamais partagées
                 </p>
               </Box>
               <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-ink-3 uppercase font-bold">Partager :</span>
                  <button className="h-10 w-10 border border-ink/20 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"><Share2 size={16} /></button>
               </div>
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
               {blogPosts.filter(p => p.id !== post.id).map(p => (
                 <Link key={p.id} href={`/blog/${p.slug || p.id}/`} className="flex flex-col gap-1 group">
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
              <Link href="/services/cold-emailing-b2b/" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Cold Emailing B2B →</Link>
              <Link href="/services/scraping-b2b/" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Scraping B2B →</Link>
              <Link href="/services/automatisation-sales/" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Automatisation Sales →</Link>
              <Link href="/agence-lead-generation/" className="font-mono text-[12px] text-ink uppercase tracking-widest font-bold border border-ink/20 px-5 py-3 hover:border-orange hover:text-orange transition-colors">Agence Lead PACA →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const post of blogPosts) {
    if (post.slug) {
      params.push({ slug: post.slug });
    }
    // Rétrocompatibilité avec les 24 anciens identifiants indexés
    params.push({ slug: post.id.toString() });
  }
  return params;
}
