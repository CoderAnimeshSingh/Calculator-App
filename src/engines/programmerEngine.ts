import { CalculatorEngine, ButtonConfig } from '../types/calculator';

export const programmerEngine: CalculatorEngine = {
  name: 'Programmer Calculator',
  mode: 'programmer',
  
  calculate: (expression: string): number | string => {
    try {
      // Handle different number bases
      if (expression.startsWith('0x')) {
        return parseInt(expression, 16);
      } else if (expression.startsWith('0b')) {
        return parseInt(expression.slice(2), 2);
      } else if (expression.startsWith('0o')) {
        return parseInt(expression.slice(2), 8);
      }
      
      // Standard calculation
      const result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
      return typeof result === 'number' ? result : 'Error';
    } catch (error) {
      return 'Error';
    }
  },
  
  getButtons: (): ButtonConfig[] => [
    // Number base selectors
    { id: 'hex', label: 'HEX', value: 'hex', type: 'action', className: 'calculator-button bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'dec', label: 'DEC', value: 'dec', type: 'action', className: 'calculator-button bg-green-500 hover:bg-green-600 text-white' },
    { id: 'oct', label: 'OCT', value: 'oct', type: 'action', className: 'calculator-button bg-yellow-500 hover:bg-yellow-600 text-white' },
    { id: 'bin', label: 'BIN', value: 'bin', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    
    // Bitwise operations
    { id: 'and', label: 'AND', value: '&', type: 'operator', className: 'calculator-button-operator' },
    { id: 'or', label: 'OR', value: '|', type: 'operator', className: 'calculator-button-operator' },
    { id: 'xor', label: 'XOR', value: '^', type: 'operator', className: 'calculator-button-operator' },
    { id: 'not', label: 'NOT', value: '~', type: 'operator', className: 'calculator-button-operator' },
    
    // Hex digits
    { id: 'a', label: 'A', value: 'A', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'b', label: 'B', value: 'B', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'c', label: 'C', value: 'C', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'd', label: 'D', value: 'D', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'e', label: 'E', value: 'E', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'f', label: 'F', value: 'F', type: 'number', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    
    // Standard numbers
    { id: '7', label: '7', value: '7', type: 'number', className: 'calculator-button' },
    { id: '8', label: '8', value: '8', type: 'number', className: 'calculator-button' },
    { id: '9', label: '9', value: '9', type: 'number', className: 'calculator-button' },
    { id: 'divide', label: '÷', value: '/', type: 'operator', className: 'calculator-button-operator' },
    
    { id: '4', label: '4', value: '4', type: 'number', className: 'calculator-button' },
    { id: '5', label: '5', value: '5', type: 'number', className: 'calculator-button' },
    { id: '6', label: '6', value: '6', type: 'number', className: 'calculator-button' },
    { id: 'multiply', label: '×', value: '*', type: 'operator', className: 'calculator-button-operator' },
    
    { id: '1', label: '1', value: '1', type: 'number', className: 'calculator-button' },
    { id: '2', label: '2', value: '2', type: 'number', className: 'calculator-button' },
    { id: '3', label: '3', value: '3', type: 'number', className: 'calculator-button' },
    { id: 'subtract', label: '−', value: '-', type: 'operator', className: 'calculator-button-operator' },
    
    { id: '0', label: '0', value: '0', type: 'number', className: 'calculator-button', colspan: 2 },
    { id: 'clear', label: 'C', value: 'clear', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'equals', label: '=', value: '=', type: 'action', className: 'calculator-button-equals' },
  ],
};