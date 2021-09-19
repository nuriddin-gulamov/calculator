
// Light Dark Mode
document.getElementById("dark-mode").style.display = "inline";
document.getElementById("dark-mode").onclick = () => {
    document.getElementById("light-mode").style.display = "inline";
    document.getElementsByClassName("container")[0].classList.add("container-dark");
    document.getElementsByClassName("calculator-container")[0].classList.add("calculator-container-dark");
    document.getElementsByClassName("previous-operand")[0].classList.add("previous-operand-dark");
    document.getElementsByClassName("current-operand")[0].classList.add("current-operand-dark");
    for(var i = 0; i < document.getElementsByClassName("button").length; i++) {
        document.getElementsByClassName("button")[i].classList.add("button-dark");
    }
    for(var t = 0; t < document.getElementsByClassName("button-dark").length; t++) {
        document.getElementsByClassName("button-dark")[t].onclick = function () {
            this.classList.add("button-dark-click");
            setTimeout(() => {
                this.classList.remove("button-dark-click");
            }, 133);
            var clickSound = new Audio("./clicksound.mp3");
            clickSound.play();
        }
    }

    document.getElementById("light-mode").onclick = () => {
        document.getElementById("light-mode").style.display = "none";
        document.getElementsByClassName("container")[0].classList.remove("container-dark");
        document.getElementsByClassName("calculator-container")[0].classList.remove("calculator-container-dark");
        document.getElementsByClassName("previous-operand")[0].classList.remove("previous-operand-dark");
        document.getElementsByClassName("current-operand")[0].classList.remove("current-operand-dark");
        for(var i = 0; i < document.getElementsByClassName("button").length; i++) {
            document.getElementsByClassName("button")[i].classList.remove("button-dark");
        }

        for(var t = 0; t < document.getElementsByClassName("button").length; t++) {
            document.getElementsByClassName("button")[t].onclick = function () {
                this.classList.add("button-click");
                setTimeout(() => {
                    this.classList.remove("button-click");
                }, 133);
                var clickSound = new Audio("./clicksound.mp3");
                clickSound.play();
            }
        }
    }
}

for(var t = 0; t < document.getElementsByClassName("button").length; t++) {
    document.getElementsByClassName("button")[t].onclick = function () {
        this.classList.add("button-click");
        setTimeout(() => {
            this.classList.remove("button-click");
        }, 133);
        var clickSound = new Audio("./clicksound.mp3");
        clickSound.play();
    }
}

// Variables
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const allClear = document.querySelector("[data-all-clear]");
const del = document.querySelector("[data-delete]");
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");

// Calculator Class Object
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.calculate();
        }
        this.previousOperand = this.currentOperand + operation;
        this.currentOperand = "";
        this.operation = operation;
    }

    calculate() {
        let result
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand    );
        switch (this.operation) {
            case "/":
                result = prev / current;
                break;

            case "*":
                result = prev * current;
                break;

            case "+":
                result = prev + current;
                break;

            case "-":
                result = prev - current;
                break;
                
            default: return;
        }
        this.previousOperand = "";
        this.currentOperand = result;
        this.operation = undefined;
    }

    displayUp() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

allClear.addEventListener("click", () => {
    calculator.clear();
    calculator.displayUp();
});

del.addEventListener("click", () => {
    calculator.delete();
    calculator.displayUp();
});

numbers.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.displayUp();
    });
});

operations.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.displayUp();
    })
})

equals.addEventListener("click", () => {
    calculator.calculate();
    calculator.displayUp();
})