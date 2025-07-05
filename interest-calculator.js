/**
 * ระบบคำนวณดอกเบี้ย
 * Interest Calculator
 * คำนวณดอกเบี้ยธรรมดา, ดอกเบี้ยทบต้น, การออมเงิน, และการผ่อนชำระ
 */

// ค่าคงที่สำหรับการคำนวณดอกเบี้ย
export const INTEREST_CONSTANTS = {
  // ประเภทดอกเบี้ย
  INTEREST_TYPES: {
    SIMPLE: 'simple',
    COMPOUND: 'compound',
    SAVINGS: 'savings',
    LOAN: 'loan'
  },
  
  // ช่วงเวลาต่างๆ
  PERIOD_TYPES: {
    DAILY: { days: 1, name: 'รายวัน', nameEN: 'Daily' },
    WEEKLY: { days: 7, name: 'รายสัปดาห์', nameEN: 'Weekly' },
    MONTHLY: { days: 30, name: 'รายเดือน', nameEN: 'Monthly' },
    QUARTERLY: { days: 90, name: 'รายไตรมาส', nameEN: 'Quarterly' },
    SEMIANNUAL: { days: 180, name: 'ราย 6 เดือน', nameEN: 'Semi-annually' },
    ANNUAL: { days: 365, name: 'รายปี', nameEN: 'Annually' }
  },
  
  // จำนวนครั้งที่คิดดอกเบี้ยต่อปี
  COMPOUNDING_FREQUENCIES: {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    weekly: 52,
    daily: 365
  },
  
  // อัตราดอกเบี้ยเฉลี่ยในตลาด (เพื่อเปรียบเทียบ)
  MARKET_RATES: {
    savings: { min: 0.1, max: 1.5, name: 'บัญชีออมทรัพย์', nameEN: 'Savings Account' },
    fixed: { min: 1.0, max: 2.5, name: 'ฝากประจำ', nameEN: 'Fixed Deposit' },
    loan: { min: 5.0, max: 20.0, name: 'สินเชื่อ', nameEN: 'Personal Loan' },
    mortgage: { min: 3.0, max: 6.0, name: 'สินเชื่อบ้าน', nameEN: 'Mortgage' },
    credit: { min: 18.0, max: 28.0, name: 'บัตรเครดิต', nameEN: 'Credit Card' }
  }
};

/**
 * คำนวณดอกเบี้ยธรรมดา (Simple Interest)
 * @param {number} principal - เงินต้น
 * @param {number} rate - อัตราดอกเบี้ยต่อปี (%)
 * @param {number} time - ระยะเวลา (ปี)
 * @returns {Object} ผลการคำนวณดอกเบี้ยธรรมดา
 */
export function calculateSimpleInterest(principal, rate, time) {
  if (principal <= 0 || rate < 0 || time <= 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: เงินต้นและระยะเวลาต้องมากกว่า 0, อัตราดอกเบี้ยต้องไม่ติดลบ',
      errorEN: 'Invalid input: Principal and time must be > 0, rate must be ≥ 0'
    };
  }
  
  const rateDecimal = rate / 100;
  const interest = principal * rateDecimal * time;
  const totalAmount = principal + interest;
  
  return {
    success: true,
    type: 'simple',
    calculation: {
      principal,
      rate,
      time,
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    },
    formula: `ดอกเบี้ย = ${principal.toLocaleString()} × ${rate}% × ${time} ปี`,
    formulaEN: `Interest = ${principal.toLocaleString()} × ${rate}% × ${time} years`
  };
}

/**
 * คำนวณดอกเบี้ยทบต้น (Compound Interest)
 * @param {number} principal - เงินต้น
 * @param {number} rate - อัตราดอกเบี้ยต่อปี (%)
 * @param {number} time - ระยะเวลา (ปี)
 * @param {number} compoundFrequency - จำนวนครั้งที่คิดดอกเบี้ยต่อปี
 * @returns {Object} ผลการคำนวณดอกเบี้ยทบต้น
 */
export function calculateCompoundInterest(principal, rate, time, compoundFrequency = 12) {
  if (principal <= 0 || rate < 0 || time <= 0 || compoundFrequency <= 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: เงินต้น, ระยะเวลา และความถี่ต้องมากกว่า 0, อัตราดอกเบี้ยต้องไม่ติดลบ',
      errorEN: 'Invalid input: Principal, time, and frequency must be > 0, rate must be ≥ 0'
    };
  }
  
  const rateDecimal = rate / 100;
  const totalAmount = principal * Math.pow(1 + rateDecimal / compoundFrequency, compoundFrequency * time);
  const compoundInterest = totalAmount - principal;
  
  // คำนวณดอกเบี้ยธรรมดาเพื่อเปรียบเทียบ
  const simpleInterest = principal * rateDecimal * time;
  const extraInterest = compoundInterest - simpleInterest;
  
  return {
    success: true,
    type: 'compound',
    calculation: {
      principal,
      rate,
      time,
      compoundFrequency,
      compoundInterest: Math.round(compoundInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      simpleInterest: Math.round(simpleInterest * 100) / 100,
      extraInterest: Math.round(extraInterest * 100) / 100
    },
    formula: `จำนวนเงินรวม = ${principal.toLocaleString()} × (1 + ${rate}%/${compoundFrequency})^(${compoundFrequency} × ${time})`,
    formulaEN: `Total Amount = ${principal.toLocaleString()} × (1 + ${rate}%/${compoundFrequency})^(${compoundFrequency} × ${time})`
  };
}

