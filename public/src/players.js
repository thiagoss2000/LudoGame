import { activeButtons, createButtons, inactiveButtons, initButtons, returnOpponent, setInitialPositions, setPosition, sizeButton } from "./app.js"

document.getElementById("players").innerHTML = `
    <div id="player_green" class="player_button button_green clickable" data-color="green"></div>
    <div id="player_red" class="player_button button_red clickable" data-color="red"></div>
    <div id="player_yelow" class="player_button button_yelow clickable" data-color="yelow"></div>
    <div id="player_blue" class="player_button button_blue clickable" data-color="blue"></div>
`

//  marca o player como selecionado adicionando a classe de selecao
function addPlayer(classActive, classSet) {
    return (event) => { if (event.target.classList.contains(classActive)) event.target.classList.toggle(classSet) }
}

//  retorna lista de players selecionados
function newListPlayers(idPlayer = "player_button", classSet = "select") {
    return [...document.querySelectorAll(`.${idPlayer}.${classSet}`)].map(element => element.dataset.color)
}

//  aplica classe player_inactive para os players nao selecionados
function inactiveNSelectPlayers(identifier, players) {
    document.querySelectorAll(identifier).forEach(element => {
        if (!players.includes(element.dataset.color)) element.classList.add("player_inactive")
    })
}

function startGame(element) {
    if(!element.currentTarget.classList.contains("clickable")) return 0

    const colorsButtons = newListPlayers()
    if(colorsButtons.length < 2) {
        alert("selecione no mínimo 2 players!")
        return 0
    }

    document.getElementById("map").innerHTML = createButtons(colorsButtons)
    initButtons(".button", selectIten)
    setInitialPositions(colorsButtons, sizeButton)

    // // torna os botoes players nao clicaveis e inativa cores nao selecionadas
    inactiveButtons(".player_button")
    inactiveButtons("#startButton")
    inactiveNSelectPlayers(".player_button", colorsButtons)
    activeButtons("#draw")
}

// adiciona evento de click aos botoes referentes aos players na navbar
initButtons(".player_button", addPlayer("clickable", "select"))
initButtons("#startButton", startGame)

const selectIten = (element) => {
    const number = parseInt(document.querySelector("#draw").dataset.number)

    const initialPosition = parseInt(element.currentTarget.dataset.position)
    const id = element.currentTarget.id
    const color = element.currentTarget.dataset.color
    if(!element.currentTarget.classList.contains("clickable")) return 0
    if(initialPosition == 0) {
        element.currentTarget.dataset.position = "1"
        setPosition(0, id, color)
    }else{
        const newPosition = (initialPosition + number) <= 57 ? (initialPosition + number) : initialPosition
        element.currentTarget.dataset.position = `${newPosition}`
        setPosition(newPosition - 1, id, color)
        if(initialPosition < 52)
            returnOpponent(color, newPosition - 1)
        if(newPosition == 57){  // remove atributos que nao serao mais necessarios
            element.currentTarget.removeAttribute("data-position");
            element.currentTarget.removeAttribute("data-casemap");
        }
    }
    if(number != 6)
        nextCurrentPlayer(color)
    inactiveButtons(".button")
    activeButtons("#draw")
}

function checkCurrentPlayer() {
    const element = document.querySelector('.current_player')
    return element? element.dataset.color : null
}

function nextCurrentPlayer (currentPlayer) {
    const listPlayers = newListPlayers()
    const currentIndice = listPlayers.indexOf(currentPlayer)
    const nextPlayer = (currentIndice + 1) < listPlayers.length ? (currentIndice + 1) : 0
    setCurrentPlayer(nextPlayer, listPlayers)
}

function setCurrentPlayer (indice, listPlayers) {
    document.querySelectorAll('.player_button').forEach(element => {
        element.classList.remove("current_player")
    })
    document.querySelectorAll('.button').forEach(element => {
        element.classList.remove("indexTop")
        console.log(element)
    })
    document.querySelector(`.player_button[data-color="${listPlayers[indice]}"]`).classList.add("current_player")
    document.querySelector(`.button[data-color="${listPlayers[indice]}"]`).classList.add("indexTop")
    console.log(document.querySelector(`.button[data-color="${listPlayers[indice]}"]`))
}

function checkButtonRelease (number) {
    const currentPlayer = checkCurrentPlayer()
    const buttonsInBoard = [...document.querySelectorAll(`[data-position][data-color="${currentPlayer}"]`)].filter(element => parseInt(element.dataset.position) > 0 && parseInt(element.dataset.position) + number <= 57)
    if(number == 6){
        document.querySelectorAll(`[data-position="0"][data-color="${currentPlayer}"]`).forEach(element => activeButtons(`#${element.id}`))
        inactiveButtons("#draw")
    }
    if(buttonsInBoard.length > 0){
        buttonsInBoard.forEach(element => activeButtons(`#${element.id}`))
        inactiveButtons("#draw")
    }else{
        nextCurrentPlayer(currentPlayer)
    }
}

export { newListPlayers, checkCurrentPlayer, setCurrentPlayer, nextCurrentPlayer, checkButtonRelease }
