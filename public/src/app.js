
const sizeBoton = 6.2

// calcula posicaonno eixo y e x na trilha de chegada com base no numero da casa, tamanho do botao e trilha de cor correspondente
const positionMapFinish = (size, position, color) =>{
    const valueFinish = {   //multiplicadores de deslocamento nos eixos x e y para cada botao com base no numero da casa de chegada
        green: {level: [0, 0, 0, 0, 0, 0], up: [6, 5, 4, 3, 2, 1]},
        red: {level: [6, 5, 4, 3, 2, 1], up: [0, 0, 0, 0, 0, 0]}, 
        blue: {level: [0, 0, 0, 0, 0, 0], up: [-6, -5, -4, -3, -2, -1]},
        yelow: {level: [-6, -5, -4, -3, -2, -1], up: [0, 0, 0, 0, 0, 0]}, 
    }
    return [
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
    }
}

// calcula casa correspondente a posicao 0 a 50 para cada cor
const calcValueColor = (valuePosition, colorBoton) => {
    const displacement = { green: 8, red: 21, blue: 34, yelow: 47 }
    const calcPosition = displacement[colorBoton] + valuePosition
    return calcPosition <= 51 ? calcPosition : calcPosition - 52
    // 0 ~ 49 + 6
    // green > (0+8) <= 51 0+8 : 51-0+8  
}

//  cria elementos html correspondentes a lista de cores de botoes recebida
const initBotons = (listColors) => {
    const idbBotons = [1, 2, 3, 4]

    const listBotons = listColors.map(color => {
        return idbBotons.reduce((acc, id) => acc +
        `<div id="boton" class="boton_${color}" data-idb="${color[0] + id}"></div>`,""
        )
    })

    const includeBotons = listBotons.reduce((acc, groupBotons) => acc + groupBotons,"")

    return includeBotons
} 

const selectIten = (element, clasname = "select") => {
    document.querySelectorAll("div").forEach(elemento => {
        elemento.classList.remove(clasname);
    });
    element.classList.toggle(clasname)
    console.log("ID:", element.dataset.idb);
}

const activeBotons = (color) => {
    // Agora adiciona o evento de clique a cada botão
    document.querySelectorAll(`.boton_${color}`).forEach(elemento => {
        elemento.addEventListener("click", (event) => selectIten(event.currentTarget))
        elemento.classList.add("clickable")
    })
}

const setInitialPositions = (listColors, size) => {
    const classColors = {green: [31.3, 31.3], red: [-25.2, 31.3], blue: [-25.2, -25.2], yelow: [31.3, -25.2]}   //posicao central inicial para cada cor
    const initialPosition = {up: [-1, 0, 0, 1], level: [0, -1, 1, 0]}   //multiplicadores de deslocamento nos eixos x e y para cada botao
    const idbBotons = [1, 2, 3, 4]  //identificador numerico de cada botao

    listColors.forEach(color => {
        idbBotons.forEach((id, ind) => {
            document.querySelector(`[data-idb="${color[0] + id}"]`).style.left = `${50 - classColors[color][0] + initialPosition.level[ind] * size}%`
            document.querySelector(`[data-idb="${color[0] + id}"]`).style.top = `${50 - classColors[color][1] + initialPosition.up[ind] * size}%`
        })
    })
}


const colorsBotons = ["green", "red", "blue", "yelow"]

document.getElementById("map").innerHTML = initBotons(colorsBotons)
setInitialPositions(colorsBotons, sizeBoton)
activeBotons("green")
export { initBotons, setInitialPositions, sizeBoton } 


let timer = 0
let colorInd = 0
if(0) {
    setInterval(() => {

        if(timer > 56){
            timer = 0
            colorInd++
        }
        if(colorInd > 3)
            colorInd = 0

        const valuePosition = timer <= 50 ? positionMap(sizeBoton, calcValueColor(timer, colorsBotons[colorInd]), colorsBotons[colorInd]) : positionMapFinish(sizeBoton, timer-51, colorsBotons[colorInd]);
        document.documentElement.style.setProperty(`--valueLevel_${colorsBotons[colorInd]}`, `${valuePosition[0]}%`)
        document.documentElement.style.setProperty(`--valueUp_${colorsBotons[colorInd]}`, `${valuePosition[1]}%`)
            
        timer++
    }, 200)
}
