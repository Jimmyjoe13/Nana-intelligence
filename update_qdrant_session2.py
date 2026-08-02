"""Update Qdrant — Wiring /plan mode + auto project context"""
import sys
sys.path.insert(0, r"C:\Users\jimmy\Projet\Nana-intelligence")

from qdrant_knowledge import (
    store_failure, store_fix, store_preference,
    store_project_fact, store_procedure, store_decision, store_context
)

# === FIX ===
store_fix(
    "Collection fantôme cea_qui_a_echoue dans Qdrant",
    "Supprimée via DELETE /collections/cea_qui_a_echoue. Collection vide (0 docs), doublon probable de ce_qui_a_echoue.",
    "8 collections restantes, toutes intactes",
    {"component": "qdrant"}
)

# === FACTS ===
store_project_fact("groq-code-cli", "Commande /plan implémentée",
    "planCommand dans dist/commands/definitions/plan.js. Toggle planMode via togglePlanMode(). Indicateur 📋 PLAN jaune dans la barre de statut. La bordure devient jaune en mode plan.")
store_project_fact("groq-code-cli", "Auto project context implémenté",
    "Module project-context.js lit README.md (2000 chars), package.json (name, desc, version, scripts, deps), .gitignore. Injecté dans system message via placeholder {{AUTO_CONTEXT}} au démarrage.")
store_project_fact("groq-code-cli", "planMode et togglePlanMode",
    "Ajoutés dans agent.js: this.planMode = false dans constructeur, togglePlanMode() méthode. Exposés dans useAgent.js (state React + callback).")
store_project_fact("groq-code-cli", "State React planMode",
    "useAgent.js: const [planMode, setPlanMode] = useState(false). togglePlanMode = useCallback appelle agent.togglePlanMode() et setPlanMode. Exporté dans le return du hook.")
store_project_fact("groq-code-cli", "Barre de statut PLAN",
    "Chat.js: borderColor = bypassMode ? 'red' : planMode ? 'yellow' : 'white'. Indicateur 📋 PLAN en jaune à côté de ⚠ BYPASS.")
store_project_fact("groq-code-cli", "Contexte handleSlashCommand étendu",
    "Chat.js handleSlashCommand reçoit maintenant: togglePlanMode, planMode, agent, toggleBypass, bypassMode, toggleReasoning, showReasoning, addMessage, clearHistory, setShowLogin, setShowModelSelector.")

# === PROCEDURES ===
store_procedure(
    "Ajouter un nouveau slash command à groq-code-cli",
    "1. Créer le fichier dans dist/commands/definitions/<name>.js\n"
    "2. Exporter { command, description, handler }\n"
    "3. Importer dans commands/index.js\n"
    "4. Ajouter au tableau availableCommands\n"
    "5. Si le handler a besoin de agent/toggleX : ajouter au contexte dans Chat.js (handleSlashCommand)\n"
    "6. Si state React nécessaire : ajouter dans useAgent.js (useState + useCallback + return)"
)

# === DECISIONS ===
store_decision(
    "Auto context via placeholder {{AUTO_CONTEXT}}",
    "Plutôt que de modifier buildDefaultSystemMessage dynamiquement",
    "Plus propre. Le system message est construit une fois au démarrage, le placeholder est remplacé une seule fois. Pas d'impact si aucun fichier projet trouvé (replace par empty string implicite)."
)

# === CONTEXT ===
store_context(
    "Groq Code CLI — Session 13 juin 2026 (partie 2)",
    "Nettoyage Qdrant (collection fantôme supprimée). Wiring /plan complet : planCommand, planMode, togglePlanMode, state React, indicateur 📋 PLAN. Auto project context : project-context.js lit README/package.json/.gitignore et injecte dans system message.",
    "high"
)

print("✅ Qdrant mis à jour — /plan mode + auto project context")
