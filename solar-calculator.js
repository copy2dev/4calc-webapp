/**
 * ระบบคำนวณโซลาร์เซลล์บนหลังคา
 * Solar Rooftop Calculator
 * คำนวณผลตอบแทนและความคุ้มค่าของระบบโซลาร์เซลล์
 */

// ค่าคงที่สำหรับการคำนวณโซลาร์
export const SOLAR_CONSTANTS = {
  // ข้อมูลแสงแดดในประเทศไทย
  THAILAND_SOLAR_DATA: {
    // พื้นที่ภาคกลาง (กรุงเทพฯ, นครปฐม, ราชบุรี, สุพรรณบุรี)
    central: { 
      irradiance: 4.8, // kWh/m²/day
      name: 'ภาคกลาง', 
      nameEN: 'Central',
      provinces: ['กรุงเทพฯ', 'นครปฐม', 'ราชบุรี', 'สุพรรณบุรี', 'กาญจนบุรี']
    },
    // พื้นที่ภาคเหนือ (เชียงใหม่, เชียงราย, ลำปาง, ลำพูน)
    north: { 
      irradiance: 4.6, // kWh/m²/day
      name: 'ภาคเหนือ', 
      nameEN: 'Northern',
      provinces: ['เชียงใหม่', 'เชียงราย', 'ลำปาง', 'ลำพูน', 'น่าน', 'พะเยา', 'แพร่']
    },
    // พื้นที่ภาคตะวันออกเฉียงเหนือ (อุบลราชธานี, ขอนแก่น, นครราชสีมา)
    northeast: { 
      irradiance: 5.1, // kWh/m²/day
      name: 'ภาคตะวันออกเฉียงเหนือ', 
      nameEN: 'Northeastern',
      provinces: ['อุบลราชธานี', 'ขอนแก่น', 'นครราชสีมา', 'อุดรธานี', 'บุรีรัมย์', 'สุรินทร์']
    },
    // พื้นที่ภาคใต้ (ภูเก็ต, สงขลา, นครศรีธรรมราช)
    south: { 
      irradiance: 4.4, // kWh/m²/day
      name: 'ภาคใต้', 
      nameEN: 'Southern',
      provinces: ['ภูเก็ต', 'สงขลา', 'นครศรีธรรมราช', 'กระบี่', 'สุราษฎร์ธานี', 'ชุมพร']
    },
    // พื้นที่ภาคตะวันออก (ชลบุรี, ระยอง, จันทบุรี)
    east: { 
      irradiance: 4.9, // kWh/m²/day
      name: 'ภาคตะวันออก', 
      nameEN: 'Eastern',
      provinces: ['ชลบุรี', 'ระยอง', 'จันทบุรี', 'ตราด', 'ปราจีนบุรี', 'สระแก้ว']
    }
  },

  // ค่าไฟฟ้าปัจจุบันของ MEA และ PEA (2024)
  ELECTRICITY_RATES: {
    // MEA (การไฟฟ้านครหลวง) - กรุงเทพฯ และปริมณฑล
    mea: {
      tiers: [
        { max: 15, rate: 2.3488 },     // 0-15 หน่วย
        { max: 25, rate: 2.9882 },     // 16-25 หน่วย
        { max: 35, rate: 3.2405 },     // 26-35 หน่วย
        { max: 100, rate: 3.6237 },    // 36-100 หน่วย
        { max: 150, rate: 3.7171 },    // 101-150 หน่วย
        { max: 400, rate: 4.2218 },    // 151-400 หน่วย
        { max: Infinity, rate: 4.4217 } // 401+ หน่วย
      ],
      baseFee: 38.22, // ค่าบริการรายเดือน
      name: 'MEA (การไฟฟ้านครหลวง)',
      nameEN: 'MEA (Metropolitan Electricity Authority)'
    },
    // PEA (การไฟฟ้าส่วนภูมิภาค) - ต่างจังหวัด
    pea: {
      tiers: [
        { max: 15, rate: 2.3488 },     // 0-15 หน่วย
        { max: 25, rate: 2.9882 },     // 16-25 หน่วย
        { max: 35, rate: 3.2405 },     // 26-35 หน่วย
        { max: 100, rate: 3.6237 },    // 36-100 หน่วย
        { max: 150, rate: 3.7171 },    // 101-150 หน่วย
        { max: 400, rate: 4.2218 },    // 151-400 หน่วย
        { max: Infinity, rate: 4.4217 } // 401+ หน่วย
      ],
      baseFee: 24.62, // ค่าบริการรายเดือน
      name: 'PEA (การไฟฟ้าส่วนภูมิภาค)',
      nameEN: 'PEA (Provincial Electricity Authority)'
    }
  },

  // ประสิทธิภาพและข้อมูลทางเทคนิค
  TECHNICAL_SPECS: {
    // ประสิทธิภาพ panel โซลาร์เซลล์มาตรฐาน
    panelEfficiency: {
      monocrystalline: { efficiency: 0.20, name: 'Monocrystalline', price: 25000 }, // 20%
      polycrystalline: { efficiency: 0.17, name: 'Polycrystalline', price: 22000 }, // 17%
      thinfilm: { efficiency: 0.13, name: 'Thin Film', price: 18000 }              // 13%
    },

    // กำลังการผลิตโซลาร์เซลล์ต่อตารางเมตร (Wp/m²)
    powerPerSqm: {
      monocrystalline: 200, // 200 Wp/m²
      polycrystalline: 170, // 170 Wp/m²
      thinfilm: 130         // 130 Wp/m²
    },

    // การลดประสิทธิภาพต่อปี (%)
    degradationRate: 0.8, // 0.8% ต่อปี

    // Performance Ratio (ประสิทธิภาพการทำงานจริง)
    performanceRatio: 0.85, // 85%

    // ระบบ Net Metering ในไทย
    netMetering: {
      maxCapacity: 10000, // 10 MW สำหรับ Net Metering
      buybackRate: 2.20, // อัตราซื้อคืน 2.20 บาท/หน่วย (เฉลี่ย)
      exportLimit: 0.8    // ส่งออกได้สูงสุด 80% ของการใช้ไฟ
    }
  },

  // ต้นทุนระบบโซลาร์ (บาทต่อ kWp)
  SYSTEM_COSTS: {
    residential: {
      '1-3': { cost: 45000, name: 'ระบบเล็ก (1-3 kWp)', nameEN: 'Small System (1-3 kWp)' },
      '3-5': { cost: 42000, name: 'ระบบกลาง (3-5 kWp)', nameEN: 'Medium System (3-5 kWp)' },
      '5-10': { cost: 38000, name: 'ระบบใหญ่ (5-10 kWp)', nameEN: 'Large System (5-10 kWp)' },
      '10+': { cost: 35000, name: 'ระบบขนาดใหญ่มาก (10+ kWp)', nameEN: 'Extra Large System (10+ kWp)' }
    }
  },

  // อายุการใช้งานและการรับประกัน
  SYSTEM_LIFETIME: {
    panels: 25,      // แผงโซลาร์ 25 ปี
    inverter: 10,    // อินเวอร์เตอร์ 10 ปี
    system: 25       // ระบบรวม 25 ปี
  }
};

