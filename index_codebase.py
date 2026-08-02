# /// script
# dependencies = [
#   "qdrant-client",
#   "fastembed",
# ]
# ///

import os
import glob
import uuid
import sys
from typing import List, Dict, Any, Set
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, Distance, VectorParams, Filter, FieldCondition, MatchValue
from fastembed import TextEmbedding

# Configuration
QDRANT_URL = "http://127.0.0.1:6333"
QDRANT_API_KEY = "95ANdb1UnItDcc10bbHFLlqXqfk5daqYcr3qckOKDZg"
COLLECTION_NAME = "codebase_knowledge"
EMBED_MODEL = "BAAI/bge-small-en"  # Modèle 384 dimensions partagé

# Répertoires de projets à indexer par défaut
PROJECT_ROOTS = [
    "C:\\Users\\jimmy\\Projet\\Nana-intelligence",
    "C:\\Users\\jimmy\\Projet\\crm_ultimate"
]

# Extensions de fichiers de code à indexer
ALLOWED_EXTENSIONS = {'.py', '.ts', '.js', '.json', '.md', '.html', '.css', '.mjs', '.sql'}

# Dossiers à exclure absolument
EXCLUDE_DIRS = {
    'node_modules', '.next', '__pycache__', '.git', 'venv', '.venv', 
    'dist', 'build', 'out', 'npm-cache', 'cache', '.wrangler'
}

def check_qdrant_connection(client: QdrantClient) -> bool:
    """Vérifie si l'instance Qdrant est accessible."""
    try:
        client.get_collections()
        return True
    except Exception as e:
        print(f"Erreur de connexion à Qdrant ({QDRANT_URL}) : {e}")
        print("-> Assurez-vous que votre tunnel SSH est ouvert.")
        return False

def get_language(extension: str) -> str:
    """Détermine le langage à partir de l'extension de fichier."""
    ext_map = {
        '.py': 'python',
        '.ts': 'typescript',
        '.js': 'javascript',
        '.mjs': 'javascript',
        '.json': 'json',
        '.md': 'markdown',
        '.html': 'html',
        '.css': 'css',
        '.sql': 'sql'
    }
    return ext_map.get(extension, 'text')

def chunk_code(text: str, chunk_size: int = 1000, overlap: int = 150) -> List[str]:
    """Découpe du code source par blocs de caractères avec chevauchement."""
    # Découpage simple mais robuste par blocs
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        if end >= len(text):
            chunks.append(text[start:])
            break
        
        # Tente de trouver un retour à la ligne pour couper proprement
        last_newline = text.rfind("\n", start, end)
        if last_newline > start + (chunk_size // 2):
            chunks.append(text[start:last_newline])
            start = last_newline + 1
        else:
            chunks.append(text[start:end])
            start = end - overlap
            
    return chunks

def scan_project_files(project_path: str) -> List[Dict[str, Any]]:
    """Scanne récursivement les fichiers de code pertinents d'un projet."""
    project_files = []
    project_name = os.path.basename(project_path)
    
    for root, dirs, files in os.walk(project_path):
        # Modification in-place de dirs pour exclure récursivement les répertoires système
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            _, ext = os.path.splitext(file)
            if ext.lower() in ALLOWED_EXTENSIONS:
                file_path = os.path.join(root, file)
                try:
                    rel_path = os.path.relpath(file_path, project_path)
                    project_files.append({
                        "file_path": file_path,
                        "relative_path": rel_path,
                        "file_name": file,
                        "project_name": project_name,
                        "language": get_language(ext.lower()),
                        "mtime": os.path.getmtime(file_path)
                    })
                except Exception as e:
                    print(f"Erreur lors du scan du fichier {file_path} : {e}")
                    
    return project_files

def get_indexed_code_metadata(client: QdrantClient) -> Dict[str, float]:
    """Récupère les dates de modification (mtime) des fichiers déjà indexés dans Qdrant."""
    indexed_files = {}
    limit = 100
    offset = None
    
    try:
        while True:
            records, offset = client.scroll(
                collection_name=COLLECTION_NAME,
                limit=limit,
                offset=offset,
                with_payload=["file_path", "project_name", "file_mtime"],
                with_vectors=False
            )
            
            for record in records:
                payload = record.payload
                if payload and "file_path" in payload and "project_name" in payload and "file_mtime" in payload:
                    # La clé unique est composée du nom du projet et du chemin relatif du fichier
                    key = f"{payload['project_name']}/{payload['file_path']}"
                    mtime = payload["file_mtime"]
                    if key not in indexed_files or mtime > indexed_files[key]:
                        indexed_files[key] = mtime
            
            if offset is None:
                break
    except Exception as e:
        print(f"Avertissement lors de la récupération des métadonnées existantes : {e}")
        
    return indexed_files

def delete_project_file_points(client: QdrantClient, project_name: str, file_path: str) -> int:
    """Supprime les anciens points d'un fichier de code spécifique dans Qdrant."""
    try:
        client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(key="project_name", match=MatchValue(value=project_name)),
                    FieldCondition(key="file_path", match=MatchValue(value=file_path))
                ]
            )
        )
        return 1
    except Exception as e:
        print(f"Erreur lors de la suppression des points pour {project_name}/{file_path} : {e}")
        return 0

