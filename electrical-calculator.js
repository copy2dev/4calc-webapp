/**
 * ระบบคำนวณทางไฟฟ้า
 * Electrical Calculator
 * คำนวณขนาดสายไฟ, ระยะทางสูงสุด, และ % แรงดันตก
 */

// ค่าคงที่สำหรับการคำนวณทางไฟฟ้า
export const ELECTRICAL_CONSTANTS = {
  // ความต้านทานของวัสดุ (Ohm⋅mm²/m ที่ 20°C)
  RESISTIVITY: {
    copper: 0.0175,      // ทองแดง
    aluminum: 0.0286     // อลูมิเนียม
  },

  // ตารางขนาดสายไฟ AWG และ mm²
  WIRE_SIZES: [
    { awg: '14', mm2: 2.08, ampacity_cu: 20, ampacity_al: 15 },
    { awg: '12', mm2: 3.31, ampacity_cu: 25, ampacity_al: 20 },
    { awg: '10', mm2: 5.26, ampacity_cu: 35, ampacity_al: 25 },
    { awg: '8', mm2: 8.37, ampacity_cu: 50, ampacity_al: 40 },
    { awg: '6', mm2: 13.3, ampacity_cu: 65, ampacity_al: 50 },
    { awg: '4', mm2: 21.2, ampacity_cu: 85, ampacity_al: 65 },
    { awg: '2', mm2: 33.6, ampacity_cu: 115, ampacity_al: 90 },
    { awg: '1/0', mm2: 53.5, ampacity_cu: 150, ampacity_al: 120 },
    { awg: '2/0', mm2: 67.4, ampacity_cu: 175, ampacity_al: 135 },
    { awg: '3/0', mm2: 85.0, ampacity_cu: 200, ampacity_al: 155 },
    { awg: '4/0', mm2: 107, ampacity_cu: 230, ampacity_al: 180 },
    
    // ขนาดมาตรฐานไทย (mm²)
    { awg: '-', mm2: 1.5, ampacity_cu: 16, ampacity_al: 12 },
    { awg: '-', mm2: 2.5, ampacity_cu: 24, ampacity_al: 18 },
    { awg: '-', mm2: 4.0, ampacity_cu: 32, ampacity_al: 25 },
    { awg: '-', mm2: 6.0, ampacity_cu: 41, ampacity_al: 32 },
    { awg: '-', mm2: 10.0, ampacity_cu: 57, ampacity_al: 44 },
    { awg: '-', mm2: 16.0, ampacity_cu: 76, ampacity_al: 59 },
    { awg: '-', mm2: 25.0, ampacity_cu: 101, ampacity_al: 78 },
    { awg: '-', mm2: 35.0, ampacity_cu: 125, ampacity_al: 96 },
    { awg: '-', mm2: 50.0, ampacity_cu: 151, ampacity_al: 117 },
    { awg: '-', mm2: 70.0, ampacity_cu: 192, ampacity_al: 148 },
    { awg: '-', mm2: 95.0, ampacity_cu: 232, ampacity_al: 179 },
    { awg: '-', mm2: 120.0, ampacity_cu: 269, ampacity_al: 207 },
    { awg: '-', mm2: 150.0, ampacity_cu: 309, ampacity_al: 238 },
    { awg: '-', mm2: 185.0, ampacity_cu: 353, ampacity_al: 272 },
    { awg: '-', mm2: 240.0, ampacity_cu: 415, ampacity_al: 320 }
  ],

  // ข้อจำกัดของ % Voltage Drop ตามมาตรฐาน
  VOLTAGE_DROP_LIMITS: {
    residential: {
      branch: 3,    // วงจรย่อย 3%
      feeder: 5,    // วงจรป้อน 5%
      total: 5      // รวม 5%
    },
    commercial: {
      branch: 3,    // วงจรย่อย 3%
      feeder: 5,    // วงจรป้อน 5%
      total: 5      // รวม 5%
    },
    industrial: {
      branch: 5,    // วงจรย่อย 5%
      feeder: 5,    // วงจรป้อน 5%
      total: 10     // รวม 10%
    }
  },

  // แรงดันมาตรฐาน
  STANDARD_VOLTAGES: [
    { voltage: 220, type: '1-phase', name: '220V 1เฟส' },
    { voltage: 380, type: '3-phase', name: '380V 3เฟส' },
    { voltage: 400, type: '3-phase', name: '400V 3เฟส' },
    { voltage: 480, type: '3-phase', name: '480V 3เฟส' }
  ],

  // Power Factor มาตรฐาน
  POWER_FACTORS: {
    motor: 0.8,
    lighting: 0.9,
    heating: 1.0,
    mixed: 0.85
  }
};

