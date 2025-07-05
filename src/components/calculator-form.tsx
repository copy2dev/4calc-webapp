'use client';

import React from 'react';
import { CalculatorInput, CalculatorResult } from '@/types/calculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CalculatorFormProps {
  title: string;
  description: string;
  inputs: CalculatorInput[];
  results: CalculatorResult[];
  onInputChange: (inputId: string, value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  values: Record<string, string>;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  title,
  description,
  inputs,
  results,
  onInputChange,
  onCalculate,
  onReset,
  values
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Values</CardTitle>
            <CardDescription>Enter the values you want to calculate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {input.label}
                  {input.required && <span className="text-destructive ml-1">*</span>}
                </label>
                
                {input.type === 'select' ? (
                  <select
                    value={values[input.id] || ''}
                    onChange={(e) => onInputChange(input.id, e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required={input.required}
                  >
                    <option value="">Select an option</option>
                    {input.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="relative">
                    <input
                      type={input.type}
                      value={values[input.id] || ''}
                      onChange={(e) => onInputChange(input.id, e.target.value)}
                      placeholder={input.placeholder}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required={input.required}
                    />
                    {input.unit && (
                      <span className="absolute right-3 top-2 text-muted-foreground text-sm">
                        {input.unit}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex gap-2 pt-4">
              <Button onClick={onCalculate} className="flex-1">
                Calculate
              </Button>
              <Button onClick={onReset} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Calculated values based on your input</CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🧮</div>
                <p className="text-muted-foreground">
                  Enter values and click calculate to see results
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{result.label}</span>
                      <span className="text-lg font-bold text-primary">
                        {result.value} {result.unit}
                      </span>
                    </div>
                    {result.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {result.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};