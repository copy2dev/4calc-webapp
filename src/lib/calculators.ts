import { Calculator, CalculatorCategory } from '@/types/calculator';

export const calculators: Calculator[] = [
  {
    id: 'mrt-time',
    name: 'MRT Travel Time Calculator',
    description: 'Calculate travel time between MRT stations',
    category: 'transportation',
    icon: '🚇',
    path: '/calculators/mrt-time',
    featured: true
  },
  {
    id: 'taxi-fare',
    name: 'Taxi Fare Calculator',
    description: 'Calculate taxi fare based on distance and time',
    category: 'transportation',
    icon: '🚕',
    path: '/calculators/taxi-fare',
    featured: true
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Calculator',
    description: 'Calculate due date and pregnancy milestones',
    category: 'health',
    icon: '🤱',
    path: '/calculators/pregnancy',
    featured: true
  },
  {
    id: 'time-duration',
    name: 'Time Duration Calculator',
    description: 'Calculate time differences and durations',
    category: 'time',
    icon: '⏱️',
    path: '/calculators/time-duration'
  },
  {
    id: 'btu-calculator',
    name: 'BTU Calculator',
    description: 'Calculate BTU requirements for air conditioning',
    category: 'utilities',
    icon: '❄️',
    path: '/calculators/btu'
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on loans and investments',
    category: 'finance',
    icon: '💰',
    path: '/calculators/simple-interest'
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest and investment growth',
    category: 'finance',
    icon: '📈',
    path: '/calculators/compound-interest'
  },
  {
    id: 'distance',
    name: 'Distance Calculator',
    description: 'Calculate distance between two points',
    category: 'geography',
    icon: '📍',
    path: '/calculators/distance'
  },
  {
    id: 'loan-payment',
    name: 'Loan Payment Calculator',
    description: 'Calculate monthly loan payments and amortization',
    category: 'finance',
    icon: '🏦',
    path: '/calculators/loan-payment'
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and total cost',
    category: 'finance',
    icon: '🏠',
    path: '/calculators/mortgage'
  }
];

export const categories: CalculatorCategory[] = [
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Travel time, fare, and transportation-related calculations',
    icon: '🚗',
    calculators: calculators.filter(calc => calc.category === 'transportation')
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Interest, loans, mortgages, and financial calculations',
    icon: '💳',
    calculators: calculators.filter(calc => calc.category === 'finance')
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Health and medical-related calculations',
    icon: '🏥',
    calculators: calculators.filter(calc => calc.category === 'health')
  },
  {
    id: 'time',
    name: 'Time',
    description: 'Time, date, and duration calculations',
    icon: '⏰',
    calculators: calculators.filter(calc => calc.category === 'time')
  },
  {
    id: 'utilities',
    name: 'Utilities',
    description: 'Home and utility-related calculations',
    icon: '🏠',
    calculators: calculators.filter(calc => calc.category === 'utilities')
  },
  {
    id: 'geography',
    name: 'Geography',
    description: 'Distance, area, and geography calculations',
    icon: '🌍',
    calculators: calculators.filter(calc => calc.category === 'geography')
  }
];

export const getFeaturedCalculators = (): Calculator[] => {
  return calculators.filter(calc => calc.featured);
};

export const getCalculatorsByCategory = (categoryId: string): Calculator[] => {
  return calculators.filter(calc => calc.category === categoryId);
};

export const getCalculatorById = (id: string): Calculator | undefined => {
  return calculators.find(calc => calc.id === id);
};