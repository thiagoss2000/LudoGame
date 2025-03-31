
const sizeBoton = 6.2

const positionMapFinish = (size, position, color) =>{
    const valueFinish = { 
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

const positionMap = (size, position) => {
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

let timer = 0
const colorsBotons = ["green", "red", "blue", "yelow"]
let colorInd = 0
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

const calcValueColor = (valuePosition, colorBoton) => {
    const displacement = { green: 8, red: 21, blue: 34, yelow: 47 }
    const calcPosition = displacement[colorBoton] + valuePosition
    return calcPosition <= 51 ? calcPosition : calcPosition - 52
    // 0 ~ 49 + 6
    // green > (0+8) <= 51 0+8 : 51-0+8  
}


// const valuePosition = calcPosition(sizeBoton, 1);
document.documentElement.style.setProperty('--valueLevel_green', `${31.3}%`)
document.documentElement.style.setProperty('--valueUp_green', `${31.3 + sizeBoton}%`)

document.documentElement.style.setProperty('--valueLevel_red', `${-25.2}%`)
document.documentElement.style.setProperty('--valueUp_red', `${31.3 + sizeBoton}%`)

document.documentElement.style.setProperty('--valueLevel_yelow', `${31.3}%`)
document.documentElement.style.setProperty('--valueUp_yelow', `${-25.2 + sizeBoton}%`)

document.documentElement.style.setProperty('--valueLevel_blue', `${-25.2}%`)
document.documentElement.style.setProperty('--valueUp_blue', `${-25.2 + sizeBoton}%`)

document.getElementById("map").innerHTML = `
    <div id="boton" class="botonGreen"></div>
    <div id="boton" class="botonRed"></div>
    <div id="boton" class="botonBlue"></div>
    <div id="boton" class="botonYelow"></div>

`;