/**
 * คำนวณขนาดสายไฟขั้นต่ำ (Minimum Conductor Size)
 * @param {number} current - กระแส (Ampere)
 * @param {number} distance - ระยะทาง (เมตร)
 * @param {number} voltage - แรงดัน (Volt)
 * @param {number} voltageDropPercent - % Voltage Drop ที่ยอมรับได้
 * @param {string} material - ประเภทสาย (copper/aluminum)
 * @param {number} phases - จำนวนเฟส (1 หรือ 3)
 * @returns {Object} ผลการคำนวณขนาดสาย
 */
export function calculateMinimumConductorSize(current, distance, voltage, voltageDropPercent, material = 'copper', phases = 1) {
  if (current <= 0 || distance <= 0 || voltage <= 0 || voltageDropPercent <= 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: กระแส, ระยะทาง, แรงดัน และ % แรงดันตกต้องมากกว่า 0',
      errorEN: 'Invalid input: Current, distance, voltage, and voltage drop % must be > 0'
    };
  }

  const resistivity = ELECTRICAL_CONSTANTS.RESISTIVITY[material];
  if (!resistivity) {
    return {
      error: 'ประเภทสายไฟไม่ถูกต้อง',
      errorEN: 'Invalid conductor material'
    };
  }

  // คำนวณ % Voltage Drop ที่อนุญาต
  const allowedVoltageDrop = voltage * (voltageDropPercent / 100);
  
  // คำนวณความต้านทานสูงสุดที่อนุญาต
  let maxResistance;
  if (phases === 1) {
    // 1 เฟส: R = V_drop / I
    maxResistance = allowedVoltageDrop / current;
  } else {
    // 3 เฟส: R = V_drop / (√3 × I)
    maxResistance = allowedVoltageDrop / (Math.sqrt(3) * current);
  }

  // คำนวณขนาดสายขั้นต่ำ: A = ρ × L × 2 / R
  // (× 2 เพราะเป็นไป-กลับ)
  const minCrossSection = (resistivity * distance * 2) / maxResistance;

  // หาขนาดสายมาตรฐานที่เหมาะสม
  const suitableWires = ELECTRICAL_CONSTANTS.WIRE_SIZES
    .filter(wire => wire.mm2 >= minCrossSection)
    .sort((a, b) => a.mm2 - b.mm2);

  if (suitableWires.length === 0) {
    return {
      error: 'ไม่มีขนาดสายที่เหมาะสม กรุณาลดระยะทางหรือเพิ่ม % Voltage Drop ที่ยอมรับได้',
      errorEN: 'No suitable wire size found. Please reduce distance or increase allowable voltage drop'
    };
  }

  const recommendedWire = suitableWires[0];
  const ampacityProperty = material === 'copper' ? 'ampacity_cu' : 'ampacity_al';

  // ตรวจสอบ Ampacity
  const isAmpacitySufficient = recommendedWire[ampacityProperty] >= current;

  // คำนวณ Voltage Drop จริงของสายที่แนะนำ
  const actualResistance = (resistivity * distance * 2) / recommendedWire.mm2;
  let actualVoltageDrop;
  if (phases === 1) {
    actualVoltageDrop = actualResistance * current;
  } else {
    actualVoltageDrop = actualResistance * current * Math.sqrt(3);
  }
  const actualVoltageDropPercent = (actualVoltageDrop / voltage) * 100;

  // สร้างตารางเปรียบเทียบ
  const comparisonTable = suitableWires.slice(0, 5).map(wire => {
    const resistance = (resistivity * distance * 2) / wire.mm2;
    let voltageDrop;
    if (phases === 1) {
      voltageDrop = resistance * current;
    } else {
      voltageDrop = resistance * current * Math.sqrt(3);
    }
    const voltageDropPercent = (voltageDrop / voltage) * 100;
    const ampacitySufficient = wire[ampacityProperty] >= current;

    return {
      awg: wire.awg,
      mm2: wire.mm2,
      ampacity: wire[ampacityProperty],
      voltageDrop: Math.round(voltageDrop * 100) / 100,
      voltageDropPercent: Math.round(voltageDropPercent * 100) / 100,
      ampacitySufficient,
      suitable: voltageDropPercent <= voltageDropPercent && ampacitySufficient
    };
  });

  return {
    success: true,
    input: {
      current,
      distance,
      voltage,
      voltageDropPercent,
      material,
      phases
    },
    calculation: {
      minCrossSection: Math.round(minCrossSection * 100) / 100,
      recommendedWire: {
        awg: recommendedWire.awg,
        mm2: recommendedWire.mm2,
        ampacity: recommendedWire[ampacityProperty],
        actualVoltageDrop: Math.round(actualVoltageDrop * 100) / 100,
        actualVoltageDropPercent: Math.round(actualVoltageDropPercent * 100) / 100,
        isAmpacitySufficient
      },
      comparisonTable
    },
    warnings: generateWarnings(current, voltage, actualVoltageDropPercent, isAmpacitySufficient)
  };
}

