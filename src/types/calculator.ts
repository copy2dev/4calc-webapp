export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
  featured?: boolean;
}

export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  calculators: Calculator[];
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface CalculatorResult {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}