
const randomDraw = (max) => {
    return Math.floor(Math.random() * max);
}

const drawNumbers = (number) => {

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

    switch(number){
        case 1:
            document.getElementById("drawNumber3").remove();
            document.getElementById("line1").remove();
            document.getElementById("line3").remove();
        case 2:
            document.getElementById("drawNumber1").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber6").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber3").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber4").style.backgroundColor = "antiquewhite";
        case 3:
            document.getElementById("drawNumber1").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber6").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber3").remove();
        case 4:
            document.getElementById("drawNumber3").style.backgroundColor = "antiquewhite";
            document.getElementById("drawNumber4").style.backgroundColor = "antiquewhite";
        case 5:
            document.getElementById("drawNumber3").remove();
        default:
            break;
    }
}

document.getElementById("draw").onclick = () => drawNumbers(randomDraw(7))
