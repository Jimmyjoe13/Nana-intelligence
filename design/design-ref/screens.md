# Pages du Site Web B2B — structure attendue

> Tu construis ces pages **dans cet ordre**. Tu ne passes pas au suivant sans validation humaine. Tu **ne crées pas** de page absente de cette liste sans demander.

---

## 0. Layout shell (à faire en premier)

- `<SiteLayout>` : Header global avec navigation (Accueil, Services, À propos, Blog, Contact) + CTA "Audit Gratuit", et Footer complet.
- Routing : Next App Router.

---

## 1. Accueil `/`

**But :** Présenter l'offre de valeur et générer des leads.

**Structure (top → bottom) :**
- **Hero Section** : Gros titre éditorial Fraunces, sous-titre, CTA principal (Audit gratuit), et Metric strip pour la preuve sociale.
- **Features / Services (Grid)** : 3 colonnes avec Box présentant les services clés.
- **Social Proof / Testimonials** : Citations de clients en Caveat.
- **CTA Section finale** : Bloc foncé avec appel à l'action clair.

---

## 2. Services `/services`

**But :** Détailler l'offre.

**Structure :**
- `PageHeader` : Titre "Nos Services".
- Grille détaillée des offres (Prospection, Lead Gen, Cold Emailing).
- Pricing ou Packages (Optionnel).

---

## 3. À propos `/about`

**But :** Rassurer et présenter l'équipe.

**Structure :**
- `PageHeader` : "L'équipe Nana Intelligence".
- Histoire de l'entreprise (texte + image).
- Valeurs et Méthodologie.

---

## 4. Blog `/blog`

**But :** SEO et éducation.

**Structure :**
- `PageHeader` : "Ressources & Articles".
- Grille d'articles (Cards avec Tag catégorie, Titre, Date).
- Pagination.

---

## 5. Contact `/contact`

**But :** Générer un lead direct.

**Structure :**
- Layout split : 
  - Gauche : Texte éditorial, informations de contact (email, tel).
  - Droite : Formulaire (Nom, Email, Entreprise, Message) + Bouton "Envoyer".

---

## ⚠️ Hors-périmètre V1 (ne pas construire)

- ❌ Espace client connecté (Login/Dashboard)
- ❌ Paiement en ligne
