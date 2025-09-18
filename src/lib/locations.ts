export interface City {
  id: number;
  ko: string; // display name (Korean)
  en: string; // query name for OpenWeather
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: 1, ko: "서울", en: "Seoul", lat: 37.5665, lon: 126.9780 },
  { id: 2, ko: "부산", en: "Busan", lat: 35.1796, lon: 129.0756 },
  { id: 3, ko: "대구", en: "Daegu", lat: 35.8714, lon: 128.6014 },
  { id: 4, ko: "대전", en: "Daejeon", lat: 36.3504, lon: 127.3845 },
  { id: 5, ko: "광주", en: "Gwangju", lat: 35.1595, lon: 126.8526 },
  { id: 6, ko: "인천", en: "Incheon", lat: 37.4563, lon: 126.7052 },
  { id: 7, ko: "울산", en: "Ulsan", lat: 35.5384, lon: 129.3114 },
  { id: 8, ko: "세종", en: "Sejong", lat: 36.4800, lon: 127.2890 },
];

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestCity(lat: number, lon: number): City {
  let nearest = CITIES[0];
  let minDist = Infinity;
  for (const city of CITIES) {
    const dist = haversineDistance(lat, lon, city.lat, city.lon);
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }
  return nearest;
}

export function getCityByKo(ko: string): City | undefined {
  return CITIES.find((c) => c.ko === ko);
}
