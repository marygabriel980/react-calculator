import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentOperator, setCurrentOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [newNumberStarted, setNewNumberStarted] = useState(false);

  const handleNumberClick = (num) => {
    if (newNumberStarted) {
      setDisplay(num);
      setNewNumberStarted(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperatorClick = (operator) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
    } else if (!newNumberStarted) {
      handleEqualsClick();
    }
    setCurrentOperator(operator);
    setNewNumberStarted(true);
  };

  const handleEqualsClick = () => {
    if (currentOperator && previousValue !== null && !newNumberStarted) {
      const current = parseFloat(display);
      let result;
      switch (currentOperator) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = previousValue / current;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setPreviousValue(result);
      setNewNumberStarted(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentOperator(null);
    setPreviousValue(null);
    setNewNumberStarted(false);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button className="operator" onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button className="clear" onClick={handleClearClick}>C</button>
        <button className="equals" onClick={handleEqualsClick}>=</button>
        <button className="operator" onClick={() => handleOperatorClick('/')}>/</button>
      </div>
    </div>
  );
};

export default Calculator;