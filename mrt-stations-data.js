/**
 * ข้อมูลสถานีรถไฟฟ้า MRT กรุงเทพฯ อัปเดท 2567
 * Bangkok MRT Station Data (Updated 2024)
 * ข้อมูลอ้างอิงจาก Wikipedia และข้อมูลราชการ
 */

export const MRT_LINES = {
  // สายสีน้ำเงิน (Blue Line) - เฉลิมรัชมงคล
  blue: {
    id: 'blue',
    nameTH: 'สายสีน้ำเงิน',
    nameEN: 'Blue Line (Chaloem Ratchamongkhon)',
    color: '#0066CC',
    totalStations: 38,
    operational: true,
    stations: [
      // ส่วนขยาย ท่าพระ - บางซื่อ
      { id: 'THA', nameTH: 'ท่าพระ', nameEN: 'Tha Phra', code: 'BL01' },
      { id: 'CHA1', nameTH: 'จรัลสนิทวงศ์ 13', nameEN: 'Charan Sanit Wong 13', code: 'BL02' },
      { id: 'FAR', nameTH: 'ฟาร์ัน พงษ์', nameEN: 'Faran Phong', code: 'BL03' },
      { id: 'KHB', nameTH: 'คลองบางไผ่', nameEN: 'Khlong Bang Phai', code: 'BL04' },
      { id: 'BAN7', nameTH: 'บางยี่ขัน', nameEN: 'Bang Yi Khan', code: 'BL05' },
      { id: 'SIR', nameTH: 'ศิริราช', nameEN: 'Siriraj', code: 'BL06' },
      { id: 'THO1', nameTH: 'ธนบุรี', nameEN: 'Thonburi', code: 'BL07' },
      { id: 'ISA1', nameTH: 'อิสรภาพ', nameEN: 'Itsaraphap', code: 'BL08' },
      { id: 'SAN1', nameTH: 'สนามไชย', nameEN: 'Sanam Chai', code: 'BL09' },
      { id: 'SAY1', nameTH: 'สามยอด', nameEN: 'Sam Yot', code: 'BL10' },
      { id: 'WAT1', nameTH: 'วัดมังกร', nameEN: 'Wat Mangkon', code: 'BL11' },
      { id: 'HUL1', nameTH: 'หัวลำโพง', nameEN: 'Hua Lamphong', code: 'BL12' },
      { id: 'SAM1', nameTH: 'สามย่าน', nameEN: 'Sam Yan', code: 'BL13' },
      { id: 'SIL1', nameTH: 'สีลม', nameEN: 'Silom', code: 'BL14' },
      { id: 'LUM1', nameTH: 'ลุมพินี', nameEN: 'Lumphini', code: 'BL15' },
      { id: 'KLO1', nameTH: 'คลองเตย', nameEN: 'Khlong Toei', code: 'BL16' },
      { id: 'QSI1', nameTH: 'ควีนสิริกิติ์', nameEN: 'Queen Sirikit', code: 'BL17' },
      { id: 'SUK1', nameTH: 'สุขุมวิท', nameEN: 'Sukhumvit', code: 'BL18' },
      { id: 'PET1', nameTH: 'เพชรบุรี', nameEN: 'Phetchaburi', code: 'BL19' },
      { id: 'PRA1', nameTH: 'พระราม 9', nameEN: 'Phra Ram 9', code: 'BL20' },
      { id: 'CUL1', nameTH: 'ศูนย์วัฒนธรรม', nameEN: 'Thailand Cultural Centre', code: 'BL21' },
      { id: 'HUA1', nameTH: 'ห้วยขวาง', nameEN: 'Huai Khwang', code: 'BL22' },
      { id: 'SUT1', nameTH: 'สุทธิสาร', nameEN: 'Sutthisan', code: 'BL23' },
      { id: 'RAT1', nameTH: 'รัชดาภิเษก', nameEN: 'Ratchadaphisek', code: 'BL24' },
      { id: 'LAD1', nameTH: 'ลาดพร้าว', nameEN: 'Lat Phrao', code: 'BL25' },
      { id: 'PAH1', nameTH: 'พหลโยธิน', nameEN: 'Phahon Yothin', code: 'BL26' },
      { id: 'CHA2', nameTH: 'จตุจักร', nameEN: 'Chatuchak Park', code: 'BL27' },
      { id: 'KAM1', nameTH: 'กำแพงเพชร', nameEN: 'Kamphaeng Phet', code: 'BL28' },
      { id: 'BAN1', nameTH: 'บางซื่อ', nameEN: 'Bang Sue', code: 'BL29' },
      { id: 'LAT1', nameTH: 'ลาดยาว', nameEN: 'Lat Yao', code: 'BL30' },
      { id: 'BKM1', nameTH: 'บางแค', nameEN: 'Bang Khae', code: 'BL31' },
      { id: 'PET2', nameTH: 'เพชรเกษม 48', nameEN: 'Phetkasem 48', code: 'BL32' },
      { id: 'BAW1', nameTH: 'บางหว้า', nameEN: 'Bang Wa', code: 'BL33' },
      { id: 'BNG1', nameTH: 'บางไผ่', nameEN: 'Bang Phai', code: 'BL34' },
      { id: 'WUT1', nameTH: 'วุฒากาศ', nameEN: 'Wutthakat', code: 'BL35' },
      { id: 'TAL1', nameTH: 'ตลาดพลู', nameEN: 'Talad Phlu', code: 'BL36' },
      { id: 'PHO1', nameTH: 'โพธิ์นิมิตร', nameEN: 'Pho Nimit', code: 'BL37' },
      { id: 'LAK1', nameTH: 'หลักสอง', nameEN: 'Lak Song', code: 'BL38' }
    ]
  },

  // สายสีม่วง (Purple Line) - เฉลิมรัชธรรม
  purple: {
    id: 'purple',
    nameTH: 'สายสีม่วง',
    nameEN: 'Purple Line (Chaloem Ratchadham)',
    color: '#663399',
    totalStations: 16,
    operational: true,
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
      { id: 'THA2', nameTH: 'ท่าอิฐ', nameEN: 'Tha It', code: 'PP13' },
      { id: 'PAK', nameTH: 'ปากเกร็ด', nameEN: 'Pak Kret', code: 'PP14' },
      { id: 'KHA', nameTH: 'แขวงเวียงพา', nameEN: 'Khaeng Wiang Pha', code: 'PP15' },
      { id: 'TAO', nameTH: 'เตาปูน', nameEN: 'Tao Poon', code: 'PP16' }
    ]
  },

  // สายสีเหลือง (Yellow Line) - นครภิพัฒน์
  yellow: {
    id: 'yellow',
    nameTH: 'สายสีเหลือง',
    nameEN: 'Yellow Line (Nakhon Phiphat)',
    color: '#FFD700',
    totalStations: 23,
    operational: true,
    stations: [
      { id: 'LAD2', nameTH: 'ลาดพร้าว', nameEN: 'Lat Phrao', code: 'YL01' },
      { id: 'PHW', nameTH: 'พหลโยธิน 24', nameEN: 'Phahon Yothin 24', code: 'YL02' },
      { id: 'CHO', nameTH: 'โชคชัย 4', nameEN: 'Chok Chai 4', code: 'YL03' },
      { id: 'LAD3', nameTH: 'ลาดพร้าว 71', nameEN: 'Lat Phrao 71', code: 'YL04' },
      { id: 'LAD4', nameTH: 'ลาดพร้าว 83', nameEN: 'Lat Phrao 83', code: 'YL05' },
      { id: 'MAL', nameTH: 'มาลัยแมน', nameEN: 'Malai Man', code: 'YL06' },
      { id: 'RAM', nameTH: 'รามอินทรา 4 กม.', nameEN: 'Ram Inthra Km.4', code: 'YL07' },
      { id: 'LAD5', nameTH: 'ลาดปลาเค้า', nameEN: 'Lat Plakhao', code: 'YL08' },
      { id: 'RAM2', nameTH: 'รามอินทรา 6 กม.', nameEN: 'Ram Inthra Km.6', code: 'YL09' },
      { id: 'KRU2', nameTH: 'กรุงเทพกรีฑา', nameEN: 'Krungthep Kreetha', code: 'YL10' },
      { id: 'HUA2', nameTH: 'หัวหมาก', nameEN: 'Hua Mak', code: 'YL11' },
      { id: 'RAM3', nameTH: 'รามคำแหง', nameEN: 'Ram Khamhaeng', code: 'YL12' },
      { id: 'RAJ', nameTH: 'ราชมังคลากีฬาสถาน', nameEN: 'Rajamangala Stadium', code: 'YL13' },
      { id: 'SRI', nameTH: 'ศรีนวล', nameEN: 'Si Nuan', code: 'YL14' },
      { id: 'HUA3', nameTH: 'หัวตะเข้', nameEN: 'Hua Takhe', code: 'YL15' },
      { id: 'BAN8', nameTH: 'บางอ้อ', nameEN: 'Bang O', code: 'YL16' },
      { id: 'SAM4', nameTH: 'สำโรงกลาง', nameEN: 'Samrong Klang', code: 'YL17' },
      { id: 'SAM5', nameTH: 'สำโรง', nameEN: 'Samrong', code: 'YL18' },
      { id: 'SAM6', nameTH: 'สำโรง กม.3', nameEN: 'Samrong Km.3', code: 'YL19' },
      { id: 'SAM7', nameTH: 'สำโรง กม.6', nameEN: 'Samrong Km.6', code: 'YL20' },
      { id: 'SAM8', nameTH: 'สำโรง กม.9', nameEN: 'Samrong Km.9', code: 'YL21' },
      { id: 'SAM9', nameTH: 'สำโรง กม.12', nameEN: 'Samrong Km.12', code: 'YL22' },
      { id: 'KEH', nameTH: 'เคหะ', nameEN: 'Kheha', code: 'YL23' }
    ]
  },

  // สายสีชมพู (Pink Line)
  pink: {
    id: 'pink',
    nameTH: 'สายสีชมพู',
    nameEN: 'Pink Line',
    color: '#FF1493',
    totalStations: 32,
    operational: true,
    stations: [
      // แคราย - ศูนย์ราชการนนทบุรี
      { id: 'KHR', nameTH: 'แคราย', nameEN: 'Khae Rai', code: 'PK01' },
      { id: 'MUT', nameTH: 'เมืองทองธานี', nameEN: 'Muang Thong Thani', code: 'PK02' },
      { id: 'IMP', nameTH: 'อิมแพ็ค เมืองทองธานี', nameEN: 'IMPACT Muang Thong Thani', code: 'PK03' },
      { id: 'COS', nameTH: 'คอสโมบาซาร์', nameEN: 'Cosmo Bazaar', code: 'PK04' },
      { id: 'GOV', nameTH: 'ศูนย์ราชการนนทบุรี', nameEN: 'Government Complex', code: 'PK05' },
      { id: 'MIN', nameTH: 'กระทรวงสาธารณสุข', nameEN: 'Ministry of Public Health', code: 'PK06' },
      { id: 'YAE2', nameTH: 'แยกติวานนท์', nameEN: 'Yaek Tiwanon', code: 'PK07' },
      { id: 'SAM10', nameTH: 'สามัคคี', nameEN: 'Samakkhi', code: 'PK08' },
      { id: 'ROY', nameTH: 'โรงพยาบาลราชวิถี', nameEN: 'Rajavithi Hospital', code: 'PK09' },
      { id: 'RAN2', nameTH: 'รางน้ำ', nameEN: 'Rang Nam', code: 'PK10' },
      { id: 'PRA2', nameTH: 'ประตูน้ำ', nameEN: 'Pratunam', code: 'PK11' },
      { id: 'RAT2', nameTH: 'ราชปรารภ', nameEN: 'Ratchaprarop', code: 'PK12' },
      { id: 'MAK', nameTH: 'มักกะสัน', nameEN: 'Makkasan', code: 'PK13' },
      { id: 'RAM4', nameTH: 'รามคำแหง 12', nameEN: 'Ram Khamhaeng 12', code: 'PK14' },
      { id: 'LAM', nameTH: 'ลาดมะยม', nameEN: 'Lad Mayom', code: 'PK15' },
      { id: 'RAM5', nameTH: 'รามคำแหง 34', nameEN: 'Ram Khamhaeng 34', code: 'PK16' },
      { id: 'WAT3', nameTH: 'วัดเทพลีลา', nameEN: 'Wat Thep Lila', code: 'PK17' },
      { id: 'KLO3', nameTH: 'คลองบ้านม้า', nameEN: 'Khlong Ban Ma', code: 'PK18' },
      { id: 'HIP', nameTH: 'ฮิปโปโดรม', nameEN: 'Hippodrome', code: 'PK19' },
      { id: 'CHO2', nameTH: 'ช่องนนทรี', nameEN: 'Chong Nonsi', code: 'PK20' },
      { id: 'KLO4', nameTH: 'คลองเตย', nameEN: 'Khlong Toei', code: 'PK21' },
      { id: 'WAT4', nameTH: 'วัดทะเลทอง', nameEN: 'Wat Tha Le Thong', code: 'PK22' },
      { id: 'MIN2', nameTH: 'มีนบุรี', nameEN: 'Min Buri', code: 'PK23' },
      { id: 'MIN3', nameTH: 'มีนบุรี กม.7', nameEN: 'Min Buri Km.7', code: 'PK24' },
      { id: 'MIN4', nameTH: 'มีนบุรี กม.8', nameEN: 'Min Buri Km.8', code: 'PK25' },
      { id: 'LAT6', nameTH: 'ลาดกระบัง', nameEN: 'Lat Krabang', code: 'PK26' },
      { id: 'LAT7', nameTH: 'ลาดกระบัง กม.2', nameEN: 'Lat Krabang Km.2', code: 'PK27' },
      { id: 'LAT8', nameTH: 'ลาดกระบัง กม.4.5', nameEN: 'Lat Krabang Km.4.5', code: 'PK28' },
      { id: 'LAT9', nameTH: 'ลาดกระบัง กม.7.5', nameEN: 'Lat Krabang Km.7.5', code: 'PK29' },
      { id: 'LAT10', nameTH: 'ลาดกระบัง กม.10', nameEN: 'Lat Krabang Km.10', code: 'PK30' },
      { id: 'LAT11', nameTH: 'ลาดกระบัง กม.12', nameEN: 'Lat Krabang Km.12', code: 'PK31' },
      { id: 'MIN5', nameTH: 'มีนบุรี กม.14', nameEN: 'Min Buri Km.14', code: 'PK32' }
    ]
  }
};

// สถานีเชื่อมต่อระหว่างสาย
export const INTERCHANGE_STATIONS = [
  {
    station: 'ลาดพร้าว',
    lines: ['blue', 'yellow'],
    codes: ['BL25', 'YL01']
  },
  {
    station: 'เตาปูน',
    lines: ['purple'],
    codes: ['PP16']
  },
  {
    station: 'แยกติวานนท์',
    lines: ['purple', 'pink'],
    codes: ['PP11', 'PK07']
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

// ฟังก์ชันสร้างรายการสถานีที่ผ่าน
export function getRouteStations(fromStationId, toStationId, lineId) {
  const line = MRT_LINES[lineId];
  if (!line || !line.stations) return [];
  
  const fromIndex = line.stations.findIndex(s => s.id === fromStationId);
  const toIndex = line.stations.findIndex(s => s.id === toStationId);
  
  if (fromIndex === -1 || toIndex === -1) return [];
  
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  
  const routeStations = line.stations.slice(start, end + 1);
  
  // หากเดินทางจากสถานีที่อยู่หลังไปหน้า ให้กลับลำดับ
  if (fromIndex > toIndex) {
    routeStations.reverse();
  }
  
  return routeStations;
}