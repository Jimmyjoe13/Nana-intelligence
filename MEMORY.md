# Mémoire du Projet - Session du 19 Avril 2026

## 🎯 Objectifs Réalisés
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
