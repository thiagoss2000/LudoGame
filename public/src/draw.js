import { checkButtonRelease, checkCurrentPlayer, newListPlayers, nextCurrentPlayer, setCurrentPlayer } from "./players.js";

// retorna numero de 0 a 6
const randomDraw = (max) => {
    return Math.floor(Math.random() * max) + 1;
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
    document.getElementById("draw").setAttribute("data-number", `${number}`)
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
        default:    // default persiste numero 6 
            break;
    }
}

document.getElementById("draw").onclick = (element) => { 
  
    if(!element.currentTarget.classList.contains("clickable")) return 0

    if(!checkCurrentPlayer()) {
        const newCurrentPlayer = randomDraw(newListPlayers().length)
        initDrawer(drawNumbers)(newCurrentPlayer)
        setCurrentPlayer(newCurrentPlayer - 1, newListPlayers())
    }else{
        const randomNumber = randomDraw(6)
        initDrawer(drawNumbers)(randomNumber) 
        checkButtonRelease(randomNumber)
    }
}
