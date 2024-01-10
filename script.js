let input = document.getElementById("input-box");
let buttons = document.querySelectorAll("button");
let historyList = document.getElementById("history-list");

let inputString = "";
let calculationHistory = [];


let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener("click", (e) => {
        // let buttonText = e.target.innerHTML;

        //evaluate the expression
        
            if (e.target.innerHTML == "=")
            {
                try {
                    let result = eval(inputString);
                    if (!isFinite(result)) {
                        throw new Error("Invalid operation");
                    }
                    const expression = inputString;
                    calculationHistory.push({expression, result});
                    updateHistoryList();
                    inputString = result;
                    input.value = result;
                }
                catch(error)
                {
                    inputString = "";
                    input.value = "Error";
                }
            }
        //clear history -> AC
        else if (e.target.innerHTML == "AC")
        {
            calculationHistory = [];
            updateHistoryList();
            inputString = "";
            input.value = inputString;
        }
        //clear the cuurent operation task
        else if (e.target.innerHTML == "C")
        {
            inputString = "";
            input.value = inputString;
        }
        //delete the last character
        else if (e.target.innerHTML == "DEL")
        {
            inputString = inputString.slice(0, -1);
            input.value = inputString;
        }

        else{
            inputString += e.target.innerHTML;
            input.value = inputString;
        }
    })
});

function updateHistoryList() {
    historyList.innerHTML = "";
    calculationHistory.forEach(calculation => {
        const listItem = document.createElement("li");
        listItem.textContent = `${calculation.expression} = ${calculation.result}`;
            historyList.appendChild(listItem);
        })
    }

historyList.addEventListener("click", (e) => {
        const clickedItemIndex = Array.from(historyList.children).indexOf(e.target);
        if (clickedItemIndex !== -1) {
            const clickedCalculation = calculationHistory[clickedItemIndex];
            input.value = clickedCalculation.expression;
            inputString = String(clickedCalculation.expression);
        }
    });