/**
 * ระบบคำนวณระยะทางระหว่างจุด 2 จุด
 * Distance Calculator
 * คำนวณระยะทาง ทิศทาง และเวลาเดินทางระหว่างสถานที่ต่างๆ
 */

// ค่าคงที่สำหรับการคำนวณระยะทาง
export const DISTANCE_CONSTANTS = {
  // รัศมีโลก (กิโลเมตร)
  EARTH_RADIUS_KM: 6371,
  EARTH_RADIUS_MILES: 3959,
  
  // อัตราการเดินทาง (กม./ชม.)
  TRAVEL_SPEEDS: {
    walking: 5,        // เดิน
    cycling: 15,       // ปั่นจักรยาน
    driving: 60,       // ขับรถ
    highway: 90,       // ขับรถทางหลวง
    flight: 800        // เครื่องบิน
  },
  
  // ทิศทางหลัก
  DIRECTIONS: {
    th: ['เหนือ', 'ตะวันออกเฉียงเหนือ', 'ตะวันออก', 'ตะวันออกเฉียงใต้', 
         'ใต้', 'ตะวันตกเฉียงใต้', 'ตะวันตก', 'ตะวันตกเฉียงเหนือ'],
    en: ['North', 'Northeast', 'East', 'Southeast', 
         'South', 'Southwest', 'West', 'Northwest']
  },
  
  // สถานที่ยอดนิยมในประเทศไทย (backup)
  POPULAR_PLACES: {
    // กรุงเทพมหานคร
    'สยาม': { lat: 13.7463, lng: 100.5352, name: 'Siam', province: 'กรุงเทพฯ' },
    'จตุจักร': { lat: 13.7997, lng: 100.5497, name: 'Chatuchak', province: 'กรุงเทพฯ' },
    'มหาวิทยาลัยจุฬาลงกรณ์': { lat: 13.7364, lng: 100.5333, name: 'Chulalongkorn University', province: 'กรุงเทพฯ' },
    'ห้าแยกลาดพร้าว': { lat: 13.8196, lng: 100.5692, name: 'Lat Phrao Intersection', province: 'กรุงเทพฯ' },
    'วัดพระแก้ว': { lat: 13.7515, lng: 100.4927, name: 'Temple of the Emerald Buddha', province: 'กรุงเทพฯ' },
    'ดอนเมือง': { lat: 13.9126, lng: 100.6070, name: 'Don Mueang Airport', province: 'กรุงเทพฯ' },
    'สุวรรณภูมิ': { lat: 13.6900, lng: 100.7501, name: 'Suvarnabhumi Airport', province: 'กรุงเทพฯ' },
    
    // จังหวัดใหญ่ๆ
    'เชียงใหม่': { lat: 18.7883, lng: 98.9853, name: 'Chiang Mai', province: 'เชียงใหม่' },
    'ภูเก็ต': { lat: 7.8804, lng: 98.3923, name: 'Phuket', province: 'ภูเก็ต' },
    'พัทยา': { lat: 12.9236, lng: 100.8825, name: 'Pattaya', province: 'ชลบุรี' },
    'หัวหิน': { lat: 12.5564, lng: 99.9587, name: 'Hua Hin', province: 'ประจวบคีรีขันธ์' },
    'อุบลราชธานี': { lat: 15.2441, lng: 104.8466, name: 'Ubon Ratchathani', province: 'อุบลราชธานี' },
    'ขอนแก่น': { lat: 16.4322, lng: 102.8236, name: 'Khon Kaen', province: 'ขอนแก่น' },
    'นครราชสีมา': { lat: 14.9799, lng: 102.0977, name: 'Nakhon Ratchasima', province: 'นครราชสีมา' },
    'สงขลา': { lat: 7.2061, lng: 100.5951, name: 'Songkhla', province: 'สงขลา' }
  }
};