/**
 * คำนวณการออมเงินรายเดือน (Monthly Savings)
 * @param {number} monthlyAmount - จำนวนเงินที่ออมต่อเดือน
 * @param {number} rate - อัตราดอกเบี้ยต่อปี (%)
 * @param {number} years - ระยะเวลา (ปี)
 * @param {number} initialAmount - เงินต้นเริ่มต้น
 * @returns {Object} ผลการคำนวณการออมเงิน
 */
export function calculateMonthlySavings(monthlyAmount, rate, years, initialAmount = 0) {
  if (monthlyAmount < 0 || rate < 0 || years <= 0 || initialAmount < 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: จำนวนเงินและอัตราดอกเบี้ยต้องไม่ติดลบ, ระยะเวลาต้องมากกว่า 0',
      errorEN: 'Invalid input: Amounts and rate must be ≥ 0, time must be > 0'
    };
  }
  
  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;
  
  // คำนวณเงินต้นเริ่มต้นพร้อมดอกเบี้ย
  const initialWithInterest = initialAmount * Math.pow(1 + monthlyRate, totalMonths);
  
  // คำนวณการออมรายเดือน (Future Value of Annuity)
  let monthlySavingsTotal = 0;
  if (monthlyAmount > 0 && rate > 0) {
    monthlySavingsTotal = monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else if (monthlyAmount > 0) {
    monthlySavingsTotal = monthlyAmount * totalMonths;
  }
  
  const totalContributions = initialAmount + (monthlyAmount * totalMonths);
  const totalAmount = initialWithInterest + monthlySavingsTotal;
  const totalInterest = totalAmount - totalContributions;
  
  // สร้างตารางแสดงการเจริญเติบโตรายปี
  const yearlyBreakdown = [];
  let currentBalance = initialAmount;
  
  for (let year = 1; year <= years; year++) {
    const monthsInThisYear = year * 12;
    const yearInitialGrowth = initialAmount * Math.pow(1 + monthlyRate, monthsInThisYear);
    
    let yearMonthlySavings = 0;
    if (monthlyAmount > 0 && rate > 0) {
      yearMonthlySavings = monthlyAmount * ((Math.pow(1 + monthlyRate, monthsInThisYear) - 1) / monthlyRate);
    } else if (monthlyAmount > 0) {
      yearMonthlySavings = monthlyAmount * monthsInThisYear;
    }
    
    const yearEndBalance = yearInitialGrowth + yearMonthlySavings;
    const yearContributions = initialAmount + (monthlyAmount * monthsInThisYear);
    const yearInterest = yearEndBalance - yearContributions;
    
    yearlyBreakdown.push({
      year,
      contributions: Math.round(yearContributions * 100) / 100,
      interest: Math.round(yearInterest * 100) / 100,
      balance: Math.round(yearEndBalance * 100) / 100
    });
  }
  
  return {
    success: true,
    type: 'savings',
    calculation: {
      monthlyAmount,
      rate,
      years,
      initialAmount,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    },
    yearlyBreakdown,
    summary: {
      averageMonthlyGain: Math.round((totalInterest / totalMonths) * 100) / 100,
      interestPercentage: Math.round((totalInterest / totalContributions) * 100 * 100) / 100
    }
  };
}

/**
 * คำนวณการผ่อนชำระ (Loan Payment)
 * @param {number} loanAmount - จำนวนเงินกู้
 * @param {number} rate - อัตราดอกเบี้ยต่อปี (%)
 * @param {number} years - ระยะเวลาผ่อน (ปี)
 * @returns {Object} ผลการคำนวณการผ่อนชำระ
 */
export function calculateLoanPayment(loanAmount, rate, years) {
  if (loanAmount <= 0 || rate < 0 || years <= 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: จำนวนเงินกู้และระยะเวลาต้องมากกว่า 0, อัตราดอกเบี้ยต้องไม่ติดลบ',
      errorEN: 'Invalid input: Loan amount and time must be > 0, rate must be ≥ 0'
    };
  }
  
  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;
  
  let monthlyPayment;
  if (rate === 0) {
    // ไม่มีดอกเบี้ย
    monthlyPayment = loanAmount / totalMonths;
  } else {
    // มีดอกเบี้ย - ใช้สูตร PMT
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }
  
  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  
  // สร้างตารางผ่อนชำระรายปี
  const yearlyBreakdown = [];
  let remainingBalance = loanAmount;
  
  for (let year = 1; year <= years; year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let month = 1; month <= 12 && remainingBalance > 0; month++) {
      const monthInterest = remainingBalance * monthlyRate;
      const monthPrincipal = monthlyPayment - monthInterest;
      
      yearlyInterest += monthInterest;
      yearlyPrincipal += monthPrincipal;
      remainingBalance -= monthPrincipal;
    }
    
    yearlyBreakdown.push({
      year,
      payment: Math.round(monthlyPayment * 12 * 100) / 100,
      principal: Math.round(yearlyPrincipal * 100) / 100,
      interest: Math.round(yearlyInterest * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100)
    });
  }
  
  return {
    success: true,
    type: 'loan',
    calculation: {
      loanAmount,
      rate,
      years,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100
    },
    yearlyBreakdown,
    summary: {
      monthlyIncome: Math.round((monthlyPayment / 0.3) * 100) / 100, // แนะนำรายได้ (30% rule)
      interestPercentage: Math.round((totalInterest / loanAmount) * 100 * 100) / 100
    }
  };
}

