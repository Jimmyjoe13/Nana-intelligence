@echo off
title Synchronisation Vectorielle Qdrant - Vault Obsidian
echo Démarrage de la synchronisation vectorielle...
powershell.exe -ExecutionPolicy Bypass -File "C:\Users\jimmy\Projet\Nana-intelligence\run_sync.ps1"
echo.
echo Synchronisation terminée. Ce terminal va se fermer.
timeout /t 5
