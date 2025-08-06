export type CalculatorMode = 
  | 'basic' 
  | 'scientific' 
  | 'programmer' 
  | 'financial' 
  | 'matrix' 
  | 'graphing' 
  | 'unit-converter'
  | 'ai-assistant';

export type Theme = 'light' | 'dark' | 'classic' | 'neon' | 'system';

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  mode: CalculatorMode;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'team';
  createdAt: Date;
  subscription?: {
    id: string;
    status: string;
    currentPeriodEnd: Date;
  };
}

export interface SavedSession {
  id: string;
  name: string;
  mode: CalculatorMode;
  data: any;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIQuery {
  query: string;
  result?: string;
  steps?: string[];
  timestamp: Date;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  entry: string;
  config: {
    inputFields: string[];
    outputFormula?: string;
    customUI?: boolean;
  };
  premium: boolean;
}

export interface MatrixData {
  rows: number;
  cols: number;
  data: number[][];
}

export interface GraphData {
  equation: string;
  xRange: [number, number];
  yRange: [number, number];
  points: Array<{ x: number; y: number }>;
}

export interface FinancialCalculation {
  type: 'emi' | 'sip' | 'compound' | 'simple' | 'loan';
  principal?: number;
  rate?: number;
  time?: number;
  monthlyPayment?: number;
  result: number;
  breakdown: string[];
}

export interface ButtonConfig {
  id: string;
  label: string;
  value: string;
  type: 'number' | 'operator' | 'function' | 'action';
  className: string;
  colspan?: number;
  rowspan?: number;
}

export interface CalculatorEngine {
  name: string;
  mode: CalculatorMode;
  calculate: (expression: string) => number | string;
  getButtons: () => ButtonConfig[];
}