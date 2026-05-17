# Prompts pour Gemini CLI — Construction du Site Web Nana Intelligence

> Copie-colle ces prompts **dans l'ordre**. Ne saute pas une étape. Attends que Gemini ait fini une étape (et que tu aies validé visuellement) avant de passer à la suivante.

---

## 📋 Prompt 0 — Onboarding de l'agent (à donner en premier, une seule fois)

```
Tu vas m'aider à construire l'UI du Site Web "Nana Intelligence", une 
plateforme B2B de prospection commerciale.

AVANT D'ÉCRIRE LA MOINDRE LIGNE DE CODE :

1. Lis intégralement les fichiers suivants :
   - @design-ref/README.md
   - @design-ref/SPEC.md
   - @design-ref/tokens.css
   - @design-ref/components.md
   - @design-ref/screens.md

2. Regarde tous les screenshots dans @design-ref/screenshots/.
   Ce sont les maquettes de référence. L'UI du site doit avoir
   exactement le même esprit visuel : crème + ink + orange,
   serif éditorial (Fraunces) + mono (JetBrains Mono),
   bordures 1.5px nettes, zéro border-radius sauf pills.

3. Confirme-moi en RÉSUMÉ :
   - La palette exacte (codes hex)
   - Les 4 familles de fonts et leur usage
   - Les composants atomiques clés que tu vas réutiliser
   - Les 5 pages prévues, dans l'ordre

4. Pose-moi 3 à 5 questions de clarification si quelque chose
   est ambigu (stack technique, assets, etc.).

5. N'écris AUCUN code à cette étape. Juste le résumé + questions.
```

---

## 📋 Prompt 1 — Setup du projet

```
On démarre le projet. Stack : Next.js 14 App Router. Style : Tailwind CSS + 
CSS variables (les tokens de @design-ref/tokens.css).

Ce que tu fais MAINTENANT :

1. Initialise le projet.
2. Installe les dépendances : tailwindcss, lucide-react, et les fonts Google.
3. Crée src/styles/tokens.css en COPIANT INTÉGRALEMENT @design-ref/tokens.css.
4. Configure tailwind.config.ts pour exposer les tokens en theme.extend.
5. Crée la page racine vide qui affiche "Nana Intelligence" en font-display 56px.

Confirme quand c'est fait.
```

---

## 📋 Prompt 2 — Composants atomiques

```
Crée les composants atomiques dans src/components/ui/ en suivant 
EXACTEMENT les specs de @design-ref/components.md.

Ordre :
  1. Button.tsx
  2. Tag.tsx
  3. Box.tsx
  4. Metric.tsx
  5. Field.tsx
  6. PageHeader.tsx

Montre-moi le code pour validation.
```

---

## 📋 Prompt 3 — Layout shell (SiteLayout)

```
Construis le layout principal du site dans src/components/layout/SiteLayout.tsx :

- Header avec navigation : Accueil, Services, À propos, Blog, Contact + Bouton "Audit Gratuit".
- Footer complet avec logo et liens.
- Main content area.

Vérifie que la navigation entre les pages fonctionne.
```

---

## 📋 Prompt 4+ — Pages (une par une)

```
On construit la page [NOM] (route /[path]).
Spec : @design-ref/screens.md section "[NOM]".

Réutilise les composants UI. Crée des données mockées crédibles.
```

**Ordre des pages :**
1. Accueil
2. Services
3. À propos
4. Blog
5. Contact
