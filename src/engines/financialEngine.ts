import { CalculatorEngine, ButtonConfig } from '../types/calculator';
import { evaluate } from 'mathjs';

export const financialEngine: CalculatorEngine = {
  name: 'Financial Calculator',
  mode: 'financial',
  
  calculate: (expression: string): number | string => {
    try {
      // Handle financial functions
      if (expression.includes('EMI')) {
        // Parse EMI calculation: EMI(principal, rate, time)
        const match = expression.match(/EMI\(([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, p, r, t] = match.map(x => parseFloat(x.trim()));
          const monthlyRate = r / 100 / 12;
          const numPayments = t * 12;
          const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
          return Math.round(emi * 100) / 100;
        }
      }
      
      if (expression.includes('SIP')) {
        // Parse SIP calculation: SIP(monthly, rate, years)
        const match = expression.match(/SIP\(([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, monthly, rate, years] = match.map(x => parseFloat(x.trim()));
          const monthlyRate = rate / 100 / 12;
          const months = years * 12;
          const futureValue = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
          return Math.round(futureValue * 100) / 100;
        }
      }
      
      if (expression.includes('ROI')) {
        // Parse ROI calculation: ROI(initialInvestment, finalValue, years)
        const match = expression.match(/ROI\(([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, initialInvestment, finalValue, years] = match.map(x => parseFloat(x.trim()));
          const gain = finalValue - initialInvestment;
          const roi = (gain / initialInvestment) * 100;
          const annualizedROI = Math.pow((1 + roi / 100), 1 / years) - 1;
          return Math.round(annualizedROI * 10000) / 100 + '%';
        }
      }
      
      if (expression.includes('GST')) {
        // Parse GST calculation: GST(amount, rate)
        const match = expression.match(/GST\(([^,]+),([^)]+)\)/);
        if (match) {
          const [, amount, rate] = match.map(x => parseFloat(x.trim()));
          const gstAmount = amount * (rate / 100);
          const totalAmount = amount + gstAmount;
          return {
            gstAmount: Math.round(gstAmount * 100) / 100,
            totalAmount: Math.round(totalAmount * 100) / 100
          };
        }
      }
      
      if (expression.includes('CI')) {
        // Parse Compound Interest calculation: CI(principal, rate, time, frequency)
        const match = expression.match(/CI\(([^,]+),([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, principal, rate, time, frequency] = match.map(x => parseFloat(x.trim()));
          const n = frequency || 1; // Compounding frequency (default: annual)
          const amount = principal * Math.pow(1 + (rate / 100) / n, n * time);
          const interest = amount - principal;
          return Math.round(amount * 100) / 100;
        }
      }
      
      if (expression.includes('SI')) {
        // Parse Simple Interest calculation: SI(principal, rate, time)
        const match = expression.match(/SI\(([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, principal, rate, time] = match.map(x => parseFloat(x.trim()));
          const interest = (principal * rate * time) / 100;
          const amount = principal + interest;
          return Math.round(amount * 100) / 100;
        }
      }
      
      // Standard calculation
      const result = evaluate(expression.replace(/×/g, '*').replace(/÷/g, '/'));
      return typeof result === 'number' ? Math.round(result * 100) / 100 : 'Error';
    } catch (error) {
      return 'Error';
    }
  },
  
  getButtons: (): ButtonConfig[] => [
    // Financial functions
    { id: 'emi', label: 'EMI', value: 'EMI(', type: 'function', className: 'calculator-button bg-green-500 hover:bg-green-600 text-white' },
    { id: 'sip', label: 'SIP', value: 'SIP(', type: 'function', className: 'calculator-button bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'roi', label: 'ROI', value: 'ROI(', type: 'function', className: 'calculator-button bg-indigo-500 hover:bg-indigo-600 text-white' },
    { id: 'gst', label: 'GST', value: 'GST(', type: 'function', className: 'calculator-button bg-teal-500 hover:bg-teal-600 text-white' },
    { id: 'compound', label: 'CI', value: 'CI(', type: 'function', className: 'calculator-button bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'simple', label: 'SI', value: 'SI(', type: 'function', className: 'calculator-button bg-yellow-500 hover:bg-yellow-600 text-white' },
    
    // Common financial operations
    { id: 'percent', label: '%', value: '%', type: 'operator', className: 'calculator-button-operator' },
    { id: 'comma', label: ',', value: ',', type: 'operator', className: 'calculator-button' },
    { id: 'open-paren', label: '(', value: '(', type: 'operator', className: 'calculator-button' },
    { id: 'close-paren', label: ')', value: ')', type: 'operator', className: 'calculator-button' },
    
    // Standard number pad
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
    { id: 'clear', label: 'C', value: 'clear', type: 'action', className: 'calculator-button bg-red-500 hover:bg-red-600 text-white' },
    { id: 'equals', label: '=', value: '=', type: 'action', className: 'calculator-button-equals' },
    
    { id: 'add', label: '+', value: '+', type: 'operator', className: 'calculator-button-operator', colspan: 4 },
  ],
};