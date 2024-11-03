// script.js

let display = document.getElementById("display");
let currentInput = "";
let operator = "";
let operand1 = null;
let resetDisplay = false;

function appendNumber(number) {
    if (resetDisplay) {
        display.innerText = "";
        resetDisplay = false;
    }
    display.innerText += number;
}

function appendOperator(op) {
    if (display.innerText !== "" && operator === "") {
        operand1 = parseFloat(display.innerText);
        operator = op;
        currentInput = "";
        resetDisplay = true;
    }
}

function calculateResult() {
    if (operator !== "" && operand1 !== null) {
        let operand2 = parseFloat(display.innerText);
        let result;
        
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand2 !== 0 ? operand1 / operand2 : "Error";
                break;
        }

        display.innerText = result;
        resetDisplay = true;
        operator = "";
        operand1 = null;
    }
}

function clearDisplay() {
    display.innerText = "0";
    operand1 = null;
    operator = "";
    resetDisplay = false;
}

function deleteLast() {
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = "0";
    }
}