/**
 * คำนวณระยะทางวงจรสูงสุด (Maximum Circuit Distance)
 * @param {number} wireSize - ขนาดสาย (mm²)
 * @param {number} current - กระแส (Ampere)
 * @param {number} voltage - แรงดัน (Volt)
 * @param {number} voltageDropPercent - % Voltage Drop ที่ยอมรับได้
 * @param {string} material - ประเภทสาย (copper/aluminum)
 * @param {number} phases - จำนวนเฟส (1 หรือ 3)
 * @returns {Object} ผลการคำนวณระยะทางสูงสุด
 */
export function calculateMaximumCircuitDistance(wireSize, current, voltage, voltageDropPercent, material = 'copper', phases = 1) {
  if (wireSize <= 0 || current <= 0 || voltage <= 0 || voltageDropPercent <= 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: ขนาดสาย, กระแส, แรงดัน และ % แรงดันตกต้องมากกว่า 0',
      errorEN: 'Invalid input: Wire size, current, voltage, and voltage drop % must be > 0'
    };
  }

  const resistivity = ELECTRICAL_CONSTANTS.RESISTIVITY[material];
  if (!resistivity) {
    return {
      error: 'ประเภทสายไฟไม่ถูกต้อง',
      errorEN: 'Invalid conductor material'
    };
  }

  // หาข้อมูลสายไฟ
  const wireInfo = ELECTRICAL_CONSTANTS.WIRE_SIZES.find(wire => 
    Math.abs(wire.mm2 - wireSize) < 0.1
  );

  // คำนวณ % Voltage Drop ที่อนุญาต
  const allowedVoltageDrop = voltage * (voltageDropPercent / 100);
  
  // คำนวณความต้านทานสูงสุดที่อนุญาต
  let maxResistance;
  if (phases === 1) {
    maxResistance = allowedVoltageDrop / current;
  } else {
    maxResistance = allowedVoltageDrop / (Math.sqrt(3) * current);
  }

  // คำนวณระยะทางสูงสุด: L = (R × A) / (ρ × 2)
  const maxDistance = (maxResistance * wireSize) / (resistivity * 2);

  // ตรวจสอบ Ampacity
  const ampacityProperty = material === 'copper' ? 'ampacity_cu' : 'ampacity_al';
  const ampacity = wireInfo ? wireInfo[ampacityProperty] : null;
  const isAmpacitySufficient = ampacity ? ampacity >= current : null;

  // สร้างตารางระยะทางสำหรับขนาดสายต่างๆ
  const distanceTable = ELECTRICAL_CONSTANTS.WIRE_SIZES
    .filter(wire => wire.mm2 >= wireSize * 0.5) // แสดงขนาดที่ใกล้เคียง
    .slice(0, 8)
    .map(wire => {
      const wireMaxResistance = phases === 1 
        ? allowedVoltageDrop / current
        : allowedVoltageDrop / (Math.sqrt(3) * current);
      const wireMaxDistance = (wireMaxResistance * wire.mm2) / (resistivity * 2);
      const wireAmpacitySufficient = wire[ampacityProperty] >= current;

      return {
        awg: wire.awg,
        mm2: wire.mm2,
        ampacity: wire[ampacityProperty],
        maxDistance: Math.round(wireMaxDistance * 100) / 100,
        ampacitySufficient: wireAmpacitySufficient,
        recommended: wireAmpacitySufficient && wireMaxDistance >= maxDistance
      };
    })
    .sort((a, b) => b.maxDistance - a.maxDistance);

  return {
    success: true,
    input: {
      wireSize,
      current,
      voltage,
      voltageDropPercent,
      material,
      phases
    },
    calculation: {
      maxDistance: Math.round(maxDistance * 100) / 100,
      wireInfo: wireInfo || { awg: 'Custom', mm2: wireSize, [ampacityProperty]: 'Unknown' },
      ampacity,
      isAmpacitySufficient,
      distanceTable
    },
    warnings: generateWarnings(current, voltage, voltageDropPercent, isAmpacitySufficient)
  };
}

