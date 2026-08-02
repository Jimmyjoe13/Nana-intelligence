# /// script
# dependencies = [
#   "qdrant-client",
#   "fastembed",
# ]
# ///

import os
import glob
import uuid
import re
import sys
from typing import List, Dict, Any, Set
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, Distance, VectorParams, Filter, FieldCondition, MatchValue
from fastembed import TextEmbedding

# Configuration
QDRANT_URL = "http://127.0.0.1:6333"
QDRANT_API_KEY = "95ANdb1UnItDcc10bbHFLlqXqfk5daqYcr3qckOKDZg"
COLLECTION_NAME = "obsidian_knowledge"
VAULT_PATH = "C:\\Obsidian\\Jimmy"
EMBED_MODEL = "BAAI/bge-small-en"  # 384 dimensions

def check_qdrant_connection(client: QdrantClient) -> bool:
    """Vérifie si l'instance Qdrant est accessible."""
    try:
        client.get_collections()
        return True
    except Exception as e:
        print(f"Erreur de connexion à Qdrant ({QDRANT_URL}) : {e}")
        print("-> Assurez-vous que votre tunnel SSH est ouvert sur le port 6333.")
        return False

def clean_markdown(text: str) -> str:
    """Nettoie sommairement le Markdown pour un meilleur embedding (retrait frontmatter)."""
    text = re.sub(r"^---[\s\S]+?---", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()

def chunk_text(text: str, chunk_size: int = 800, overlap: int = 100) -> List[str]:
    """Découpe un texte en morceaux sémantiques avec chevauchement."""
    paragraphs = text.split("\n\n")
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
            
        if len(current_chunk) + len(para) <= chunk_size:
            current_chunk += para + "\n\n"
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            if len(para) > chunk_size:
                words = para.split(" ")
                sub_chunk = ""
                for word in words:
                    if len(sub_chunk) + len(word) <= chunk_size:
                        sub_chunk += word + " "
                    else:
                        chunks.append(sub_chunk.strip())
                        sub_chunk = word + " "
                current_chunk = sub_chunk
            else:
                current_chunk = para + "\n\n"
                
    if current_chunk:
        chunks.append(current_chunk.strip())
        
    return chunks

def get_markdown_files(vault_path: str) -> List[str]:
    """Récupère récursivement tous les fichiers Markdown du vault."""
    search_pattern = os.path.join(vault_path, "**", "*.md")
    return glob.glob(search_pattern, recursive=True)

def get_indexed_files_metadata(client: QdrantClient) -> Dict[str, float]:
    """Récupère la liste des fichiers déjà indexés dans Qdrant avec leur mtime maximal."""
    indexed_files = {}
    limit = 100
    offset = None
    
    try:
        while True:
            # Récupère les points par scroll (sans charger les vecteurs pour être ultra rapide)
            records, offset = client.scroll(
                collection_name=COLLECTION_NAME,
                limit=limit,
                offset=offset,
                with_payload=["file_path", "file_mtime"],
                with_vectors=False
            )
            
            for record in records:
                payload = record.payload
                if payload and "file_path" in payload and "file_mtime" in payload:
                    file_path = payload["file_path"]
                    mtime = payload["file_mtime"]
                    # On garde le mtime maximal trouvé pour ce fichier
                    if file_path not in indexed_files or mtime > indexed_files[file_path]:
                        indexed_files[file_path] = mtime
            
            if offset is None:
                break
    except Exception as e:
        print(f"Avertissement lors de la récupération des métadonnées existantes : {e}")
        
    return indexed_files

def delete_file_points(client: QdrantClient, file_path: str) -> int:
    """Supprime tous les points associés à un fichier spécifique dans Qdrant."""
    try:
        result = client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="file_path",
                        match=MatchValue(value=file_path)
                    )
                ]
            )
        )
        return 1
    except Exception as e:
        print(f"Erreur lors de la suppression des anciens points pour {file_path} : {e}")
        return 0

