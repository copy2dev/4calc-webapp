/**
 * ระบบคำนวณ BTU เครื่องปรับอากาศ
 * BTU Air Conditioner Calculator
 * คำนวณความต้องการ BTU ตามขนาดห้องและปัจจัยต่างๆ
 */

// ค่าคงที่สำหรับการคำนวณ BTU
export const BTU_CONSTANTS = {
  // BTU พื้นฐานต่อตารางเมตร (สำหรับห้องทั่วไป)
  BASE_BTU_PER_SQM: 600,
  
  // BTU พื้นฐานต่อตารางฟุต
  BASE_BTU_PER_SQFT: 25,
  
  // ปัจจัยปรับแต่งตามทิศทาง
  DIRECTION_FACTORS: {
    north: 0.9,      // ทิศเหนือ - เย็นกว่า
    northeast: 0.95, // ทิศตะวันออกเฉียงเหนือ
    east: 1.0,       // ทิศตะวันออก - ปกติ
    southeast: 1.1,  // ทิศตะวันออกเฉียงใต้
    south: 1.15,     // ทิศใต้ - ร้อนที่สุด
    southwest: 1.1,  // ทิศตะวันตกเฉียงใต้
    west: 1.05,      // ทิศตะวันตก
    northwest: 0.95  // ทิศตะวันตกเฉียงเหนือ
  },
  
  // ปัจจัยปรับแต่งตามชั้น
  FLOOR_FACTORS: {
    ground: 0.95,    // ชั้นล่าง/ชั้นแรก
    middle: 1.0,     // ชั้นกลาง
    top: 1.15        // ชั้นบนสุด/ดาดฟ้า
  },
  
  // ปัจจัยปรับแต่งตามจำนวนคน
  PEOPLE_BTU: 600,   // BTU เพิ่มต่อคน
  
  // ปัจจัยปรับแต่งตามอุปกรณ์ไฟฟ้า
  APPLIANCE_BTU: {
    computer: 300,     // คอมพิวเตอร์
    tv: 200,          // ทีวี
    refrigerator: 1000, // ตู้เย็น
    lighting: 100,     // หลอดไฟ (ต่อหลอด)
    oven: 2000        // เตาอบ/ไมโครเวฟ
  },
  
  // ปัจจัยปรับแต่งตามความสูงเพดาน
  CEILING_HEIGHT_FACTORS: {
    low: 0.9,        // เพดานต่ำ (< 2.5 ม.)
    normal: 1.0,     // เพดานปกติ (2.5-3 ม.)
    high: 1.1        // เพดานสูง (> 3 ม.)
  },
  
  // ปัจจัยปรับแต่งตามประเภทห้อง
  ROOM_TYPE_FACTORS: {
    bedroom: 0.9,     // ห้องนอน
    living: 1.0,      // ห้องนั่งเล่น
    kitchen: 1.2,     // ห้องครัว
    office: 1.1,      // ห้องทำงาน
    server: 1.5       // ห้องเซิร์ฟเวอร์
  }
};

// ข้อมูลขนาด BTU มาตรฐานของเครื่องปรับอากาศ
export const STANDARD_BTU_SIZES = [
  { btu: 9000, ton: 0.75, type: '9,000 BTU (3/4 ตัน)' },
  { btu: 12000, ton: 1.0, type: '12,000 BTU (1 ตัน)' },
  { btu: 18000, ton: 1.5, type: '18,000 BTU (1.5 ตัน)' },
  { btu: 24000, ton: 2.0, type: '24,000 BTU (2 ตัน)' },
  { btu: 30000, ton: 2.5, type: '30,000 BTU (2.5 ตัน)' },
  { btu: 36000, ton: 3.0, type: '36,000 BTU (3 ตัน)' },
  { btu: 42000, ton: 3.5, type: '42,000 BTU (3.5 ตัน)' },
  { btu: 48000, ton: 4.0, type: '48,000 BTU (4 ตัน)' }
];

/**
 * คำนวณ BTU พื้นฐานจากขนาดห้อง
 * @param {number} area - พื้นที่ห้อง (ตารางเมตร)
 * @param {string} unit - หน่วย ('sqm' หรือ 'sqft')
 * @returns {number} BTU พื้นฐาน
 */
