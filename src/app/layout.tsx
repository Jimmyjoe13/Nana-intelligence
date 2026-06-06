import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";
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
  title: "Nana Intelligence | Agence Prospection B2B & Lead Generation",
  description: "L'ingénierie commerciale au service de votre croissance. Agence spécialisée en Lead Generation, Cold Emailing et Scraping B2B à Marseille.",
  keywords: ["agence prospection b2b marseille", "lead generation", "cold emailing", "scraping b2b", "automatisation sales", "nana intelligence"],
  openGraph: {
    title: "Nana Intelligence | Agence Prospection B2B",
    description: "Générez un flux continu de RDV qualifiés via le Cold Emailing et le Scraping intelligent.",
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
  "@type": "Organization",
  "name": "Nana Intelligence",
  "url": "https://nana-intelligence.fr",
  "logo": "https://nana-intelligence.fr/img/logo-icon.png",
  "sameAs": [
    "https://www.linkedin.com/company/nana-intelligence/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marseille",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  }
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
        <SiteLayout>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}