/**
 * คำนวณระยะทางด้วยสูตร Haversine
 * @param {number} lat1 - ละติจูดจุดที่ 1
 * @param {number} lng1 - ลองจิจูดจุดที่ 1
 * @param {number} lat2 - ละติจูดจุดที่ 2
 * @param {number} lng2 - ลองจิจูดจุดที่ 2
 * @param {string} unit - หน่วย ('km' หรือ 'miles')
 * @returns {number} ระยะทาง
 */
export function calculateHaversineDistance(lat1, lng1, lat2, lng2, unit = 'km') {
  // แปลงเป็น radians
  const toRad = (deg) => deg * (Math.PI / 180);
  
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const radius = unit === 'miles' ? DISTANCE_CONSTANTS.EARTH_RADIUS_MILES : DISTANCE_CONSTANTS.EARTH_RADIUS_KM;
  
  return radius * c;
}

/**
 * คำนวณทิศทางระหว่างจุด 2 จุด
 * @param {number} lat1 - ละติจูดจุดเริ่มต้น
 * @param {number} lng1 - ลองจิจูดจุดเริ่มต้น
 * @param {number} lat2 - ละติจูดจุดปลายทาง
 * @param {number} lng2 - ลองจิจูดจุดปลายทาง
 * @returns {Object} ข้อมูลทิศทาง
 */
export function calculateBearing(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);
  
  const dLng = toRad(lng2 - lng1);
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);
  
  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
  
  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360; // แปลงเป็น 0-360 องศา
  
  // หาทิศทางหลัก
  const directionIndex = Math.round(bearing / 45) % 8;
  
  return {
    degrees: Math.round(bearing * 10) / 10,
    direction: {
      th: DISTANCE_CONSTANTS.DIRECTIONS.th[directionIndex],
      en: DISTANCE_CONSTANTS.DIRECTIONS.en[directionIndex]
    }
  };
}

/**
 * คำนวณจุดกึ่งกลางระหว่างจุด 2 จุด
 * @param {number} lat1 - ละติจูดจุดที่ 1
 * @param {number} lng1 - ลองจิจูดจุดที่ 1
 * @param {number} lat2 - ละติจูดจุดที่ 2
 * @param {number} lng2 - ลองจิจูดจุดที่ 2
 * @returns {Object} พิกัดจุดกึ่งกลาง
 */
export function calculateMidpoint(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);
  
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);
  const dLng = toRad(lng2 - lng1);
  
  const bX = Math.cos(lat2Rad) * Math.cos(dLng);
  const bY = Math.cos(lat2Rad) * Math.sin(dLng);
  
  const midLat = Math.atan2(
    Math.sin(lat1Rad) + Math.sin(lat2Rad),
    Math.sqrt((Math.cos(lat1Rad) + bX) * (Math.cos(lat1Rad) + bX) + bY * bY)
  );
  
  const midLng = toRad(lng1) + Math.atan2(bY, Math.cos(lat1Rad) + bX);
  
  return {
    lat: Math.round(toDeg(midLat) * 10000) / 10000,
    lng: Math.round(toDeg(midLng) * 10000) / 10000
  };
}

/**
 * คำนวณเวลาเดินทางโดยประมาณ
 * @param {number} distance - ระยะทาง (กิโลเมตร)
 * @returns {Object} เวลาเดินทางแต่ละประเภท
 */
