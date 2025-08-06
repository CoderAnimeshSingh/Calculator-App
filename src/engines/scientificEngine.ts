import { evaluate, sin, cos, tan, asin, acos, atan, log, log10, sqrt, pow, factorial } from 'mathjs';
import { CalculatorEngine, ButtonConfig } from '../types/calculator';

// Keep the existing ScientificEngine class for its utility methods
export class ScientificEngine {
  static calculate(expression: string): string {
    try {
      // Replace display symbols with math symbols
      const mathExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e')
        .replace(/sin⁻¹/g, 'asin')
        .replace(/cos⁻¹/g, 'acos')
        .replace(/tan⁻¹/g, 'atan')
        .replace(/ln/g, 'log')
        .replace(/log/g, 'log10')
        .replace(/√/g, 'sqrt')
        .replace(/\^/g, '^');

      const result = evaluate(mathExpression);
      
      if (typeof result === 'number') {
        if (Number.isInteger(result)) {
          return result.toString();
        } else {
          return parseFloat(result.toFixed(10)).toString();
        }
      }
      
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }

  static sin(x: number, angleMode: 'deg' | 'rad' = 'deg'): number {
    const angle = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
    return sin(angle);
  }

  static cos(x: number, angleMode: 'deg' | 'rad' = 'deg'): number {
    const angle = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
    return cos(angle);
  }

  static tan(x: number, angleMode: 'deg' | 'rad' = 'deg'): number {
    const angle = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
    return tan(angle);
  }

  static asin(x: number, angleMode: 'deg' | 'rad' = 'deg'): number {
    const result = asin(x);
    return angleMode === 'deg' ? (result * 180) / Math.PI : result;
  }

  static acos(x: number, angleMode: 'deg' | 'rad' = 'deg'): number {
    const result = acos(x);
    return angleMode === 'deg' ? (result * 180) / Math.PI : result;
  }

  static atan(x: number, angleMode: 'deg' | 'rad' = 'deg'): number {
    const result = atan(x);
    return angleMode === 'deg' ? (result * 180) / Math.PI : result;
  }

  static log(x: number): number {
    return log(x);
  }

  static log10(x: number): number {
    return log10(x);
  }

  static sqrt(x: number): number {
    return sqrt(x);
  }

  static power(base: number, exponent: number): number {
    return pow(base, exponent);
  }

  static factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error('Factorial is only defined for non-negative integers');
    }
    return factorial(n);
  }

  static percentage(value: number, total: number): number {
    return (value / total) * 100;
  }
}

// Export the scientificEngine object that implements the CalculatorEngine interface
export const scientificEngine: CalculatorEngine = {
  name: 'Scientific Calculator',
  mode: 'scientific',
  
  calculate: (expression: string): number | string => {
    return ScientificEngine.calculate(expression);
  },
  
  getButtons: (): ButtonConfig[] => [
    // First row
    { id: 'clear', label: 'C', value: 'clear', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'clear-entry', label: 'CE', value: 'clear-entry', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'backspace', label: '⌫', value: 'backspace', type: 'action', className: 'calculator-button bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600' },
    { id: 'divide', label: '÷', value: '÷', type: 'operator', className: 'calculator-button-operator' },
    
    // Second row - Scientific functions
    { id: 'sin', label: 'sin', value: 'sin', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'cos', label: 'cos', value: 'cos', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'tan', label: 'tan', value: 'tan', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'multiply', label: '×', value: '×', type: 'operator', className: 'calculator-button-operator' },
    
    // Third row - Inverse trig functions
    { id: 'asin', label: 'sin⁻¹', value: 'asin', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'acos', label: 'cos⁻¹', value: 'acos', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'atan', label: 'tan⁻¹', value: 'atan', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'subtract', label: '−', value: '-', type: 'operator', className: 'calculator-button-operator' },
    
    // Fourth row - Other functions
    { id: 'log', label: 'log', value: 'log', type: 'function', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'ln', label: 'ln', value: 'ln', type: 'function', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'sqrt', label: '√', value: 'sqrt', type: 'function', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'add', label: '+', value: '+', type: 'operator', className: 'calculator-button-operator' },
    
    // Fifth row - Constants and special functions
    { id: 'pi', label: 'π', value: 'π', type: 'number', className: 'calculator-button bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'e', label: 'e', value: 'e', type: 'number', className: 'calculator-button bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'power', label: 'x^y', value: '^', type: 'operator', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'factorial', label: 'x!', value: '!', type: 'function', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    
    // Sixth row - Numbers
    { id: '7', label: '7', value: '7', type: 'number', className: 'calculator-button' },
    { id: '8', label: '8', value: '8', type: 'number', className: 'calculator-button' },
    { id: '9', label: '9', value: '9', type: 'number', className: 'calculator-button' },
    { id: 'left-paren', label: '(', value: '(', type: 'operator', className: 'calculator-button-operator' },
    
    // Seventh row
    { id: '4', label: '4', value: '4', type: 'number', className: 'calculator-button' },
    { id: '5', label: '5', value: '5', type: 'number', className: 'calculator-button' },
    { id: '6', label: '6', value: '6', type: 'number', className: 'calculator-button' },
    { id: 'right-paren', label: ')', value: ')', type: 'operator', className: 'calculator-button-operator' },
    
    // Eighth row
    { id: '1', label: '1', value: '1', type: 'number', className: 'calculator-button' },
    { id: '2', label: '2', value: '2', type: 'number', className: 'calculator-button' },
    { id: '3', label: '3', value: '3', type: 'number', className: 'calculator-button' },
    { id: 'equals', label: '=', value: '=', type: 'action', className: 'calculator-button-equals' },
    
    // Ninth row
    { id: '0', label: '0', value: '0', type: 'number', className: 'calculator-button', colspan: 2 },
    { id: 'decimal', label: '.', value: '.', type: 'number', className: 'calculator-button' },
    { id: 'negate', label: '±', value: 'negate', type: 'action', className: 'calculator-button' },
  ],
};