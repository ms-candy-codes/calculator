let buttons = document.querySelectorAll("button");
let display = document.getElementsByClassName("numberCalculator")[0];
let equalButton = document.getElementById("equal");
let obj = { key1: null, key2: null, operator: null };
let keyCount = 1;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let operators = "-+*/%";
        let value = button.textContent.trim();

        if (value === "AC") {
            obj = { key1: null, key2: null, operator: null };
            display.textContent = '';
            keyCount = 1;
            return;
        }

        if (!operators.includes(value)) {
            let num = Number(value);
            if (!isNaN(num)) {
                if (obj[`key${keyCount}`] === null) {
                    obj[`key${keyCount}`] = num; 
                } else {
                    obj[`key${keyCount}`] = obj[`key${keyCount}`] * 10 + num; 
                }
            }
        } else {
            if (obj.key1 !== null && obj.key2 !== null) {
                calculate();
            }
            obj.operator = value;
            keyCount = 2;
        }

        updateDisplay();
    });
});

equalButton.addEventListener("click", () => {
    if (obj.key1 !== null && obj.key2 !== null) {
        calculate();
    } else {
        display.textContent = "Incomplete operation!";
    }
});

function calculate() {
    let { key1, key2, operator } = obj;
    if (key1 === null || key2 === null) return;

    let result;
    switch (operator) {
        case "-":
            result = key1 - key2;
            break;
        case "+":
            result = key1 + key2;
            break;
        case "*":
            result = key1 * key2;
            break;
        case "/":
            result = key2 !== 0 ? key1 / key2 : "Cannot divide by zero";
            break;
        case "%":
            result = key2 !== 0 ? key1 % key2 : "Cannot divide by zero";
            break;
        default:
            display.textContent = "Invalid operation";
            return;
    }

    display.textContent = result;
    obj = { key1: result, key2: null, operator: null }; 
    keyCount = 2; 
}

function updateDisplay() {
    let { key1, key2, operator } = obj;
    display.textContent = `${key1 !== null ? key1 : ""} ${operator ? operator : ""} ${key2 !== null ? key2 : ""}`;
}
