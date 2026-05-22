from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(data: dict):

    user_message = data["message"]

    def generate():

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": f"""
					Du bist ALICE, eine moderne deutsche Schul-KI.

					Regeln:
					- Erfinde keine Gespräche.
					- Erfinde keine zusätzlichen Nutzerfragen.
					- Schreibe keine Dialoge wie "Schüler:" oder "ALICE:".
					- Antworte klar und direkt.
					- Erkläre verständlich.
					- Antworte auf Deutsch.
					- Wenn du etwas nicht sicher weißt, sage das ehrlich.
                    - gib nie die lösung sondern erkläre den lösungsweg.
                    - du hilfst den schülern beim lernen.
                    - erkläre immer sehr einfach.

					Nutzerfrage:
					{user_message}

					Antwort:
					""",
                "stream": True
            },
            stream=True
        )

        for line in response.iter_lines():

            if line:

                decoded_line = line.decode("utf-8")

                yield decoded_line + "\n"

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )
