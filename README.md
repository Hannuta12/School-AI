# ALICE / KAI

ALICE (auch KAI genannt) ist eine schulische KI-Anwendung, die Lernenden hilft, Fragen zu verstehen, zu üben und Wissen zu entdecken. Sie nutzt ein lokales Ollama-Modell (`mistral:7b`) und bietet eine einfache Chat-Oberfläche zum Lernen.

## Was kann ALICE?

- Lernhilfe: Beantworte Fragen zu verschiedenen Schulfächern auf Deutsch.
- Interaktiver Chat: Schreibe eine Frage oder Bitte und erhalte unterstützende Antworten.
- Lokales Modell: Nutzt `mistral:7b` über Ollama, sodass die KI lokal ausgeführt wird.
- Schnelles Setup: Backend in Python, Frontend als einfache Weboberfläche.

## Voraussetzungen

Bevor du ALICE benutzt, stelle sicher, dass du folgende Software installiert hast:

- Python 3.7+ oder neuer
- Ollama: Eine lokale KI-Plattform. Lade sie von https://ollama.ai herunter.
- Mistral-Modell: Installiere es mit `ollama pull mistral:7b`.
- Moderner Webbrowser: Für die Benutzeroberfläche (z.B. Chrome, Firefox).

## Installation und Setup

### Repository klonen

```powershell
git clone https://github.com/Hannuta12/School-AI.git
cd ALICE
```

### Ollama einrichten

- Installiere Ollama von https://ollama.ai.
- Installiere das Mistral-Modell:

```powershell
ollama pull mistral:7b
```

- Starte Ollama:

```powershell
ollama run mistral:7b
```

### Backend vorbereiten

Wechsle in den Backend-Ordner:

```powershell
cd backend
```

Erstelle bei Bedarf die virtuelle Umgebung:

```powershell
python -m venv venv
```

Aktiviere die virtuelle Umgebung:

```powershell
venv\Scripts\activate
```

Installiere die benötigten Python-Abhängigkeiten:

```powershell
pip install fastapi uvicorn
```

### Projekt starten

1. Stelle sicher, dass Ollama läuft:

```powershell
ollama run mistral:7b
```

2. Wechsle in den Backend-Ordner und aktiviere die virtuelle Umgebung:

```powershell
cd backend
venv\Scripts\activate
```

3. Starte den Backend-Server:

```powershell
uvicorn main:app --reload
```

4. Öffne `frontend/index.html` in deinem Browser oder starte einen lokalen Server, z.B.:

```powershell
cd frontend
python -m http.server 8000
```

- Öffne dann im Browser:

```text
http://127.0.0.1:8000
```

## Wie ALICE funktioniert

- Das Frontend zeigt eine Chat-Oberfläche, in der du deine Texteingabe machen kannst.
- Nach dem Absenden wird die Nachricht an den lokalen Backend-Endpunkt gesendet.
- Das Backend fragt das lokale Ollama-Modell `mistral:7b` ab und empfängt eine Antwort.
- Die Antwort erscheint im Chatfenster als Text.

## Beispiel-Workflow

- Starte Ollama mit `ollama run mistral:7b`.
- Aktiviere das Backend-Venv und starte `uvicorn main:app --reload`.
- Öffne die Frontend-Seite im Browser.
- Schreibe eine Frage wie "Erkläre den Satz des Pythagoras".
- Erhalte eine Antwort von ALICE.

## Projekt-Struktur

```
ALICE/
├── backend/
│   ├── main.py          # Backend-Server mit API für den Chat
│   └── venv/            # Python-virtuelle Umgebung
├── frontend/
│   ├── index.html       # Chat-Oberfläche
│   ├── script.js        # Frontend-Logik für Nachrichten und Streaming
│   └── style.css        # Styling für das Chat-Interface
└── README.md            # Diese Anleitung
```

## Erweiterte Optionen

- Lokale Entwicklung: Setze zusätzliche Python-Pakete ein, wenn das Backend erweitert wird.
- Modelloptionen: Passe `ollama run mistral:7b` an, wenn du andere Modellversionen nutzen möchtest.
- Frontend-Tests: Öffne `test.html`, um weitere UI-Szenarien zu prüfen.

## Lizenz

Dieses Projekt ist unter der Apache 2.0 lizenziert. Siehe LICENSE für Details.

## Hilfe

Falls du Probleme hast:

- Stelle sicher, dass Ollama läuft (`ollama run mistral:7b`).
- Überprüfe, ob `mistral:7b` installiert ist (`ollama list`).
- Aktiviere die virtuelle Umgebung vor dem Start des Backends.
- Öffne die Browser-Konsole für Fehler in der UI.

Viel Erfolg mit ALICE / KAI als deiner Schul-KI!
