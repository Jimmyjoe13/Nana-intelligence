# Handoff — Optimisation SEO & Nouveau Contenu Blog

## 1. Objectif
Restaurer et booster le trafic organique de Nana Intelligence via une optimisation technique (sitemap, redirections, JSON-LD) et l'ajout de contenu stratégique sur l'outil Spider B2B.
Le « done » : Le sitemap est validé par GSC, les anciennes URLs redirigent sans 404, et le nouvel article sur Spider est en ligne.

## 2. État actuel
- **Sitemap :** Entièrement corrigé et fonctionnel (19 URLs). Configuré pour être généré dans `/out` lors du build.
- **Redirections :** Fichiers HTML physiques (`about.html`, etc.) ajoutés dans `/public` pour gérer le fallback GitHub Pages.
- **Données Structurées :** JSON-LD `Organization` et `LocalBusiness` (Marseille) intégrés dans le layout racine.
- **Metadata :** `metadataBase` configuré pour corriger les avertissements de build et assurer des URLs OpenGraph absolues.
- **Contenu :** Nouvel article de blog (ID 4) ajouté sur l'outil Spider B2B avec maillage vers `/scraper-b2b`.
- **Dernière action :** Soumission réussie du sitemap via `scripts/gsc_sitemap_submit.py`.

## 3. Fichiers concernés
- `next-sitemap.config.js` -> Correction du chemin de sortie (`outDir`) et détection des routes.
- `src/app/layout.tsx` -> Ajout de JSON-LD, `metadataBase` et balises OpenGraph complètes.
- `src/mocks/blog.ts` -> Ajout de l'article sur "Spider B2B".
- `public/*.html` -> Fichiers de redirection (about, contact, services, agence) pour GitHub Pages.
- `scripts/gsc_sitemap_submit.py` -> Script utilisé pour la soumission GSC.

## 4. Ce qui a échoué
- **Fichier `_redirects` :** Inefficace sur GitHub Pages (non supporté nativement). Remplacé par des redirections `meta refresh` en HTML.
- **API Indexing (GSC) :** Échec (403) car l'API n'est pas activée sur le projet Google Cloud. La soumission manuelle/script du sitemap est privilégiée.
- **Sitemap vide :** Causé par l'option `output: export` dans la config `next-sitemap` qui empêchait la lecture des routes compilées. Corrigé en spécifiant manuellement `outDir`.

## 5. Prochaine étape
- **Monitoring GSC :** Vérifier dans 48-72h que les 19 pages sont bien "Découvertes" ou "Indexées".
- **Validation SEO :** Utiliser un outil comme Screaming Frog ou PageSpeed Insights pour confirmer que le JSON-LD est bien valide et sans erreurs.
- **Partage Social :** Tester le partage de l'URL sur LinkedIn pour vérifier le rendu de la nouvelle image OG.
