"""
Qdrant Knowledge Base — Nana Intelligence
Auto-amélioration via stockage vectoriel des interactions.

Collections:
  ce_qui_a_echoue              : procédures/approches qui ont échoué
  correction_de_ce_qui_a_echoue : fix réussis pour ce qui a échoué
  user_preferences             : préférences de Jimmy (style, ton, habitudes)
  project_facts                : faits stables sur l'environnement (VPS, DNS, config)
  procedural_knowledge         : procédures qui marchent (playbooks réutilisables)
  decision_log                 : décisions prises et leur raisonnement
  context_memory               : contexte important entre sessions
"""

import json, hashlib, time
from typing import Optional
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, Distance, VectorParams
from fastembed import TextEmbedding

QDRANT_HOST = "localhost"
QDRANT_PORT = 6333
EMBED_MODEL = "BAAI/bge-small-en"  # 384 dims

_client: Optional[QdrantClient] = None
_embedder: Optional[TextEmbedding] = None


def get_client() -> QdrantClient:
    global _client
    if _client is None:
        _client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    return _client


def get_embedder() -> TextEmbedding:
    global _embedder
    if _embedder is None:
        _embedder = TextEmbedding(model_name=EMBED_MODEL)
    return _embedder


def embed_text(text: str) -> list[float]:
    vectors = list(get_embedder().embed([text]))
    return vectors[0].tolist()


