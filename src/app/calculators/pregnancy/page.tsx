'use client';

import React, { useState } from 'react';
import { CalculatorForm } from '@/components/calculator-form';
import { CalculatorInput, CalculatorResult } from '@/types/calculator';

const PregnancyCalculator = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CalculatorResult[]>([]);

  const inputs: CalculatorInput[] = [
    {
      id: 'lastPeriod',
      label: 'Last Menstrual Period (LMP)',
      type: 'date',
      required: true,
      placeholder: 'Select date'
    },
    {
      id: 'cycleLength',
      label: 'Average Cycle Length',
      type: 'number',
      required: false,
      placeholder: 'Enter cycle length',
      min: 21,
      max: 45,
      step: 1,
      unit: 'days'
    }
  ];

  const calculatePregnancy = () => {
    const { lastPeriod, cycleLength } = values;
    
    if (!lastPeriod) return;

    const lmpDate = new Date(lastPeriod);
    const today = new Date();
    const cycleLengthNum = parseInt(cycleLength) || 28;

    // Calculate due date (280 days from LMP)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    // Calculate conception date (approximately 14 days after LMP for average cycle)
    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(conceptionDate.getDate() + (cycleLengthNum - 14));

    // Calculate current pregnancy week
    const daysSinceLMP = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;

    // Calculate days until due date
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate trimester
    let trimester = '';
    if (currentWeek <= 13) {
      trimester = 'First Trimester';
    } else if (currentWeek <= 26) {
      trimester = 'Second Trimester';
    } else {
      trimester = 'Third Trimester';
    }

    // Pregnancy milestones
    const milestones = [];
    if (currentWeek >= 4) milestones.push('Heartbeat detected');
    if (currentWeek >= 12) milestones.push('End of first trimester');
    if (currentWeek >= 20) milestones.push('Anatomy scan');
    if (currentWeek >= 24) milestones.push('Viability milestone');
    if (currentWeek >= 28) milestones.push('Third trimester begins');
    if (currentWeek >= 37) milestones.push('Full term');

    setResults([
      {
        label: 'Due Date',
        value: dueDate.toLocaleDateString(),
        description: '280 days from last menstrual period'
      },
      {
        label: 'Current Week',
        value: `${currentWeek}w ${currentDay}d`,
        description: `${trimester} - ${daysSinceLMP} days since LMP`
      },
      {
        label: 'Days Until Due',
        value: daysUntilDue > 0 ? daysUntilDue : 'Overdue',
        unit: daysUntilDue > 0 ? 'days' : '',
        description: daysUntilDue > 0 ? 'Approximate days remaining' : 'Past due date'
      },
      {
        label: 'Conception Date',
        value: conceptionDate.toLocaleDateString(),
        description: 'Estimated conception date'
      },
      {
        label: 'Trimester',
        value: trimester,
        description: `Week ${currentWeek} of pregnancy`
      },
      {
        label: 'Milestones Reached',
        value: milestones.length,
        description: milestones.slice(-2).join(', ') || 'Early pregnancy'
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
      title="Pregnancy Calculator"
      description="Calculate due date, current pregnancy week, and important milestones"
      inputs={inputs}
      results={results}
      onInputChange={handleInputChange}
      onCalculate={calculatePregnancy}
      onReset={handleReset}
      values={values}
    />
  );
};

export default PregnancyCalculator;