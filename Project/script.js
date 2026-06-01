const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let expression = "";
let justEvaluated = false;

function setDisplay(value) {
    display.value = value;
}

function isOperator(ch) {
    return ch === "+" || ch === "-" || ch === "*" || ch === "/";
}

function currentNumberHasDecimal() {
    // Current number segment is after the last operator
    const parts = expression.split(/[-+*/]/);
    const lastPart = parts[parts.length - 1] ?? "";
    return lastPart.includes(".");
}

function inputDigit(digit) {
    if (justEvaluated) {
        expression = "";
        justEvaluated = false;
    }

    if (expression === "0") {
        expression = digit;
    } else {
        expression += digit;
    }

    setDisplay(expression);
}

function inputDecimal() {
    if (justEvaluated) {
        expression = "";
        justEvaluated = false;
    }

    const lastChar = expression.slice(-1);

    if (expression === "" || isOperator(lastChar)) {
        expression += "0.";
        setDisplay(expression);
        return;
    }

    if (currentNumberHasDecimal()) return;

    expression += ".";
    setDisplay(expression);
}

function inputOperator(op) {
    if (expression === "" && op === "-") {
        expression = "-";
        setDisplay(expression);
        return;
    }

    if (expression === "") return;

    if (justEvaluated) {
        justEvaluated = false;
    }

    const last = expression.slice(-1);
    if (isOperator(last)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }

    setDisplay(expression);
}

function clearAll() {
    expression = "";
    justEvaluated = false;
    setDisplay("0");
}

function deleteOne() {
    if (justEvaluated) {
        clearAll();
        return;
    }

    expression = expression.slice(0, -1);
    setDisplay(expression === "" ? "0" : expression);
}

function applyPercent() {
    // Convert the last number into number / 100
    if (expression === "") return;

    const lastChar = expression.slice(-1);
    if (isOperator(lastChar)) return;

    const match = expression.match(/-?\d*\.?\d+$/);
    if (!match) return;

    const numberText = match[0];
    const numberValue = Number(numberText);
    if (!Number.isFinite(numberValue)) return;

    const percentValue = numberValue / 100;
    expression = expression.slice(0, -numberText.length) + String(percentValue);
    setDisplay(expression);
}

function formatResult(value) {
    if (!Number.isFinite(value)) return "Error";
    if (Number.isInteger(value)) return String(value);

    // Avoid long floating point tails
    return String(parseFloat(value.toFixed(10)));
}

function evaluateExpression() {
    if (expression === "") return;

    while (expression.length > 0 && isOperator(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }

    if (expression === "" || expression === "-") {
        setDisplay("0");
        expression = "";
        return;
    }

    // Allow only digits/operators/decimal/whitespace
    if (!/^[0-9+\-*/.\s]+$/.test(expression)) {
        setDisplay("Error");
        expression = "";
        justEvaluated = true;
        return;
    }

    try {
        const fn = Function('"use strict"; return (' + expression + ');');
        const result = fn();
        const formatted = formatResult(Number(result));

        setDisplay(formatted);
        expression = formatted === "Error" ? "" : formatted;
        justEvaluated = true;
    } catch {
        setDisplay("Error");
        expression = "";
        justEvaluated = true;
    }
}

keys.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "digit") inputDigit(value);
    else if (action === "decimal") inputDecimal();
    else if (action === "operator") inputOperator(value);
    else if (action === "equals") evaluateExpression();
    else if (action === "clear") clearAll();
    else if (action === "delete") deleteOne();
    else if (action === "percent") applyPercent();
});

setDisplay("0");