export function calculateTravelTime(distance) {
  const speeds = DISTANCE_CONSTANTS.TRAVEL_SPEEDS;
  
  const formatTime = (hours) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} นาที`;
    } else if (hours < 24) {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return m > 0 ? `${h} ชม. ${m} นาที` : `${h} ชม.`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = Math.round(hours % 24);
      return `${days} วัน ${remainingHours} ชม.`;
    }
  };
  
  const formatTimeEN = (hours) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    } else if (hours < 24) {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return m > 0 ? `${h}h ${m}min` : `${h}h`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = Math.round(hours % 24);
      return `${days}d ${remainingHours}h`;
    }
  };
  
  return {
    walking: {
      hours: distance / speeds.walking,
      display: formatTime(distance / speeds.walking),
      displayEN: formatTimeEN(distance / speeds.walking)
    },
    cycling: {
      hours: distance / speeds.cycling,
      display: formatTime(distance / speeds.cycling),
      displayEN: formatTimeEN(distance / speeds.cycling)
    },
    driving: {
      hours: distance / speeds.driving,
      display: formatTime(distance / speeds.driving),
      displayEN: formatTimeEN(distance / speeds.driving)
    },
    flight: {
      hours: distance / speeds.flight,
      display: formatTime(distance / speeds.flight),
      displayEN: formatTimeEN(distance / speeds.flight)
    }
  };
}

/**
 * ค้นหาสถานที่ด้วย Nominatim API
 * @param {string} query - ชื่อสถานที่ที่ต้องการค้นหา
 * @param {string} language - ภาษา ('th' หรือ 'en')
 * @returns {Promise<Array>} รายการสถานที่ที่พบ
 */
export async function searchPlaceWithNominatim(query, language = 'th') {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  try {
    // เช็คในฐานข้อมูลสถานที่ยอดนิยมก่อน
    const popularResults = searchInPopularPlaces(query);
    
    // เรียก Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(query.trim())}&` +
      `format=json&` +
      `limit=5&` +
      `countrycodes=th&` +
      `addressdetails=1&` +
      `accept-language=${language}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // แปลงผลลัพธ์ให้เป็นรูปแบบมาตรฐาน
    const nominatimResults = data.map(place => ({
      name: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      type: place.type || 'place',
      importance: place.importance || 0,
      source: 'nominatim'
    }));
    
    // รวมผลลัพธ์จากทั้งสองแหล่ง โดยให้ popular places มาก่อน
    const combinedResults = [...popularResults, ...nominatimResults];
    
    // กรองผลลัพธ์ที่ซ้ำกัน และเรียงตามความสำคัญ
    const uniqueResults = [];
    const seen = new Set();
    
    for (const result of combinedResults) {
      const key = `${result.lat.toFixed(4)},${result.lng.toFixed(4)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueResults.push(result);
      }
    }
    
    return uniqueResults.slice(0, 5); // จำกัดผลลัพธ์ 5 รายการ
    
  } catch (error) {
    console.warn('Nominatim API error:', error);
    // ถ้า API error ให้ใช้ผลลัพธ์จากฐานข้อมูลเท่านั้น
    return searchInPopularPlaces(query);
  }
}

/**
 * ค้นหาในฐานข้อมูลสถานที่ยอดนิยม
 * @param {string} query - คำค้นหา
 * @returns {Array} รายการสถานที่ที่พบ
 */
function searchInPopularPlaces(query) {
  const queryLower = query.toLowerCase().trim();
  const results = [];
  
  for (const [key, place] of Object.entries(DISTANCE_CONSTANTS.POPULAR_PLACES)) {
    const keyLower = key.toLowerCase();
    const nameLower = place.name.toLowerCase();
    
    // ค้นหาแบบ exact match หรือ substring
    if (keyLower.includes(queryLower) || nameLower.includes(queryLower) || 
        queryLower.includes(keyLower) || queryLower.includes(nameLower)) {
      results.push({
        name: `${key} (${place.province})`,
        lat: place.lat,
        lng: place.lng,
        type: 'popular_place',
        importance: 1,
        source: 'popular'
      });
    }
  }
  
  return results;
}

/**
 * ดึงตำแหน่งปัจจุบันจาก GPS
 * @returns {Promise<Object>} พิกัดปัจจุบัน
 */
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 นาที
    };
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          name: 'ตำแหน่งปัจจุบัน',
          nameEN: 'Current Location',
          source: 'gps'
        });
      },
      (error) => {
        let message;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'ผู้ใช้ปฏิเสธการเข้าถึงตำแหน่ง';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'ไม่สามารถหาตำแหน่งได้';
            break;
          case error.TIMEOUT:
            message = 'หมดเวลาในการหาตำแหน่ง';
            break;
          default:
            message = 'เกิดข้อผิดพลาดในการหาตำแหน่ง';
            break;
        }
        reject(new Error(message));
      },
      options
    );
  });
}

