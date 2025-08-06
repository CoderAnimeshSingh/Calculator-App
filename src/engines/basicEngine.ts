import { evaluate } from 'mathjs';
import type { ButtonConfig } from '../types/calculator';
import type { CalculatorEngine } from '../types/calculator';

// Keep the existing BasicEngine class for its utility methods
export class BasicEngine {
  static calculate(expression: string): string {
    try {
      // Replace display symbols with math symbols
      const mathExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e');

      const result = evaluate(mathExpression);
      
      // Format result
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

  static formatNumber(num: number): string {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.000001 || Math.abs(num) > 999999999) {
      return num.toExponential(6);
    }
    return parseFloat(num.toFixed(10)).toString();
  }

  static isOperator(char: string): boolean {
    return ['+', '-', '×', '÷', '*', '/'].includes(char);
  }

  static getLastNumber(expression: string): string {
    const parts = expression.split(/[+\-×÷*/]/);
    return parts[parts.length - 1] || '0';
  }
}

// Export the basicEngine object that implements the CalculatorEngine interface
export const basicEngine: CalculatorEngine = {
  name: 'Basic Calculator',
  mode: 'basic',
  
  calculate: (expression: string): number | string => {
    return BasicEngine.calculate(expression);
  },
  
  getButtons: (): ButtonConfig[] => [
    // First row
    { id: 'clear', label: 'C', value: 'clear', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'clear-entry', label: 'CE', value: 'clear-entry', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'backspace', label: '⌫', value: 'backspace', type: 'action', className: 'calculator-button bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600' },
    { id: 'divide', label: '÷', value: '÷', type: 'operator', className: 'calculator-button-operator' },
    
    // Second row
    { id: '7', label: '7', value: '7', type: 'number', className: 'calculator-button' },
    { id: '8', label: '8', value: '8', type: 'number', className: 'calculator-button' },
    { id: '9', label: '9', value: '9', type: 'number', className: 'calculator-button' },
    { id: 'multiply', label: '×', value: '×', type: 'operator', className: 'calculator-button-operator' },
    
    // Third row
    { id: '4', label: '4', value: '4', type: 'number', className: 'calculator-button' },
    { id: '5', label: '5', value: '5', type: 'number', className: 'calculator-button' },
    { id: '6', label: '6', value: '6', type: 'number', className: 'calculator-button' },
    { id: 'subtract', label: '−', value: '-', type: 'operator', className: 'calculator-button-operator' },
    
    // Fourth row
    { id: '1', label: '1', value: '1', type: 'number', className: 'calculator-button' },
    { id: '2', label: '2', value: '2', type: 'number', className: 'calculator-button' },
    { id: '3', label: '3', value: '3', type: 'number', className: 'calculator-button' },
    { id: 'add', label: '+', value: '+', type: 'operator', className: 'calculator-button-operator' },
    
    // Fifth row
    { id: 'negate', label: '±', value: 'negate', type: 'action', className: 'calculator-button' },
    { id: '0', label: '0', value: '0', type: 'number', className: 'calculator-button' },
    { id: 'decimal', label: '.', value: '.', type: 'number', className: 'calculator-button' },
    { id: 'equals', label: '=', value: '=', type: 'action', className: 'calculator-button-equals' },
  ],
};