/**
 * คำนวณ % แรงดันตก (Voltage Drop Percentage)
 * @param {number} wireSize - ขนาดสาย (mm²)
 * @param {number} current - กระแส (Ampere)
 * @param {number} distance - ระยะทาง (เมตร)
 * @param {number} voltage - แรงดัน (Volt)
 * @param {string} material - ประเภทสาย (copper/aluminum)
 * @param {number} phases - จำนวนเฟส (1 หรือ 3)
 * @returns {Object} ผลการคำนวณ % แรงดันตก
 */
export function calculateVoltageDropPercentage(wireSize, current, distance, voltage, material = 'copper', phases = 1) {
  if (wireSize <= 0 || current <= 0 || distance <= 0 || voltage <= 0) {
    return {
      error: 'ข้อมูลไม่ถูกต้อง: ขนาดสาย, กระแส, ระยะทาง และแรงดันต้องมากกว่า 0',
      errorEN: 'Invalid input: Wire size, current, distance, and voltage must be > 0'
    };
  }

  const resistivity = ELECTRICAL_CONSTANTS.RESISTIVITY[material];
  if (!resistivity) {
    return {
      error: 'ประเภทสายไฟไม่ถูกต้อง',
      errorEN: 'Invalid conductor material'
    };
  }

  // หาข้อมูลสายไฟ
  const wireInfo = ELECTRICAL_CONSTANTS.WIRE_SIZES.find(wire => 
    Math.abs(wire.mm2 - wireSize) < 0.1
  );

  // คำนวณความต้านทาน: R = ρ × L × 2 / A
  const resistance = (resistivity * distance * 2) / wireSize;

  // คำนวณ Voltage Drop
  let voltageDrop;
  if (phases === 1) {
    voltageDrop = resistance * current;
  } else {
    voltageDrop = resistance * current * Math.sqrt(3);
  }

  // คำนวณ % Voltage Drop
  const voltageDropPercentage = (voltageDrop / voltage) * 100;

  // แรงดันที่เหลือ
  const remainingVoltage = voltage - voltageDrop;

  // ตรวจสอบ Ampacity
  const ampacityProperty = material === 'copper' ? 'ampacity_cu' : 'ampacity_al';
  const ampacity = wireInfo ? wireInfo[ampacityProperty] : null;
  const isAmpacitySufficient = ampacity ? ampacity >= current : null;

  // ตรวจสอบมาตรฐาน
  const standards = checkVoltageDropStandards(voltageDropPercentage);

  // สร้างตารางเปรียบเทียบระยะทางต่างๆ
  const distanceComparisonTable = [10, 25, 50, 100, 150, 200, 300, 500].map(dist => {
    const distResistance = (resistivity * dist * 2) / wireSize;
    let distVoltageDrop;
    if (phases === 1) {
      distVoltageDrop = distResistance * current;
    } else {
      distVoltageDrop = distResistance * current * Math.sqrt(3);
    }
    const distVoltageDropPercent = (distVoltageDrop / voltage) * 100;

    return {
      distance: dist,
      voltageDrop: Math.round(distVoltageDrop * 100) / 100,
      voltageDropPercent: Math.round(distVoltageDropPercent * 100) / 100,
      remainingVoltage: Math.round((voltage - distVoltageDrop) * 100) / 100,
      acceptable: distVoltageDropPercent <= 5 // 5% เป็นมาตรฐานทั่วไป
    };
  });

  return {
    success: true,
    input: {
      wireSize,
      current,
      distance,
      voltage,
      material,
      phases
    },
    calculation: {
      resistance: Math.round(resistance * 10000) / 10000,
      voltageDrop: Math.round(voltageDrop * 100) / 100,
      voltageDropPercentage: Math.round(voltageDropPercentage * 100) / 100,
      remainingVoltage: Math.round(remainingVoltage * 100) / 100,
      wireInfo: wireInfo || { awg: 'Custom', mm2: wireSize, [ampacityProperty]: 'Unknown' },
      ampacity,
      isAmpacitySufficient,
      standards,
      distanceComparisonTable
    },
    warnings: generateWarnings(current, voltage, voltageDropPercentage, isAmpacitySufficient)
  };
}