export function calculateBaseBTU(area, unit = 'sqm') {
  if (area <= 0) return 0;
  
  if (unit === 'sqft') {
    return area * BTU_CONSTANTS.BASE_BTU_PER_SQFT;
  } else {
    return area * BTU_CONSTANTS.BASE_BTU_PER_SQM;
  }
}

/**
 * คำนวณ BTU รวมทั้งหมด
 * @param {Object} params - พารามิเตอร์การคำนวณ
 * @returns {Object} ผลการคำนวณ BTU
 */
export function calculateBTU({
  area,
  unit = 'sqm',
  direction = 'east',
  floor = 'middle',
  peopleCount = 2,
  roomType = 'living',
  ceilingHeight = 'normal',
  appliances = {
    computer: 0,
    tv: 0,
    refrigerator: 0,
    lighting: 0,
    oven: 0
  }
}) {
  // ตรวจสอบข้อมูลนำเข้า
  if (area <= 0) {
    return {
      error: 'พื้นที่ห้องต้องมากกว่า 0',
      errorEN: 'Room area must be greater than 0'
    };
  }
  
  // คำนวณ BTU พื้นฐาน
  const baseBTU = calculateBaseBTU(area, unit);
  
  // ปัจจัยปรับแต่งต่างๆ
  const directionFactor = BTU_CONSTANTS.DIRECTION_FACTORS[direction] || 1.0;
  const floorFactor = BTU_CONSTANTS.FLOOR_FACTORS[floor] || 1.0;
  const roomTypeFactor = BTU_CONSTANTS.ROOM_TYPE_FACTORS[roomType] || 1.0;
  const ceilingFactor = BTU_CONSTANTS.CEILING_HEIGHT_FACTORS[ceilingHeight] || 1.0;
  
  // BTU จากจำนวนคน
  const peopleBTU = peopleCount * BTU_CONSTANTS.PEOPLE_BTU;
  
  // BTU จากอุปกรณ์ไฟฟ้า
  let applianceBTU = 0;
  Object.keys(appliances).forEach(appliance => {
    const count = appliances[appliance] || 0;
    const btuPerUnit = BTU_CONSTANTS.APPLIANCE_BTU[appliance] || 0;
    applianceBTU += count * btuPerUnit;
  });
  
  // คำนวณ BTU รวม
  const adjustedBaseBTU = baseBTU * directionFactor * floorFactor * roomTypeFactor * ceilingFactor;
  const totalBTU = adjustedBaseBTU + peopleBTU + applianceBTU;
  
  // หาขนาดเครื่องปรับอากาศที่เหมาะสม
  const recommendedSize = findRecommendedACSize(totalBTU);
  
  return {
    success: true,
    calculation: {
      baseBTU: Math.round(baseBTU),
      adjustedBaseBTU: Math.round(adjustedBaseBTU),
      peopleBTU,
      applianceBTU,
      totalBTU: Math.round(totalBTU)
    },
    factors: {
      direction: directionFactor,
      floor: floorFactor,
      roomType: roomTypeFactor,
      ceiling: ceilingFactor
    },
    recommendation: recommendedSize,
    area,
    unit,
    breakdown: {
      baseBTU: Math.round(baseBTU),
      directionAdjustment: Math.round((directionFactor - 1) * baseBTU),
      floorAdjustment: Math.round((floorFactor - 1) * baseBTU),
      roomTypeAdjustment: Math.round((roomTypeFactor - 1) * baseBTU),
      ceilingAdjustment: Math.round((ceilingFactor - 1) * baseBTU),
      peopleBTU,
      applianceBTU,
      total: Math.round(totalBTU)
    }
  };
}

/**
 * หาขนาดเครื่องปรับอากาศที่แนะนำ
 * @param {number} requiredBTU - BTU ที่ต้องการ
 * @returns {Object} ข้อมูลเครื่องปรับอากาศที่แนะนำ
 */
