import { CalculatorEngine, ButtonConfig } from '../types/calculator';
import { evaluate } from 'mathjs';

// Unit conversion rates
const unitConversions = {
  // Length conversions
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  
  // Area conversions
  area: {
    'square meter': 1,
    'square kilometer': 0.000001,
    'square centimeter': 10000,
    'square millimeter': 1000000,
    'square mile': 3.861e-7,
    'square yard': 1.19599,
    'square foot': 10.7639,
    'square inch': 1550,
    'hectare': 0.0001,
    'acre': 0.000247105,
  },
  
  // Weight/Mass conversions
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    ton: 0.001,
    pound: 2.20462,
    ounce: 35.274,
  },
  
  // Volume conversions
  volume: {
    liter: 1,
    milliliter: 1000,
    'cubic meter': 0.001,
    'cubic centimeter': 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    'fluid ounce': 33.814,
  },
  
  // Temperature conversions are handled separately due to offset formulas
};

// Currency conversion rates (would be fetched from an API in a real implementation)
const currencyRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 151.77,
  CAD: 1.38,
  AUD: 1.54,
  INR: 83.47,
  CNY: 7.24,
};

export const unitConverterEngine: CalculatorEngine = {
  name: 'Unit Converter',
  mode: 'unit-converter',
  
  calculate: (expression: string): number | string => {
    try {
      // Handle unit conversions
      if (expression.includes('convert(')) {
        // Parse conversion: convert(value, fromUnit, toUnit, category)
        const match = expression.match(/convert\(([^,]+),([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, valueStr, fromUnit, toUnit, category] = match.map(x => x.trim());
          const value = parseFloat(valueStr);
          
          // Handle temperature conversions separately
          if (category === 'temperature') {
            return convertTemperature(value, fromUnit, toUnit);
          }
          
          // Handle currency conversions
          if (category === 'currency') {
            return convertCurrency(value, fromUnit, toUnit);
          }
          
          // Handle other unit conversions
          const categoryConversions = unitConversions[category];
          if (categoryConversions) {
            const fromRate = categoryConversions[fromUnit];
            const toRate = categoryConversions[toUnit];
            
            if (fromRate && toRate) {
              // Convert to base unit then to target unit
              const result = (value / fromRate) * toRate;
              return Math.round(result * 1000000) / 1000000;
            }
          }
          
          return 'Invalid units';
        }
      }
      
      // Standard calculation
      const result = evaluate(expression.replace(/×/g, '*').replace(/÷/g, '/'));
      return typeof result === 'number' ? result : 'Error';
    } catch (error) {
      return 'Error';
    }
  },
  
  getButtons: (): ButtonConfig[] => [
    // Unit conversion categories
    { id: 'length', label: 'Length', value: 'length', type: 'action', className: 'calculator-button bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'area', label: 'Area', value: 'area', type: 'action', className: 'calculator-button bg-green-500 hover:bg-green-600 text-white' },
    { id: 'weight', label: 'Weight', value: 'weight', type: 'action', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'volume', label: 'Volume', value: 'volume', type: 'action', className: 'calculator-button bg-yellow-500 hover:bg-yellow-600 text-white' },
    
    { id: 'temperature', label: 'Temp', value: 'temperature', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'currency', label: 'Currency', value: 'currency', type: 'action', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'convert', label: 'Convert', value: 'convert(', type: 'function', className: 'calculator-button bg-teal-500 hover:bg-teal-600 text-white' },
    { id: 'clear', label: 'C', value: 'clear', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    
    // Common operations
    { id: 'comma', label: ',', value: ',', type: 'operator', className: 'calculator-button' },
    { id: 'open-paren', label: '(', value: '(', type: 'operator', className: 'calculator-button' },
    { id: 'close-paren', label: ')', value: ')', type: 'operator', className: 'calculator-button' },
    { id: 'backspace', label: '⌫', value: 'backspace', type: 'action', className: 'calculator-button bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600' },
    
    // Number pad
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
    
    { id: '0', label: '0', value: '0', type: 'number', className: 'calculator-button' },
    { id: 'decimal', label: '.', value: '.', type: 'number', className: 'calculator-button' },
    { id: 'equals', label: '=', value: '=', type: 'action', className: 'calculator-button-equals' },
    { id: 'add', label: '+', value: '+', type: 'operator', className: 'calculator-button-operator' },
  ],
};

// Helper functions for specific conversions
function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  let celsius: number;
  
  // Convert to Celsius first
  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5/9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      return NaN;
  }
  
  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'celsius':
      return Math.round(celsius * 1000) / 1000;
    case 'fahrenheit':
      return Math.round(((celsius * 9/5) + 32) * 1000) / 1000;
    case 'kelvin':
      return Math.round((celsius + 273.15) * 1000) / 1000;
    default:
      return NaN;
  }
}

function convertCurrency(value: number, fromCurrency: string, toCurrency: string): number {
  const fromRate = currencyRates[fromCurrency];
  const toRate = currencyRates[toCurrency];
  
  if (fromRate && toRate) {
    // Convert to USD then to target currency
    const result = (value / fromRate) * toRate;
    return Math.round(result * 100) / 100;
  }
  
  return NaN;
}