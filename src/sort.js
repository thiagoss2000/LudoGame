
const sortNumbers = (number) => {

    document.getElementById("sort").innerHTML = `
        <div id="line1" class="line">
            <div id="sortNumber1" class="number"></div>
            <div id="sortNumber2" class="number"></div>
        </div>
        <div id="line2" class="line">
            <div id="sortNumber3" class="number"></div>
            <div id="sortNumber4" class="number"></div>
        </div>
        <div id="line3" class="line">
            <div id="sortNumber5" class="number"></div>
            <div id="sortNumber6" class="number"></div>
        </div>
    `

    switch(number){
        case 1:
            document.getElementById("sortNumber3").remove();
            document.getElementById("line1").remove();
            document.getElementById("line3").remove();
        case 2:
            document.getElementById("sortNumber1").style.backgroundColor = "antiquewhite";
            document.getElementById("sortNumber6").style.backgroundColor = "antiquewhite";
            document.getElementById("sortNumber3").style.backgroundColor = "antiquewhite";
            document.getElementById("sortNumber4").style.backgroundColor = "antiquewhite";
        case 3:
            document.getElementById("sortNumber1").style.backgroundColor = "antiquewhite";
            document.getElementById("sortNumber6").style.backgroundColor = "antiquewhite";
            document.getElementById("sortNumber3").remove();
        case 4:
            document.getElementById("sortNumber3").style.backgroundColor = "antiquewhite";
            document.getElementById("sortNumber4").style.backgroundColor = "antiquewhite";
        case 5:
            document.getElementById("sortNumber3").style.backgroundColor = "antiquewhite";
        default:
            break;
    }
}

sortNumbers(4)