import {
    activeButtons, createButtons, inactiveButtons, initButtons,
    returnOpponent, setInitialPositions, setPosition, sizeButton
} from "./app.js"

// --- Constantes de configuração do jogo ---

// Número máximo de casas no percurso completo (início + trilha + chegada)
const PLAYER_LIMIT = 57

// Primeira posição que um peão pode assumir ao sair da base
const START_POSITION = 1

// Posição de chegada final
const FINAL_POSITION = 57

// Última posição do tabuleiro antes de entrar na trilha final
const MAX_BOARD_POSITION = 51

// Ordem lógica de iteração dos jogadores
const PLAYER_ORDER = ["green", "red", "blue", "yelow"]

// Ordem visual de exibição dos jogadores no menu
const PLAYER_DISPLAY_ORDER = ["green", "red", "yelow", "blue"]

// --- Funções auxiliares de manipulação de DOM ---
// Todas possuem efeito colateral

// Define HTML interno de um seletor
const setHTML = (selector, html) => document.querySelector(selector).innerHTML = html

// Retorna o primeiro elemento que bate com o seletor
const query = (selector) => document.querySelector(selector)

// Retorna todos os elementos como array
const queryAll = (selector) => [...document.querySelectorAll(selector)]

// Verifica se um elemento possui uma classe
const hasClass = (el, className) => el.classList.contains(className)

// Alterna uma classe em um elemento
const toggleClass = (el, className) => el.classList.toggle(className)

// Adiciona uma classe a um elemento
const addClass = (el, className) => el.classList.add(className)

// Remove uma classe de um elemento
const removeClass = (el, className) => el.classList.remove(className)

// Define um atributo em um elemento
const setAttr = (el, attr, val) => el.setAttribute(attr, val)

// Remove um atributo de um elemento
const removeAttr = (el, attr) => el.removeAttribute(attr)

// --- Setup inicial de jogadores ---

// Cria os botões visuais de cada jogador
// Efeito colateral: altera o DOM
const setupPlayers = () => setHTML("#players",
    PLAYER_DISPLAY_ORDER
        .map(color =>
            `<div id="player_${color}" class="player_button button_${color} clickable" data-color="${color}"></div>`
        )
        .join("")
)

// Controla a seleção visual dos jogadores
const addPlayer = (classActive, classSet) => ({ target }) =>
    hasClass(target, classActive) && toggleClass(target, classSet)

// Gera a lista de cores dos jogadores selecionados
// Função pura
const newListPlayers = (idPlayer = "player_button", classSet = "select") =>
    PLAYER_ORDER.filter(color => {
        const el = query(`.${idPlayer}[data-color="${color}"]`)
        return el && el.classList.contains(classSet)
    })

// Inativa visualmente jogadores não selecionados
const inactiveNSelectPlayers = (identifier, players) =>
    queryAll(identifier).forEach(el => {
        if (!players.includes(el.dataset.color)) addClass(el, "player_inactive")
    })

// --- Lógica pura de movimentação e jogo ---

// Calcula nova posição com base no dado
const getNewPosition = (currentPosition, diceValue) =>
    currentPosition === 0 ? START_POSITION
    : (currentPosition + diceValue <= PLAYER_LIMIT ? currentPosition + diceValue : currentPosition)

// Verifica se a posição final foi atingida
const isFinalPosition = (position) => position === FINAL_POSITION

// Determina se o turno deve trocar de jogador
const shouldSwitchPlayer = (diceValue, buttons) => {
    const allUnplayable = buttons.every(({ position }) =>
        position === 0 || position >= FINAL_POSITION
    )
    return diceValue !== 6 || allUnplayable
}

// Verifica se a quantidade de jogadores é válida
const isValidSelection = (players) => players.length >= 2

// Retorna lista de botões que podem se mover com base no dado
const getPlayableButtons = (buttons, dice) => {
    const fromBase = buttons.filter(({ position }) => position === 0 && dice === 6)
    const onBoard = buttons.filter(({ position }) => position > 0 && position + dice <= PLAYER_LIMIT)
    return [...fromBase, ...onBoard]
}

// --- Controle do movimento das peças ---

