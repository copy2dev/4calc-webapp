/**
 * ระบบคำนวณอายุครรภ์
 * Pregnancy Calculator
 * คำนวณอายุครรภ์จากวันแรกของประจำเดือนครั้งสุดท้าย (LMP) หรือวันตั้งครรภ์
 */

// ค่าคงที่สำหรับการคำนวณครรภ์
export const PREGNANCY_CONSTANTS = {
  // ระยะเวลาครรภ์มาตรฐาน
  STANDARD_PREGNANCY_DAYS: 280,      // 40 สัปดาห์
  STANDARD_PREGNANCY_WEEKS: 40,      // 40 สัปดาห์
  
  // ไตรมาสต่างๆ
  TRIMESTERS: {
    first: { start: 0, end: 13, name: 'ไตรมาสแรก', nameEN: 'First Trimester' },
    second: { start: 14, end: 27, name: 'ไตรมาสที่สอง', nameEN: 'Second Trimester' },
    third: { start: 28, end: 42, name: 'ไตรมาสที่สาม', nameEN: 'Third Trimester' }
  },
  
  // ช่วงเวลาคลอดปกติ
  NORMAL_DELIVERY_RANGE: {
    early: 37,    // สัปดาห์ที่ 37
    late: 42      // สัปดาห์ที่ 42
  }
};

// ข้อมูลพัฒนาการตามอายุครรภ์
export const PREGNANCY_MILESTONES = {
  4: {
    th: "❤️ หัวใจเริ่มเต้น, ระบบประสาทเริ่มพัฒนา",
    en: "❤️ Heart starts beating, nervous system begins developing"
  },
  8: {
    th: "👶 อวัยวะหลักเริ่มเกิด, ขนาดประมาณ 1.6 ซม.",
    en: "👶 Major organs begin forming, about 1.6 cm in size"
  },
  12: {
    th: "🦴 กระดูกเริ่มแข็ง, เพศเริ่มชัดเจน",
    en: "🦴 Bones start hardening, gender becomes clear"
  },
  16: {
    th: "👂 หูเริ่มได้ยิน, ผมเริ่มเจริญ",
    en: "👂 Ears start hearing, hair begins growing"
  },
  20: {
    th: "🤱 แม่เริ่มรู้สึกเด็กดิ้น, ขนาดประมาณ 25 ซม.",
    en: "🤱 Mother starts feeling movement, about 25 cm long"
  },
  24: {
    th: "👁️ ตาเริ่มเปิดได้, ปอดเริ่มพัฒนา",
    en: "👁️ Eyes can open, lungs start developing"
  },
  28: {
    th: "🧠 สมองพัฒนาเร็ว, มีโอกาสรอดถ้าคลอดก่อนกำหนด",
    en: "🧠 Rapid brain development, viable if born premature"
  },
  32: {
    th: "💪 กล้ามเนื้อแข็งแรงขึ้น, เริ่มสะสมไขมัน",
    en: "💪 Stronger muscles, fat storage begins"
  },
  36: {
    th: "🫁 ปอดเกือบพร้อม, น้ำหนักประมาณ 2.5 กก.",
    en: "🫁 Lungs nearly ready, weight about 2.5 kg"
  },
  40: {
    th: "🍼 พร้อมคลอด! น้ำหนักประมาณ 3-3.5 กก.",
    en: "🍼 Ready for birth! Weight about 3-3.5 kg"
  }
};

// คำแนะนำตามไตรมาส
export const TRIMESTER_ADVICE = {
  first: {
    th: [
      "🥗 รับประทานโฟลิกแอซิด 400-800 ไมโครกรัม/วัน",
      "🚭 หลีกเลี่ยงบุหรี่ แอลกอฮอล์ และยาเสพติด",
      "☕ จำกัดคาเฟอีนไม่เกิน 200 มก./วัน",
      "😴 พักผ่อนให้เพียงพอ จัดการความเครียด"
    ],
    en: [
      "🥗 Take 400-800 mcg folic acid daily",
      "🚭 Avoid smoking, alcohol, and drugs",
      "☕ Limit caffeine to under 200mg/day",
      "😴 Get adequate rest, manage stress"
    ]
  },
  second: {
    th: [
      "🏃‍♀️ ออกกำลังกายสม่ำเสมอ เช่น เดิน ว่ายน้ำ โยคะ",
      "🩺 ตรวจครรภ์ทุก 4 สัปดาห์",
      "🥛 ดื่มน้ำให้เพียงพอ อย่างน้อย 8-10 แก้ว/วัน",
      "👕 ใส่เสื้อผ้าคลายท้อง รองเท้าส้นเตี้ย"
    ],
    en: [
      "🏃‍♀️ Exercise regularly: walking, swimming, yoga",
      "🩺 Prenatal checkups every 4 weeks",
      "🥛 Stay hydrated, at least 8-10 glasses/day",
      "👕 Wear loose clothing, low-heeled shoes"
    ]
  },
  third: {
    th: [
      "🎒 เตรียมกระเป๋าคลอด ซื้อของใช้เด็ก",
      "🏥 เรียนคลาสเตรียมคลอด เลือกโรงพยาบาล",
      "😌 เตรียมจิตใจ เรียนรู้ท่าคลอด",
      "👥 จัดระบบช่วยเหลือหลังคลอด"
    ],
    en: [
      "🎒 Pack hospital bag, buy baby essentials",
      "🏥 Attend birthing classes, choose hospital",
      "😌 Mental preparation, learn birthing positions",
      "👥 Arrange postpartum support system"
    ]
  }
};

