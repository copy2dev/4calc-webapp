'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

export default function MRTTimeCalculator() {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [result, setResult] = useState<any>(null);
  const { t, language } = useLanguage();

  const stations = [
    'Chatuchak Park', 'Phahon Yothin', 'Lat Phrao', 'Ratchadaphisek',
    'Sutthisan', 'Huai Khwang', 'Thailand Cultural Centre', 'Phra Ram 9',
    'Phetchaburi', 'Sukhumvit', 'Lumphini', 'Silom', 'Sam Yan',
    'Hua Lamphong', 'Wat Mangkon', 'Sam Yot', 'Sanam Chai',
    'Itsaraphap', 'Thonburi', 'Krung Thon Buri', 'Wongwian Yai'
  ];

  const stationNamesTH: Record<string, string> = {
    'Chatuchak Park': 'จตุจักร',
    'Phahon Yothin': 'พหลโยธิน',
    'Lat Phrao': 'ลาดพร้าว',
    'Ratchadaphisek': 'รatchดาภิเษก',
    'Sutthisan': 'สุทธิสาร',
    'Huai Khwang': 'ห้วยขวาง',
    'Thailand Cultural Centre': 'ศูนย์วัฒนธรรมแห่งประเทศไทย',
    'Phra Ram 9': 'พระราม 9',
    'Phetchaburi': 'เพชรบุรี',
    'Sukhumvit': 'สุขุมวิท',
    'Lumphini': 'ลุมพินี',
    'Silom': 'สีลม',
    'Sam Yan': 'สามย่าน',
    'Hua Lamphong': 'หัวลำโพง',
    'Wat Mangkon': 'วัดมังกร',
    'Sam Yot': 'สามยอด',
    'Sanam Chai': 'สนามไชย',
    'Itsaraphap': 'อิสรภาพ',
    'Thonburi': 'ธนบุรี',
    'Krung Thon Buri': 'กรุงธนบุรี',
    'Wongwian Yai': 'วงเวียนใหญ่'
  };

  const getStationDisplay = (station: string) => {
    if (language === 'th' && stationNamesTH[station]) {
      return `${stationNamesTH[station]} (${station})`;
    }
    return station;
  };

  const calculateTime = () => {
    if (!fromStation || !toStation) return;
    
    const fromIndex = stations.indexOf(fromStation);
    const toIndex = stations.indexOf(toStation);
    const distance = Math.abs(toIndex - fromIndex);
    const time = distance * 2 + 3;
    const fare = 15 + (distance * 2);
    
    setResult({
      time,
      distance,
      fare,
      from: fromStation,
      to: toStation
    });
  };

  const reset = () => {
    setFromStation('');
    setToStation('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← {t('backToHome')}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚇 {t('mrt.title')}
          </h1>
          <p className="text-gray-600">{t('mrt.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('mrt.tripDetails')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mrt.fromStation')}
                </label>
                <select
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('mrt.selectDeparture')}</option>
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {getStationDisplay(station)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mrt.toStation')}
                </label>
                <select
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('mrt.selectDestination')}</option>
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {getStationDisplay(station)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={calculateTime}
                  disabled={!fromStation || !toStation}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t('calculate')}
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('reset')}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('results')}</h2>
            
            {!result ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🚇</div>
                <p className="text-gray-500">{t('selectAndCalculate')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">{t('mrt.tripSummary')}</h3>
                  <p className="text-blue-700">
                    {t('mrt.from')} {getStationDisplay(result.from)} {t('mrt.to')} {getStationDisplay(result.to)}
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('mrt.travelTime')}</span>
                    <span className="text-lg font-bold text-green-700">
                      {result.time} {t('mrt.minutes')}
                    </span>
                  </div>
                  <p className="text-sm text-green-600">{t('mrt.includingWaiting')}</p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('mrt.distance')}</span>
                    <span className="text-lg font-bold text-yellow-700">
                      {result.distance} {t('mrt.stations')}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('mrt.estimatedFare')}</span>
                    <span className="text-lg font-bold text-purple-700">{result.fare} THB</span>
                  </div>
                  <p className="text-sm text-purple-600">{t('mrt.approximateFare')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}