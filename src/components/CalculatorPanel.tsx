import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { basicEngine } from '../engines/basicEngine';
import { scientificEngine } from '../engines/scientificEngine';
import { programmerEngine } from '../engines/programmerEngine';
import { financialEngine } from '../engines/financialEngine';
import { matrixEngine } from '../engines/matrixEngine';
import { graphingEngine } from '../engines/graphingEngine';
import { ButtonConfig, CalculationHistory } from '../types/calculator';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import GraphPlotter from './GraphPlotter';

const CalculatorPanel: React.FC = () => {
  const {
    display,
    previousValue,
    operation,
    waitingForOperand,
    mode,
    user,
    isGraphVisible,
    currentEquation,
    setDisplay,
    setPreviousValue,
    setOperation,
    setWaitingForOperand,
    addToHistory,
    setPricingModalOpen,
    setGraphVisible,
    setCurrentEquation,
  } = useCalculatorStore();

  // Get the appropriate engine based on mode
  const getEngine = () => {
    // Check access for premium modes
    if (mode !== 'basic' && mode !== 'scientific' && (!user || user.plan === 'free')) {
      return basicEngine; // Fallback to basic
    }

    switch (mode) {
      case 'scientific':
        return scientificEngine;
      case 'programmer':
        return programmerEngine;
      case 'financial':
        return financialEngine;
      case 'matrix':
        return matrixEngine;
      case 'graphing':
        return graphingEngine;
      case 'basic':
      default:
        return basicEngine;
    }
  };

  const engine = getEngine();

  const handleButtonClick = (button: ButtonConfig) => {
    // Check premium features
    if (button.type === 'function' && (!user || user.plan === 'free')) {
      const premiumFunctions = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'exp', '!'];
      if (premiumFunctions.includes(button.value)) {
        setPricingModalOpen(true);
        return;
      }
    }

    switch (button.type) {
      case 'number':
        handleNumber(button.value);
        break;
      case 'operator':
        handleOperator(button.value);
        break;
      case 'function':
        handleFunction(button.value);
        break;
      case 'action':
        handleAction(button.value);
        break;
    }
  };

  const handleNumber = (value: string) => {
    if (waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const handleFunction = (func: string) => {
    const inputValue = parseFloat(display);
    let result: number;

    try {
      switch (func) {
        case 'sqrt':
          result = Math.sqrt(inputValue);
          break;
        case 'sin':
          result = Math.sin(inputValue);
          break;
        case 'cos':
          result = Math.cos(inputValue);
          break;
        case 'tan':
          result = Math.tan(inputValue);
          break;
        case 'log10':
          result = Math.log10(inputValue);
          break;
        case 'log':
          result = Math.log(inputValue);
          break;
        case 'exp':
          result = Math.exp(inputValue);
          break;
        case '^2':
          result = inputValue * inputValue;
          break;
        case '!':
          result = factorial(inputValue);
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setWaitingForOperand(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'clear':
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
        break;
      case 'clear-entry':
        setDisplay('0');
        break;
      case 'backspace':
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
        break;
      case '=':
        const inputValue = parseFloat(display);
        if (previousValue !== null && operation) {
          const newValue = calculate(previousValue, inputValue, operation);
          
          // Add to history
          const historyEntry: CalculationHistory = {
            id: Date.now().toString(),
            expression: `${previousValue} ${operation} ${inputValue}`,
            result: String(newValue),
            timestamp: new Date(),
            mode,
          };
          addToHistory(historyEntry);

          setDisplay(String(newValue));
          setPreviousValue(null);
          setOperation(null);
          setWaitingForOperand(true);
        }
        break;
      case 'negate':
        setDisplay(String(-parseFloat(display)));
        break;
      case 'plot':
        if (mode === 'graphing') {
          setCurrentEquation(display);
          setGraphVisible(true);
        }
        break;
      case 'clear-graph':
        setGraphVisible(false);
        setCurrentEquation('');
        break;
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) throw new Error('Invalid input');
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl overflow-hidden">
        <Display />
        <ButtonGrid buttons={engine.getButtons()} onButtonClick={handleButtonClick} />
      </div>
      
      {mode === 'graphing' && (
        <GraphPlotter equation={currentEquation} isVisible={isGraphVisible} />
      )}
    </div>
  );
};

export default CalculatorPanel;