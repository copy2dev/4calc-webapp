'use client';

import React from 'react';
import { useLanguage } from '@/contexts/language-context';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">
            {t('footerText')}
          </p>
        </div>
      </div>
    </footer>
  );
};