/**
 * คำนวณกำลังการผลิตโซลาร์ที่ติดตั้งได้
 * @param {number} roofArea - พื้นที่หลังคา (ตร.ม.)
 * @param {string} panelType - ประเภทแผง (monocrystalline, polycrystalline, thinfilm)
 * @param {number} usableRatio - สัดส่วนพื้นที่ใช้งานได้ (0-1)
 * @returns {Object} ข้อมูลกำลังการผลิต
 */
export function calculateSolarCapacity(roofArea, panelType = 'monocrystalline', usableRatio = 0.8) {
  if (roofArea <= 0 || roofArea > 10000) {
    return {
      error: 'พื้นที่หลังคาต้องอยู่ระหว่าง 1-10,000 ตร.ม.',
      errorEN: 'Roof area must be between 1-10,000 sqm'
    };
  }

  const powerPerSqm = SOLAR_CONSTANTS.TECHNICAL_SPECS.powerPerSqm[panelType];
  if (!powerPerSqm) {
    return {
      error: 'ประเภทแผงโซลาร์ไม่ถูกต้อง',
      errorEN: 'Invalid panel type'
    };
  }

  const usableArea = roofArea * usableRatio;
  const capacityWp = usableArea * powerPerSqm;
  const capacityKwp = capacityWp / 1000;

  return {
    success: true,
    roofArea,
    usableArea: Math.round(usableArea * 100) / 100,
    panelType,
    capacity: {
      wp: Math.round(capacityWp),
      kWp: Math.round(capacityKwp * 100) / 100
    },
    panelInfo: SOLAR_CONSTANTS.TECHNICAL_SPECS.panelEfficiency[panelType]
  };
}

