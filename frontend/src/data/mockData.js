export const polishAirports = [
    { code: 'WAW', name: 'Warszawa Chopin' },
    { code: 'KRK', name: 'Kraków Balice' },
    { code: 'GDN', name: 'Gdańsk Rębiechowo' },
    { code: 'KTW', name: 'Katowice Pyrzowice' },
    { code: 'WRO', name: 'Wrocław Strachowice' },
  ];
  
  // Helper do generowania daty w grudniu 2025
  const dec2025 = (day) => `2025-12-${day.toString().padStart(2, '0')}`;
  
  export const flightsData = [
    // --- 4 GRUDNIA (DZIŚ) ---
    // WAW Odloty
    { id: 1, type: 'departure', date: dec2025(4), origin: 'WAW', flightNo: 'LO 279', airline: 'LOT', city: 'Londyn (LHR)', sched: '12:30', act: '12:32', status: 'Wystartował', delay: 2, plane: 'Boeing 737-800', reg: 'SP-LVA' },
    { id: 2, type: 'departure', date: dec2025(4), origin: 'WAW', flightNo: 'FR 1902', airline: 'Ryanair', city: 'Alicante (ALC)', sched: '12:45', act: '13:30', status: 'Opóźniony', delay: 45, plane: 'Boeing 737 MAX 8', reg: 'SP-RZB' },
    
    // WAW Przyloty
    { id: 101, type: 'arrival', date: dec2025(4), origin: 'WAW', flightNo: 'LO 004', airline: 'LOT', city: 'Chicago (ORD)', sched: '13:00', act: '12:45', status: 'Wylądował', delay: 0, plane: 'Boeing 787-9', reg: 'SP-LSC' },
    { id: 102, type: 'arrival', date: dec2025(4), origin: 'WAW', flightNo: 'LH 1348', airline: 'Lufthansa', city: 'Frankfurt (FRA)', sched: '14:15', act: '14:30', status: 'W Locie', delay: 15, plane: 'Airbus A321', reg: 'D-AIDV' },
  
    // KRK Odloty/Przyloty
    { id: 3, type: 'departure', date: dec2025(4), origin: 'KRK', flightNo: 'FR 8001', airline: 'Ryanair', city: 'Dublin (DUB)', sched: '11:30', act: '12:00', status: 'Opóźniony', delay: 30, plane: 'Boeing 737-800', reg: 'EI-DHY' },
    { id: 103, type: 'arrival', date: dec2025(4), origin: 'KRK', flightNo: 'W6 5058', airline: 'Wizz Air', city: 'Rzym (FCO)', sched: '18:00', act: '--:--', status: 'Oczekuje', delay: 0, plane: 'Airbus A321neo', reg: 'HA-LVH' },
  
    // --- 5 GRUDNIA (JUTRO) ---
    { id: 4, type: 'departure', date: dec2025(5), origin: 'WAW', flightNo: 'LO 3905', airline: 'LOT', city: 'Kraków (KRK)', sched: '07:30', act: '--:--', status: 'Oczekuje', delay: 0, plane: 'Embraer 195', reg: 'SP-LND' },
    { id: 104, type: 'arrival', date: dec2025(5), origin: 'WAW', flightNo: 'EK 179', airline: 'Emirates', city: 'Dubaj (DXB)', sched: '11:20', act: '--:--', status: 'Oczekuje', delay: 0, plane: 'Boeing 777-300ER', reg: 'A6-EGW' },
  
    // --- 24 GRUDNIA (WIGILIA) ---
    { id: 5, type: 'departure', date: dec2025(24), origin: 'WAW', flightNo: 'LO 26', airline: 'LOT', city: 'Nowy Jork (JFK)', sched: '16:50', act: '--:--', status: 'Oczekuje', delay: 0, plane: 'Boeing 787-8', reg: 'SP-LRA' },
    { id: 105, type: 'arrival', date: dec2025(24), origin: 'GDN', flightNo: 'FR 234', airline: 'Ryanair', city: 'Londyn (STN)', sched: '20:15', act: '--:--', status: 'Oczekuje', delay: 0, plane: 'Boeing 737-800', reg: 'SP-RZA' },
  
    // --- 31 GRUDNIA (SYLWESTER) ---
    { id: 6, type: 'departure', date: dec2025(31), origin: 'KRK', flightNo: 'U2 1234', airline: 'EasyJet', city: 'Paryż (CDG)', sched: '22:00', act: '--:--', status: 'Oczekuje', delay: 0, plane: 'Airbus A320', reg: 'G-EZTA' },
  ];