// Aplica movimentação da peça, atualiza DOM, verifica captura e final
const handlePieceMove = ({ id, color, position }, diceValue, setPosEffect, removeAttrEffect, hitOpponentEffect) => {
    const newPosition = getNewPosition(position, diceValue)
    setPosEffect(id, color, newPosition)

    // Verifica se pode capturar adversário
    if (newPosition <= MAX_BOARD_POSITION) {
        hitOpponentEffect(color, newPosition - 1)
    }

    // Se atingiu o final, remove os atributos de controle
    if (isFinalPosition(newPosition)) {
        ["data-position", "data-casemap"].forEach(attr =>
            removeAttrEffect(id, attr)
        )
    }

    return newPosition
}

// Controla o clique do jogador em uma peça
// Efeito colateral: movimenta peça e altera turnos
const selectItem = ({ currentTarget }) => {
    if (!hasClass(currentTarget, "clickable")) return

    const dice = parseInt(query("#draw").dataset.number)
    const id = currentTarget.id
    const color = currentTarget.dataset.color
    const position = parseInt(currentTarget.dataset.position)

    const buttons = queryAll(`[data-color="${color}"]`).map(btn => ({
        id: btn.id,
        position: parseInt(btn.dataset.position)
    }))

    handlePieceMove(
        { id, color, position },
        dice,
        (id, color, pos) => {
            setAttr(query(`#${id}`), "data-position", `${pos}`)
            setPosition(pos - 1, id, color)
        },
        (id, attr) => removeAttr(query(`#${id}`), attr),
        returnOpponent
    )

    // Desativa todas as peças após o movimento
    inactiveButtons(".button")

    // Troca jogador caso necessário
    if (shouldSwitchPlayer(dice, buttons)) {
        nextCurrentPlayer(color)
    }

    // Reativa botão de rolar dado
    activeButtons("#draw")
}

// Inicia o jogo com jogadores selecionados
// Efeito colateral: altera o DOM e estado inicial
const startGame = ({ currentTarget }) => {
    if (!hasClass(currentTarget, "clickable")) return

    const colors = newListPlayers()
    if (!isValidSelection(colors)) return alert("selecione no mínimo 2 players!")

    setHTML("#map", createButtons(colors))
    initButtons(".button", selectItem)
    setInitialPositions(colors, sizeButton)
    inactiveButtons(".player_button")
    inactiveButtons("#startButton")
    inactiveNSelectPlayers(".player_button", colors)
    activeButtons("#draw")
}

// --- Controle de turnos ---

// Retorna a cor do jogador da vez
const checkCurrentPlayer = () => query(".current_player")?.dataset.color || null

// Atualiza jogador da vez com base na ordem dos selecionados
const nextCurrentPlayer = (current) => {
    const players = newListPlayers()
    const index = players.findIndex(p => p === current)
    const next = (index + 1) % players.length
    setCurrentPlayer(next, players)
}

// Define visualmente o jogador atual (estilo e z-index)
const setCurrentPlayer = (index, players) => {
    queryAll(".player_button").forEach(el => removeClass(el, "current_player"))
    queryAll(".button").forEach(el => {
        el.style.zIndex = 1
    })

    const current = players[index]
    addClass(query(`.player_button[data-color="${current}"]`), "current_player")

    const currentButtons = queryAll(`.button[data-color="${current}"]`)
    currentButtons.forEach(el => {
        el.style.zIndex = 2
    })
}

// Verifica se o jogador atual tem peças que podem se mover
const checkButtonRelease = (number) => {
    const current = checkCurrentPlayer()
    const rawButtons = queryAll(`[data-position][data-color="${current}"]`)

    const buttons = rawButtons.map(el => ({
        id: el.id,
        position: parseInt(el.dataset.position),
        el
    }))

    const playable = getPlayableButtons(buttons, number)

    if (playable.length > 0) {
        playable.forEach(({ id }) => activeButtons(`#${id}`))
        inactiveButtons("#draw")
    } else {
        nextCurrentPlayer(current)
        activeButtons("#draw")
    }
}

// --- Inicialização do Jogo ---
// Configura os botões de seleção de jogador e o botão de iniciar

setupPlayers()
initButtons(".player_button", addPlayer("clickable", "select"))
initButtons("#startButton", startGame)

// --- Exportações para uso externo (geralmente em outro módulo) ---

export {
    newListPlayers,
    checkCurrentPlayer,
    setCurrentPlayer,
    nextCurrentPlayer,
    checkButtonRelease
}