def index_codebase():
    print(f"--- Démarrage de l'indexation de la Base de Code ---")
    
    # 1. Connexion Client Qdrant
    client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
    if not check_qdrant_connection(client):
        sys.exit(1)
        
    # 2. Création de la collection si inexistante
    collections_response = client.get_collections()
    existing_collections = [c.name for c in collections_response.collections]
    
    if COLLECTION_NAME not in existing_collections:
        print(f"Création de la collection '{COLLECTION_NAME}' (384 dimensions, Cosine)...")
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE)
        )
        
    # 3. Récupération des métadonnées existantes dans Qdrant
    print("Récupération de l'index des fichiers de code existants...")
    qdrant_files = get_indexed_code_metadata(client)
    print(f"Trouvé {len(qdrant_files)} fichiers de code déjà indexés.")
    
    # 4. Scan de tous les projets locaux configurés
    all_local_files = []
    local_rel_keys = set()  # Identifiant unique: project_name/relative_path
    
    for project_path in PROJECT_ROOTS:
        if not os.path.exists(project_path):
            print(f"Avertissement : Le dossier projet {project_path} n'existe pas. Ignoré.")
            continue
            
        print(f"Scan du projet : {project_path}...")
        proj_files = scan_project_files(project_path)
        all_local_files.extend(proj_files)
        
        for f in proj_files:
            local_rel_keys.add(f"{f['project_name']}/{f['relative_path']}")
            
    print(f"Total fichiers de code locaux scannés : {len(all_local_files)}")
    
    files_to_index = []
    files_to_delete = []
    
    # Détection des ajouts et modifications
    for file_meta in all_local_files:
        key = f"{file_meta['project_name']}/{file_meta['relative_path']}"
        
        if key not in qdrant_files:
            files_to_index.append((file_meta, "Nouveau"))
        elif file_meta["mtime"] > qdrant_files[key]:
            files_to_index.append((file_meta, "Modifié"))
            
    # Détection des suppressions physiques
    for key in qdrant_files.keys():
        if key not in local_rel_keys:
            # Séparation de project_name/relative_path
            parts = key.split("/", 1)
            if len(parts) == 2:
                files_to_delete.append((parts[0], parts[1]))
                
    print(f"\n--- Bilan du Delta Code ---")
    print(f"  Fichiers de code inchangés (ignorés) : {len(local_rel_keys) - len(files_to_index)}")
    print(f"  Fichiers de code à indexer (nouveaux/modifiés) : {len(files_to_index)}")
    print(f"  Fichiers de code supprimés (à purger) : {len(files_to_delete)}")
    print("-----------------------\n")
    
    # 5. Purge des fichiers supprimés
    if files_to_delete:
        print("Purge des fichiers de code supprimés dans Qdrant...")
        for project_name, rel_path in files_to_delete:
            delete_project_file_points(client, project_name, rel_path)
            print(f"  Purgé : {project_name}/{rel_path}")
            
    if not files_to_index:
        print("Rien à indexer. Les bases de code sont à jour.")
        collection_info = client.get_collection(COLLECTION_NAME)
        print(f"\nStatut final : {collection_info.points_count} points de code actifs.")
        return
        
    # 6. Chargement du modèle d'embedding
    print(f"Chargement du modèle d'embedding {EMBED_MODEL}...")
    embed_model = TextEmbedding(model_name=EMBED_MODEL)
    
    all_chunks = []
    all_payloads = []
    
    # Préparation des chunks
    for file_meta, reason in files_to_index:
        file_path = file_meta["file_path"]
        rel_path = file_meta["relative_path"]
        project_name = file_meta["project_name"]
        
        try:
            if reason == "Modifié":
                delete_project_file_points(client, project_name, rel_path)
                
            with open(file_path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
                
            if not content.strip():
                continue
                
            code_chunks = chunk_code(content)
            
            for idx, chunk in enumerate(code_chunks):
                all_chunks.append(chunk)
                all_payloads.append({
                    "text": chunk,
                    "file_path": rel_path,
                    "file_name": file_meta["file_name"],
                    "project_name": project_name,
                    "language": file_meta["language"],
                    "chunk_index": idx,
                    "total_chunks": len(code_chunks),
                    "file_mtime": file_meta["mtime"]
                })
        except Exception as e:
            print(f"  Erreur de traitement pour {project_name}/{rel_path} : {e}")
            
    if not all_chunks:
        print("Aucun nouveau code à indexer.")
        return
        
    # 7. Indexation par lots (batches)
    batch_size = 64
    total_points = len(all_chunks)
    print(f"\nGénération de {total_points} embeddings de code et envoi par lots de {batch_size}...")
    
    for i in range(0, total_points, batch_size):
        batch_chunks = all_chunks[i:i + batch_size]
        batch_payloads = all_payloads[i:i + batch_size]
        
        vectors = list(embed_model.embed(batch_chunks))
        
        points = []
        for idx, (vector, payload) in enumerate(zip(vectors, batch_payloads)):
            # ID unique déterministe basé sur le projet, fichier et index de chunk
            point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"code_{payload['project_name']}_{payload['file_path']}_{payload['chunk_index']}"))
            points.append(PointStruct(
                id=point_id,
                vector=vector.tolist(),
                payload=payload
            ))
            
        client.upsert(
            collection_name=COLLECTION_NAME,
            points=points
        )
        print(f"  Indexé {min(i + batch_size, total_points)} / {total_points} points...")
        
    print("\n--- Indexation de la base de code terminée avec succès ! ---")
    
    # Audit final
    collection_info = client.get_collection(COLLECTION_NAME)
    print(f"Statut final de la collection '{COLLECTION_NAME}':")
    print(f"  Nombre total de points de code actifs : {collection_info.points_count}")
    print(f"  Statut : {collection_info.status}")

if __name__ == "__main__":
    index_codebase()
