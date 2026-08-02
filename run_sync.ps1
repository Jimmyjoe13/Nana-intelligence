# Configuration
$keyPath = "C:\Users\jimmy\Serveur Ubuntu\ssh-key-2026-03-25.key"
$serverIp = "129.151.255.170"
$qdrantPort = 6333
$scriptPath = "C:\Users\jimmy\Projet\Nana-intelligence\index_vault.py"
$codeScriptPath = "C:\Users\jimmy\Projet\Nana-intelligence\index_codebase.py"

Write-Host "--- Démarrage de la procédure de synchronisation ---"

# 1. Vérification si le port est déjà occupé
$portActive = Get-NetTCPConnection -LocalPort $qdrantPort -ErrorAction SilentlyContinue
if ($portActive) {
    Write-Host "Le port $qdrantPort est déjà occupé. Utilisation du canal actif."
    $tunnelProcess = $null
} else {
    Write-Host "Ouverture du tunnel SSH vers le serveur Oracle ($serverIp)..."
    # Lancement du tunnel en tâche de fond
    $tunnelProcess = Start-Process ssh -ArgumentList "-i", "`"$keyPath`"", "-L", "${qdrantPort}:localhost:${qdrantPort}", "ubuntu@${serverIp}", "-N", "-o", "ExitOnForwardFailure=yes" -PassThru -NoNewWindow
    
    # Attente active de l'ouverture du port (max 10 secondes)
    Write-Host "Attente de l'ouverture du port local $qdrantPort..."
    $connected = $false
    for ($i = 1; $i -le 10; $i++) {
        Start-Sleep -Seconds 1
        $portCheck = Get-NetTCPConnection -LocalPort $qdrantPort -ErrorAction SilentlyContinue
        if ($portCheck) {
            Write-Host "Tunnel SSH établi avec succès après $i seconde(s)."
            $connected = $true
            break
        }
    }
    
    if (-not $connected) {
        Write-Error "Impossible d'établir le tunnel SSH. Le port local $qdrantPort ne répond pas."
        if ($tunnelProcess) { Stop-Process -Id $tunnelProcess.Id -Force }
        Exit 1
    }
}

# 2. Exécution des scripts Python d'indexation incrémentale
Write-Host "Lancement de l'indexation incrémentale du Vault..."
try {
    uv run $scriptPath
} catch {
    Write-Error "Erreur lors de l'exécution du script d'indexation du Vault : $_"
}

Write-Host "Lancement de l'indexation incrémentale de la Base de Code..."
try {
    uv run $codeScriptPath
} catch {
    Write-Error "Erreur lors de l'exécution du script d'indexation de la Base de Code : $_"
}

# 3. Fermeture propre du tunnel SSH s'il a été ouvert par ce script
if ($tunnelProcess) {
    Write-Host "Fermeture du tunnel SSH (Process ID: $($tunnelProcess.Id))..."
    Stop-Process -Id $tunnelProcess.Id -Force
}

Write-Host "--- Procédure terminée ---"
