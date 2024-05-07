let num1 = "";
let num2 = "";
let operator = null;
let display = document.getElementById("display");
let prevResult = null; // Lưu trữ kết quả trước đó

function addNumber(num) {
  if (prevResult !== null) {
    num1 = prevResult.toString();
    prevResult = null;
  }
  if (operator === null) {
    num1 += num;
    display.innerHTML = num1;
  } else {
    num2 += num;
    display.innerHTML = num2;
  }
}

function addDecimal() {
  if (operator === null) {
    if (!num1.includes(".")) {
      num1 += ".";
      display.innerHTML = num1;
    }
  } else {
    if (!num2.includes(".")) {
      num2 += ".";
      display.innerHTML = num2;
    }
  }
}

function setOperator(op) {
  if (operator !== null && num1 !== "" && num2 !== "") {
    calculator();
  }

  switch (op) {
    case "+":
      operator = "add";
      break;
    case "-":
      operator = "subtract";
      break;
    case "x":
      operator = "multiply";
      break;
    case "/":
      operator = "divide";
      break;
    default:
      console.log("Không hợp lệ");
      break;
  }
}

function calculator() {
  const number1 = parseFloat(num1 !== "" ? num1 : prevResult);
  const number2 = parseFloat(num2);
  let result;

  switch (operator) {
    case "add":
      result = number1 + number2;
      break;
    case "subtract":
      result = number1 - number2;
      break;
    case "multiply":
      result = number1 * number2;
      break;
    case "divide":
      if (number2 !== 0) {
        result = number1 / number2;
      } else {
        result = "Error: Division by zero";
      }
      break;
    default:
      result = "Error";
      break;
  }

  display.innerHTML = result;
  prevResult = result; // Lưu kết quả cho phép tính tiếp theo
  num1 = ""; // Reset num1 để bắt đầu một phép tính mới
  num2 = "";
  operator = null;
}

function clearDisplay() {
  num1 = "";
  num2 = "";
  operator = null;
  prevResult = null;
  display.innerHTML = "0";
}

function deleteLastDigit() {
  if (operator === null) {
    num1 = num1.substring(0, num1.length - 1);
    display.innerHTML = num1;
  } else {
    num2 = num2.substring(0, num2.length - 1);
    display.innerHTML = num2;
  }
}

const buttons = document.getElementsByClassName("button");

for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  button.addEventListener("click", function (e) {
    const userInput = e.target.innerText;
    if (
      userInput == "0" ||
      userInput == "1" ||
      userInput == "2" ||
      userInput == "3" ||
      userInput == "4" ||
      userInput == "5" ||
      userInput == "6" ||
      userInput == "7" ||
      userInput == "8" ||
      userInput == "9"
    ) {
      addNumber(userInput);
    } else if (userInput == ".") {
      addDecimal();
    } else if (
      userInput == "+" ||
      userInput == "-" ||
      userInput == "x" ||
      userInput == "/"
    ) {
      setOperator(userInput);
    } else if (userInput == "=") {
      calculator();
    } else if (userInput == "C") {
      clearDisplay();
    } else if (userInput == "DEL") {
      deleteLastDigit();
    }
  });
}
