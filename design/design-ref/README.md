# design-ref · Nana Intelligence Website

Dossier de référence design pour le site web B2B de Nana Intelligence. Tout agent (Gemini CLI, Claude Code, autre) DOIT lire ce dossier **avant** d'écrire la moindre ligne de UI.

## Contenu

```
design-ref/
├── README.md          ← ce fichier
├── SPEC.md            ← le brief design (à lire en premier)
├── tokens.css         ← variables CSS canoniques (couleurs, fonts, spacing)
├── components.md      ← inventaire des composants atomiques + exemples
├── screens.md         ← liste des pages du site web + structure attendue
├── PROMPT.md          ← le prompt initial à donner à l'agent CLI
└── screenshots/       ← visuels des maquettes (référence visuelle)
    ├── page-agence.png
    ├── page-services.png
    ├── page-about.png
    ├── page-blog.png
    └── page-contact.png
```

## Ordre de lecture conseillé pour l'agent

1. `SPEC.md` — comprendre la philosophie et les règles
2. `tokens.css` — connaître les valeurs exactes
3. `components.md` — savoir quelles primitives utiliser
4. `screens.md` — connaître la structure des pages à produire
5. `screenshots/` — voir le rendu visuel cible

## Direction retenue

**Direction 01 — "Editorial Data"** (crème + ink + orange, serif éditorial + data widgets). C'est cette direction qui sert de référence pour l'UI du site web B2B.

L'objectif est d'avoir un site web axé sur la conversion et la génération de leads, avec un design précis, direct et professionnel.
