"""
Script d'update Qdrant — Session Groq Code CLI Pro
Injecte les nouvelles connaissances de cette session.
"""
import sys, os
sys.path.insert(0, r"C:\Users\jimmy\Projet\Nana-intelligence")

from qdrant_knowledge import (
    store_failure, store_fix, store_preference,
    store_project_fact, store_procedure, store_decision,
    store_context, get_stats
)
import json

print("=== Mise à jour Qdrant — Groq Code CLI Pro ===\n")

# ═══════════════════════════════════════════════════
# FAILURES — Ce qui a cassé
# ═══════════════════════════════════════════════════

store_failure(
    "tool-schemas.js — ALL_TOOL_SCHEMAS référence des schemas non-initialisés",
    "Les nouveaux schemas (GIT_OPERATIONS_SCHEMA, etc.) étaient définis APRÈS le tableau ALL_TOOL_SCHEMAS qui les référence. ESM hoisting ne s'applique pas aux export const — erreur 'Cannot access before initialization'.",
    "ReferenceError: Cannot access 'GIT_OPERATIONS_SCHEMA' before initialization at tool-schemas.js:345",
    {"component": "groq-code-cli", "fix": "Déplacer ALL_TOOL_SCHEMAS + registres à la fin du fichier, après toutes les définitions de schemas"}
)

store_failure(
    "patch tool — old_string dupliqué dans le fichier",
    "Quand old_string apparaît plusieurs fois dans un fichier, patch(mode='replace') échoue silencieusement ou remplace la mauvaise occurrence.",
    "Patch échoue avec 'Could not find a match' ou remplace le mauvais bloc",
    {"component": "hermes-tools", "fix": "Ajouter plus de contexte autour de old_string, ou utiliser replace_all=True, ou mode='patch' V4A"}
)

store_failure(
    "agent.js — double fermeture } après patch system message",
    "Le patch a ajouté un } en plus, causant une SyntaxError 'Unexpected token' au démarrage du CLI.",
    "SyntaxError: Unexpected token '{' at agent.js:118",
    {"component": "groq-code-cli", "fix": "Supprimer le } en trop. Toujours vérifier la syntaxe après patch."}
)

# ═══════════════════════════════════════════════════
# FIXES — Ce qui a marché
# ═══════════════════════════════════════════════════

store_fix(
    "ALL_TOOL_SCHEMAS référence des schemas non-initialisés",
    "Déplacer le tableau ALL_TOOL_SCHEMAS + SAFE_TOOLS + APPROVAL_REQUIRED_TOOLS + DANGEROUS_TOOLS à la fin du fichier tool-schemas.js, après toutes les définitions de schemas",
    "CLI démarre sans erreur — 9/9 tests passent",
    {"component": "groq-code-cli"}
)

store_fix(
    "Double } dans agent.js après patch",
    "Supprimer le } en trop à la ligne 117. Le patch avait dupliqué la fermeture de méthode.",
    "Syntax OK — lint passe",
    {"component": "groq-code-cli"}
)

# ═══════════════════════════════════════════════════
# PRÉFÉRENCES — Appris sur cette session
# ═══════════════════════════════════════════════════

store_preference("groq-code-cli", "Mode bypass total implémenté",
                 "/bypass on|off — court-circuit complet de la logique d'approbation. Indicateur ⚠ BYPASS rouge dans la barre de statut.")
store_preference("groq-code-cli", "Streaming token-by-token",
                 "stream: true avec accumulation SSE + onThinkingText() à chaque chunk. streamingMessageIdRef pour update en place.")
store_preference("groq-code-cli", "max_tokens 32000",
                 "Augmenté de 8000 à 32000 pour les tâches complexes.")
store_preference("groq-code-cli", "Context trim",
                 "Auto-trim des vieux messages à 80% de la fenêtre contextuelle. Garde system messages + derniers messages.")
store_preference("groq-code-cli", "Multi-agents orchestration",
                 "spawn_agent avec 3 tiers: fast (llama-3.3-70b), balanced (kimi-k2), smart (qwen-3-235b)")
store_preference("groq-code-cli", "Project memory",
                 "read_memory / write_memory via .groq/memory.md. Modes: append, prepend, replace, section_replace.")
store_preference("groq-code-cli", "Nouveaux outils",
                 "git_operations (19 sous-commandes), web_fetch (GET/POST/PUT/DELETE, 50KB max), multi_edit (N edits séquentiels)")
store_preference("groq-code-cli", "/plan mode",
                 "Toggle plan mode — l'agent analyse et planifie AVANT d'exécuter les outils")

# ═══════════════════════════════════════════════════
# FAITS PROJET — Groq Code CLI
# ═══════════════════════════════════════════════════

store_project_fact("groq-code-cli", "Installation globale npm",
                   "groq-code-cli@1.0.2 installé dans C:\\Users\\jimmy\\AppData\\Roaming\\npm\\node_modules\\groq-code-cli\\")
store_project_fact("groq-code-cli", "Backup avant modifications",
                   "Backup complet dans C:\\Users\\jimmy\\groq-code-cli-backup\\dist\\")
store_project_fact("groq-code-cli", "Architecture ESM",
                   "Le projet utilise des modules ESM (import/export). Les export const sont hoisted mais pas initialisés avant déclaration.")
