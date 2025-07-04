import { evaluate, sin, cos, tan, asin, acos, atan, log, log10, sqrt, pow, factorial } from 'mathjs';

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