/**
 * เปรียบเทียบอัตราดอกเบี้ยกับตลาด
 * @param {number} rate - อัตราดอกเบี้ย (%)
 * @param {string} type - ประเภท (savings, fixed, loan, mortgage, credit)
 * @returns {Object} ผลการเปรียบเทียบ
 */
export function compareWithMarketRates(rate, type) {
  const marketRate = INTEREST_CONSTANTS.MARKET_RATES[type];
  
  if (!marketRate) {
    return {
      error: 'ประเภทอัตราดอกเบี้ยไม่ถูกต้อง',
      errorEN: 'Invalid interest rate type'
    };
  }
  
  let comparison;
  if (rate < marketRate.min) {
    comparison = { status: 'low', color: 'red' };
  } else if (rate > marketRate.max) {
    comparison = { status: 'high', color: 'red' };
  } else {
    comparison = { status: 'normal', color: 'green' };
  }
  
  return {
    success: true,
    rate,
    marketRange: marketRate,
    comparison,
    recommendation: generateRateRecommendation(rate, type, comparison)
  };
}

/**
 * สร้างคำแนะนำเกี่ยวกับอัตราดอกเบี้ย
 * @param {number} rate - อัตราดอกเบี้ย
 * @param {string} type - ประเภท
 * @param {Object} comparison - ผลการเปรียบเทียบ
 * @returns {Object} คำแนะนำ
 */
function generateRateRecommendation(rate, type, comparison) {
  const recommendations = {
    savings: {
      low: {
        th: '🔍 อัตราดอกเบี้ยต่ำกว่าตลาด ควรเปรียบเทียบธนาคารอื่น',
        en: '🔍 Below market rate, consider comparing other banks'
      },
      high: {
        th: '⚠️ อัตราดอกเบี้ยสูงผิดปกติ ตรวจสอบเงื่อนไขให้ดี',
        en: '⚠️ Unusually high rate, check conditions carefully'
      },
      normal: {
        th: '✅ อัตราดอกเบี้ยอยู่ในเกณฑ์ปกติของตลาด',
        en: '✅ Interest rate is within normal market range'
      }
    },
    loan: {
      low: {
        th: '🎉 อัตราดอกเบี้ยดีมาก! น่าสนใจ',
        en: '🎉 Excellent interest rate! Very attractive'
      },
      high: {
        th: '💰 อัตราดอกเบี้ยสูง ควรเปรียบเทียบที่อื่น',
        en: '💰 High interest rate, consider other options'
      },
      normal: {
        th: '👍 อัตราดอกเบี้ยปกติ เหมาะสมสำหรับตลาด',
        en: '👍 Normal rate, reasonable for current market'
      }
    }
  };
  
  const typeRec = recommendations[type] || recommendations.savings;
  return typeRec[comparison.status] || typeRec.normal;
}

/**
 * แปลงระยะเวลาเป็นปี
 * @param {number} value - ค่าระยะเวลา
 * @param {string} unit - หน่วย (days, months, years)
 * @returns {number} ระยะเวลาในหน่วยปี
 */
export function convertTimeToYears(value, unit) {
  switch (unit) {
    case 'days':
      return value / 365;
    case 'months':
      return value / 12;
    case 'years':
      return value;
    default:
      return value;
  }
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลนำเข้า
 * @param {Object} params - พารามิเตอร์ที่จะตรวจสอบ
 * @returns {Object} ผลการตรวจสอบ
 */
export function validateInterestInputs(params) {
  const errors = [];
  
  if (params.principal !== undefined && (params.principal <= 0 || params.principal > 1000000000)) {
    errors.push('เงินต้นต้องอยู่ระหว่าง 1 - 1,000,000,000 บาท');
  }
  
  if (params.rate !== undefined && (params.rate < 0 || params.rate > 100)) {
    errors.push('อัตราดอกเบี้ยต้องอยู่ระหว่าง 0 - 100%');
  }
  
  if (params.time !== undefined && (params.time <= 0 || params.time > 100)) {
    errors.push('ระยะเวลาต้องอยู่ระหว่าง 0.1 - 100 ปี');
  }
  
  if (params.monthlyAmount !== undefined && (params.monthlyAmount < 0 || params.monthlyAmount > 10000000)) {
    errors.push('จำนวนเงินรายเดือนต้องอยู่ระหว่าง 0 - 10,000,000 บาท');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}