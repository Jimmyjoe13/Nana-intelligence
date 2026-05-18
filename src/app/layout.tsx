import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";

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
  title: "Nana Intelligence | Agence Prospection B2B & Lead Generation",
  description: "L'ingénierie commerciale au service de votre croissance. Agence spécialisée en Lead Generation, Cold Emailing et Scraping B2B à Marseille.",
  keywords: ["agence prospection b2b marseille", "lead generation", "cold emailing", "scraping b2b", "automatisation sales", "nana intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-cream text-ink">
        <SiteLayout>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}
