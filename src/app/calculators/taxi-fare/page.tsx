'use client';

import React, { useState } from 'react';
import { CalculatorForm } from '@/components/calculator-form';
import { CalculatorInput, CalculatorResult } from '@/types/calculator';

const TaxiFareCalculator = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CalculatorResult[]>([]);

  const inputs: CalculatorInput[] = [
    {
      id: 'distance',
      label: 'Distance',
      type: 'number',
      required: true,
      placeholder: 'Enter distance',
      min: 0,
      step: 0.1,
      unit: 'km'
    },
    {
      id: 'waitingTime',
      label: 'Waiting Time',
      type: 'number',
      required: false,
      placeholder: 'Enter waiting time',
      min: 0,
      step: 1,
      unit: 'minutes'
    },
    {
      id: 'timeOfDay',
      label: 'Time of Day',
      type: 'select',
      required: true,
      options: ['Day (6 AM - 10 PM)', 'Night (10 PM - 6 AM)']
    },
    {
      id: 'trafficCondition',
      label: 'Traffic Condition',
      type: 'select',
      required: true,
      options: ['Light Traffic', 'Moderate Traffic', 'Heavy Traffic']
    },
    {
      id: 'tollFees',
      label: 'Toll Fees',
      type: 'number',
      required: false,
      placeholder: 'Enter toll fees',
      min: 0,
      step: 1,
      unit: 'THB'
    }
  ];

  const calculateTaxiFare = () => {
    const { distance, waitingTime, timeOfDay, trafficCondition, tollFees } = values;
    
    if (!distance || !timeOfDay || !trafficCondition) return;

    const distanceNum = parseFloat(distance);
    const waitingTimeNum = parseFloat(waitingTime) || 0;
    const tollFeesNum = parseFloat(tollFees) || 0;

    // Bangkok taxi fare structure
    const flagFall = 35; // Initial fare
    let farePerKm = 5.5; // Base fare per km
    
    // Night surcharge
    if (timeOfDay.includes('Night')) {
      farePerKm += 1; // Night surcharge
    }

    // Traffic condition multiplier
    const trafficMultiplier = {
      'Light Traffic': 1.0,
      'Moderate Traffic': 1.2,
      'Heavy Traffic': 1.5
    }[trafficCondition] || 1.0;

    // Calculate base fare
    const distanceFare = distanceNum * farePerKm;
    const waitingFare = waitingTimeNum * 2; // 2 THB per minute waiting
    
    // Apply traffic multiplier to time-based components
    const baseFare = flagFall + distanceFare + (waitingFare * trafficMultiplier);
    
    // Add toll fees
    const totalFare = baseFare + tollFeesNum;

    // Calculate time estimate
    const baseSpeed = 30; // km/h in light traffic
    const adjustedSpeed = baseSpeed / trafficMultiplier;
    const estimatedTime = Math.round((distanceNum / adjustedSpeed) * 60); // Convert to minutes

    setResults([
      {
        label: 'Total Fare',
        value: Math.round(totalFare),
        unit: 'THB',
        description: 'Total taxi fare including all charges'
      },
      {
        label: 'Base Fare',
        value: Math.round(baseFare),
        unit: 'THB',
        description: 'Fare without toll fees'
      },
      {
        label: 'Estimated Time',
        value: estimatedTime,
        unit: 'minutes',
        description: `Based on ${trafficCondition.toLowerCase()}`
      },
      {
        label: 'Cost per KM',
        value: Math.round(totalFare / distanceNum),
        unit: 'THB/km',
        description: 'Average cost per kilometer'
      }
    ]);
  };

  const handleInputChange = (inputId: string, value: string) => {
    setValues(prev => ({ ...prev, [inputId]: value }));
  };

  const handleReset = () => {
    setValues({});
    setResults([]);
  };

  return (
    <CalculatorForm
      title="Taxi Fare Calculator"
      description="Calculate taxi fare based on distance, time, and traffic conditions in Bangkok"
      inputs={inputs}
      results={results}
      onInputChange={handleInputChange}
      onCalculate={calculateTaxiFare}
      onReset={handleReset}
      values={values}
    />
  );
};

export default TaxiFareCalculator;