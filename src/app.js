
const sizeBoton = 6.2

const calcPosition = (size, position) => {
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

let time = 0
setInterval(() => {

    if(time > 51)
        time = 0
    const valuePosition = calcPosition(sizeBoton, time);
    document.documentElement.style.setProperty('--valueLevelGreen', `${valuePosition[0]}%`)
    document.documentElement.style.setProperty('--valueUpGreen', `${valuePosition[1]}%`)
    
    time++
}, 100);


// const valuePosition = calcPosition(sizeBoton, 1);
document.documentElement.style.setProperty('--valueLevelRed', `${-25.2}%`)
document.documentElement.style.setProperty('--valueUpRed', `${31.3 + sizeBoton}%`)

document.documentElement.style.setProperty('--valueLevelYelow', `${31.3}%`)
document.documentElement.style.setProperty('--valueUpYelow', `${-25.2 + sizeBoton}%`)

document.documentElement.style.setProperty('--valueLevelBlue', `${-25.2}%`)
document.documentElement.style.setProperty('--valueUpBlue', `${-25.2 + sizeBoton}%`)

document.getElementById("map").innerHTML = `
    <div id="boton" class="botonGreen"></div>
    <div id="boton" class="botonRed"></div>
    <div id="boton" class="botonBlue"></div>
    <div id="boton" class="botonYelow"></div>

`;
