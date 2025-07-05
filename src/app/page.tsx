'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t, language } = useLanguage();
  
  const calculators = [
    {
      id: 'mrt-time',
      name: t('calculators.mrtTime.name'),
      description: t('calculators.mrtTime.description'),
      emoji: '🚇',
      category: 'transportation',
      href: '/calculators/mrt-time'
    },
    {
      id: 'taxi-fare',
      name: t('calculators.taxiFare.name'),
      description: t('calculators.taxiFare.description'),
      emoji: '🚕',
      category: 'transportation',
      href: '/calculators/taxi-fare'
    },
    {
      id: 'pregnancy',
      name: t('calculators.pregnancy.name'),
      description: t('calculators.pregnancy.description'),
      emoji: '🤱',
      category: 'health',
      href: '/calculators/pregnancy'
    },
    {
      id: 'interest',
      name: t('calculators.interest.name'),
      description: t('calculators.interest.description'),
      emoji: '💰',
      category: 'finance',
      href: '#'
    },
    {
      id: 'btu',
      name: t('calculators.btu.name'),
      description: t('calculators.btu.description'),
      emoji: '❄️',
      category: 'utilities',
      href: '#'
    },
    {
      id: 'distance',
      name: t('calculators.distance.name'),
      description: t('calculators.distance.description'),
      emoji: '📍',
      category: 'geography',
      href: '#'
    }
  ];

  const categories = [
    { id: 'all', name: t('allCategories'), icon: '🔍' },
    { id: 'transportation', name: t('transportation'), icon: '🚗' },
    { id: 'health', name: t('health'), icon: '🏥' },
    { id: 'finance', name: t('finance'), icon: '💳' },
    { id: 'utilities', name: t('utilities'), icon: '🏠' },
    { id: 'geography', name: t('geography'), icon: '🌍' }
  ];

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcomeTitle')} <span className="text-blue-600">4Calc</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('welcomeDescription')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                (selectedCategory === category.id || (!selectedCategory && category.id === 'all'))
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
            <Link
              key={calculator.id}
              href={calculator.href}
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-4">{calculator.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{calculator.name}</h3>
              <p className="text-gray-600 mb-3">{calculator.description}</p>
              <span className="text-sm text-blue-600 font-medium">
                {t(calculator.category)}
              </span>
            </Link>
          ))}
        </div>

        {/* No results */}
        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">
              {language === 'th' ? 'ไม่พบเครื่องคิดเลข' : 'No calculators found'}
            </h3>
            <p className="text-gray-600">
              {language === 'th' 
                ? 'ลองปรับเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น' 
                : 'Try adjusting your search or selecting a different category'
              }
            </p>
          </div>
        )}

        {/* Add Calculator Card */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-3xl mb-4">➕</div>
            <h3 className="text-lg font-semibold mb-2">{t('needNewCalculator')}</h3>
            <p className="text-gray-600 mb-4">
              {t('newCalculatorDescription')}
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('requestCalculator')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}