import React from 'react';
import Link from 'next/link';
import { Calculator } from '@/types/calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CalculatorCardProps {
  calculator: Calculator;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator }) => {
  return (
    <Link href={calculator.path} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{calculator.icon}</span>
            <div>
              <CardTitle className="text-lg">{calculator.name}</CardTitle>
              <CardDescription>{calculator.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              {calculator.category}
            </span>
            {calculator.featured && (
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                Featured
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};