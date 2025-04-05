import {
    checkButtonRelease,
    checkCurrentPlayer,
    newListPlayers,
    nextCurrentPlayer,
    setCurrentPlayer
} from "./players.js"

// Sorteia um número aleatório entre 1 e max (inclusive)
// Função pura
const randomDraw = (max) => Math.floor(Math.random() * max) + 1

// Inicializa a área gráfica do dado (DOM)
// Efeito colateral: manipula diretamente o DOM
const initDrawer = (fn) => {
    document.getElementById("draw").innerHTML = [1, 2, 3].map(i => `
        <div id="line${i}" class="line">
            <div id="drawNumber${i * 2 - 1}" class="number"></div>
            <div id="drawNumber${i * 2}" class="number"></div>
        </div>
    `).join("")
    return fn
}

// Altera visualmente a cor dos pontos do dado
// Efeito colateral: modifica estilo no DOM
const setDotColor = (...ids) => ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.style.backgroundColor = "antiquewhite"
})

// Remove elementos do DOM por ID
// Efeito colateral
const removeElement = (...ids) => ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.remove()
})

// Renderiza os pontos no dado com base no número sorteado
// Efeito colateral: atualiza DOM dinamicamente
const drawNumbers = (number) => {
    document.getElementById("draw").dataset.number = `${number}`

    const drawMap = {
        1: () => removeElement("drawNumber3", "line1", "line3"),
        2: () => setDotColor("drawNumber1", "drawNumber3", "drawNumber4", "drawNumber6"),
        3: () => { setDotColor("drawNumber1", "drawNumber6"); removeElement("drawNumber3") },
        4: () => setDotColor("drawNumber3", "drawNumber4"),
        5: () => removeElement("drawNumber3"),
        6: () => {} // Exibe todos os pontos (sem alteração)
    }

    drawMap[number]?.() // Executa função visual associada ao número
}

// Evento de clique no botão de sorteio do dado
// Efeito colateral: manipula DOM e controla fluxo de turno
document.getElementById("draw").onclick = ({ currentTarget }) => {
    if (!currentTarget.classList.contains("clickable")) return

    const players = newListPlayers()
    const draw = initDrawer(drawNumbers)

    if (!checkCurrentPlayer()) {
        const current = randomDraw(players.length) // Sorteia o jogador inicial
        draw(current)                              // Renderiza dado com valor sorteado
        setCurrentPlayer(current - 1, players)     // Define jogador da vez
    } else {
        const number = randomDraw(6)               // Sorteio comum de dado
        draw(number)                               // Atualiza visual do dado
        checkButtonRelease(number)                 // Verifica peças jogáveis
    }
}
