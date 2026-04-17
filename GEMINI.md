# Mandats Nana Intelligence - Google Analytics & SEO

Ce fichier définit les règles de base et les configurations critiques pour la gestion du projet Nana Intelligence.

## 🛠️ Configuration Google Analytics 4
- **ID de Mesure :** `G-NRSE8H0WCE`
- **Property ID :** `497677784`
- **Rétention des données :** Fixée à **14 mois** (Maximum).
- **Conversions :** L'événement `generate_lead` est marqué comme une conversion (déclenché par formulaire).

## 📂 Gestion des Fichiers Sensibles
- **Dossier de clés :** `analytics-credentials/` doit **TOUJOURS** être exclu du Git via `.gitignore`.
- **Fichier de clés actuel :** `n8n-ai-agent-451510-878f98de2c6e.json`.
- **Rapports :** Le dossier `reports/` est également ignoré par Git pour protéger les données de trafic.

## 📜 Scripts de Reporting
Pour générer les rapports, utiliser les scripts suivants dans le dossier `scripts/` :
1. `python scripts/ga4_get_report.py` : Rapport hebdomadaire simple.
2. `python scripts/ga4_vs_gsc_report.py` : Comparaison Trafic vs SEO (Nécessite accès GSC).

## 🚀 SEO & Maillage
- Respecter le maillage interne entre les 3 articles piliers :
  - `agence-prospection-b2b-marseille.html`
  - `guide-cold-emailing-b2b.html`
  - `scraping-b2b-nouvelle-prospection.html`
- Priorité : Favoriser les mots-clés "hors marque" (Lead Generation Marseille, Cold Emailing B2B).
