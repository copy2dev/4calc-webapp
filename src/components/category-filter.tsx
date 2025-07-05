'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/calculators';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        onClick={() => onCategoryChange(null)}
        className="flex items-center gap-2"
      >
        <span>🔍</span>
        All Categories
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center gap-2"
        >
          <span>{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  );
};