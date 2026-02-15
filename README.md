# 🚀 Nana Intelligence - Website Refactor (2025)

Ce dépôt contient la nouvelle version du site web **Nana Intelligence**, optimisée pour la conversion (structure landing page), la performance et l'accessibilité.

## 🛠️ Stack Technique

- **HTML5** Sémantique
- **CSS3** : Variables (Design Tokens), Flexbox/Grid, Animations CSS
- **JavaScript** (Vanilla) : Aucun framework lourd
- **Police** : Space Grotesk (Titres) & Plus Jakarta Sans (Corps)
- **Icônes** : SVG Inline (Performance maximale)

## 📂 Structure du Projet

```
nana-intelligence/
├── index.html                  # Landing Page Principale (Conversion)
├── about/
│   └── index.html              # Page À propos / Expert
├── services/
│   └── index.html              # Page Services détaillée
├── contact/
│   └── index.html              # Page Contact avec formulaire
├── agence-lead-generation/
│   └── index.html              # Landing Page SEO local
├── testimonials/
│   └── index.html              # Page Témoignages
├── assets/
│   ├── css/
│   │   └── style.css           # Design System complet
│   ├── js/
│   │   └── script.js           # Logique (Menu, Form, FAQ)
│   └── img/                    # Images optimisées
└── sitemap.xml                 # Plan du site pour SEO
```

## 🎨 Design System

Le design est géré via `assets/css/style.css` et repose sur des **Design Tokens** :

- **Couleurs** : Gold (`#d4af37`), Dark Blue (`#0a0f1a`), Gray scale.
- **Typographie** : Fluide (taille adaptative) avec `clamp()`.
- **Composants** :
  - `.btn`, `.btn-primary`, `.btn-outline`
  - `.card`, `.card--highlight`
  - `.section`, `.container`
  - `.metric`, `.badge`

## 🚀 Optimisations

- **Images** : Toutes les images (favicon, hero, photo) ont été compressées (< 100kb).
- **SEO** : Balises Meta, Open Graph, Schema.org (JSON-LD), Canonical tags.
- **Accessibilité** : Contrastes vérifiés, `aria-labels`, navigation clavier, `prefers-reduced-motion`.
- **Performance** : Chargement différé, pas de CSS blocking superflu.

## 📝 Déploiement

Le site est statique (HTML/CSS/JS uniquement). Il peut être hébergé n'importe où :

- Netlify (Recommandé)
- Vercel
- GitHub Pages
- Hébergement FTP classique

### Configuration Formulaire (Contact)

Le formulaire utilise **EmailJS** pour l'envoi d'emails sans backend.

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Récupérer votre `Service ID`, `Template ID` et `Public Key`
3. Mettre à jour `assets/js/script.js` avec vos clés :
   ```javascript
   emailjs.init("VOTRE_PUBLIC_KEY");
   // ...
   emailjs.sendForm('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', ...);
   ```

## ✅ Checklist Avant Mise en Production

- [x] Optimiser les images
- [x] Vérifier les liens (internes et externes)
- [x] Tester le formulaire de contact
- [x] Vérifier le responsive mobile
- [x] Valider le HTML/CSS (W3C)
- [ ] Configurer EmailJS avec les vraies clés de production
- [ ] Mettre à jour le sitemap.xml si de nouvelles pages sont ajoutées

---

**Développé avec 🧠 par Nana Intelligence**
