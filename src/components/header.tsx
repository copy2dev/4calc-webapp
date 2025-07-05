'use client';

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">4</span>Calc
            </h1>
            <span className="ml-2 text-sm text-gray-500">
              {t('siteSubtitle')}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('home')}
              </a>
              <a href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('categories')}
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('about')}
              </a>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};