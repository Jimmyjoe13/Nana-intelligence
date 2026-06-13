import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Script from "next/script";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nana-intelligence.fr"),
  title: "Nana Intelligence | Agence Lead Generation B2B à Marseille, Aix, Toulon",
  description: "Agence de prospection B2B en région PACA. +250 RDV qualifiés/mois pour nos clients PME. Cold Emailing, Scraping LinkedIn & Automatisation Sales. 🎁 Audit gratuit 30 min →",
  keywords: ["agence lead generation b2b marseille", "agence prospection commerciale marseille", "cold emailing b2b", "scraping linkedin", "lead gen paca", "agence acquisition client"],
  openGraph: {
    title: "Nana Intelligence | Agence Lead Generation B2B PACA",
    description: "+250 RDV qualifiés/mois. Cold Emailing, Scraping LinkedIn & Automatisation. Audit gratuit 30 min.",
    url: "https://nana-intelligence.fr",
    siteName: "Nana Intelligence",
    images: [
      {
        url: "/img/logo-icon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Nana Intelligence",
  "alternateName": "Nana Intelligence Agence B2B",
  "url": "https://nana-intelligence.fr",
  "logo": "https://nana-intelligence.fr/img/logo-icon.png",
  "image": "https://nana-intelligence.fr/img/logo-icon.png",
  "description": "Agence spécialisée en Lead Generation, Cold Emailing et Scraping B2B à Marseille. Nous automatisons votre prospection commerciale pour générer des RDV qualifiés.",
  "sameAs": [
    "https://www.linkedin.com/company/nana-intelligence/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marseille",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "postalCode": "13001",
    "addressCountry": "FR"
  },
  "areaServed": [
    { "@type": "City", "name": "Marseille" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Toulon" },
    { "@type": "Country", "name": "France" }
  ],
  "priceRange": "€€",
  "knowsAbout": [
    "Lead Generation B2B",
    "Cold Emailing",
    "Scraping B2B",
    "Automatisation Sales",
    "Prospection Commerciale"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream text-ink">
        <GoogleAnalytics GA_MEASUREMENT_ID="G-NRSE8H0WCE" />
        <Script
          id="canonical-redirect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var p = window.location.pathname;
                if (p.endsWith('/index.html')) {
                  window.location.replace(p.replace(/\\/index\\.html$/, '/') + window.location.search + window.location.hash);
                }
              })();
            `,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x5vch320wx");
            `,
          }}
        />
        <SiteLayout>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}