def _make_id(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()


def _ensure_collection(name: str, size: int = 384):
    client = get_client()
    existing = [c.name for c in client.get_collections().collections]
    if name not in existing:
        client.create_collection(
            collection_name=name,
            vectors_config=VectorParams(size=size, distance=Distance.COSINE),
        )


def _upsert(collection: str, point_id: str, vector: list[float], payload: dict):
    client = get_client()
    payload["timestamp"] = time.time()
    client.upsert(
        collection_name=collection,
        points=[PointStruct(id=point_id, vector=vector, payload=payload)],
    )


def _search(collection: str, query: str, limit: int = 5) -> list[dict]:
    client = get_client()
    vector = embed_text(query)
    results = client.query_points(
        collection_name=collection,
        query=vector,
        limit=limit,
    )
    return [
        {
            "score": r.score,
            "id": r.id,
            **{k: v for k, v in r.payload.items() if k != "timestamp"},
            "timestamp": r.payload.get("timestamp", 0),
        }
        for r in results.points
    ]


# ══════════════════════════════════════════════════════════════════
#  1. CE QUI A ÉCHOUÉ
# ══════════════════════════════════════════════════════════════════

def store_failure(procedure: str, contexte: str, erreur: str,
                   metadata: Optional[dict] = None) -> str:
    _ensure_collection("ce_qui_a_echoue")
    text = f"PROCEDURE: {procedure}\nCONTEXTE: {contexte}\nERREUR: {erreur}"
    payload = {"procedure": procedure, "contexte": contexte, "erreur": erreur, "type": "failure"}
    if metadata:
        payload.update(metadata)
    pid = _make_id(text)
    _upsert("ce_qui_a_echoue", pid, embed_text(text), payload)
    return pid


def search_failures(query: str, limit: int = 5) -> list[dict]:
    return _search("ce_qui_a_echoue", query, limit)


# ══════════════════════════════════════════════════════════════════
#  2. CORRECTION DE CE QUI A ÉCHOUÉ
# ══════════════════════════════════════════════════════════════════

def store_fix(failure_procedure: str, correction: str, resultat: str,
              failure_id: Optional[str] = None, metadata: Optional[dict] = None) -> str:
    _ensure_collection("correction_de_ce_qui_a_echoue")
    text = f"FAILURE: {failure_procedure}\nFIX: {correction}\nRESULTAT: {resultat}"
    payload = {
        "failure_procedure": failure_procedure,
        "correction": correction,
        "resultat": resultat,
        "failure_id": failure_id,
        "type": "fix",
    }
    if metadata:
        payload.update(metadata)
    pid = _make_id(text)
    _upsert("correction_de_ce_qui_a_echoue", pid, embed_text(text), payload)
    return pid


def search_fixes(query: str, limit: int = 5) -> list[dict]:
    return _search("correction_de_ce_qui_a_echoue", query, limit)


# ══════════════════════════════════════════════════════════════════
#  3. PRÉFÉRENCES UTILISATEUR
# ══════════════════════════════════════════════════════════════════

def store_preference(category: str, preference: str, detail: str = "",
                      metadata: Optional[dict] = None) -> str:
    _ensure_collection("user_preferences")
    text = f"CATEGORY: {category}\nPREFERENCE: {preference}\nDETAIL: {detail}"
    payload = {"category": category, "preference": preference, "detail": detail, "type": "preference"}
    if metadata:
        payload.update(metadata)
    pid = _make_id(text)
    _upsert("user_preferences", pid, embed_text(text), payload)
    return pid


def search_preferences(query: str, limit: int = 5) -> list[dict]:
    return _search("user_preferences", query, limit)


# ══════════════════════════════════════════════════════════════════
#  4. FAITS PROJET
# ══════════════════════════════════════════════════════════════════

def store_project_fact(domaine: str, fait: str, source: str = "",
                        metadata: Optional[dict] = None) -> str:
    _ensure_collection("project_facts")
    text = f"DOMAINE: {domaine}\nFAIT: {fait}\nSOURCE: {source}"
    payload = {"domaine": domaine, "fait": fait, "source": source, "type": "project_fact"}
    if metadata:
        payload.update(metadata)
    pid = _make_id(text)
    _upsert("project_facts", pid, embed_text(text), payload)
    return pid


def search_project_facts(query: str, limit: int = 5) -> list[dict]:
    return _search("project_facts", query, limit)


# ══════════════════════════════════════════════════════════════════
#  5. CONNAISSANCE PROCÉDURALE (playbooks)
# ══════════════════════════════════════════════════════════════════

def store_procedure(nom: str, description: str, etapes: str,
                    metadata: Optional[dict] = None) -> str:
    _ensure_collection("procedural_knowledge")
    text = f"NOM: {nom}\nDESCRIPTION: {description}\nETAPES: {etapes}"
    payload = {
        "nom": nom,
        "description": description,
        "etapes": etapes,
        "type": "procedure",
        "usage_count": 0,
        "success_count": 0,
    }
    if metadata:
        payload.update(metadata)
    pid = _make_id(text)
    _upsert("procedural_knowledge", pid, embed_text(text), payload)
    return pid


def search_procedures(query: str, limit: int = 5) -> list[dict]:
    return _search("procedural_knowledge", query, limit)


# ══════════════════════════════════════════════════════════════════
#  6. LOG DE DÉCISIONS
# ══════════════════════════════════════════════════════════════════

def store_decision(contexte: str, decision: str, raisonnement: str,
                   metadata: Optional[dict] = None) -> str:
    _ensure_collection("decision_log")
    text = f"CONTEXTE: {contexte}\nDECISION: {decision}\nRAISONNEMENT: {raisonnement}"
    payload = {
        "contexte": contexte,
        "decision": decision,
        "raisonnement": raisonnement,
        "type": "decision",
    }
    if metadata:
        payload.update(metadata)
    pid = _make_id(text + str(time.time()))  # unique per decision
    _upsert("decision_log", pid, embed_text(text), payload)
    return pid


def search_decisions(query: str, limit: int = 5) -> list[dict]:
    return _search("decision_log", query, limit)


# ══════════════════════════════════════════════════════════════════
#  7. MÉMOIRE DE CONTEXTE
# ══════════════════════════════════════════════════════════════════

def store_context(sujet: str, resume: str, importance: str = "normal",
                  metadata: Optional[dict] = None) -> str:
    _ensure_collection("context_memory")
    text = f"SUJET: {sujet}\nRESUME: {resume}\nIMPORTANCE: {importance}"
    payload = {
        "sujet": sujet,
        "resume": resume,
        "importance": importance,
        "type": "context",
    }
    if metadata:
        payload.update(metadata)
    pid = _make_id(text)
    _upsert("context_memory", pid, embed_text(text), payload)
    return pid


def search_context(query: str, limit: int = 5) -> list[dict]:
    return _search("context_memory", query, limit)


# ══════════════════════════════════════════════════════════════════
#  UTILITIES
# ══════════════════════════════════════════════════════════════════

def get_stats() -> dict:
    client = get_client()
    stats = {}
    for c in client.get_collections().collections:
        info = client.get_collection(c.name)
        stats[c.name] = {
            "points": info.points_count,
            "vector_size": info.config.params.vectors.size,
        }
    return stats


def list_collection(collection: str, limit: int = 50) -> list[dict]:
    client = get_client()
    result = client.scroll(
        collection_name=collection, limit=limit,
        with_payload=True, with_vectors=False,
    )
    return [
        {"id": p.id, **{k: v for k, v in p.payload.items()}}
        for p in result[0]
    ]


def seed_initial_data():
    """Charge les connaissances de la session actuelle."""
    import sys
    sys.path.insert(0, ".")

    # --- Préférences utilisateur ---
    store_preference("communication", "Réponses en français, tutoiement, décontracté mais pro",
                     "Jimmy préfère les réponses courtes et denses, pas de remplissage inutile.")
    store_preference("communication", "Rapports avec tableaux et emojis",
                     "Aime les ✅/🚧, les tableaux, les arbres ASCII.")
    store_preference("workflow", "Exécution immédiate",
                     "Jimmy dit 'fais-le' → exécuter, pas expliquer comment faire.")
    store_preference("workflow", "Safety-conscious",
                     "Confirmer avant restart/rm. Pas de commande destructive sans accord.")
    store_preference("workflow", "SSH avec sshpass bloquant",
                     "Les commandes SSH avec sshpass+heredoc sont bloquées par sécurité. Préférer docker cp ou sudo sur host.")
    store_preference("environnement", "Vérifier avant d'agir",
                     "Jimmy ne comprend pas toujours ce qu'on fait. Si l'action n'a pas de sens pour lui, il demande.")

    # --- Faits projet ---
    store_project_fact("hébergement", "Site principal hebergé sur GitHub Pages",
                       "Le domaine nana-intelligence.fr pointe vers GitHub Pages. Caddy ne gere pas le site principal.")
    store_project_fact("hébergement", "Caddy ne gere que les sous-domaines",
                       "n8n.nana-intelligence.fr, crm.nana-intelligence.fr, api2.nana-intelligence.fr")
    store_project_fact("VPS", "IP publique: 51.38.99.226",
                       "Serveur Ubuntu 22.04, jimmy@gps-e61ae094")
    store_project_fact("VPS", "Hebergeur: OVH",
                       "Serveur commandé sur le compte OVH de Jimmy")
    store_project_fact("Caddy", "Caddyfile bind-monte depuis /opt/caddy/config/Caddyfile",
                       "Necessaire sudo pour modifier. docker cp ne marche pas sur bind-mount.")
    store_project_fact("Caddy", "docker restart > caddy reload",
                       "caddy reload garde en cache, docker restart force la relecture")
    store_project_fact("Next.js", "Build statique avec output: export",
                       "Build Next.js genere du HTML statique, pas de runtime Node.js. Deploy via GitHub Pages.")
    store_project_fact("ToIP", "Interface d administration sur le VPS",
                       "Permet de verifier que tout tourne")
    store_project_fact("Docker", "Container caddy expose ports 80/443",
                       "Container caddy : ports 80 et 443 exposes sur l host.")
    store_project_fact("Docker", "Container qdrant expose port 6333",
                       "qdrant accessible sur localhost:6333.")
    store_project_fact("Docker", "Docker compose sur le VPS",
                       "Fichier docker-compose.yml dans /home/jimmy/ avec caddy, n8n, crm, qdrant.")
    store_project_fact("GP", "Utilisateur non-root sans acces sudo",
                       "Certains repertoires comme /opt/caddy/config/ appartiennent a root. Necessaire sudo pour modifier Caddyfile.")
    store_project_fact("Sûreté", "Certains fichiers critiques proteges par root",
                       "Les fichiers de config systeme sont root-only dans le dossier /opt/caddy/config/.")

    # --- Procédures qui marchent ---
    store_procedure(
        "Modifier Caddyfile",
        "Modifier le Caddyfile bind-monté et recharger Caddy",
        "1. sudo bash -c 'cat > /opt/caddy/config/Caddyfile << ENDCFG\n<contenu>\nENDCFG'\n2. docker restart caddy\n3. docker logs caddy --tail 20"
    )
    store_procedure(
        "Deploiement site principal",
        "Deployer les modifications du site sur GitHub Pages",
        "1. git add <fichiers>\n2. git commit -m 'description'\n3. git push origin main\n4. GitHub Pages deploie automatiquement"
    )
    store_procedure(
        "Copier fichiers dans container Docker",
        "Copier des fichiers-host vers/depuis un container Docker",
        "1. Create fichier sur host : cat > /tmp/fichier << ENDCFG\n<contenu>\nENDCFG\n2. Copier : docker cp /tmp/fichier <container>:/chemin/dest"
    )
    store_procedure(
        "Verifier Caddy",
        "Verifier la config Caddy et les logs",
        "1. docker exec caddy cat /etc/caddy/Caddyfile\n2. docker exec caddy cat /etc/caddy/Caddyfile | head -20\n3. docker logs caddy --tail 30"
    )

    # --- Décisions ---
    store_decision(
        "Site heberge sur GitHub Pages, ajouter un block Caddy pour le domaine principal",
        "Ne pas ajouter de block Caddy pour le site principal",
        "GitHub Pages sert deja le site principal. Caddy ne doit gerer que les sous-domaines. Ajouter un block Caddy est inutile et cree des conflits DNS."
    )
    store_decision(
        "Pour resoudre le probleme GA4 duplicate (/chemin/ vs /chemin/index.html)",
        "Ajouter un script client-side de redirection 301 dans le layout Next.js",
        "On ne peut pas configurer GitHub Pages pour rediriger. Un script beforeInteractive dans le layout Next.js redirige /index.html vers / avant le rendu de la page. C'est la seule option viable."
    )

    # --- Mémoire de contexte ---
    store_context(
        "Audit SEO nana-intelligence.fr",
        "Audit SEO complet realise le 13 juin 2026. Meta descriptions optimisees pour CTR sur toutes les pages. Sitemap et robots.txt generes. Build passe 18/18 pages.",
        "high"
    )
    store_context(
        "Protection spider.nana-intelligence.fr",
        "Blocks spider et spider-api supprimes du Caddyfile. UFW a configurer pour bloquer les ports 3010/8010 au public (acces IP 37.167.33.165 seulement).",
        "high"
    )
    store_context(
        "Deploiement Caddyfile simplifie",
        "Le Caddyfile ne contient plus que 3 blocks : n8n, crm, api2. Plus de blocks spider. Plus de block pour le site principal (GitHub Pages). Fichier data/envoye sur GitHub.",
        "high"
    )

    print("=== Initial data seeded ===")
    print(json.dumps(get_stats(), indent=2))


if __name__ == "__main__":
    seed_initial_data()
