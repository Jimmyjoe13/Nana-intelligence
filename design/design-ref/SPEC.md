# Nana Intelligence — Design Spec (Website)

> **À l'agent IA qui lit ce fichier** : ce document définit le système de design du site web B2B de Nana Intelligence. Tu dois t'y conformer **strictement**. Pas de couleurs inventées. Pas de composants inventés. Pas de "j'ai fait au mieux". Si quelque chose manque, **demande**, ne crée pas.

---

## 1. Philosophie

Le site web est un **outil de conversion pour visiteur B2B**. La promesse de Nana Intelligence c'est *"la prospection, c'est de l'ingénierie, pas du marketing"* — l'UI doit refléter ça par sa précision et sa clarté.

**Trois principes :**

1. **Éditorial, pas startup.** On utilise un serif d'accent (Fraunces italique) sur les titres et les mots-clés. On évite les gradients, les glassmorphism, les emojis. Bordures nettes 1.5px, beaucoup d'espace.
2. **Preuve par la Data.** On met en avant les résultats chiffrés. Les chiffres sont **gros**, les labels sont **petits et en mono**. Une métrique = un grand chiffre serif + un label mono `LIKE_THIS`.
3. **Pas de bruit visuel.** Une couleur d'accent (orange) utilisée avec parcimonie pour les appels à l'action (CTA) et les points d'attention.

---

## 2. Palette (stricte)

```
--cream:    #f4f1ea   ← fond principal
--cream-2:  #ece8df   ← fond alternatif (sections, cards)
--cream-3:  #ddd6c8   ← bordures soft, séparateurs subtils
--ink:      #1a1a1a   ← texte principal, bordures, fonds dark
--ink-2:    #3a3733   ← texte secondaire
--ink-3:    #6b6660   ← texte tertiaire (labels mono)
--ink-4:    #a39d92   ← texte désactivé / hint
--orange:   #ff5b22   ← UNIQUE accent : CTA, hover, valeur clé, status live
```

---

## 3. Typographie

**Quatre familles. Pas une de plus.**

| Famille | Usage | Poids | Notes |
|---|---|---|---|
| **Fraunces** | Titres, gros chiffres, citations | 400, 500, 600 | `letter-spacing: -0.025em`. Italique = mot d'accent. |
| **Inter** | UI body, labels longs, paragraphes | 400, 500, 600 | Variable. Par défaut 400. |
| **JetBrains Mono** | Labels courts, métriques unit, status, tags | 400, 500 | `letter-spacing: 0.06em`, **MAJUSCULES** pour labels |
| **Caveat** | Annotations et témoignages clients | 500 | Couleur orange. |

---

## 4. Layout du Site Web

Le site suit une structure de sections verticales classiques mais avec une grille rigoureuse.

- **Header** : 80px fixe ou scroll-hide, bg `--bg`, border-bottom 1.5px `--border`. Navigation mono uppercase + CTA principal.
- **Footer** : Complet, avec liens, logo, et inscription newsletter.
- **Sections** : Alternance de bg `--cream` et `--cream-2`. Padding vertical généreux (80-120px).

---

## 5. Composants atomiques (cf. `components.md`)

- `Button` — primary (orange bg), ghost (outline), ink (dark bg)
- `Metric` — grand chiffre + label mono pour la preuve sociale
- `Box` — conteneur de section ou de card (pas d'arrondi)
- `PageHeader` — titre de page avec kicker mono

---

## 6. Ton de la copy

- **Expert & Précis.** Pas de promesses floues. On parle de résultats et de méthodologie.
- Les **boutons** sont incitatifs mais professionnels : "Demander un audit", "Voir nos services", "Lire l'article".

---

## 7. Anti-patterns (interdits)

❌ Cards arrondies (`border-radius: 0` partout)
❌ Gradients complexes
❌ Glassmorphism
❌ Emojis dans la UI officielle
❌ Plus d'une couleur d'accent. **L'orange est seul.**
