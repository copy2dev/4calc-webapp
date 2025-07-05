/**
 * ข้อมูลสถานีรถไฟฟ้า MRT กรุงเทพฯ ครบถ้วน
 * MRT Station Data for Bangkok (Complete)
 */

export const MRT_LINES = {
  // สายสีน้ำเงิน (Blue Line)
  blue: {
    id: 'blue',
    nameTH: 'สายสีน้ำเงิน',
    nameEN: 'Blue Line',
    color: '#0066CC',
    stations: [
      // ส่วนขยาย หลักสอง - บางซื่อ
      { id: 'LAK', nameTH: 'หลักสอง', nameEN: 'Lak Song', code: 'BL01' },
      { id: 'PHO', nameTH: 'โพธิ์นิมิตร', nameEN: 'Pho Nimit', code: 'BL02' },
      { id: 'TAL', nameTH: 'ตลาดพลู', nameEN: 'Talad Phlu', code: 'BL03' },
      { id: 'WUT', nameTH: 'วุฒากาศ', nameEN: 'Wutthakat', code: 'BL04' },
      { id: 'BNG', nameTH: 'บางไผ่', nameEN: 'Bang Phai', code: 'BL05' },
      { id: 'BAW', nameTH: 'บางหว้า', nameEN: 'Bang Wa', code: 'BL06' },
      { id: 'PET', nameTH: 'เพชรเกษม 48', nameEN: 'Phetkasem 48', code: 'BL07' },
      { id: 'BKM', nameTH: 'บางแค-หมอชิต', nameEN: 'Bang Khae', code: 'BL08' },
      { id: 'LAT', nameTH: 'ลาดยาว', nameEN: 'Lat Yao', code: 'BL09' },
      
      // ส่วนหลัก
      { id: 'BAN', nameTH: 'บางซื่อ', nameEN: 'Bang Sue', code: 'BL10' },
      { id: 'KAM', nameTH: 'กำแพงเพชร', nameEN: 'Kamphaeng Phet', code: 'BL11' },
      { id: 'CHA', nameTH: 'จตุจักร', nameEN: 'Chatuchak Park', code: 'BL12' },
      { id: 'PAH', nameTH: 'พหลโยธิน', nameEN: 'Phahon Yothin', code: 'BL13' },
      { id: 'LAD', nameTH: 'ลาดพร้าว', nameEN: 'Lat Phrao', code: 'BL14' },
      { id: 'RAT', nameTH: 'รัชดาภิเษก', nameEN: 'Ratchadaphisek', code: 'BL15' },
      { id: 'SUT', nameTH: 'สุทธิสาร', nameEN: 'Sutthisan', code: 'BL16' },
      { id: 'HUA', nameTH: 'ห้วยขวาง', nameEN: 'Huai Khwang', code: 'BL17' },
      { id: 'CUL', nameTH: 'ศูนย์วัฒนธรรมแห่งประเทศไทย', nameEN: 'Thailand Cultural Centre', code: 'BL18' },
      { id: 'PRA', nameTH: 'พระราม 9', nameEN: 'Phra Ram 9', code: 'BL19' },
      { id: 'PET2', nameTH: 'เพชรบุรี', nameEN: 'Phetchaburi', code: 'BL20' },
      { id: 'SUK', nameTH: 'สุขุมวิท', nameEN: 'Sukhumvit', code: 'BL21' },
      { id: 'QSI', nameTH: 'ควีนสิริกิติ์', nameEN: 'Queen Sirikit', code: 'BL22' },
      { id: 'KLO', nameTH: 'คลองเตย', nameEN: 'Khlong Toei', code: 'BL23' },
      { id: 'LUM', nameTH: 'ลุมพินี', nameEN: 'Lumphini', code: 'BL24' },
      { id: 'SIL', nameTH: 'สีลม', nameEN: 'Silom', code: 'BL25' },
      { id: 'SAM', nameTH: 'สามย่าน', nameEN: 'Sam Yan', code: 'BL26' },
      { id: 'HUL', nameTH: 'หัวลำโพง', nameEN: 'Hua Lamphong', code: 'BL27' },
      { id: 'WAT', nameTH: 'วัดมังกร', nameEN: 'Wat Mangkon', code: 'BL28' },
      { id: 'SAY', nameTH: 'สามยอด', nameEN: 'Sam Yot', code: 'BL29' },
      { id: 'SAN', nameTH: 'สนามไชย', nameEN: 'Sanam Chai', code: 'BL30' },
      { id: 'ISA', nameTH: 'อิสรภาพ', nameEN: 'Itsaraphap', code: 'BL31' },
      { id: 'THO', nameTH: 'ธนบุรี', nameEN: 'Thonburi', code: 'BL32' },
      { id: 'WON', nameTH: 'วงเวียนใหญ่', nameEN: 'Wongwian Yai', code: 'BL33' },
      { id: 'KRU', nameTH: 'กรุงธนบุรี', nameEN: 'Krung Thon Buri', code: 'BL34' }
    ]
  },

  // สายสีม่วง (Purple Line)
  purple: {
    id: 'purple',
    nameTH: 'สายสีม่วง',
    nameEN: 'Purple Line',
    color: '#663399',
    stations: [
      { id: 'KLO2', nameTH: 'คลองบางไผ่', nameEN: 'Khlong Bang Phai', code: 'PP01' },
      { id: 'TAL2', nameTH: 'ตลาดบางใหญ่', nameEN: 'Talad Bang Yai', code: 'PP02' },
      { id: 'SAM2', nameTH: 'สามแยกบางใหญ่', nameEN: 'Sam Yaek Bang Yai', code: 'PP03' },
      { id: 'BAN2', nameTH: 'บางพลู', nameEN: 'Bang Phlu', code: 'PP04' },
      { id: 'BAN3', nameTH: 'บางรักใหญ่', nameEN: 'Bang Rak Yai', code: 'PP05' },
      { id: 'BAN4', nameTH: 'บางรักน้อย-ท่าอิฐ', nameEN: 'Bang Rak Noi Tha It', code: 'PP06' },
      { id: 'SAI', nameTH: 'ไทรม้า', nameEN: 'Sai Ma', code: 'PP07' },
      { id: 'PLI', nameTH: 'พลีเพลิน', nameEN: 'Pli Ploen', code: 'PP08' },
      { id: 'MAN', nameTH: 'มัยลาภ', nameEN: 'Mai Lap', code: 'PP09' },
      { id: 'NON', nameTH: 'หนองปรือ', nameEN: 'Nong Prue', code: 'PP10' },
      { id: 'YAE', nameTH: 'แยกติวานนท์', nameEN: 'Yaek Tiwanon', code: 'PP11' },
      { id: 'TIW', nameTH: 'ติวานนท์', nameEN: 'Tiwanon', code: 'PP12' },
      { id: 'THA', nameTH: 'ท่าอิฐ', nameEN: 'Tha It', code: 'PP13' },
      { id: 'PAK', nameTH: 'ปากเกร็ด', nameEN: 'Pak Kret', code: 'PP14' },
      { id: 'KHA', nameTH: 'แขวงเวียงพา', nameEN: 'Khaeng Wiang Pha', code: 'PP15' },
      { id: 'TAO', nameTH: 'เตาปูน', nameEN: 'Tao Pun', code: 'PP16' }
    ]
  },

  // สายสีแดง (Red Line) - ใช้งานบางส่วน
  red: {
    id: 'red',
    nameTH: 'สายสีแดง',
    nameEN: 'Red Line',
    color: '#CC0000',
    stations: [
      // Dark Red Line (รังสิต - บางซื่อ)
      { id: 'RAN', nameTH: 'รังสิต', nameEN: 'Rangsit', code: 'RL01' },
      { id: 'LAK2', nameTH: 'หลักหอก', nameEN: 'Lak Hok', code: 'RL02' },
      { id: 'DON', nameTH: 'ดอนเมือง', nameEN: 'Don Mueang', code: 'RL03' },
      { id: 'LAK3', nameTH: 'หลักสี่', nameEN: 'Lak Si', code: 'RL04' },
      { id: 'THA2', nameTH: 'ทุ่งสองห้อง', nameEN: 'Thung Song Hong', code: 'RL05' },
      { id: 'BAN5', nameTH: 'บางเขน', nameEN: 'Bang Khen', code: 'RL06' },
      { id: 'WAT2', nameTH: 'วัดเสมียนนารี', nameEN: 'Wat Samian Nari', code: 'RL07' },
      { id: 'CHA2', nameTH: 'จตุจักร', nameEN: 'Chatuchak', code: 'RL08' },
      { id: 'DUS', nameTH: 'ดุสิต', nameEN: 'Dusit', code: 'RL09' },
      { id: 'BAN6', nameTH: 'บางซื่อ', nameEN: 'Bang Sue', code: 'RL10' },

      // Light Red Line (บางซื่อ - มหาชัย)
      { id: 'BAN7', nameTH: 'บางซื่อ', nameEN: 'Bang Sue', code: 'RL10' },
      { id: 'WON2', nameTH: 'วงเวียนใหญ่', nameEN: 'Wong Wian Yai', code: 'RL11' },
      { id: 'TAL3', nameTH: 'ตลิ่งชัน', nameEN: 'Taling Chan', code: 'RL12' },
      { id: 'BAN8', nameTH: 'บางบำหรุ', nameEN: 'Bang Bamru', code: 'RL13' },
      { id: 'BAN9', nameTH: 'บางกรวย', nameEN: 'Bang Kruai', code: 'RL14' },
      { id: 'NON2', nameTH: 'หนองปลาดุก', nameEN: 'Nong Pla Duk', code: 'RL15' },
      { id: 'BAN10', nameTH: 'บางแสน', nameEN: 'Bang Saen', code: 'RL16' },
      { id: 'SAL', nameTH: 'ศาลายา', nameEN: 'Salaya', code: 'RL17' },
      { id: 'TAL4', nameTH: 'ตลาดนัดหัวเลาะ', nameEN: 'Talad Nat Hua Ro', code: 'RL18' },
      { id: 'NAK', nameTH: 'นครปฐม', nameEN: 'Nakhon Pathom', code: 'RL19' },
      { id: 'SAM3', nameTH: 'สามพราน', nameEN: 'Sam Phran', code: 'RL20' },
      { id: 'OMN', nameTH: 'อ้อมน้อย', nameEN: 'Om Noi', code: 'RL21' },
      { id: 'OMA', nameTH: 'อ้อมใหญ่', nameEN: 'Om Yai', code: 'RL22' },
      { id: 'KRA', nameTH: 'กระทุ่มแบน', nameEN: 'Krathum Baen', code: 'RL23' },
      { id: 'MAH', nameTH: 'มหาชัย', nameEN: 'Maha Chai', code: 'RL24' }
    ]
  },

  // สายสีชมพู (Pink Line) - ใน planning
  pink: {
    id: 'pink',
    nameTH: 'สายสีชมพู',
    nameEN: 'Pink Line',
    color: '#FF69B4',
    status: 'planning'
  },

  // สายสีเหลือง (Yellow Line) - ใน planning  
  yellow: {
    id: 'yellow',
    nameTH: 'สายสีเหลือง',
    nameEN: 'Yellow Line',
    color: '#FFD700',
    status: 'planning'
  }
};

