/**
 * ระบบคำนวณค่าแท็กซี่ กรุงเทพมหานคร
 * Bangkok Taxi Fare Calculator
 * อัตราตามประกาศกระทรวงคมนาคม พ.ศ. 2565 (มีผลบังคับใช้ 13 มกราคม 2566)
 */

// อัตราค่าแท็กซี่สำหรับรถขนาดปกติ (Regular Size Taxi)
export const TAXI_RATES = {
  regular: {
    name: 'รถแท็กซี่ขนาดปกติ',
    nameEN: 'Regular Size Taxi',
    
    // ค่าโดยสารตามระยะทาง (Distance-based fare)
    baseFare: 35.00,           // 1 กิโลเมตรแรก
    
    // อัตราแต่ละช่วงระยะทาง
    rates: [
      { min: 1.01, max: 10, rate: 6.50 },    // >1-10 กม.
      { min: 10.01, max: 20, rate: 7.00 },   // >10-20 กม.
      { min: 20.01, max: 40, rate: 8.00 },   // >20-40 กม.
      { min: 40.01, max: 60, rate: 8.50 },   // >40-60 กม.
      { min: 60.01, max: 80, rate: 9.00 },   // >60-80 กม.
      { min: 80.01, max: Infinity, rate: 10.50 } // >80 กม.
    ]
  },
  
  large: {
    name: 'รถแท็กซี่ขนาดใหญ่',
    nameEN: 'Large Size Taxi',
    
    baseFare: 40.00,           // 1 กิโลเมตรแรก
    
    rates: [
      { min: 1.01, max: 10, rate: 6.50 },
      { min: 10.01, max: 20, rate: 7.00 },
      { min: 20.01, max: 40, rate: 8.00 },
      { min: 40.01, max: 60, rate: 8.50 },
      { min: 60.01, max: 80, rate: 9.00 },
      { min: 80.01, max: Infinity, rate: 10.50 }
    ]
  }
};

// อัตราค่าเวลารอ (Traffic waiting time)
export const WAITING_RATE = {
  ratePerMinute: 3.00,        // นาทีละ 3 บาท (เมื่อความเร็วต่ำกว่า 6 กม./ชม.)
  speedThreshold: 6           // กิโลเมตรต่อชั่วโมง
};

// ค่าบริการเพิ่มเติม (Additional charges)
export const ADDITIONAL_CHARGES = {
  appBooking: 20,             // การจ้างผ่านแอป
  airportSurcharge: 50        // ค่าบริการสนามบิน
};

/**
 * คำนวณค่าโดยสารแท็กซี่ตามระยะทาง
 * @param {number} distance - ระยะทาง (กิโลเมตร)
 * @param {string} taxiType - ประเภทรถ ('regular' หรือ 'large')
 * @returns {number} ค่าโดยสารตามระยะทาง
 */
export function calculateDistanceFare(distance, taxiType = 'regular') {
  if (distance <= 0) return 0;
  
  const rateConfig = TAXI_RATES[taxiType];
  if (!rateConfig) return 0;
  
  let totalFare = rateConfig.baseFare; // ค่าโดยสาร 1 กม.แรก
  
  if (distance <= 1) {
    return totalFare;
  }
  
  let remainingDistance = distance - 1; // ระยะทางที่เหลือหลังจาก 1 กม.แรก
  
  // คำนวณตามช่วงอัตรา
  for (const rateRange of rateConfig.rates) {
    if (remainingDistance <= 0) break;
    
    // หาระยะทางในช่วงนี้
    const distanceInRange = Math.min(
      remainingDistance,
      rateRange.max - Math.max(rateRange.min - 1, 0)
    );
    
    totalFare += distanceInRange * rateRange.rate;
    remainingDistance -= distanceInRange;
  }
  
  return Math.round(totalFare * 100) / 100; // ปัดเศษ 2 ตำแหน่ง
}

/**
 * คำนวณค่าเวลารอ (เมื่อรถติด)
 * @param {number} waitingTimeMinutes - เวลารอ/ติด (นาที)
 * @returns {number} ค่าเวลารอ
 */
export function calculateWaitingFare(waitingTimeMinutes) {
  if (waitingTimeMinutes <= 0) return 0;
  
  return Math.round(waitingTimeMinutes * WAITING_RATE.ratePerMinute * 100) / 100;
}

/**
 * คำนวณค่าแท็กซี่รวม
 * @param {Object} params - พารามิเตอร์การคำนวณ
 * @param {number} params.distance - ระยะทาง (กิโลเมตร)
 * @param {number} params.waitingTime - เวลารอ/ติด (นาที)
 * @param {string} params.taxiType - ประเภทรถ ('regular' หรือ 'large')
 * @param {boolean} params.isAppBooking - จองผ่านแอป
 * @param {boolean} params.isAirportPickup - รับจากสนามบิน
 * @returns {Object} ผลการคำนวณ
 */
