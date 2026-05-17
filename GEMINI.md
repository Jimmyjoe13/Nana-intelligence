# Mandats Nana Intelligence - Google Analytics & SEO

Ce fichier définit les règles de base et les configurations critiques pour la gestion du projet Nana Intelligence.

## 🛠️ Configuration Google Analytics 4
- **ID de Mesure :** `G-NRSE8H0WCE`
- **Property ID :** `497677784`
- **Rétention des données :** Fixée à **14 mois** (Maximum).
- **Conversions :** L'événement `generate_lead` est marqué comme une conversion (déclenché par formulaire).
- **Mode Debug :** Activé via `debug_mode: true` dans le `gtag('config')` pour le dépannage.

## 🛡️ Gestion du Consentement (RGPD)
- **Solution :** Système de consentement interne (Custom Banner).
- **Fichier :** `assets/js/consent.js`.
- **Fonctionnement :** Google Consent Mode V2 intégré. Par défaut, `analytics_storage` et `ad_storage` sont à `denied`. Le tracking ne s'active qu'après le clic sur "Tout accepter".

## 🎯 Événements Trackés (Plan de marquage)
- `generate_lead` : Soumission réussie du formulaire de contact (Conversion).
- `cta_click` : Clic sur un bouton d'appel à l'action (Paramètres : `cta_text`, `section_id`).
- `faq_interaction` : Ouverture d'une question de la FAQ.
- `form_start` : Premier clic/focus dans un champ du formulaire de contact.
- `contact_intent` : Clic sur un lien email ou vers Malt.
- `outbound_click` : Clic vers un site externe (LinkedIn, etc.).

## 📂 Gestion des Fichiers Sensibles
- **Dossier de clés :** `analytics-credentials/` doit **TOUJOURS** être exclu du Git via `.gitignore`.
- **Fichier de clés actuel :** `n8n-ai-agent-451510-878f98de2c6e.json`.
- **Rapports :** Le dossier `reports/` est également ignoré par Git pour protéger les données de trafic.

## 📜 Scripts de Reporting & Diagnostic
- `scripts/ga4_get_report.py` : Rapport hebdomadaire simple.
- `scripts/ga4_vs_gsc_report.py` : Comparaison Trafic vs SEO.
- `scripts/check_live_data.py` : Diagnostic de réception des données via l'API.