/**
 * ตรวจสอบมาตรฐาน Voltage Drop
 * @param {number} voltageDropPercent - % Voltage Drop
 * @returns {Object} ผลการตรวจสอบมาตรฐาน
 */
function checkVoltageDropStandards(voltageDropPercent) {
  const limits = ELECTRICAL_CONSTANTS.VOLTAGE_DROP_LIMITS;
  
  return {
    residential: {
      branch: voltageDropPercent <= limits.residential.branch,
      feeder: voltageDropPercent <= limits.residential.feeder,
      total: voltageDropPercent <= limits.residential.total
    },
    commercial: {
      branch: voltageDropPercent <= limits.commercial.branch,
      feeder: voltageDropPercent <= limits.commercial.feeder,
      total: voltageDropPercent <= limits.commercial.total
    },
    industrial: {
      branch: voltageDropPercent <= limits.industrial.branch,
      feeder: voltageDropPercent <= limits.industrial.feeder,
      total: voltageDropPercent <= limits.industrial.total
    }
  };
}

/**
 * สร้างคำเตือนและคำแนะนำ
 * @param {number} current - กระแส
 * @param {number} voltage - แรงดัน
 * @param {number} voltageDropPercent - % Voltage Drop
 * @param {boolean} isAmpacitySufficient - Ampacity เพียงพอหรือไม่
 * @returns {Array} รายการคำเตือน
 */
function generateWarnings(current, voltage, voltageDropPercent, isAmpacitySufficient) {
  const warnings = [];

  if (voltageDropPercent > 5) {
    warnings.push({
      type: 'warning',
      message: '⚠️ % แรงดันตกเกิน 5% อาจส่งผลต่อประสิทธิภาพการทำงานของอุปกรณ์',
      messageEN: '⚠️ Voltage drop exceeds 5%, may affect equipment performance'
    });
  }

  if (voltageDropPercent > 10) {
    warnings.push({
      type: 'error',
      message: '❌ % แรงดันตกเกิน 10% ไม่เหมาะสมสำหรับการใช้งาน',
      messageEN: '❌ Voltage drop exceeds 10%, unsuitable for operation'
    });
  }

  if (isAmpacitySufficient === false) {
    warnings.push({
      type: 'error',
      message: '❌ ขนาดสายไม่เพียงพอสำหรับกระแสที่ใช้งาน (Ampacity)',
      messageEN: '❌ Wire size insufficient for operating current (Ampacity)'
    });
  }

  if (current > 100) {
    warnings.push({
      type: 'info',
      message: 'ℹ️ กระแสสูง ควรตรวจสอบการป้องกันและระบบดับเพลิง',
      messageEN: 'ℹ️ High current, check protection and fire safety systems'
    });
  }

  if (warnings.length === 0) {
    warnings.push({
      type: 'success',
      message: '✅ การคำนวณผ่านมาตรฐานความปลอดภัย',
      messageEN: '✅ Calculation meets safety standards'
    });
  }

  return warnings;
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลนำเข้า
 * @param {Object} params - พารามิเตอร์ที่จะตรวจสอบ
 * @returns {Object} ผลการตรวจสอบ
 */
export function validateElectricalInputs(params) {
  const errors = [];

  if (params.current !== undefined && (params.current <= 0 || params.current > 10000)) {
    errors.push('กระแสต้องอยู่ระหว่าง 0.1 - 10,000 แอมป์');
  }

  if (params.voltage !== undefined && (params.voltage <= 0 || params.voltage > 50000)) {
    errors.push('แรงดันต้องอยู่ระหว่าง 1 - 50,000 โวลต์');
  }

  if (params.distance !== undefined && (params.distance <= 0 || params.distance > 10000)) {
    errors.push('ระยะทางต้องอยู่ระหว่าง 0.1 - 10,000 เมตร');
  }

  if (params.wireSize !== undefined && (params.wireSize <= 0 || params.wireSize > 1000)) {
    errors.push('ขนาดสายต้องอยู่ระหว่าง 0.1 - 1,000 ตร.มม.');
  }

  if (params.voltageDropPercent !== undefined && (params.voltageDropPercent <= 0 || params.voltageDropPercent > 50)) {
    errors.push('% แรงดันตกต้องอยู่ระหว่าง 0.1 - 50%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}