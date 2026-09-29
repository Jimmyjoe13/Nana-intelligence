# Journal SEO - Nana Intelligence

Ce fichier est la source de vérité pour la coordination SEO entre agents (Codex, Léa et tout autre agent de la flotte). Toute modification SEO du site doit y être consignée avec date, périmètre et objectif.

## Direction SEO commune

- Cibler les requêtes locales exactes : `agence de prospection commerciale b2b {ville}` et variantes.
- Étoffer les pages villes avec preuve chiffrée et éléments citables par les moteurs de réponse IA (AISO).
- Renforcer le maillage hub-and-spoke : pages villes <-> articles de blog pertinents.
- Exclure les URLs numériques héritées `/blog/{id}` du référencement (canoniques vers les nouveaux slugs sémantiques).
- Garder les pages villes comme hub de conversion avec CTA `generate_lead` actif.

## 2026-09-29 - Audit + Quick wins P1 et P2

- Audit GSC/GA4/SEOJuice complet : rapport genere dans `reports/Audit-Performance-GA4-GSC-2026-09.md` (non versionné, presentation du rapport sur demande).
- P1 : metas reecrites sur le modele `agence de prospection commerciale b2b {ville}`, redirections et canoniques verifiees sur les pages villes, tracking GA4 controle.
- P2 : page Marseille enrichie (preuve chiffree, AISO, 2 FAQ), bloc `Guides lies` ajoute sur les 4 pages villes, maillage interne des articles 11 et 12 vers les pages villes et le guide cold emailing, sitemap a jour (39 URLs).
- Fichiers modifies (P2, non commités a la date du journal) : `src/mocks/agencies.ts`, `src/mocks/blog.ts`, `src/app/agence-lead-generation/[slug]/page.tsx`.
- Validation technique : `npm run build` et `npx tsc --noEmit` OK.

## Actions manuelles restantes

- Demander la reindexation dans GSC pour `/agence-lead-generation/marseille`, `/agence-lead-generation/nice`, `/agence-lead-generation/toulon` (et verifier la couverture).
- Surveiller le CTR des pages villes apres de-optimisation des doublons `/agence-lead-generation-toulon/`.

## Regles de coordination

- Toute evolution SEO (nouvelle page, metas, maillage, sitemap, correction technique) doit figurer dans ce journal avec la date.
- Les agents SEO externes (dont Lea) doivent relire ce fichier avant toute intervention et ne pas contredire la direction commune sans validation utilisateur.
- Les acces API (SEOJuice, GSC, GA4) restent dans `.env` et ne sont jamais exposes dans la doc.
