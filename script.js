const resultDisplay = document.querySelector(".result");
const calDisplay = document.querySelector(".cal");

// Arithmetic operations
function add(n1, n2) {
    result.data = n1 + n2;
    resultDisplay.innerHTML += ` ${n1} + ${n2} `;
    calDisplay.innerHTML = `= ${result.data}`;
}

function sub(n1, n2) {
    result.data = n1 - n2;
    resultDisplay.innerHTML += ` ${n1} - ${n2} `;
    calDisplay.innerHTML = `= ${result.data}`;
}

function mul(n1, n2) {
    result.data = n1 * n2;
    resultDisplay.innerHTML += `${n1} * ${n2} `;
    calDisplay.innerHTML = `= ${result.data}`;
}

function div(n1, n2) {
    if (n2 === 0) {
        alert("Cannot divide by zero.");
        return;
    }
    result.data = n1 / n2;
    resultDisplay.innerHTML += `${n1} / ${n2} `;
    calDisplay.innerHTML = `= ${result.data}`;
}

function mod(n1, n2) {
    result.data = n1 % n2;
    resultDisplay.innerHTML += `${n1} % ${n2} `;
    calDisplay.innerHTML = `= ${result.data}`;
}

// Operation handler
function operate() {
    let n1 = Number(nom1.data);
    let n2 = Number(nom2.data);
    switch (op.oper) {
        case "+": add(n1, n2); break;
        case "-": sub(n1, n2); break;
        case "*": mul(n1, n2); break;
        case "/": div(n1, n2); break;
        case "%": mod(n1, n2); break;
    }
}

const result = { data: "" };
const op = { oper: "" };
const nom2 = { data: "" };
const nom1 = { data: "" };

// Equal button logic
const eq = document.querySelector(".equal");
eq.addEventListener("click", () => {
    if (nom2.data && nom1.data) {
        resultDisplay.innerHTML = "";
        operate();
        nom1.data = result.data; 
        nom2.data = "";           
        calDisplay.innerHTML = `=${result.data}`;
    }
});

// Number buttons
const nums = document.querySelectorAll(".num");
nums.forEach(num => {
    num.addEventListener("click", () => {
        if (op.oper === "") {
            nom1.data += num.innerHTML;
            resultDisplay.innerHTML += num.innerHTML;
        } else {
            nom2.data += num.innerHTML;
            resultDisplay.innerHTML += num.innerHTML;
        }
    });
});

// Decimal button
const dots = document.querySelector(".dot");
dots.addEventListener("click", () => {
    if (op.oper === "") {
        if (!nom1.data.includes(".")) {
            nom1.data += ".";
            resultDisplay.innerHTML += ".";
        }
    } else {
        if (!nom2.data.includes(".")) {
            nom2.data += ".";
            resultDisplay.innerHTML += ".";
        }
    }
});

// Operator buttons 
let sign = ["+", "-", "/", "%", "*"];
const ops = document.querySelectorAll(".op");

ops.forEach(ope => {
    ope.addEventListener("click", () => {
        if (op.oper !== "") {
            // Replace previous operator if nom2 is empty (consecutive operators)
            if (nom2.data === "") {
                resultDisplay.innerHTML = resultDisplay.innerHTML.slice(0, -1) + ope.innerHTML;
                op.oper = ope.innerHTML;
                return;
            }
        }

        if (nom1.data !== "" && nom2.data !== "") {
            operate();
            nom1.data = result.data; 
            nom2.data = "";           
            op.oper = ope.innerHTML;
            resultDisplay.innerHTML = `${result.data}${op.oper}`;
            calDisplay.innerHTML = `=${result.data}`;
        } else {
            op.oper = ope.innerHTML;
            resultDisplay.innerHTML += `${op.oper}`;
        }
    });
});

// Clear button
const clc = document.querySelector(".clear");
clc.addEventListener("click", () => {
    nom1.data = "";
    nom2.data = "";
    result.data = "";
    op.oper = "";
    resultDisplay.innerHTML = "";
    calDisplay.innerHTML = "";
});

// Plus/Minus button
const pm = document.querySelector(".plusormin");
pm.addEventListener("click", () => {
    if (nom2.data === "" && op.oper === "") {
        if (nom1.data[0] === "-") {
            nom1.data = nom1.data.slice(1);
        } else {
            nom1.data = "-" + nom1.data;
        }
        resultDisplay.innerHTML = nom1.data;
    } else {
        if (nom2.data[0] === "-") {
            nom2.data = nom2.data.slice(1);
        } else {
            nom2.data = "-" + nom2.data;
        }
        resultDisplay.innerHTML = `${nom1.data}${op.oper}${nom2.data}`;
    }
});
