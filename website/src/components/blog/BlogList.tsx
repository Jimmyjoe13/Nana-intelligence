"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, Search, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogList({ posts, categories }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState("TOUT");

  const filteredPosts = activeCategory === "TOUT" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const featuredPost = posts[0];

  return (
    <>
      {/* Featured Article Section */}
      <section className="bg-cream-2 py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-16">
          <div className="flex items-center justify-between border-b border-ink-4 pb-4">
            <span className="font-mono text-[11px] text-ink-3 uppercase tracking-widest font-bold">À LA UNE</span>
            <Link href={`/blog/${featuredPost.id}`} className="text-orange hover:text-ink transition-colors">
               <ArrowUpRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            <div className="lg:col-span-7 aspect-[16/9] border-[1.5px] border-ink relative overflow-hidden bg-cream group">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
               <div className="flex flex-col gap-6">
                 <Tag variant="orange">{featuredPost.category}</Tag>
                 <h2 className="font-display text-[36px] md:text-[48px] leading-[1] font-medium text-ink">
                   {featuredPost.title}
                 </h2>
                 <p className="font-sans text-lg text-ink-2 leading-relaxed">
                   {featuredPost.excerpt}
                 </p>
               </div>
               <div className="flex items-center gap-6">
                 <div className="flex flex-col">
                   <span className="font-mono text-[11px] text-ink-3 uppercase font-bold">{featuredPost.date}</span>
                   <span className="font-mono text-[10px] text-ink-4 uppercase">Temps de lecture : {featuredPost.readTime}</span>
                 </div>
                 <Link href={`/blog/${featuredPost.id}`}>
                   <Button variant="primary" icon={<ArrowRight size={16} />}>Lire l&apos;article</Button>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="bg-cream py-32 border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-20">
          {/* Category Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "font-mono text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
                    activeCategory === cat ? "text-orange" : "text-ink-4 hover:text-ink"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative max-w-sm w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-4" />
              <input 
                type="text" 
                placeholder="RECHERCHER UN ARTICLE..." 
                className="w-full bg-cream-2 border-[1.5px] border-ink px-10 py-3 font-mono text-[11px] focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <Box key={post.id} className="flex flex-col gap-6 p-0 overflow-hidden group hover:border-orange transition-all duration-300 bg-cream">
                <div className="aspect-[16/10] relative overflow-hidden border-b-[1.5px] border-ink">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <Tag variant="solid" className="bg-ink text-cream">{post.category}</Tag>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-8 flex-1">
                   <span className="font-mono text-[10px] text-ink-4 uppercase font-bold">{post.date}</span>
                   <h3 className="font-display text-[22px] font-medium leading-tight group-hover:text-orange transition-colors">
                     {post.title}
                   </h3>
                   <p className="text-sm text-ink-3 leading-relaxed line-clamp-3">
                     {post.excerpt}
                   </p>
                   <Link href={`/blog/${post.id}`} className="mt-auto pt-6 flex items-center gap-2 font-mono text-[11px] font-bold uppercase text-ink group-hover:text-orange transition-colors">
                     En savoir plus <ArrowRight size={14} />
                   </Link>
                </div>
              </Box>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-6 font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase py-20 border-t border-cream-3">
            <span className="text-ink cursor-pointer">01</span>
            <span className="hover:text-ink cursor-pointer">02</span>
            <span className="hover:text-ink cursor-pointer">03</span>
            <span>...</span>
            <span className="hover:text-ink cursor-pointer">08</span>
            <span className="hover:text-orange cursor-pointer transition-colors ml-4">PAGE SUIVANTE →</span>
          </div>
        </div>
      </section>
    </>
  );
}
