const sizeButton = 6.2

// --------------------
// FUNÇÕES PURAS
// --------------------

// Mapeia os deslocamentos das casas finais por cor
// Estrutura constante e pura, sem mutações
const valueFinish = {
    green: { level: [0, 0, 0, 0, 0, 0], up: [6, 5, 4, 3, 2, 1] },
    red: { level: [6, 5, 4, 3, 2, 1], up: [0, 0, 0, 0, 0, 0] },
    blue: { level: [0, 0, 0, 0, 0, 0], up: [-6, -5, -4, -3, -2, -1] },
    yelow: { level: [-6, -5, -4, -3, -2, -1], up: [0, 0, 0, 0, 0, 0] },
}

// Vetores que descrevem o caminho principal do tabuleiro
const level = [-2, -3, -4, -5, -6, -7, -7, -7, -6, -5, -4, -3, -2]
const up = [1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1]

// Deslocamento do ponto inicial de cada cor
const displacement = { green: 8, red: 21, blue: 34, yelow: 47 }

// Deslocamento relativo para distribuir as 4 peças em cada canto
const initialOffset = {
    up: [-1, 0, 0, 1],
    level: [0, -1, 1, 0],
}

// Coordenadas centrais para posicionamento inicial das peças por cor
const classColors = {
    green: [31.3, 31.3],
    red: [31.3, -25.2],
    blue: [-25.2, -25.2],
    yelow: [-25.2, 31.3],
}

// Converte a posição local da peça para o valor global no tabuleiro
// Ex: a peça vermelha 0 será casa 21, vermelha 1 será 22 etc.
const calcValueColor = (valuePosition, color) => {
    const calc = displacement[color] + valuePosition
    return calc <= 51 ? calc : calc - 52
}

// Retorna as coordenadas de uma posição do tabuleiro principal
// Mapeia a posição numérica (0 a 51) para coordenadas percentuais
const positionMap = (size, position) => {
    if (position <= 12)
        return [size / 2 - level[position] * size, size / 2 - up[position] * size]
    if (position <= 25)
        return [size / 2 - up[12 - (position - 13)] * size, size / 2 - level[position - 13] * size]
    if (position <= 38)
        return [size / 2 + level[position - 26] * size, size / 2 + up[position - 26] * size]
    return [size / 2 + up[12 - (position - 39)] * size, size / 2 + level[position - 39] * size]
}

// Retorna as coordenadas da trilha final de uma determinada cor
const positionMapFinish = (size, position, color) => [
    size / 2 + valueFinish[color].up[position] * size,
    size / 2 + valueFinish[color].level[position] * size,
]

// Retorna as coordenadas visuais para uma peça, seja na trilha principal ou final
// Retorna também o valor global da casa (para comparações)
const calcPieceCoords = (position, color, size) => {
    const isMain = position <= 50
    const pos = isMain ? calcValueColor(position, color) : position - 51
    const [top, left] = isMain
        ? positionMap(size, pos)
        : positionMapFinish(size, pos, color)
    return [top, left, pos]
}

// Calcula a posição inicial de uma peça no canto da sua base
const getInitialCoords = (color, id, size) => {
    const [baseX, baseY] = classColors[color]
    const dx = initialOffset.level[id - 1] * size
    const dy = initialOffset.up[id - 1] * size
    return [baseX + dx, baseY + dy]
}

// Gera o HTML de todas as peças dos jogadores com base nas cores fornecidas
// Função pura — apenas retorna string
const createButtons = (colors) =>
    colors.map(color =>
        [1, 2, 3, 4].map(id =>
            `<div id="${color[0] + id}" class="button button_${color}" data-color="${color}" data-position="0" data-casemap="-1"></div>`
        ).join("")
    ).join("")

// --------------------
// EFEITOS COLATERAIS (DOM)
// --------------------

// Aplica as coordenadas visuais (top e left) em um botão
const domSetStylePosition = (el, top, left) => {
    el.style.left = `${50 - top}%`
    el.style.top = `${50 - left}%`
}

// Define o atributo de casa atual no tabuleiro
const domSetCaseMap = (el, value) => el.setAttribute("data-caseMap", `${value}`)

// Inicializa eventos de clique nos botões
const domInitButtons = (selector, handler) =>
    document.querySelectorAll(selector).forEach(el => el.addEventListener("click", handler))

// Adiciona ou remove a classe `clickable` para ativar/desativar peças
const domModifyButtons = (selector, action) =>
    document.querySelectorAll(selector).forEach(el => el.classList[action]("clickable"))

const activeButtons = (selector) => domModifyButtons(selector, "add")
const inactiveButtons = (selector) => domModifyButtons(selector, "remove")

// Posiciona visualmente uma peça no tabuleiro com base na posição e cor
const domSetPiecePosition = (position, id, color) => {
    const [top, left, pos] = calcPieceCoords(position, color, sizeButton)
    const button = document.querySelector(`#${id}`)
    domSetStylePosition(button, top, left)
    domSetCaseMap(button, pos)
}

// Posiciona visualmente as peças nas bases iniciais de cada jogador
const domPlaceInitialPieces = (colors, size, ids = [1, 2, 3, 4]) => {
    colors.forEach(color => {
        ids.forEach(id => {
            const [x, y] = getInitialCoords(color, id, size)
            const button = document.querySelector(`#${color[0] + id}`)
            domSetStylePosition(button, y, x)
        })
    })
}

// Verifica se existe um oponente na mesma casa e o retorna à base
const domReturnOpponent = (player, position) => {
    const opponents = ["green", "red", "blue", "yelow"].filter(p => p !== player)
    const caseMap = calcValueColor(position, player)
    const protectedCase = [8, 21, 34, 47]   // Casas de partida são protegidas, não há retorno de oponentes

    if (protectedCase.includes(caseMap)) return

    opponents.forEach(color => {
        document.querySelectorAll(`.button[data-color="${color}"]`).forEach(button => {
            const opponentPosition = parseInt(button.dataset.position)
            const opponentCaseMap = parseInt(button.dataset.casemap)

            if (
                opponentPosition <= 50 &&
                opponentCaseMap === caseMap &&
                opponentPosition > 1
            ) {
                button.dataset.position = "0"
                domPlaceInitialPieces([color], sizeButton, [parseInt(button.id[1])])
            }
        })
    })
}

// --------------------
// EXPORTS
// --------------------

export {
    createButtons,                        // pura
    domInitButtons as initButtons,       // efeito colateral
    domPlaceInitialPieces as setInitialPositions, // efeito colateral
    activeButtons,                       // efeito colateral
    inactiveButtons,                     // efeito colateral
    domSetPiecePosition as setPosition,  // efeito colateral
    domReturnOpponent as returnOpponent, // efeito colateral
    sizeButton,
}
