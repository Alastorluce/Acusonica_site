@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."
set "BACKUP_DIR=%PROJECT_DIR%\_backup_github"
set "REPO_URL=https://github.com/Alastorluce/Acusonica_site.git"
set "TEMP_CLONE=%TEMP%\acusonica_github_backup_temp"

title Acusonica Site Update

echo.
echo ==================================================
echo Acusonica site update
echo Backup GitHub, commit and push
echo ==================================================
echo.

cd /d "%PROJECT_DIR%"

echo Project folder:
echo "%PROJECT_DIR%"
echo.

echo Creo cartella backup interna se assente...
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo.
echo Creo nome backup con data e ora...
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy_MM_dd_HH_mm_ss"') do set "TIMESTAMP=%%i"

set "BACKUP_FILE=%BACKUP_DIR%\backup_%TIMESTAMP%.zip"

echo.
echo Pulisco eventuale clone temporaneo precedente...
if exist "%TEMP_CLONE%" rmdir /s /q "%TEMP_CLONE%"

echo.
echo Scarico da GitHub lo stato attuale del sito...
git clone "%REPO_URL%" "%TEMP_CLONE%"

if errorlevel 1 (
    echo.
    echo ERRORE: backup da GitHub non riuscito.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Backup failed. Update stopped.', 'Acusonica update', 'OK', 'Error')"
    pause
    exit /b 1
)

echo.
echo Rimuovo cartelle tecniche dal backup...
if exist "%TEMP_CLONE%\.git" rmdir /s /q "%TEMP_CLONE%\.git"
if exist "%TEMP_CLONE%\node_modules" rmdir /s /q "%TEMP_CLONE%\node_modules"
if exist "%TEMP_CLONE%\dist" rmdir /s /q "%TEMP_CLONE%\dist"

echo.
echo Comprimo il backup dentro il progetto...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path '%TEMP_CLONE%\*' -DestinationPath '%BACKUP_FILE%' -Force"

if errorlevel 1 (
    echo.
    echo ERRORE: compressione backup fallita.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Backup compression failed.', 'Acusonica update', 'OK', 'Error')"
    pause
    exit /b 1
)

echo.
echo Backup creato:
echo "%BACKUP_FILE%"

echo.
echo Elimino clone temporaneo...
if exist "%TEMP_CLONE%" rmdir /s /q "%TEMP_CLONE%"

echo.
echo Stato attuale del progetto:
git status

echo.
set /p "msg=Scrivi il messaggio di aggiornamento: "

if "%msg%"=="" set "msg=Aggiornamento sito Acusonica con backup"

echo.
echo Aggiungo modifiche, immagini, video e backup...
git add .

echo.
echo Creo commit...
git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Nessun commit creato oppure nessuna modifica trovata.
    echo Provo comunque a inviare eventuali aggiornamenti gia presenti.
)

echo.
echo Invio tutto su GitHub...
git push

if errorlevel 1 (
    echo.
    echo ERRORE: push non riuscito.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Push failed. Backup was created but the site was not updated online.', 'Acusonica update', 'OK', 'Error')"
    pause
    exit /b 1
)

echo.
echo ==================================================
echo UPDATE SUCCESSFUL
echo Backup salvato in:
echo "%BACKUP_FILE%"
echo.
echo GitHub Actions pubblichera il sito online.
echo ==================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Update successful. Backup created and site sent to GitHub.', 'Acusonica update', 'OK', 'Information')"

pause