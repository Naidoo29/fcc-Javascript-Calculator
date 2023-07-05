import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const handleNumber = (event) => {
    const number = event.target.textContent;

    if (result !== "") {
      setDisplay(number);
      setResult("");
    } else if (display !== "0" || number !== "0") {
      setDisplay((prevDisplay) => prevDisplay + number);
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;

    if (result !== "") {
      setDisplay(result);
      setResult("");
    } else if (display !== "") {
      const lastChar = display[display.length - 1];

      if (lastChar === "." && operator !== "-") {
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + operator);
      } else if (!["+", "-", "*", "/"].includes(lastChar) || operator === "-") {
        setDisplay((prevDisplay) => prevDisplay + operator);
      } else {
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + operator);
      }
    }
  };

  // Helper function to round the result to a specified number of decimal places
  const roundResult = (value, decimalPlaces) => {
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  };

  const handleEqual = () => {
    let expression = display;

    // Replace "x" with "*" for multiplication
    expression = expression.replace(/x/g, "*");

    try {
      const result = eval(expression);
      setDisplay(roundResult(result, 4).toString());
      setResult(roundResult(result, 4).toString());
    } catch (error) {
      setDisplay("Error");
      setResult("");
    }
  };

  const handleClear = () => {
    setDisplay("");
    setResult("");
  };

  const handleDecimal = () => {
    if (result !== "") {
      setDisplay("0.");
      setResult("");
    } else if (!display.includes(".")) {
      setDisplay((prevDisplay) => prevDisplay + ".");
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          {display || "0"}
        </div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
        </div>
        <div id="seven" onClick={handleNumber}>
          7
        </div>
        <div id="eight" onClick={handleNumber}>
          8
        </div>
        <div id="nine" onClick={handleNumber}>
          9
        </div>
        <div id="multiply" onClick={handleOperator}>
          x
        </div>
        <div id="four" onClick={handleNumber}>
          4
        </div>
        <div id="five" onClick={handleNumber}>
          5
        </div>
        <div id="six" onClick={handleNumber}>
          6
        </div>
        <div id="divide" onClick={handleOperator}>
          /
        </div>
        <div id="one" onClick={handleNumber}>
          1
        </div>
        <div id="two" onClick={handleNumber}>
          2
        </div>
        <div id="three" onClick={handleNumber}>
          3
        </div>
        <div id="add" onClick={handleOperator}>
          +
        </div>
        <div id="zero" onClick={handleNumber}>
          0
        </div>
        <div id="decimal" onClick={handleDecimal}>
          .
        </div>
        <div id="equals" onClick={handleEqual}>
          =
        </div>
        <div id="subtract" onClick={handleOperator}>
          -
        </div>
      </div>
    </div>
  );
}

export default App;