store_project_fact("groq-code-cli", "Outils totaux après modifications",
                   "14 outils: read_file, create_file, edit_file, multi_edit, delete_file, list_files, search_files, execute_command, git_operations, web_fetch, create_tasks, update_tasks, spawn_agent, read_memory, write_memory")
store_project_fact("groq-code-cli", "Safe tools (auto-execute)",
                   "read_file, list_files, search_files, create_tasks, update_tasks, web_fetch, read_memory")
store_project_fact("groq-code-cli", "Approval-required tools",
                   "create_file, edit_file, multi_edit, git_operations, write_memory, spawn_agent")
store_project_fact("groq-code-cli", "Dangerous tools (always require approval)",
                   "delete_file, execute_command")

# ═══════════════════════════════════════════════════
# PROCÉDURES — Playbooks de cette session
# ═══════════════════════════════════════════════════

store_procedure(
    "Patcher groq-code-cli sans casser",
    "Workflow safe pour modifier le CLI",
    "1. Vérifier la syntaxe actuelle: node -e \"require('...')\" ou npx groq-code-cli --help\n2. Créer backup: cp -r dist/ dist-backup/\n3. Lire le fichier COMPLET avant de patcher (pas de offset/limit)\n4. Patcher avec contexte suffisant (old_string unique)\n5. Vérifier lint après chaque patch\n6. Tester: npx groq-code-cli --help\n7. Si erreur, restaurer depuis backup"
)

store_procedure(
    "Ajouter un nouveau tool à groq-code-cli",
    "Checklist pour ajouter un outil",
    "1. Créer le schema dans tool-schemas.js (AVANT ALL_TOOL_SCHEMAS)\n2. Ajouter le nom dans ALL_TOOL_SCHEMAS\n3. Ajouter dans SAFE_TOOLS ou APPROVAL_REQUIRED_TOOLS\n4. Implémenter la fonction dans tools.js\n5. Enregistrer dans TOOL_REGISTRY\n6. Ajouter le case dans le switch de executeTool\n7. Ajouter les params dans formatToolParams\n8. Mettre à jour le system message dans agent.js\n9. Tester: npx groq-code-cli --help"
)

store_procedure(
    "Debug 'Cannot access before initialization' en ESM",
    "Résoudre les erreurs d'ordre de déclaration ESM",
    "1. Identifier la variable référencée avant sa définition\n2. Déplacer la définition AVANT la référence\n3. Pour les tableaux de schemas: mettre le tableau à la FIN du fichier\n4. Vérifier qu'il n'y a pas de dépendances circulaires\n5. Tester: node --check fichier.js ou npx groq-code-cli --help"
)

# ═══════════════════════════════════════════════════
# DÉCISIONS
# ═══════════════════════════════════════════════════

store_decision(
    "Ajouter 5 nouveaux outils à groq-code-cli",
    "Ajouter git_operations, web_fetch, multi_edit, spawn_agent, read_memory, write_memory",
    "Pour rivaliser avec Claude Code, groq-code-cli a besoin d'outils de git, web, orchestration multi-agents, et mémoire projet. Ces outils couvrent 90% des cas d'usage de Claude Code."
)

store_decision(
    "Déplacer ALL_TOOL_SCHEMAS à la fin de tool-schemas.js",
    "Plutôt que de déplacer chaque nouveau schema avant ALL_TOOL_SCHEMAS",
    "Plus propre et maintenable. Tous les schemas sont définis en premier, les tableaux de registres à la fin. Pas de problème d'ordre."
)

store_decision(
    "spawn_agent utilise le même Agent class",
    "Le sous-agent est une instance Agent créée dynamiquement avec import()",
    "Pas de processus séparé — tout dans le même process Node.js. Plus simple, pas de IPC. Le sous-agent partage le même event loop."
)

# ═══════════════════════════════════════════════════
# CONTEXTE
# ═══════════════════════════════════════════════════

store_context(
    "Groq Code CLI Pro — Session de transformation",
    "Session du 13 juin 2026. Transformation majeure de groq-code-cli v1.0.2:\n"
    "- Mode bypass total (/bypass)\n"
    "- Streaming token-by-token\n"
    "- max_tokens 32k\n"
    "- Context trim\n"
    "- 6 nouveaux outils (git, web_fetch, multi_edit, spawn_agent, read_memory, write_memory)\n"
    "- /plan mode\n"
    "- System message mis à jour\n"
    "Fichiers modifiés: agent.js, tool-schemas.js, tools.js, useAgent.js, Chat.js, MessageHistory.js, commands/index.js, bypass.js, plan.js",
    "high"
)

store_context(
    "Erreurs rencontrées et résolues",
    "1. ReferenceError GIT_OPERATIONS_SCHEMA: schemas référencés avant définition → déplacer ALL_TOOL_SCHEMAS à la fin\n"
    "2. SyntaxError double }: patch a ajouté } en trop → supprimer le doublon\n"
    "3. patch tool old_string dupliqué: utiliser plus de contexte ou replace_all",
    "high"
)

# ═══════════════════════════════════════════════════
# RÉSULTAT
# ═══════════════════════════════════════════════════

print("\n=== Update terminé ===")
print(json.dumps(get_stats(), indent=2))
