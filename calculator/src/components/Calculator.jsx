import { useState } from "react";

function Calculator() {
    const [text, setText] = useState("");
    const [output, setOutput] = useState(0);
  
    function calculate(expression) {
      const operators = ["+", "-", "*", "/"];
      const stack = [];
      const output = [];
  
      const getPrecedence = (operator) => {
        switch (operator) {
          case "+":
          case "-":
            return 1;
          case "*":
          case "/":
            return 2;
          default:
            return 0;
        }
      };
  
      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
  
        if (!isNaN(char) || char === ".") {
          let number = char;
          while (!isNaN(expression[i + 1]) || expression[i + 1] === ".") {
            number += expression[++i];
          }
          output.push(parseFloat(number));
        } else if (char === "(") {
          stack.push(char);
        } else if (char === ")") {
          while (stack.length && stack[stack.length - 1] !== "(") {
            output.push(stack.pop());
          }
          stack.pop();
        } else if (operators.includes(char)) {
          while (
            stack.length &&
            getPrecedence(char) <= getPrecedence(stack[stack.length - 1])
          ) {
            output.push(stack.pop());
          }
          stack.push(char);
        }
      }
  
      while (stack.length) {
        output.push(stack.pop());
      }
  
      const resultStack = [];
      output.forEach((token) => {
        if (!isNaN(token)) {
          resultStack.push(token);
        } else {
          const b = resultStack.pop();
          const a = resultStack.pop();
          switch (token) {
            case "+":
              resultStack.push(a + b);
              break;
            case "-":
              resultStack.push(a - b);
              break;
            case "*":
              resultStack.push(a * b);
              break;
            case "/":
              resultStack.push(a / b);
              break;
            default:
              break;
          }
        }
      });
  
      return resultStack.pop();
    }
  
    const handleInput = (e) => {
      let char = e.target.textContent;
      setText((prev) => prev + char);
    };
  
    const handleCompute = (e) => {
      let char = e.target.textContent;
      setText((prev) => prev + char);
    };
  
    const clearInput = () => {
      setText("");
      setOutput(null);
    };
  
    const equalsResult = () => {
      if (text === "") {
        setOutput("Error");
        return;
      } else if (text.includes("0/0")) {
        setOutput(NaN);
      } else if (text.includes("/0")) {
        setOutput(Infinity);
      }
      setOutput(calculate(text));
    };
  
    return (
      <div className="App">
        <h1>React Calculator</h1>
        <input type="text" value={text} readOnly />
        <h3>Output: {output}</h3>
        <div className="card">
          <div>
            {" "}
            <button onClick={(e) => handleInput(e)}>7</button>
            <button onClick={(e) => handleInput(e)}>8</button>
            <button onClick={(e) => handleInput(e)}>9</button>
            <button onClick={(e) => handleCompute(e)}>+</button>
          </div>
          <div>
            <button onClick={(e) => handleInput(e)}>4</button>
            <button onClick={(e) => handleInput(e)}>5</button>
            <button onClick={(e) => handleInput(e)}>6</button>
            <button onClick={(e) => handleCompute(e)}>-</button>
          </div>
          <div>
            <button onClick={(e) => handleInput(e)}>1</button>
            <button onClick={(e) => handleInput(e)}>2</button>
            <button onClick={(e) => handleInput(e)}>3</button>
            <button onClick={(e) => handleCompute(e)}>*</button>
          </div>
          <div>
            <button onClick={(e) => clearInput(e)}>C</button>
            <button onClick={(e) => handleInput(e)}>0</button>
            <button onClick={(e) => equalsResult(e)}>=</button>
            <button onClick={(e) => handleCompute(e)}>/</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Calculator