/**
 * คำนวณระยะทางและข้อมูลที่เกี่ยวข้องระหว่างจุด 2 จุด
 * @param {Object} fromLocation - ตำแหน่งเริ่มต้น
 * @param {Object} toLocation - ตำแหน่งปลายทาง
 * @param {Object} options - ตัวเลือกการคำนวณ
 * @returns {Object} ผลการคำนวณครบถ้วน
 */
export function calculateDistanceAndDetails(fromLocation, toLocation, options = {}) {
  const {
    unit = 'km',
    includeBearing = true,
    includeMidpoint = true,
    includeTravelTime = true
  } = options;
  
  // ตรวจสอบข้อมูลนำเข้า
  if (!fromLocation || !toLocation) {
    return {
      error: 'กรุณาระบุตำแหน่งเริ่มต้นและปลายทาง',
      errorEN: 'Please specify both start and destination locations'
    };
  }
  
  if (!fromLocation.lat || !fromLocation.lng || !toLocation.lat || !toLocation.lng) {
    return {
      error: 'ข้อมูลพิกัดไม่ถูกต้อง',
      errorEN: 'Invalid coordinate data'
    };
  }
  
  // คำนวณระยะทาง
  const distance = calculateHaversineDistance(
    fromLocation.lat, fromLocation.lng,
    toLocation.lat, toLocation.lng,
    unit
  );
  
  const result = {
    success: true,
    distance: {
      km: unit === 'km' ? distance : calculateHaversineDistance(
        fromLocation.lat, fromLocation.lng,
        toLocation.lat, toLocation.lng,
        'km'
      ),
      miles: unit === 'miles' ? distance : calculateHaversineDistance(
        fromLocation.lat, fromLocation.lng,
        toLocation.lat, toLocation.lng,
        'miles'
      ),
      display: `${(distance).toFixed(2)} ${unit === 'km' ? 'กม.' : 'ไมล์'}`,
      displayEN: `${(distance).toFixed(2)} ${unit}`
    },
    from: fromLocation,
    to: toLocation
  };
  
  // คำนวณทิศทาง
  if (includeBearing) {
    result.bearing = calculateBearing(
      fromLocation.lat, fromLocation.lng,
      toLocation.lat, toLocation.lng
    );
  }
  
  // คำนวณจุดกึ่งกลาง
  if (includeMidpoint) {
    result.midpoint = calculateMidpoint(
      fromLocation.lat, fromLocation.lng,
      toLocation.lat, toLocation.lng
    );
  }
  
  // คำนวณเวลาเดินทาง
  if (includeTravelTime) {
    result.travelTime = calculateTravelTime(result.distance.km);
  }
  
  return result;
}

/**
 * ตรวจสอบความถูกต้องของพิกัด
 * @param {number} lat - ละติจูด
 * @param {number} lng - ลองจิจูด
 * @returns {boolean} ถูกต้องหรือไม่
 */
export function isValidCoordinate(lat, lng) {
  return typeof lat === 'number' && typeof lng === 'number' &&
         lat >= -90 && lat <= 90 &&
         lng >= -180 && lng <= 180 &&
         !isNaN(lat) && !isNaN(lng);
}

/**
 * แปลงพิกัดจากข้อความ
 * @param {string} coordText - ข้อความพิกัด เช่น "13.7463, 100.5352"
 * @returns {Object|null} พิกัดหรือ null ถ้าไม่ถูกต้อง
 */
export function parseCoordinates(coordText) {
  if (!coordText || typeof coordText !== 'string') return null;
  
  // ลบช่องว่างและแยกด้วย comma
  const parts = coordText.trim().split(',');
  if (parts.length !== 2) return null;
  
  const lat = parseFloat(parts[0].trim());
  const lng = parseFloat(parts[1].trim());
  
  if (isValidCoordinate(lat, lng)) {
    return { lat, lng };
  }
  
  return null;
}