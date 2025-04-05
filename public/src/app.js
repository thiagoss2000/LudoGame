
const sizeButton = 6.2

// calcula posicaonno eixo y e x na trilha de chegada com base no numero da casa, tamanho do botao e trilha de cor correspondente
const positionMapFinish = (size, position, color) => {
    const valueFinish = {   //multiplicadores de deslocamento nos eixos x e y para cada botao com base no numero da casa de chegada
        green: {level: [0, 0, 0, 0, 0, 0], up: [6, 5, 4, 3, 2, 1]},
        red: {level: [6, 5, 4, 3, 2, 1], up: [0, 0, 0, 0, 0, 0]}, 
        blue: {level: [0, 0, 0, 0, 0, 0], up: [-6, -5, -4, -3, -2, -1]},
        yelow: {level: [-6, -5, -4, -3, -2, -1], up: [0, 0, 0, 0, 0, 0]}, 
    }
    return [    // retorna array com as distancias [top, left]
        size/2 + (valueFinish[color]["up"][position] * size),
        size/2 + (valueFinish[color]["level"][position] * size)
    ]
}

// calcula posicao no eixo y e x com base no numero da casa do tabulerio e tamanho do botao
const positionMap = (size, position) => {   //multiplicadores de deslocamento nos eixos x e y para cada botao com base no numero da casa do tabuleiro
    const level = [-2, -3, -4, -5, -6, -7, -7, -7, -6, -5, -4, -3, -2]
    const up = [1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1]

    if(position <= 12){  // primeiro quadrante, caminho verde
        return [
            size/2 + (level[position] * -size),
            size/2 + (up[position] * -size)
        ]
    }else if(position <= 25){  // segundo quadrante, caminho vermelho, rotacao 90 graus
        return [
            size/2 + (up[12 - (position - 13)] * -size),
            size/2 + (level[position - 13] * -size)
        ]
    }else if(position <= 38){  // terceiro quadrante, caminho azul, rotacao 180 graus
        return [
            size/2 + (level[position - 26] * size),
            size/2 + (up[position - 26] * size)
        ]
    }else{  // quarto quadrante, caminho amarelo, rotacao 270 graus
        return [
            size/2 + (up[12 - (position - 39)] * size),
            size/2 + (level[position - 39] * size)
        ]
    }   // retorna array com as distancias [top, left]
}

// calcula casa correspondente a posicao 0 a 50 para cada cor
const calcValueColor = (valuePosition, colorButton) => {
    const displacement = { green: 8, red: 21, blue: 34, yelow: 47 }
    const calcPosition = displacement[colorButton] + valuePosition
    // retorna a casa correspondente no tabuleiro
    return calcPosition <= 51 ? calcPosition : calcPosition - 52
    // 0 ~ 49 + 6   ex green > (0+8) <= 51 ? 0+8 : 0+8-52 
}

//  cria elementos html correspondentes aos botoes da lista de cores de botoes recebida
const createButtons = (listColors) => {
    const idButtons = [1, 2, 3, 4]
    const listButtons = listColors.map(color => {
        return idButtons.reduce((acc, id) => acc +     //revise    ********
        `<div id="${color[0] + id}" class="button button_${color}" data-color="${color}" data-position="0" data-casemap="-1"></div>`,""
        )
    })
    const includeButtons = listButtons.reduce((acc, groupButtons) => acc + groupButtons,"")
    return includeButtons   // retorna string correspondente aos elementos
} 

const initButtons = (identifier, fn) => {
    // Adiciona o evento de clique a ao elemento referido ligando a funcao recebida
    document.querySelectorAll(identifier).forEach(elemento => {
            elemento.addEventListener("click", fn)
    })
}

const activeButtons = (identifier) => {   // modificar *********
    document.querySelectorAll(identifier).forEach(elemento => elemento.classList.add("clickable"))
}

const inactiveButtons = (identifier) => {
    document.querySelectorAll(identifier).forEach(elemento => elemento.classList.remove("clickable"))
}

const setPosition = (position, id, color) => {
    const valuePosition = position <= 50 ? positionMap(sizeButton, calcValueColor(position, color), color) : positionMapFinish(sizeButton, position-51, color);
    document.querySelector(`#${id}`).style.left = `${50 - valuePosition[0]}%`
    document.querySelector(`#${id}`).style.top = `${50 - valuePosition[1]}%`
    // registra posicao padrao nas casas do tabuleiro
    document.querySelector(`#${id}`).setAttribute("data-caseMap", `${calcValueColor(position, color)}`)
}

const returnOpponent = (player, position) => {
    const opponents = ["green", "red", "blue", "yelow"].filter(element => element != player)
    const caseMap = calcValueColor(position, player)
    const protectedCase = [8, 21, 34, 47]
    //   casas iniciais sao protegidas, nao causa retorno do botao
    if(protectedCase.includes(caseMap)) return 0

    opponents.forEach(opponentColor => {
        document.querySelectorAll(`.button[data-color="${opponentColor}"]`).forEach(element => {
            const boardPosition = parseInt(element.dataset.casemap)
            const idOpponent = parseInt(element.id[1])
            if(boardPosition > 1 && caseMap == boardPosition) {    // retorna botao para posicao inicial
                element.dataset.position = "0"
                setInitialPositions([opponentColor], sizeButton, [idOpponent])
            }
        })
    })
}

const setInitialPositions = (listColors, size, listId = [1, 2, 3, 4]) => {
    const classColors = {green: [31.3, 31.3], red: [-25.2, 31.3], blue: [-25.2, -25.2], yelow: [31.3, -25.2]}   //posicao central inicial para cada cor
    const initialPosition = {up: [-1, 0, 0, 1], level: [0, -1, 1, 0]}   //multiplicadores de deslocamento nos eixos x e y para cada botao

    listColors.forEach(color => {
        listId.forEach((id) => {
            document.querySelector(`#${color[0] + id}`).style.left = `${50 - classColors[color][0] + initialPosition.level[id-1] * size}%`
            document.querySelector(`#${color[0] + id}`).style.top = `${50 - classColors[color][1] + initialPosition.up[id-1] * size}%`
        })
    })
}

export { createButtons, initButtons, setInitialPositions, activeButtons, inactiveButtons, setPosition, returnOpponent, sizeButton } 