// สถานีเชื่อมต่อระหว่างสาย
export const INTERCHANGE_STATIONS = [
  {
    station: 'บางซื่อ',
    lines: ['blue', 'red'],
    codes: ['BL10', 'RL10']
  },
  {
    station: 'จตุจักร',
    lines: ['blue', 'red'],
    codes: ['BL12', 'RL08']
  },
  {
    station: 'วงเวียนใหญ่',
    lines: ['blue', 'red'],
    codes: ['BL33', 'RL11']
  }
];

// ข้อมูลระยะทางและเวลาโดยประมาณ
export const TRAVEL_INFO = {
  // เวลาเฉลี่ยระหว่างสถานี (นาที)
  averageTimePerStation: 2,
  
  // เวลารอรถเฉลี่ย (นาที)
  averageWaitTime: 3,
  
  // ค่าโดยสารพื้นฐาน (บาท)
  baseFare: 16,
  
  // ค่าโดยสารต่อสถานี (บาท)
  farePerStation: 2,
  
  // ค่าโดยสารสูงสุด (บาท)
  maxFare: 42
};

// ฟังก์ชันคำนวณระยะทางระหว่างสถานี
export function calculateDistance(fromStationId, toStationId, lineId) {
  const line = MRT_LINES[lineId];
  if (!line || !line.stations) return null;
  
  const fromIndex = line.stations.findIndex(station => station.id === fromStationId);
  const toIndex = line.stations.findIndex(station => station.id === toStationId);
  
  if (fromIndex === -1 || toIndex === -1) return null;
  
  return Math.abs(toIndex - fromIndex);
}

// ฟังก์ชันคำนวณค่าโดยสาร
export function calculateFare(distance) {
  if (distance === 0) return 0;
  
  const fare = TRAVEL_INFO.baseFare + (distance * TRAVEL_INFO.farePerStation);
  return Math.min(fare, TRAVEL_INFO.maxFare);
}

// ฟังก์ชันคำนวณเวลาเดินทาง
export function calculateTravelTime(distance, isPeakHour = false) {
  if (distance === 0) return 0;
  
  const travelTime = (distance * TRAVEL_INFO.averageTimePerStation) + TRAVEL_INFO.averageWaitTime;
  
  // เพิ่มเวลาในช่วงชั่วโมงเร่งด่วน
  const peakMultiplier = isPeakHour ? 1.3 : 1;
  
  return Math.round(travelTime * peakMultiplier);
}