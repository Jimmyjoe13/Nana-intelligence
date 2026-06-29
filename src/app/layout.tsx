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
  title: "Nana Intelligence | Agence de Prospection B2B PACA",
  description: "Agence de prospection B2B à Marseille, Aix et Toulon. Cold Emailing, Scraping LinkedIn et Automatisation Sales pour générer des RDV qualifiés B2B.",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nana Intelligence",
  "url": "https://nana-intelligence.fr",
  "logo": "https://nana-intelligence.fr/img/logo-icon.png",
  "sameAs": [
    "https://www.linkedin.com/company/nana-intelligence/"
  ]
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nana Intelligence",
  "image": "https://nana-intelligence.fr/img/logo-icon.png",
  "@id": "https://nana-intelligence.fr",
  "url": "https://nana-intelligence.fr",
  "telephone": "+33000000000",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13001 Marseille",
    "addressLocality": "Marseille",
    "postalCode": "13001",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.2965,
    "longitude": 5.3698
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "areaServed": [
    { "@type": "City", "name": "Marseille" },
    { "@type": "City", "name": "Aix-en-Provence" },
    { "@type": "City", "name": "Toulon" }
  ],
  "knowsAbout": [
    "Lead Generation B2B",
    "Cold Emailing",
    "Web Scraping B2B",
    "Automatisation Sales",
    "Prospection Commerciale"
  ],
  "description": "Agence spécialisée en Lead Generation, Cold Emailing et Scraping B2B à Marseille."
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script type="text/javascript" src="https://cdn.seojuice.io/suggestions.v1.js" defer />
        <noscript>
          <img src="https://smart.seojuice.io/pixel" width="1" height="1" alt="" style={{ display: "none" }} />
        </noscript>
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