/**
 * คำนวณอายุครรภ์จากวัน LMP (Last Menstrual Period)
 * @param {Date} lmpDate - วันแรกของประจำเดือนครั้งสุดท้าย
 * @param {Date} currentDate - วันที่ปัจจุบัน (ไม่ระบุจะใช้วันนี้)
 * @returns {Object} ข้อมูลอายุครรภ์
 */
export function calculatePregnancyFromLMP(lmpDate, currentDate = new Date()) {
  if (!lmpDate || !(lmpDate instanceof Date)) {
    return {
      error: 'วันที่ประจำเดือนไม่ถูกต้อง',
      errorEN: 'Invalid LMP date'
    };
  }
  
  // คำนวณจำนวนวันตั้งแต่ LMP
  const daysDiff = Math.floor((currentDate - lmpDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 0) {
    return {
      error: 'วันที่ประจำเดือนต้องไม่เกินวันปัจจุบัน',
      errorEN: 'LMP date cannot be in the future'
    };
  }
  
  if (daysDiff > 300) {
    return {
      error: 'อายุครรภ์เกินระยะเวลาปกติ',
      errorEN: 'Pregnancy age exceeds normal range'
    };
  }
  
  // คำนวณสัปดาห์และวัน
  const weeks = Math.floor(daysDiff / 7);
  const days = daysDiff % 7;
  
  // คำนวณวันคลอดคาดการณ์ (EDD)
  const eddDate = new Date(lmpDate);
  eddDate.setDate(eddDate.getDate() + PREGNANCY_CONSTANTS.STANDARD_PREGNANCY_DAYS);
  
  // หาไตรมาส
  const trimester = getTrimester(weeks);
  
  // คำนวณเปอร์เซ็นต์ความคืบหน้า
  const progressPercent = Math.min((weeks / PREGNANCY_CONSTANTS.STANDARD_PREGNANCY_WEEKS) * 100, 100);
  
  // วันที่เหลือจนกว่าจะคลอด
  const daysRemaining = Math.max(0, Math.floor((eddDate - currentDate) / (1000 * 60 * 60 * 24)));
  
  return {
    success: true,
    gestationalAge: {
      totalDays: daysDiff,
      weeks,
      days,
      displayText: `${weeks} สัปดาห์ ${days} วัน`,
      displayTextEN: `${weeks} weeks ${days} days`
    },
    trimester,
    eddDate,
    lmpDate,
    currentDate,
    progressPercent: Math.round(progressPercent),
    daysRemaining,
    weeksRemaining: Math.ceil(daysRemaining / 7),
    milestone: getCurrentMilestone(weeks),
    advice: TRIMESTER_ADVICE[trimester.key],
    isFullTerm: weeks >= PREGNANCY_CONSTANTS.NORMAL_DELIVERY_RANGE.early,
    deliveryStatus: getDeliveryStatus(weeks)
  };
}

/**
 * คำนวณอายุครรภ์จากวันตั้งครรภ์/ผสม
 * @param {Date} conceptionDate - วันตั้งครรภ์
 * @param {Date} currentDate - วันที่ปัจจุบัน
 * @returns {Object} ข้อมูลอายุครรภ์
 */
export function calculatePregnancyFromConception(conceptionDate, currentDate = new Date()) {
  if (!conceptionDate || !(conceptionDate instanceof Date)) {
    return {
      error: 'วันที่ตั้งครรภ์ไม่ถูกต้อง',
      errorEN: 'Invalid conception date'
    };
  }
  
  // แปลงเป็น LMP โดยลบ 14 วัน (2 สัปดาห์)
  const lmpDate = new Date(conceptionDate);
  lmpDate.setDate(lmpDate.getDate() - 14);
  
  return calculatePregnancyFromLMP(lmpDate, currentDate);
}

/**
 * หาไตรมาสจากจำนวนสัปดาห์
 * @param {number} weeks - จำนวนสัปดาห์
 * @returns {Object} ข้อมูลไตรมาส
 */
function getTrimester(weeks) {
  const trimesters = PREGNANCY_CONSTANTS.TRIMESTERS;
  
  if (weeks <= trimesters.first.end) {
    return { ...trimesters.first, key: 'first' };
  } else if (weeks <= trimesters.second.end) {
    return { ...trimesters.second, key: 'second' };
  } else {
    return { ...trimesters.third, key: 'third' };
  }
}

/**
 * หาเหตุการณ์สำคัญในการพัฒนาตามอายุครรภ์
 * @param {number} weeks - จำนวนสัปดาห์
 * @returns {Object|null} ข้อมูลเหตุการณ์สำคัญ
 */
function getCurrentMilestone(weeks) {
  // หา milestone ที่ใกล้เคียงที่สุด
  const milestoneWeeks = Object.keys(PREGNANCY_MILESTONES).map(Number).sort((a, b) => a - b);
  
  // หา milestone ล่าสุดที่ผ่านมาแล้ว
  const passedMilestone = milestoneWeeks.filter(week => week <= weeks).pop();
  
  if (passedMilestone) {
    return {
      week: passedMilestone,
      ...PREGNANCY_MILESTONES[passedMilestone]
    };
  }
  
  // หา milestone ถัดไป
  const nextMilestone = milestoneWeeks.find(week => week > weeks);
  if (nextMilestone) {
    return {
      week: nextMilestone,
      isUpcoming: true,
      ...PREGNANCY_MILESTONES[nextMilestone]
    };
  }
  
  return null;
}

/**
 * หาสถานะการคลอด
 * @param {number} weeks - จำนวนสัปดาห์
 * @returns {Object} สถานะการคลอด
 */
function getDeliveryStatus(weeks) {
  const { early, late } = PREGNANCY_CONSTANTS.NORMAL_DELIVERY_RANGE;
  
  if (weeks < early) {
    return {
      status: 'preterm',
      message: 'ยังไม่ถึงกำหนดคลอด',
      messageEN: 'Preterm - not yet due',
      color: 'blue'
    };
  } else if (weeks >= early && weeks <= late) {
    return {
      status: 'term',
      message: 'ถึงกำหนดคลอดแล้ว',
      messageEN: 'Full term - ready for delivery',
      color: 'green'
    };
  } else {
    return {
      status: 'overdue',
      message: 'เกินกำหนดคลอด',
      messageEN: 'Overdue - past due date',
      color: 'red'
    };
  }
}

/**
 * แปลงสตริงวันที่เป็น Date object
 * @param {string} dateString - สตริงวันที่ในรูปแบบ YYYY-MM-DD
 * @returns {Date|null} Date object หรือ null ถ้าไม่ถูกต้อง
 */
export function parseDate(dateString) {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลนำเข้า
 * @param {Object} params - พารามิเตอร์ที่จะตรวจสอบ
 * @returns {Object} ผลการตรวจสอบ
 */
export function validatePregnancyInputs(params) {
  const errors = [];
  
  if (!params.lmpDate && !params.conceptionDate) {
    errors.push('กรุณาระบุวันที่ประจำเดือนครั้งสุดท้าย หรือวันตั้งครรภ์');
  }
  
  const inputDate = params.lmpDate || params.conceptionDate;
  if (inputDate) {
    const date = parseDate(inputDate);
    if (!date) {
      errors.push('รูปแบบวันที่ไม่ถูกต้อง');
    } else {
      const today = new Date();
      if (date > today) {
        errors.push('วันที่ต้องไม่เกินวันปัจจุบัน');
      }
      
      const daysDiff = (today - date) / (1000 * 60 * 60 * 24);
      if (daysDiff > 365) {
        errors.push('วันที่เกินระยะเวลาปกติ (เกิน 1 ปี)');
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * สร้างข้อมูลสรุปการตั้งครรภ์
 * @param {Object} pregnancyData - ข้อมูลการตั้งครรภ์
 * @param {string} language - ภาษา ('th' หรือ 'en')
 * @returns {Object} ข้อมูลสรุป
 */
export function generatePregnancySummary(pregnancyData, language = 'th') {
  const isEnglish = language === 'en';
  const { gestationalAge, trimester, eddDate, progressPercent, daysRemaining } = pregnancyData;
  
  return {
    currentAge: {
      text: isEnglish ? gestationalAge.displayTextEN : gestationalAge.displayText,
      weeks: gestationalAge.weeks,
      days: gestationalAge.days
    },
    trimester: {
      name: isEnglish ? trimester.nameEN : trimester.name,
      number: trimester.key === 'first' ? 1 : trimester.key === 'second' ? 2 : 3
    },
    dueDate: {
      date: eddDate.toLocaleDateString(isEnglish ? 'en-US' : 'th-TH'),
      daysLeft: daysRemaining,
      text: isEnglish ? `${daysRemaining} days remaining` : `อีก ${daysRemaining} วัน`
    },
    progress: {
      percent: progressPercent,
      text: isEnglish ? `${progressPercent}% complete` : `ผ่านไปแล้ว ${progressPercent}%`
    }
  };
}