/**
 * คำนวณการผลิตพลังงานรายปี
 * @param {number} capacityKwp - กำลังการผลิต (kWp)
 * @param {string} region - ภูมิภาค
 * @param {Object} options - ตัวเลือกเพิ่มเติม
 * @returns {Object} ข้อมูลการผลิตพลังงาน
 */
export function calculateEnergyProduction(capacityKwp, region = 'central', options = {}) {
  const {
    performanceRatio = SOLAR_CONSTANTS.TECHNICAL_SPECS.performanceRatio,
    shadingLoss = 0.05,
    dustLoss = 0.03
  } = options;

  if (capacityKwp <= 0 || capacityKwp > 1000) {
    return {
      error: 'กำลังการผลิตต้องอยู่ระหว่าง 0.1-1,000 kWp',
      errorEN: 'Capacity must be between 0.1-1,000 kWp'
    };
  }

  const solarData = SOLAR_CONSTANTS.THAILAND_SOLAR_DATA[region];
  if (!solarData) {
    return {
      error: 'ภูมิภาคไม่ถูกต้อง',
      errorEN: 'Invalid region'
    };
  }

  // คำนวณการผลิตพลังงานพื้นฐาน
  const dailyProduction = capacityKwp * solarData.irradiance * performanceRatio;
  
  // หักลดปัจจัยที่ทำให้ประสิทธิภาพลดลง
  const lossMultiplier = 1 - shadingLoss - dustLoss;
  const adjustedDailyProduction = dailyProduction * lossMultiplier;
  
  const monthlyProduction = adjustedDailyProduction * 30;
  const yearlyProduction = adjustedDailyProduction * 365;

  return {
    success: true,
    capacity: capacityKwp,
    region: solarData,
    production: {
      daily: Math.round(adjustedDailyProduction * 100) / 100,
      monthly: Math.round(monthlyProduction * 100) / 100,
      yearly: Math.round(yearlyProduction * 100) / 100
    },
    factors: {
      performanceRatio,
      shadingLoss,
      dustLoss,
      totalLoss: Math.round((shadingLoss + dustLoss) * 100 * 100) / 100
    }
  };
}

/**
 * คำนวณค่าไฟฟ้าปัจจุบันตามอัตรา MEA/PEA
 * @param {number} monthlyUnits - การใช้ไฟรายเดือน (หน่วย)
 * @param {string} provider - ผู้ให้บริการ (mea, pea)
 * @returns {Object} ข้อมูลค่าไฟฟ้า
 */
