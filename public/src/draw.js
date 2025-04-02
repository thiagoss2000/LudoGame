import { initBotons, setInitialPositions, sizeBoton } from "./app.js"

// retorna numero de 0 a 6
const randomDraw = (max) => {
    return Math.floor(Math.random() * max);
}

const initDrawer = (fn) => {
    document.getElementById("draw").innerHTML = `
        <div id="line1" class="line">
            <div id="drawNumber1" class="number"></div>
            <div id="drawNumber2" class="number"></div>
        </div>
        <div id="line2" class="line">
            <div id="drawNumber3" class="number"></div>
            <div id="drawNumber4" class="number"></div>
        </div>
        <div id="line3" class="line">
            <div id="drawNumber5" class="number"></div>
            <div id="drawNumber6" class="number"></div>
        </div>
    `
    return fn
}

const drawNumbers = (number) => {
    switch(number){
        case 1: // case 1 persiste numero 1
            document.getElementById("drawNumber3").remove();
            document.getElementById("line1").remove();
            document.getElementById("line3").remove();
            break;
        case 2: // case 2 persiste numero 2
            document.getElementById("drawNumber1").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber6").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber3").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber4").style.backgroundColor = "antiquewhite";
            break;
        case 3: // case 3 persiste numero 3
            document.getElementById("drawNumber1").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber6").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber3").remove();
            break;
        case 4: // case 4 persiste numero 4
            document.getElementById("drawNumber3").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber4").style.backgroundColor = "antiquewhite";
            break;
        case 5: // case 5 persiste numero 5
            document.getElementById("drawNumber3").remove();
            break;
        default:    // default persiste numero 6 para valores diferentes de 1 a 5 aumentando as chances de sair 6 para 28% 
            break;
    }
}

document.getElementById("draw").onclick = () => { 
    initDrawer(drawNumbers)(randomDraw(6)) 

    document.getElementById("map").innerHTML = initBotons(["blue", "yelow"])
    setInitialPositions("blue", sizeBoton)
    setInitialPositions("yelow", sizeBoton)
}
