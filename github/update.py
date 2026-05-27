import os
import shutil
import subprocess
import sys
import tempfile
import zipfile
from datetime import datetime
from pathlib import Path
import ctypes


PROJECT_DIR = Path(r"C:\Users\alast\Desktop\sito_acusonica")
GITHUB_DIR = PROJECT_DIR / "github"
BACKUP_DIR = PROJECT_DIR / "_backup_github"
REPO_URL = "https://github.com/Alastorluce/Acusonica_site.git"
TEMP_CLONE = Path(tempfile.gettempdir()) / f"acusonica_github_backup_temp_{datetime.now().strftime('%Y_%m_%d_%H_%M_%S')}"


def message_box(text, title="Acusonica update", icon=0x40):
    try:
        ctypes.windll.user32.MessageBoxW(0, text, title, icon)
    except Exception:
        print(text)


def run_command(command, cwd=None, stop_on_error=True):
    print()
    print(">", " ".join(command))

    process = subprocess.run(
        command,
        cwd=cwd,
        shell=False,
        text=True,
    )

    if stop_on_error and process.returncode != 0:
        raise RuntimeError(f"Comando fallito: {' '.join(command)}")

    return process.returncode


def remove_if_exists(path):
    path = Path(path)

    if not path.exists():
        return

    def on_error(func, error_path, exc_info):
        try:
            os.chmod(error_path, 0o777)
            func(error_path)
        except Exception:
            pass

    if path.is_dir():
        shutil.rmtree(path, onerror=on_error)
    else:
        try:
            path.unlink()
        except PermissionError:
            os.chmod(path, 0o777)
            path.unlink()


def zip_folder(source_dir, output_zip):
    source_dir = Path(source_dir)
    output_zip = Path(output_zip)

    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for file_path in source_dir.rglob("*"):
            if file_path.is_file():
                relative_path = file_path.relative_to(source_dir)
                zip_file.write(file_path, relative_path)


def check_paths():
    if not PROJECT_DIR.exists():
        raise FileNotFoundError(f"Cartella progetto non trovata: {PROJECT_DIR}")

    if not (PROJECT_DIR / ".git").exists():
        raise FileNotFoundError(
            "Repository Git locale non trovato. La cartella del sito deve contenere .git"
        )

    BACKUP_DIR.mkdir(exist_ok=True)


def create_github_backup():
    timestamp = datetime.now().strftime("%Y_%m_%d_%H_%M_%S")
    backup_file = BACKUP_DIR / f"backup_{timestamp}.zip"

    print()
    print("==================================================")
    print("Backup GitHub")
    print("==================================================")

    print()
    print("Pulisco eventuale clone temporaneo precedente...")
    remove_if_exists(TEMP_CLONE)

    print()
    print("Scarico da GitHub lo stato attuale del sito...")
    run_command(["git", "clone", REPO_URL, str(TEMP_CLONE)], cwd=PROJECT_DIR)

    print()
    print("Rimuovo cartelle tecniche dal backup...")
    remove_if_exists(TEMP_CLONE / ".git")
    remove_if_exists(TEMP_CLONE / "node_modules")
    remove_if_exists(TEMP_CLONE / "dist")

    print()
    print("Comprimo il backup dentro il progetto...")
    zip_folder(TEMP_CLONE, backup_file)

    print()
    print(f"Backup creato: {backup_file}")

    print()
    print("Elimino clone temporaneo...")
    remove_if_exists(TEMP_CLONE)

    return backup_file


def commit_and_push():
    print()
    print("==================================================")
    print("Aggiornamento sito Acusonica")
    print("==================================================")

    print()
    run_command(["git", "status"], cwd=PROJECT_DIR, stop_on_error=False)

    print()
    message = input("Scrivi il messaggio di aggiornamento: ").strip()

    if not message:
        message = "Aggiornamento sito Acusonica con backup"

    print()
    print("Aggiungo modifiche, immagini, video e backup...")
    run_command(["git", "add", "."], cwd=PROJECT_DIR)

    print()
    print("Creo commit...")
    commit_result = run_command(
        ["git", "commit", "-m", message],
        cwd=PROJECT_DIR,
        stop_on_error=False,
    )

    if commit_result != 0:
        print()
        print("Nessun commit creato oppure nessuna modifica trovata.")
        print("Provo comunque a inviare eventuali aggiornamenti già presenti.")

    print()
    print("Invio tutto su GitHub...")
    run_command(["git", "push"], cwd=PROJECT_DIR)


def main():
    os.system("title Acusonica Site Update")

    print()
    print("==================================================")
    print("Acusonica site update")
    print("Backup GitHub, commit and push")
    print("==================================================")

    try:
        check_paths()
        backup_file = create_github_backup()
        commit_and_push()

        print()
        print("==================================================")
        print("UPDATE SUCCESSFUL")
        print(f"Backup salvato in: {backup_file}")
        print("GitHub Actions pubblicherà il sito online.")
        print("==================================================")
        print()

        message_box(
            "Update successful.\nBackup created and site sent to GitHub.",
            "Acusonica update",
            0x40,
        )

    except Exception as error:
        print()
        print("==================================================")
        print("ERRORE")
        print(str(error))
        print("==================================================")
        print()

        message_box(
            f"Update failed.\n\n{error}",
            "Acusonica update",
            0x10,
        )

        input("Premi INVIO per chiudere...")
        sys.exit(1)

    input("Premi INVIO per chiudere...")


if __name__ == "__main__":
    main()