export function calculateElectricityBill(monthlyUnits, provider = 'mea') {
  if (monthlyUnits < 0 || monthlyUnits > 10000) {
    return {
      error: 'การใช้ไฟต้องอยู่ระหว่าง 0-10,000 หน่วย',
      errorEN: 'Electricity usage must be between 0-10,000 units'
    };
  }

  const rates = SOLAR_CONSTANTS.ELECTRICITY_RATES[provider];
  if (!rates) {
    return {
      error: 'ผู้ให้บริการไฟฟ้าไม่ถูกต้อง',
      errorEN: 'Invalid electricity provider'
    };
  }

  let totalCost = rates.baseFee;
  let remainingUnits = monthlyUnits;
  const breakdown = [];

  for (const tier of rates.tiers) {
    if (remainingUnits <= 0) break;
    
    const unitsInTier = Math.min(remainingUnits, tier.max - (breakdown.length > 0 ? rates.tiers[breakdown.length - 1].max : 0));
    const costInTier = unitsInTier * tier.rate;
    
    breakdown.push({
      units: Math.round(unitsInTier * 100) / 100,
      rate: tier.rate,
      cost: Math.round(costInTier * 100) / 100,
      range: breakdown.length === 0 ? `1-${tier.max}` : `${(breakdown.length > 0 ? rates.tiers[breakdown.length - 1].max : 0) + 1}-${tier.max}`
    });
    
    totalCost += costInTier;
    remainingUnits -= unitsInTier;
  }

  const averageRate = monthlyUnits > 0 ? (totalCost - rates.baseFee) / monthlyUnits : 0;

  return {
    success: true,
    monthlyUnits,
    provider: rates,
    costs: {
      baseFee: rates.baseFee,
      energyCost: Math.round((totalCost - rates.baseFee) * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      averageRate: Math.round(averageRate * 100) / 100
    },
    breakdown
  };
}

/**
 * คำนวณการประหยัดและผลตอบแทน
 * @param {Object} productionData - ข้อมูลการผลิตพลังงาน
 * @param {Object} electricityData - ข้อมูลค่าไฟฟ้า
 * @param {number} systemCost - ต้นทุนระบบ (บาท)
 * @param {Object} options - ตัวเลือกเพิ่มเติม
 * @returns {Object} ข้อมูลการประหยัดและ ROI
 */
export function calculateSavingsAndROI(productionData, electricityData, systemCost, options = {}) {
  const {
    netMeteringRate = SOLAR_CONSTANTS.TECHNICAL_SPECS.netMetering.buybackRate,
    electricityPriceInflation = 0.03, // 3% ต่อปี
    analysisYears = 25
  } = options;

  if (!productionData.success || !electricityData.success) {
    return {
      error: 'ข้อมูลการผลิตหรือค่าไฟฟ้าไม่ถูกต้อง',
      errorEN: 'Invalid production or electricity data'
    };
  }

  const monthlyProduction = productionData.production.monthly;
  const monthlyUsage = electricityData.monthlyUnits;
  const averageElectricityRate = electricityData.costs.averageRate;

  // คำนวณการใช้และส่งออกไฟฟ้า
  const selfConsumption = Math.min(monthlyProduction, monthlyUsage);
  const gridExport = Math.max(0, monthlyProduction - monthlyUsage);
  const gridImport = Math.max(0, monthlyUsage - monthlyProduction);

  // คำนวณการประหยัดรายเดือน
  const selfConsumptionSavings = selfConsumption * averageElectricityRate;
  const exportIncome = gridExport * netMeteringRate;
  const remainingElectricityBill = gridImport * averageElectricityRate + electricityData.costs.baseFee;
  
  const monthlySavings = selfConsumptionSavings + exportIncome;
  const yearlySavings = monthlySavings * 12;

  // คำนวณการประหยัดตลอดอายุการใช้งาน (25 ปี)
  const lifetimeSavings = calculateLifetimeSavings(
    yearlySavings, 
    electricityPriceInflation, 
    SOLAR_CONSTANTS.TECHNICAL_SPECS.degradationRate / 100,
    analysisYears
  );

  // คำนวณ ROI และ Payback Period
  const simplePaybackYears = systemCost / yearlySavings;
  const roi = ((lifetimeSavings - systemCost) / systemCost) * 100;

  return {
    success: true,
    energyFlow: {
      monthlyProduction: Math.round(monthlyProduction * 100) / 100,
      monthlyUsage,
      selfConsumption: Math.round(selfConsumption * 100) / 100,
      gridExport: Math.round(gridExport * 100) / 100,
      gridImport: Math.round(gridImport * 100) / 100,
      selfSufficiency: Math.round((selfConsumption / monthlyUsage) * 100 * 100) / 100
    },
    savings: {
      monthly: Math.round(monthlySavings * 100) / 100,
      yearly: Math.round(yearlySavings * 100) / 100,
      lifetime: Math.round(lifetimeSavings * 100) / 100,
      remainingBill: Math.round(remainingElectricityBill * 100) / 100
    },
    investment: {
      systemCost,
      paybackYears: Math.round(simplePaybackYears * 100) / 100,
      roi: Math.round(roi * 100) / 100,
      netProfit: Math.round((lifetimeSavings - systemCost) * 100) / 100
    },
    rates: {
      electricity: averageElectricityRate,
      netMetering: netMeteringRate
    }
  };
}

/**
 * คำนวณการประหยัดตลอดอายุการใช้งาน
 * @param {number} firstYearSavings - การประหยัดปีแรก
 * @param {number} inflationRate - อัตราเงินเฟ้อค่าไฟ
 * @param {number} degradationRate - อัตราการลดประสิทธิภาพ
 * @param {number} years - จำนวนปี
 * @returns {number} การประหยัดรวม
 */
function calculateLifetimeSavings(firstYearSavings, inflationRate, degradationRate, years) {
  let totalSavings = 0;
  
  for (let year = 1; year <= years; year++) {
    // ค่าไฟฟ้าเพิ่มขึ้นตามอัตราเงินเฟ้อ
    const electricityInflation = Math.pow(1 + inflationRate, year - 1);
    
    // ประสิทธิภาพโซลาร์ลดลงตามอายุ
    const solarDegradation = Math.pow(1 - degradationRate, year - 1);
    
    const yearSavings = firstYearSavings * electricityInflation * solarDegradation;
    totalSavings += yearSavings;
  }
  
  return totalSavings;
}

/**
 * ประมาณต้นทุนระบบโซลาร์
 * @param {number} capacityKwp - กำลังการผลิต (kWp)
 * @returns {Object} ข้อมูลต้นทุน
 */
export function estimateSystemCost(capacityKwp) {
  if (capacityKwp <= 0 || capacityKwp > 1000) {
    return {
      error: 'กำลังการผลิตต้องอยู่ระหว่าง 0.1-1,000 kWp',
      errorEN: 'Capacity must be between 0.1-1,000 kWp'
    };
  }

  const costs = SOLAR_CONSTANTS.SYSTEM_COSTS.residential;
  let costPerKwp;
  let category;

  if (capacityKwp <= 3) {
    costPerKwp = costs['1-3'].cost;
    category = costs['1-3'];
  } else if (capacityKwp <= 5) {
    costPerKwp = costs['3-5'].cost;
    category = costs['3-5'];
  } else if (capacityKwp <= 10) {
    costPerKwp = costs['5-10'].cost;
    category = costs['5-10'];
  } else {
    costPerKwp = costs['10+'].cost;
    category = costs['10+'];
  }

  const totalCost = capacityKwp * costPerKwp;

  return {
    success: true,
    capacity: capacityKwp,
    costPerKwp,
    totalCost: Math.round(totalCost),
    category,
    breakdown: {
      equipment: Math.round(totalCost * 0.7), // 70% อุปกรณ์
      installation: Math.round(totalCost * 0.2), // 20% ค่าติดตั้ง
      permits: Math.round(totalCost * 0.1) // 10% ใบอนุญาต/เอกสาร
    }
  };
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลนำเข้า
 * @param {Object} params - พารามิเตอร์ที่จะตรวจสอบ
 * @returns {Object} ผลการตรวจสอบ
 */
export function validateSolarInputs(params) {
  const errors = [];

  if (params.roofArea !== undefined) {
    if (params.roofArea <= 0 || params.roofArea > 10000) {
      errors.push('พื้นที่หลังคาต้องอยู่ระหว่าง 1-10,000 ตร.ม.');
    }
  }

  if (params.monthlyUsage !== undefined) {
    if (params.monthlyUsage < 0 || params.monthlyUsage > 10000) {
      errors.push('การใช้ไฟต้องอยู่ระหว่าง 0-10,000 หน่วย');
    }
  }

  if (params.capacity !== undefined) {
    if (params.capacity <= 0 || params.capacity > 1000) {
      errors.push('กำลังการผลิตต้องอยู่ระหว่าง 0.1-1,000 kWp');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * สร้างรายงานสรุปโซลาร์
 * @param {Object} solarData - ข้อมูลการคำนวณทั้งหมด
 * @param {string} language - ภาษา
 * @returns {Object} รายงานสรุป
 */
export function generateSolarReport(solarData, language = 'th') {
  const isEnglish = language === 'en';
  
  return {
    system: {
      capacity: `${solarData.capacity.kWp} kWp`,
      roofArea: `${solarData.roofArea} ตร.ม.`,
      panelType: solarData.panelInfo.name
    },
    performance: {
      dailyProduction: `${solarData.production.daily} kWh/วัน`,
      monthlyProduction: `${solarData.production.monthly} kWh/เดือน`,
      yearlyProduction: `${solarData.production.yearly} kWh/ปี`
    },
    financial: {
      systemCost: `${solarData.investment.systemCost.toLocaleString()} บาท`,
      monthlySavings: `${solarData.savings.monthly.toLocaleString()} บาท/เดือน`,
      paybackPeriod: `${solarData.investment.paybackYears} ปี`,
      roi: `${solarData.investment.roi}%`,
      lifetimeSavings: `${solarData.savings.lifetime.toLocaleString()} บาท`
    },
    environmental: {
      co2Reduction: `${Math.round(solarData.production.yearly * 0.5)} กก. CO₂/ปี`,
      treesEquivalent: `${Math.round(solarData.production.yearly * 0.5 / 22)} ต้น/ปี`
    }
  };
}