def index_vault():
    print(f"--- Démarrage de la synchronisation incrémentale du Vault ({VAULT_PATH}) ---")
    
    # 1. Connexion Client
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
    
    # 3. Récupération des fichiers déjà indexés dans Qdrant
    print("Lecture des fichiers déjà présents dans la base vectorielle...")
    qdrant_files = get_indexed_files_metadata(client)
    print(f"Trouvé {len(qdrant_files)} fichiers référencés dans Qdrant.")
    
    # 4. Scan des fichiers locaux
    local_files = get_markdown_files(VAULT_PATH)
    print(f"Trouvé {len(local_files)} fichiers locaux dans le Vault.")
    
    files_to_index = []
    files_to_delete = []
    
    # Liste des chemins relatifs locaux
    local_rel_paths = set()
    
    # Détection des fichiers à ajouter ou modifier
    for file_path in local_files:
        relative_path = os.path.relpath(file_path, VAULT_PATH)
        
        # Exclusion des dossiers systèmes Obsidian ou modèles
        if ".obsidian" in relative_path or "templates" in relative_path.lower():
            continue
            
        local_rel_paths.add(relative_path)
        local_mtime = os.path.getmtime(file_path)
        
        # Si le fichier n'est pas dans Qdrant ou a été modifié localement
        if relative_path not in qdrant_files:
            files_to_index.append((file_path, relative_path, "Nouveau"))
        elif local_mtime > qdrant_files[relative_path]:
            files_to_index.append((file_path, relative_path, "Modifié"))
            
    # Détection des fichiers supprimés localement
    for rel_path in qdrant_files.keys():
        if rel_path not in local_rel_paths:
            files_to_delete.append(rel_path)
            
    print(f"\n--- Bilan du Delta ---")
    print(f"  Fichiers inchangés (ignorés) : {len(local_rel_paths) - len(files_to_index)}")
    print(f"  Fichiers nouveaux/modifiés (à indexer) : {len(files_to_index)}")
    print(f"  Fichiers supprimés localement (à purger) : {len(files_to_delete)}")
    print("----------------------\n")
    
    # 5. Nettoyage des fichiers supprimés
    if files_to_delete:
        print("Purge des fichiers supprimés dans Qdrant...")
        for rel_path in files_to_delete:
            delete_file_points(client, rel_path)
            print(f"  Purgé : {rel_path}")
            
    if not files_to_index:
        print("Rien à indexer. La base vectorielle est à jour.")
        # Audit final
        collection_info = client.get_collection(COLLECTION_NAME)
        print(f"\nStatut final : {collection_info.points_count} points actifs (status: {collection_info.status})")
        return
        
    # 6. Chargement du modèle d'embedding
    print(f"Chargement du modèle d'embedding {EMBED_MODEL}...")
    embed_model = TextEmbedding(model_name=EMBED_MODEL)
    
    all_chunks = []
    all_payloads = []
    
    # Traitement des fichiers à indexer
    for file_path, rel_path, reason in files_to_index:
        print(f"Préparation ({reason}) : {rel_path}...")
        try:
            # Purge d'abord les anciens points s'il s'agit d'une modification
            if reason == "Modifié":
                delete_file_points(client, rel_path)
                
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                
            cleaned_content = clean_markdown(content)
            if not cleaned_content:
                continue
                
            file_chunks = chunk_text(cleaned_content)
            
            for idx, chunk in enumerate(file_chunks):
                all_chunks.append(chunk)
                all_payloads.append({
                    "text": chunk,
                    "file_path": rel_path,
                    "file_name": os.path.basename(file_path),
                    "chunk_index": idx,
                    "total_chunks": len(file_chunks),
                    "file_mtime": os.path.getmtime(file_path)
                })
        except Exception as e:
            print(f"  Erreur lors de la préparation de {rel_path} : {e}")
            
    if not all_chunks:
        print("Aucun nouveau contenu à indexer.")
        return
        
    # 7. Indexation par lots (batches)
    batch_size = 64
    total_points = len(all_chunks)
    print(f"\nGénération de {total_points} embeddings et envoi à Qdrant par lots de {batch_size}...")
    
    for i in range(0, total_points, batch_size):
        batch_chunks = all_chunks[i:i + batch_size]
        batch_payloads = all_payloads[i:i + batch_size]
        
        vectors = list(embed_model.embed(batch_chunks))
        
        points = []
        for idx, (vector, payload) in enumerate(zip(vectors, batch_payloads)):
            # ID déterministe pour éviter les collisions
            point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{payload['file_path']}_{payload['chunk_index']}"))
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
        
    print("\n--- Synchronisation terminée avec succès ! ---")
    
    # Audit final
    collection_info = client.get_collection(COLLECTION_NAME)
    print(f"Statut final de la collection '{COLLECTION_NAME}':")
    print(f"  Nombre total de points actifs : {collection_info.points_count}")
    print(f"  Statut : {collection_info.status}")

if __name__ == "__main__":
    index_vault()
