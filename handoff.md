# Handoff — Redesign Global Site Web Nana Intelligence

## 1. Objectif
Accomplir la refonte complète du site web vitrine B2B de Nana Intelligence en passant d'une architecture statique HTML à une application Next.js 14 moderne (App Router), performante et optimisée SEO.
Le « done » : Le site est en ligne sur [nana-intelligence.fr](https://nana-intelligence.fr), tous les liens fonctionnent, le design "Editorial Data" est respecté, et les pages d'agences locales et de blog sont opérationnelles.
## 2. État actuel
- **Design System :** Palette (Crème/Ink/Orange), typographies (Fraunces/Inter/Mono/Caveat) et composants atomiques intégralement implémentés.
- **Pages migréers :** Accueil, Services, À propos, Blog, Contact, et Agences (Marseille, Aix, Toulon).
- **Déploiement :** CI/CD configurée via GitHub Actions avec export statique vers GitHub Pages. Corrigé pour inclure la génération du sitemap.
- **CRM :** Travaux préparatoires réalisés (Auth Supabase + Schéma DB + Pipeline interactif). **Sujet gelé :** Le CRM sera migré vers une repo dédiée ultérieurement. Ne plus intervenir sur le dossier `/crm` dans ce projet.
- **Performance :** Très bon TTFB (280ms) et temps de chargement (<700ms).
- **Analytics & SEO :** Tracking GA4 (`G-NRSE8H0WCE`) intégralement implémenté avec plan de marquage (CTA, Formulaires, FAQ). Sitemap soumis avec succès à la Google Search Console.
- **Accessibilité :** Correctifs appliqués sur le composant `Field` (IDs générés pour les labels) et l'input Newsletter (aria-label).

## 3. Fichiers concernés
- `src/app/page.tsx` -> Page d'accueil (Tracking CTAs ajouté).
- `src/app/layout.tsx` -> RootLayout (Composant GoogleAnalytics injecté).
- `src/components/layout/GoogleAnalytics.tsx` -> Gestionnaire de scripts GA4.
- `src/lib/utils.ts` -> Utilitaire `trackEvent` ajouté.
- `src/components/ui/Button.tsx` -> Tracking automatique des clics.
- `.github/workflows/nextjs.yml` -> Pipeline de déploiement (mis à jour pour `npm run build`).

## 4. Ce qui a échoué
- **Sitemap absent :** `npx next build` ignorait le script `postbuild`. Solution : Passage à `npm run build` (Corrigé).
- **Poids Image :** Identification de `neo-logo-nana.png` (8.4 Mo) inutilisé dans `public/img`.

## 5. Prochaine étape
- **Nettoyage :** Supprimer `public/img/neo-logo-nana.png` pour éviter de polluer le repo (gain de 8.4 Mo).
- **Validation GSC :** Surveiller le rapport de couverture dans la Search Console (soumission effectuée).
- **Audit Accessibilité :** Continuer la vérification des contrastes sur les sections à fond coloré (Crème-2).