export function calculateTaxiFare({
  distance,
  waitingTime = 0,
  taxiType = 'regular',
  isAppBooking = false,
  isAirportPickup = false
}) {
  // ตรวจสอบข้อมูลนำเข้า
  if (distance <= 0) {
    return {
      error: 'ระยะทางต้องมากกว่า 0 กิโลเมตร',
      errorEN: 'Distance must be greater than 0 kilometers'
    };
  }
  
  // คำนวณค่าโดยสารตามระยะทาง
  const distanceFare = calculateDistanceFare(distance, taxiType);
  
  // คำนวณค่าเวลารอ
  const waitingFare = calculateWaitingFare(waitingTime);
  
  // ค่าบริการเพิ่มเติม
  let additionalFee = 0;
  const additionalCharges = [];
  
  if (isAppBooking) {
    additionalFee += ADDITIONAL_CHARGES.appBooking;
    additionalCharges.push({
      name: 'ค่าบริการแอป',
      nameEN: 'App Booking Fee',
      amount: ADDITIONAL_CHARGES.appBooking
    });
  }
  
  if (isAirportPickup) {
    additionalFee += ADDITIONAL_CHARGES.airportSurcharge;
    additionalCharges.push({
      name: 'ค่าบริการสนามบิน',
      nameEN: 'Airport Surcharge',
      amount: ADDITIONAL_CHARGES.airportSurcharge
    });
  }
  
  // ค่าโดยสารรวม
  const totalFare = distanceFare + waitingFare + additionalFee;
  
  return {
    success: true,
    breakdown: {
      distanceFare,
      waitingFare,
      additionalFee,
      additionalCharges
    },
    total: Math.round(totalFare * 100) / 100,
    taxiInfo: TAXI_RATES[taxiType],
    distance,
    waitingTime,
    calculation: {
      baseFare: TAXI_RATES[taxiType].baseFare,
      distanceCalculation: getDistanceBreakdown(distance, taxiType),
      waitingCalculation: waitingTime > 0 ? {
        minutes: waitingTime,
        ratePerMinute: WAITING_RATE.ratePerMinute,
        total: waitingFare
      } : null
    }
  };
}

/**
 * แยกรายละเอียดการคำนวณตามระยะทาง
 * @param {number} distance - ระยะทาง
 * @param {string} taxiType - ประเภทรถ
 * @returns {Array} รายละเอียดการคำนวณ
 */
function getDistanceBreakdown(distance, taxiType) {
  const rateConfig = TAXI_RATES[taxiType];
  const breakdown = [];
  
  // 1 กม.แรก
  breakdown.push({
    range: '1 กม.แรก',
    rangeEN: 'First 1 km',
    distance: Math.min(distance, 1),
    rate: rateConfig.baseFare,
    amount: rateConfig.baseFare
  });
  
  if (distance <= 1) return breakdown;
  
  let remainingDistance = distance - 1;
  
  for (const rateRange of rateConfig.rates) {
    if (remainingDistance <= 0) break;
    
    const distanceInRange = Math.min(
      remainingDistance,
      rateRange.max - Math.max(rateRange.min - 1, 0)
    );
    
    if (distanceInRange > 0) {
      breakdown.push({
        range: `${Math.ceil(rateRange.min)} - ${rateRange.max === Infinity ? '∞' : rateRange.max} กม.`,
        rangeEN: `${Math.ceil(rateRange.min)} - ${rateRange.max === Infinity ? '∞' : rateRange.max} km`,
        distance: distanceInRange,
        rate: rateRange.rate,
        amount: Math.round(distanceInRange * rateRange.rate * 100) / 100
      });
    }
    
    remainingDistance -= distanceInRange;
  }
  
  return breakdown;
}

/**
 * ตรวจสอบว่าค่าที่ป้อนถูกต้องหรือไม่
 * @param {Object} params - พารามิเตอร์ที่จะตรวจสอบ
 * @returns {Object} ผลการตรวจสอบ
 */
export function validateTaxiInputs(params) {
  const errors = [];
  
  if (!params.distance || params.distance <= 0) {
    errors.push('ระยะทางต้องมากกว่า 0 กิโลเมตร');
  }
  
  if (params.distance > 1000) {
    errors.push('ระยะทางไม่ควรเกิน 1,000 กิโลเมตร');
  }
  
  if (params.waitingTime && params.waitingTime < 0) {
    errors.push('เวลารอต้องเป็นค่าบวก');
  }
  
  if (params.waitingTime && params.waitingTime > 1440) {
    errors.push('เวลารอไม่ควรเกิน 24 ชั่วโมง (1,440 นาที)');
  }
  
  if (params.taxiType && !TAXI_RATES[params.taxiType]) {
    errors.push('ประเภทรถไม่ถูกต้อง');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}