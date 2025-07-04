import { evaluate } from 'mathjs';

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