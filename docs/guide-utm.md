# 🔗 Guide UTM — Nana Intelligence

## Pourquoi utiliser des UTM ?

Actuellement, **93% du trafic est classé "Direct"** dans GA4 — ce qui signifie que la source réelle n'est pas identifiée. Les UTM permettent de tracer précisément l'origine de chaque clic.

## Convention de nommage

| Paramètre | Valeur | Exemple |
|:---|:---|:---|
| `utm_source` | Plateforme d'origine | `linkedin`, `instagram`, `malt`, `email` |
| `utm_medium` | Type de canal | `social`, `referral`, `cold-email`, `newsletter` |
| `utm_campaign` | Nom de la campagne | `prospection-juillet-2026`, `post-lead-gen` |
| `utm_content` | Variante (optionnel) | `cta-header`, `lien-bio`, `signature-email` |

## Liens prêts à l'emploi

### LinkedIn (profil/posts)
```
https://nana-intelligence.fr/contact/?utm_source=linkedin&utm_medium=social&utm_campaign=profil-linkedin&utm_content=lien-bio
```

### Instagram (@jimmy_growth13)
```
https://nana-intelligence.fr/contact/?utm_source=instagram&utm_medium=social&utm_campaign=profil-instagram&utm_content=lien-bio
```

### Malt (profil freelance)
```
https://nana-intelligence.fr/contact/?utm_source=malt&utm_medium=referral&utm_campaign=profil-malt
```

### Signature email
```
https://nana-intelligence.fr/?utm_source=email&utm_medium=signature&utm_campaign=signature-jimmy
```

### Campagnes Cold Email (template)
```
https://nana-intelligence.fr/contact/?utm_source=cold-email&utm_medium=email&utm_campaign=CAMPAGNE_NOM&utm_content=sequence-1
```

### Newsletter
```
https://nana-intelligence.fr/blog/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter-YYYY-MM-DD
```

## Règles strictes

1. **Toujours en minuscules** — GA4 est case-sensitive
2. **Tirets** au lieu d'espaces — `ma-campagne` pas `ma campagne`
3. **Pas d'accents** — `aix-en-provence` pas `aix-en-provence` avec accent
4. **Trailing slash** — Toujours terminer l'URL par `/` avant les `?utm_`
5. **Tester avant d'envoyer** — Coller l'URL dans le navigateur pour vérifier

## Vérification dans GA4

1. Aller dans **Rapports > Acquisition > Sources de trafic**
2. Dimension : `Source / Medium`
3. Filtrer par la campagne

> Les UTM mettent environ **24-48h** à apparaître dans GA4.
