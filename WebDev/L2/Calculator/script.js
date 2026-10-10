
const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");
const keypad = document.querySelector(".keypad");
const operatorButtons = document.querySelectorAll("[data-operator]");

let currentInput = "0";
let storedValue = null;
let pendingOperator = null;
let waitingForOperand = false;
let expressionText = "";
let lastOperator = null;
let lastOperand = null;
let justCalculated = false;
let errorState = false;

// Convert a number to a readable display string.
function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    const rounded = Number.parseFloat(number.toPrecision(12));
    return String(rounded);
}

// Update the calculator display.
function updateDisplay() {
    resultDisplay.textContent = currentInput;
    expressionDisplay.textContent = expressionText;

    resultDisplay.classList.toggle("error", errorState);

    operatorButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            !errorState &&
            !waitingForOperand &&
            button.dataset.operator === pendingOperator
        );
    });
}

// Reset the entire calculator.
function clearCalculator() {
    currentInput = "0";
    storedValue = null;
    pendingOperator = null;
    waitingForOperand = false;
    expressionText = "";
    lastOperator = null;
    lastOperand = null;
    justCalculated = false;
    errorState = false;

    updateDisplay();
}

// Display an error without crashing the page.
function showError(message = "Cannot divide by zero") {
    currentInput = message;
    storedValue = null;
    pendingOperator = null;
    waitingForOperand = false;
    expressionText = "";
    lastOperator = null;
    lastOperand = null;
    justCalculated = false;
    errorState = true;

    updateDisplay();
}

// Enter a number.
function inputNumber(number) {
    if (errorState) {
        clearCalculator();
    }

    if (waitingForOperand || justCalculated) {
        currentInput = number;
        waitingForOperand = false;
        justCalculated = false;
        expressionText = "";
    } else if (currentInput === "0") {
        currentInput = number;
    } else if (currentInput === "-0") {
        currentInput = "-" + number;
    } else if (currentInput.length < 16) {
        currentInput += number;
    }

    updateDisplay();
}

// Enter a decimal point.
function inputDecimal() {
    if (errorState) {
        clearCalculator();
    }

    if (waitingForOperand || justCalculated) {
        currentInput = "0.";
        waitingForOperand = false;
        justCalculated = false;
        expressionText = "";
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

// Perform one arithmetic operation.
function calculate(a, operator, b) {
    switch (operator) {
        case "+":
            return a + b;

        case "−":
            return a - b;

        case "×":
            return a * b;

        case "÷":
            if (b === 0) {
                return null;
            }
            return a / b;

        default:
            return b;
    }
}

// Handle operator chaining from left to right.
function chooseOperator(operator) {
    if (errorState) {
        clearCalculator();
    }

    const inputValue = Number.parseFloat(currentInput);

    if (!Number.isFinite(inputValue)) {
        clearCalculator();
        return;
    }

    if (pendingOperator && !waitingForOperand) {
        const result = calculate(
            storedValue,
            pendingOperator,
            inputValue
        );

        if (result === null) {
            showError();
            return;
        }

        if (!Number.isFinite(result)) {
            showError("Result out of range");
            return;
        }

        currentInput = formatNumber(result);
        storedValue = result;
    } else if (storedValue === null || justCalculated) {
        storedValue = inputValue;
    }

    pendingOperator = operator;
    waitingForOperand = true;
    justCalculated = false;
    expressionText = `${currentInput} ${operator}`;

    lastOperator = null;
    lastOperand = null;

    updateDisplay();
}

// Calculate the final result.
function calculateResult() {
    if (errorState) {
        return;
    }

    // Repeat the last operation when equals is pressed again.
    if (pendingOperator === null && justCalculated &&
        lastOperator !== null) {

        const currentValue = Number.parseFloat(currentInput);
        const repeatedResult = calculate(
            currentValue,
            lastOperator,
            lastOperand
        );

        if (repeatedResult === null) {
            showError();
            return;
        }

        if (!Number.isFinite(repeatedResult)) {
            showError("Result out of range");
            return;
        }

        expressionText =
            `${formatNumber(currentValue)} ${lastOperator} ` +
            `${formatNumber(lastOperand)} =`;

        currentInput = formatNumber(repeatedResult);
        updateDisplay();
        return;
    }

    if (pendingOperator === null || storedValue === null) {
        return;
    }

    // If equals is pressed immediately after an operator,
    // use the stored value as the second operand.
    const secondValue = waitingForOperand
        ? storedValue
        : Number.parseFloat(currentInput);

    const firstValue = storedValue;
    const operator = pendingOperator;

    const result = calculate(firstValue, operator, secondValue);

    if (result === null) {
        showError();
        return;
    }

    if (!Number.isFinite(result)) {
        showError("Result out of range");
        return;
    }

    expressionText =
        `${formatNumber(firstValue)} ${operator} ` +
        `${formatNumber(secondValue)} =`;

    currentInput = formatNumber(result);
    storedValue = null;
    pendingOperator = null;
    waitingForOperand = false;
    lastOperator = operator;
    lastOperand = secondValue;
    justCalculated = true;

    updateDisplay();
}

// Remove the last digit.
function backspace() {
    if (errorState || justCalculated) {
        clearCalculator();
        return;
    }

    if (waitingForOperand) {
        return;
    }

    if (currentInput.length <= 1 ||
        (currentInput.length === 2 && currentInput.startsWith("-"))) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}

// Convert the current value into a percentage.
function calculatePercent() {
    if (errorState) {
        clearCalculator();
    }

    const value = Number.parseFloat(currentInput);

    if (!Number.isFinite(value)) {
        return;
    }

    currentInput = formatNumber(value / 100);
    waitingForOperand = false;
    justCalculated = false;
    expressionText = "";
    updateDisplay();
}

// Change positive to negative and negative to positive.
function toggleSign() {
    if (errorState) {
        clearCalculator();
    }

    if (currentInput === "0") {
        return;
    }

    currentInput = currentInput.startsWith("-")
        ? currentInput.slice(1)
        : "-" + currentInput;

    justCalculated = false;
    updateDisplay();
}

// Attach one event listener to the keypad.
keypad.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.number !== undefined) {
        inputNumber(button.dataset.number);
        return;
    }

    if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
        return;
    }

    switch (button.dataset.action) {
        case "clear":
            clearCalculator();
            break;

        case "backspace":
            backspace();
            break;

        case "decimal":
            inputDecimal();
            break;

        case "equals":
            calculateResult();
            break;

        case "percent":
            calculatePercent();
            break;

        case "sign":
            toggleSign();
            break;
    }
});

// Keyboard support.
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        inputNumber(key);
        return;
    }

    if (key === ".") {
        inputDecimal();
        return;
    }

    const operators = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    if (operators[key]) {
        event.preventDefault();
        chooseOperator(operators[key]);
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
        return;
    }

    if (key === "Backspace") {
        backspace();
        return;
    }

    if (key === "Escape" || key.toLowerCase() === "c") {
        clearCalculator();
        return;
    }

    if (key === "%") {
        calculatePercent();
    }
});

// Initialize the display.
updateDisplay();