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

## 2026-10-08 - Plan de redressement SEO/GEO, phase 0 (Jimmy)

Contexte : pic d'impressions du 29/09 au 02/10 puis redescente, lie a la migration des slugs du 26/09 (voir `reports/Audit-SEO-GEO-2026-10-08.md`). Regle : aucun nouveau changement d'URL massif.

- Commit des modifications P2 de Lea sur la page Marseille et le maillage villes (en attente depuis le 29/09).
- Articles 26 et 27 passes en slug : `/blog/convergence-rpa-ia-automatisation-processus-2026/` et `/blog/hyper-automatisation-no-code-ia-2026/`. Les anciennes `/blog/26/` et `/blog/27/` redirigent (meta refresh + canonique, GitHub Pages ne gere pas les 301).
- Liens internes sans slash final corriges dans les articles (11 liens) : plus aucun lien interne en 301.
- JSON-LD Article : dates en ISO 8601 (`src/lib/dates.ts`), y compris dans l'ItemList du blog. Suppression des 3 blocs Article inline en doublon dans les articles 20, 21 et 26 (URL canoniques erronees, auteurs incoherents).
- Autrice des articles : Juliette Masson (`Person`, LinkedIn en `sameAs`), affichee en tete d'article. Decision utilisateur du 08/10.
- Sitemap : `lastmod` reel (date de publication pour les articles, date du dernier commit des sources pour les autres pages). Le workflow de deploiement recupere l'historique git complet.
- Page cible unique pour « agence de prospection b2b » : `/agence-lead-generation/` (decision utilisateur du 08/10, application en phase 1).
- Validation : `npx tsc --noEmit` et `npm run build` OK, 41 URL au sitemap, 0 JSON-LD invalide, 0 lien interne sans slash.

## 2026-10-08 - Plan de redressement SEO/GEO, phase 1 (Jimmy)

- GSC : reindexation demandee pour les 12 URL de la phase 0 (12/12 OK) et sitemap resoumis.
- Titres : 22 titres d'articles depassaient 65 caracteres. Ajout d'un `metaTitle` court (55 car. max, + ` | Nana`) sur les articles 1, 6 a 12, 14 a 22 et 24 a 27, sans changer le H1 ni les URL. Titres raccourcis aussi pour les 4 pages villes, le hub agence, le blog, les services et l'automatisation sales.
- Descriptions : `metaDescription` reecrite (158 car. max) pour les articles testes pendant le pic (1, 6, 8, 9, 12, 15, 25) et les longues (16, 18, 20 a 22, 26, 27).
- Controle sur le build : 0 page avec titre > 65 ou description > 160 caracteres.
- Requete � agence de prospection b2b � : page cible unique `/agence-lead-generation/` (title, H1, keywords). Les articles 1, 9, 12, 15 et 25 gardent leur angle (comparatif, externalisation, choix, automatisation, prix) et renvoient vers elle par un lien en fin d'article.
- Cannibalisation Marseille : article 10 recentre sur la region PACA (title, extrait, intro) avec un lien vers la page Marseille ; article 12 n'emploie plus � agence lead generation Marseille �.
- Validation : `npx tsc --noEmit` et `npm run build` OK.

## Actions manuelles restantes

- Demander la reindexation dans GSC pour `/agence-lead-generation/marseille`, `/agence-lead-generation/nice`, `/agence-lead-generation/toulon` (et verifier la couverture).
- Surveiller le CTR des pages villes apres de-optimisation des doublons `/agence-lead-generation-toulon/`.

## Regles de coordination

- Toute evolution SEO (nouvelle page, metas, maillage, sitemap, correction technique) doit figurer dans ce journal avec la date.
- Les agents SEO externes (dont Lea) doivent relire ce fichier avant toute intervention et ne pas contredire la direction commune sans validation utilisateur.
- Les acces API (SEOJuice, GSC, GA4) restent dans `.env` et ne sont jamais exposes dans la doc.
