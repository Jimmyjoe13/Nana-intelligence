# Composants atomiques — Nana Intelligence Website

> Cet inventaire est **fermé**. N'ajoute pas un nouveau composant sans demander. Si tu as besoin d'une variante, regarde si elle existe en `prop` avant de créer un nouveau composant.

---

## 1. `<Button>`

```jsx
<Button variant="primary">Demander un audit</Button>
<Button variant="ghost">En savoir plus</Button>
<Button variant="ink">Nos services</Button>
```

| Prop | Valeurs | Défaut | Note |
|---|---|---|---|
| `variant` | `primary` `ghost` `ink` | `primary` | primary = orange bg |
| `size` | `sm` `md` `lg` | `md` | |

**Style :**
- Bordure 1.5px `--ink` toujours
- Border-radius **0** (carré)
- Font : `--font-mono` 12px uppercase

---

## 2. `<Tag>`

```jsx
<Tag>Prospection</Tag>
<Tag variant="solid">B2B</Tag>
<Tag variant="orange">Nouveau</Tag>
```

- Pill (`border-radius: 999px`)
- Font `--font-mono` 11px uppercase

---

## 3. `<Metric>`

```jsx
<Metric label="RDV générés" value="250" suffix="+" />
<Metric label="Taux de conversion" value="12.4" suffix="%" />
```

---

## 4. `<Box>`

Conteneur de base pour les sections ou les cards.

```jsx
<Box>contenu</Box>
<Box variant="soft">fond secondaire</Box>
```

- Bordure 1.5px `--ink`, padding 24px par défaut, **pas** d'arrondi.

---

## 5. `<Header>` (navigation)

- Menu horizontal avec liens : ACCUEIL, SERVICES, À PROPOS, BLOG, CONTACT.
- Logo à gauche.
- CTA "Audit Gratuit" à droite.

---

## 6. `<PageHeader>`

```jsx
<PageHeader
  kicker="Nos expertises"
  title="Services de"
  emphasis="prospection"
  description="Découvrez comment nous pouvons vous aider à accélérer votre croissance."
/>
```

---

## 7. `<EmptyState>`

```jsx
<EmptyState
  title="Aucun article"
  description="Revenez plus tard pour lire nos derniers articles de blog."
  action={<Button>Retour à l'accueil</Button>}
/>
```
