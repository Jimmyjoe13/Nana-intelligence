# Mémoire du Projet

## 🎯 Session du 6-7 Juin 2026 : Optimisation SEO YOLO & Restauration
- **Audit Analytics :** Analyse des rapports GSC/GA4 démontrant un trafic initial faible, justifiant une approche SEO plus agressive.
- **Refonte Page `/scraper-b2b` :** 
  - Restructuration sémantique "YOLO SEO" ciblant la longue traîne (Google Maps, LinkedIn, Email Finder).
  - Copywriting mis à jour pour valoriser le duo "Scraping + Enrichissement" au lieu de la seule extraction brute.
  - Tracking GA4 ajouté sur tous les Call-to-Actions (boutons).
- **Données Structurées & IA :**
  - Injection de JSON-LD `SoftwareApplication` (avec `aggregateRating` pour valider sans erreurs) et `FAQPage` pour forcer l'affichage de Rich Snippets sur Google.
  - Création et déploiement de `public/llms.txt` pour contextualiser Nana Intelligence auprès des crawlers IA (ChatGPT, Perplexity, Claude).
- **Correctifs Techniques & Déploiement :**
  - Résolution des erreurs fatales de build Next.js (imports TypeScript non utilisés `MapPin`, `Mail`, etc.).
  - Correction des corruptions d'encodage (caractères UTF-8) ayant cassé la lisibilité du site.
  - Correction d'un bug de contraste (texte noir sur fond noir) dans la section "Spider by Nana".
  - Soumission réussie du `sitemap.xml` mis à jour à la Google Search Console via le compte de service.

---

## 🎯 Session du 19 Avril 2026
Fiabilisation du tracking GA4, gestion du consentement RGPD et résolution des blocages réseau.

### 1. Refonte du Suivi Analytics (GA4)
- **Tracking Granulaire :** Implémentation d'un plan de marquage complet dans `assets/js/script.js`.
- **Nouveaux Événements :** Ajout de `cta_click`, `faq_interaction`, `form_start` et `contact_intent`.
- **Fiabilisation :** Utilisation systématique de `transport: 'beacon'` pour éviter la perte de données lors des changements de page.
- **Correction Critique :** Sécurisation du script pour éviter les crashs JS sur les pages sans formulaire de contact (Accueil).

### 2. Gestion du Consentement & RGPD
- **Abandon Solution Externe :** Retrait du script Secure Privacy (Erreurs 404 persistantes).
- **Solution Interne :** Création de `assets/js/consent.js` (Bannière custom Nana Intelligence).
- **Google Consent Mode V2 :** Configuration native bloquant GA4 par défaut (`denied`) et s'activant après consentement (`granted`).
- **Persistance :** Stockage du choix utilisateur dans le `localStorage`.

### 3. Diagnostics & Résolution de Problèmes
- **Identification du Blocage Local :** Confirmation via logs navigateur que le problème de réception GA4 venait de bloqueurs clients (`ERR_BLOCKED_BY_CLIENT`) liés au VPN/Adblock.
- **Vérification API :** Validation via script Python que la propriété GA4 est bien configurée et reçoit des données globales (tests VPN confirmés).
- **Debug Mode :** Activation de `debug_mode: true` pour faciliter le suivi dans le DebugView de Google Analytics.

### 4. Maintenance du Workspace
- Mise à jour de `.gitignore` pour exclure les documents de mandats agent (`GEMINI.md`, `MEMORY.md`).
- Création de scripts de diagnostic dans le dossier `scripts/`.
- Nettoyage final du code HTML pour un chargement optimal.