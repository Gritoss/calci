const resultDisplay = document.querySelector(".result");
const calDisplay = document.querySelector(".cal");

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
    resultDisplay.innerHTML += `${n1}*${n2} `;
    calDisplay.innerHTML = `=${result.data}`;
}

function div(n1, n2) {
    result.data = n1 / n2;
    resultDisplay.innerHTML += `${n1} / ${n2} `;
    calDisplay.innerHTML = `= ${result.data}`;
}

function mod(n1, n2) {
    result.data = n1 % n2;
    resultDisplay.innerHTML += `${n1} % ${n2} `;
    calDisplay.innerHTML = `=${result.data}`;
}

function operate() {
    let n1 = Number(nom1.data);
    let n2 = Number(nom2.data);
    switch (op.oper) {
        case "+":
            add(n1, n2);
            break;
        case "-":
            sub(n1, n2);
            break;
        case "*":
            mul(n1, n2);
            break;
        case "/":
            div(n1, n2);
            break;
        case "%":
            mod(n1, n2);
            break;
    }
}

const result = { data: "" };
const op = { oper: "" };
const nom2 = { data: "" };
const nom1 = { data: "" };

const eq = document.querySelector(".equal");
eq.addEventListener("click", () => {
    if ((nom2.data && nom1.data) !== "") {
        resultDisplay.innerHTML="";
        operate();
    }
});

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

const dots = document.querySelector(".dot");
dots.addEventListener("click", () => {
    if (op.oper === "") {
        nom1.data += ".";
        resultDisplay.innerHTML += ".";
    } 
    else {
        nom2.data += ".";
        resultDisplay.innerHTML += ".";
    }
});
let found = false;
let sign = ["+","-","/","%","*"];
let numb = ["1","2","3","4","5","6","7","8","9"]
const ops = document.querySelectorAll(".op");
ops.forEach(ope => {
    ope.addEventListener("click", () => {
        for(let i = 0;i<sign.length;i++)
        {
            if(resultDisplay.innerHTML.slice(0,-1)===sign[i])
                {
                    found = true;
                    break ;
                }
        }
        if (op.oper !== "") {
            if(found)
            {
                op.oper=sign[i];
                resultDisplay.innerHTML = resultDisplay.innerHTML.slice(0, -1) + op.oper;
                operate();
                nom1.data = result.data;
                calDisplay.innerHTML = `=${result.data}`;
                nom2.data = "";
            }
            else{
                if (nom2.data === ""){
                    console.log(resultDisplay.innerHTML.slice(0, -1))
                    resultDisplay.innerHTML = resultDisplay.innerHTML.slice(0, -1) + ope.textContent
                    op.oper=ope.textContent
                }
                else{
                resultDisplay.innerHTML="";
                operate();
                nom1.data = result.data;
                resultDisplay.innerHTML += `${ope.innerHTML}`;
                calDisplay.innerHTML = `=${result.data}`;
                op.oper = ope.innerHTML;
                nom2.data = "";
                }
            }
        } 
        else {
            if(found)
            {
                op.oper=sign[i];
                resultDisplay.innerHTML = resultDisplay.innerHTML.slice(0, -1) + op.oper;
                

            }
            op.oper = ope.innerHTML;
            resultDisplay.innerHTML += `${op.oper}`;

        }
    });
});

const clc = document.querySelector(".clear");
clc.addEventListener("click", () => {
    nom1.data = "";
    nom2.data = "";
    result.data = "";
    op.oper = "";
    resultDisplay.innerHTML = "";
    calDisplay.innerHTML = "";
});

const pm = document.querySelector(".plusormin");
pm.addEventListener("click", () => {
    if (nom2.data === "" && op.oper === "") {
        if (nom1.data[0] === "-") {
            nom1.data = nom1.data.slice(1);
        } else {
            nom1.data = "-" + nom1.data;
        }
    resultDisplay.innerHTML=nom1.data;
    } else {
        if (nom2.data[0] === "-") {
            nom2.data = nom2.data.slice(1);
        } else {
            nom2.data = "-" + nom2.data;
        }
    resultDisplay.innerHTML = resultDisplay.innerHTML.slice(0, -1) + nom2.data;
    }
});