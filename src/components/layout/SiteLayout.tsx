"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn, trackEvent } from "@/lib/utils";
import { Mail, ArrowRight, Linkedin } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Scraper B2B", href: "/scraper-b2b" },
  { label: "Agence", href: "/agence-lead-generation" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-cream selection:bg-orange selection:text-ink">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b-[1.5px] border-ink">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 relative overflow-hidden">
               <Image 
                src="/img/logo-icon.png" 
                alt="Logo Nana Intelligence" 
                fill 
                className="object-contain"
                unoptimized
               />
            </div>
            <span className="font-display text-[22px] font-medium leading-none text-ink">
              <span className="text-orange">Nana</span> Intelligence
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:text-orange relative pb-1",
                  pathname === item.href ? "text-ink" : "text-ink-3"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-orange" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="https://spider.nana-intelligence.fr" target="_blank" className="hidden lg:block">
              <Button 
                variant="ghost" 
                size="sm"
                trackLabel="header_scraper_external"
                sectionId="header"
              >
                Scraper B2B (En ligne)
              </Button>
            </Link>
            <Link href="/contact" className="hidden sm:block">
              <Button 
                variant="primary" 
                size="sm" 
                icon={<ArrowRight size={14} />}
                trackLabel="header_audit_gratuit"
                sectionId="header"
              >
                Audit Gratuit
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-ink text-cream pt-24 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 pb-20 border-b border-cream/10">
            {/* Brand Section */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="h-12 w-auto relative overflow-hidden flex items-center gap-3">
                   <div className="h-10 w-10 relative">
                     <Image 
                      src="/img/logo-icon.png" 
                      alt="Logo Icon" 
                      fill 
                      className="object-contain grayscale brightness-200"
                      unoptimized
                     />
                   </div>
                   <span className="font-display text-[28px] font-medium leading-none">
                     <span className="text-orange">Nana</span> Intelligence
                   </span>
                </div>
                <span className="font-mono text-[11px] text-orange uppercase tracking-widest font-bold">
                  Expert Lead Generation B2B
                </span>
              </div>
              <p className="text-cream/60 max-w-xs text-sm leading-relaxed">
                Nous automatisons votre prospection commerciale B2B à Marseille et partout en France.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/company/nana-intelligence/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("outbound_click", { destination: "linkedin" })}
                  className="h-10 w-10 border border-cream/20 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="mailto:contact@nana-intelligence.fr"
                  onClick={() => trackEvent("contact_intent", { method: "email" })}
                  className="h-10 w-10 border border-cream/20 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cream/40">Navigation</span>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="text-[14px] hover:text-orange transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cream/40">Ressources</span>
                <nav className="flex flex-col gap-4">
                  <Link href="/agence-lead-generation/marseille" className="text-[14px] hover:text-orange transition-colors">Lead Gen Marseille</Link>
                  <Link href="/agence-lead-generation/aix" className="text-[14px] hover:text-orange transition-colors">Lead Gen Aix-en-Provence</Link>
                  <Link href="/agence-lead-generation/toulon" className="text-[14px] hover:text-orange transition-colors">Lead Gen Toulon</Link>
                  <Link href="/blog" className="text-[14px] hover:text-orange transition-colors">Nos Guides</Link>
                </nav>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cream/40">Newsletter</span>
                <h4 className="font-display text-[20px]">Recevez nos analyses <span className="italic text-orange">lead gen</span>.</h4>
              </div>
              <div className="flex flex-col gap-4">
                <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); trackEvent("newsletter_signup"); alert("Inscription réussie !"); }}>
                   <input 
                    type="email" 
                    placeholder="VOTRE@EMAIL.COM" 
                    aria-label="Adresse email pour la newsletter"
                    required
                    className="flex-1 bg-cream-2/5 border border-cream/20 px-4 py-3 font-mono text-[11px] text-cream placeholder:text-cream/30 focus:outline-none focus:border-orange transition-colors"
                  />
                  <Button variant="primary" size="sm" className="px-6 border-none" type="submit">OK</Button>
                </form>
                <p className="text-[10px] text-cream/40 font-mono uppercase tracking-wider">
                  Toutes les semaines, dans votre boîte mail.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-[0.2em]">
              © 2026 NANA INTELLIGENCE — MARSEILLE, FRANCE
            </span>
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
               <span className="font-mono text-[10px] text-cream/80 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
