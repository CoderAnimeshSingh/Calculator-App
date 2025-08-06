import { CalculatorEngine, ButtonConfig } from '../types/calculator';

export const programmerEngine: CalculatorEngine = {
  name: 'Programmer Calculator',
  mode: 'programmer',
  
  calculate: (expression: string): number | string => {
    try {
      // Handle ASCII conversion
      if (expression.startsWith('ASCII(') && expression.endsWith(')')) {
        const value = expression.slice(6, -1);
        if (value.length === 1) {
          return value.charCodeAt(0).toString();
        } else if (!isNaN(Number(value))) {
          return String.fromCharCode(Number(value));
        }
      }

      // Handle different number bases
      if (expression.startsWith('0x')) {
        return parseInt(expression.slice(2), 16);
      } else if (expression.startsWith('0b')) {
        return parseInt(expression.slice(2), 2);
      } else if (expression.startsWith('0o')) {
        return parseInt(expression.slice(2), 8);
      }
      
      // Handle base conversion functions
      if (expression.includes('toBin(')) {
        const num = parseInt(expression.slice(6, -1));
        return '0b' + num.toString(2);
      } else if (expression.includes('toHex(')) {
        const num = parseInt(expression.slice(6, -1));
        return '0x' + num.toString(16).toUpperCase();
      } else if (expression.includes('toOct(')) {
        const num = parseInt(expression.slice(6, -1));
        return '0o' + num.toString(8);
      }
      
      // Standard calculation including bitwise operations
      const result = eval(expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/AND/g, '&')
        .replace(/OR/g, '|')
        .replace(/XOR/g, '^')
        .replace(/NOT/g, '~'));
      return typeof result === 'number' ? result : 'Error';
    } catch (error) {
      return 'Error';
    }
  },
  
  getButtons: (): ButtonConfig[] => [
    // Number base selectors and conversions
    { id: 'hex', label: 'HEX', value: 'toHex(', type: 'function', className: 'calculator-button bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'dec', label: 'DEC', value: 'dec', type: 'action', className: 'calculator-button bg-green-500 hover:bg-green-600 text-white' },
    { id: 'oct', label: 'OCT', value: 'toOct(', type: 'function', className: 'calculator-button bg-yellow-500 hover:bg-yellow-600 text-white' },
    { id: 'bin', label: 'BIN', value: 'toBin(', type: 'function', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    
    // ASCII conversion
    { id: 'ascii', label: 'ASCII', value: 'ASCII(', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'left-paren', label: '(', value: '(', type: 'operator', className: 'calculator-button-operator' },
    { id: 'right-paren', label: ')', value: ')', type: 'operator', className: 'calculator-button-operator' },
    { id: 'backspace', label: '⌫', value: 'backspace', type: 'action', className: 'calculator-button bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600' },
    
    // Bitwise operations
    { id: 'and', label: 'AND', value: 'AND', type: 'operator', className: 'calculator-button-operator' },
    { id: 'or', label: 'OR', value: 'OR', type: 'operator', className: 'calculator-button-operator' },
    { id: 'xor', label: 'XOR', value: 'XOR', type: 'operator', className: 'calculator-button-operator' },
    { id: 'not', label: 'NOT', value: 'NOT', type: 'operator', className: 'calculator-button-operator' },
    
    // Bit shift operations
    { id: 'lshift', label: '<<', value: '<<', type: 'operator', className: 'calculator-button-operator' },
    { id: 'rshift', label: '>>', value: '>>', type: 'operator', className: 'calculator-button-operator' },
    { id: 'clear', label: 'C', value: 'clear', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'clear-entry', label: 'CE', value: 'clear-entry', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    
    // Hex digits
    { id: 'a', label: 'A', value: 'A', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'b', label: 'B', value: 'B', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'c', label: 'C', value: 'C', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'd', label: 'D', value: 'D', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'e', label: 'E', value: 'E', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'f', label: 'F', value: 'F', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    
    // Standard numbers and operators
    { id: '7', label: '7', value: '7', type: 'number', className: 'calculator-button' },
    { id: '8', label: '8', value: '8', type: 'number', className: 'calculator-button' },
    { id: '9', label: '9', value: '9', type: 'number', className: 'calculator-button' },
    { id: 'divide', label: '÷', value: '÷', type: 'operator', className: 'calculator-button-operator' },
    
    { id: '4', label: '4', value: '4', type: 'number', className: 'calculator-button' },
    { id: '5', label: '5', value: '5', type: 'number', className: 'calculator-button' },
    { id: '6', label: '6', value: '6', type: 'number', className: 'calculator-button' },
    { id: 'multiply', label: '×', value: '×', type: 'operator', className: 'calculator-button-operator' },
    
    { id: '1', label: '1', value: '1', type: 'number', className: 'calculator-button' },
    { id: '2', label: '2', value: '2', type: 'number', className: 'calculator-button' },
    { id: '3', label: '3', value: '3', type: 'number', className: 'calculator-button' },
    { id: 'subtract', label: '−', value: '-', type: 'operator', className: 'calculator-button-operator' },
    
    { id: '0', label: '0', value: '0', type: 'number', className: 'calculator-button', colspan: 2 },
    { id: 'add', label: '+', value: '+', type: 'operator', className: 'calculator-button-operator' },
    { id: 'equals', label: '=', value: '=', type: 'action', className: 'calculator-button-equals' },
  ],
};