const input = document.getElementById("input")
const button = document.getElementById("sendBtn")
const chat = document.getElementById("chat")

button.addEventListener("click", sendMessage)

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault()

        sendMessage()

    }

})

async function sendMessage() {

    const message = input.value.trim()

    if (!message) return

    addMessage(message, "user")

    input.value = ""

    const botMessage = document.createElement("div")

    botMessage.className = "message bot"

    // Loader (3 Punkte), wird entfernt sobald erstes Streaming-Fragment ankommt
    let loader = document.createElement("span")
    loader.className = "loader"
    loader.innerHTML = '<span></span><span></span><span></span>'
    botMessage.appendChild(loader)

    chat.appendChild(botMessage)

    chat.scrollTop = chat.scrollHeight

    const response = await fetch("http://127.0.0.1:8000/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: message
        })

    })

    if (!response.ok) {
        if (loader && loader.parentNode) loader.remove()
        botMessage.textContent = 'Fehler beim Abrufen der Antwort.'
        return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let hasContent = false

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
            if (!line.trim()) continue
            try {
                const json = JSON.parse(line)
                if (json.response) {
                    // Entferne Loader beim ersten echten Content
                    if (!hasContent) {
                        if (loader && loader.parentNode) loader.remove()
                        hasContent = true
                        // Leere Inhalt bevor neu angefügt wird
                        botMessage.textContent = ''
                    }
                    botMessage.textContent += json.response
                }
            } catch (error) {
                console.log(error)
            }
        }

        chat.scrollTop = chat.scrollHeight
    }

}

function addMessage(text, sender) {

    const div = document.createElement("div")

    div.className = `message ${sender}`

    div.textContent = text

    chat.appendChild(div)

    chat.scrollTop = chat.scrollHeight

}