export function findRecommendedACSize(requiredBTU) {
  // หาขนาดที่เหมาะสม (เลือกขนาดที่ใกล้เคียงหรือใหญ่กว่าเล็กน้อย)
  const suitable = STANDARD_BTU_SIZES.find(size => size.btu >= requiredBTU);
  
  if (!suitable) {
    // ถ้าต้องการ BTU มากเกินไป ให้แนะนำใช้หลายเครื่อง
    const largestSize = STANDARD_BTU_SIZES[STANDARD_BTU_SIZES.length - 1];
    const machineCount = Math.ceil(requiredBTU / largestSize.btu);
    
    return {
      single: false,
      machineCount,
      eachMachine: largestSize,
      totalBTU: machineCount * largestSize.btu,
      message: `แนะนำใช้ ${machineCount} เครื่อง ขนาด ${largestSize.type} แต่ละเครื่อง`
    };
  }
  
  return {
    single: true,
    recommended: suitable,
    efficiency: Math.round((requiredBTU / suitable.btu) * 100),
    message: `แนะนำขนาด ${suitable.type}`
  };
}

/**
 * แปลงหน่วยพื้นที่
 * @param {number} area - พื้นที่
 * @param {string} from - หน่วยต้นทาง
 * @param {string} to - หน่วยปลายทาง
 * @returns {number} พื้นที่ที่แปลงแล้ว
 */
export function convertArea(area, from, to) {
  if (from === to) return area;
  
  // แปลงเป็นตารางเมตรก่อน
  let sqm = area;
  if (from === 'sqft') {
    sqm = area * 0.092903; // 1 sqft = 0.092903 sqm
  }
  
  // แปลงไปหน่วยปลายทาง
  if (to === 'sqft') {
    return sqm / 0.092903;
  }
  
  return sqm;
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลนำเข้า
 * @param {Object} params - พารามิเตอร์ที่จะตรวจสอบ
 * @returns {Object} ผลการตรวจสอบ
 */
export function validateBTUInputs(params) {
  const errors = [];
  
  if (!params.area || params.area <= 0) {
    errors.push('พื้นที่ห้องต้องมากกว่า 0');
  }
  
  if (params.area > 1000) {
    errors.push('พื้นที่ห้องใหญ่เกินไป (เกิน 1,000 ตร.ม.)');
  }
  
  if (params.peopleCount && params.peopleCount < 0) {
    errors.push('จำนวนคนต้องเป็นค่าบวก');
  }
  
  if (params.peopleCount && params.peopleCount > 50) {
    errors.push('จำนวนคนมากเกินไป (เกิน 50 คน)');
  }
  
  if (params.unit && !['sqm', 'sqft'].includes(params.unit)) {
    errors.push('หน่วยพื้นที่ไม่ถูกต้อง');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * สร้างคำแนะนำการประหยัดพลังงาน
 * @param {number} totalBTU - BTU ที่คำนวณได้
 * @param {Object} factors - ปัจจัยต่างๆ
 * @returns {Array} รายการคำแนะนำ
 */
export function generateEnergyTips(totalBTU, factors) {
  const tips = [];
  
  if (factors.direction > 1.05) {
    tips.push({
      type: 'direction',
      message: 'ห้องหันหน้าไปทางใต้/ตะวันตก ควรติดม่านกันแสงเพื่อลดความร้อน',
      messageEN: 'Room faces south/west, consider installing blinds to reduce heat'
    });
  }
  
  if (factors.floor > 1.1) {
    tips.push({
      type: 'insulation',
      message: 'ห้องอยู่ชั้นบนสุด ควรเพิ่มฉนวนกันความร้อนที่หลังคา',
      messageEN: 'Top floor room should have roof insulation'
    });
  }
  
  if (factors.ceiling > 1.05) {
    tips.push({
      type: 'ceiling',
      message: 'เพดานสูง ควรใช้พัดลมเพดานช่วยหมุนเวียนอากาศ',
      messageEN: 'High ceiling should use ceiling fan for air circulation'
    });
  }
  
  if (totalBTU > 30000) {
    tips.push({
      type: 'efficiency',
      message: 'ห้องใหญ่ ควรเลือกเครื่องปรับอากาศ Inverter เพื่อประหยัดไฟ',
      messageEN: 'Large room should use Inverter AC for energy saving'
    });
  }
  
  return tips;
}