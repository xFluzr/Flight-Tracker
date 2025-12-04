import React, { useState } from 'react';
import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import FlightFilters from './components/FlightFilters';
import FlightTable from './components/FlightTable';
import { polishAirports, flightsData } from './data/mockData';

function App() {
  // Ustawiamy dzisiejszą datę jako domyślną (symulacja 4 grudnia)
  const today = '2025-12-04';
  
  const [selectedAirport, setSelectedAirport] = useState('WAW');
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState('departure'); // 'departure' lub 'arrival'

  const filteredFlights = flightsData.filter((flight) => {
    return (
      flight.origin === selectedAirport &&
      flight.type === viewMode &&
      flight.date === selectedDate
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar /> {/* Navbar już nie potrzebuje propsów, bo przenieśliśmy przyciski niżej */}

      <Container maxWidth="lg" className="mt-8">
        
        {/* Przekazujemy viewMode i setViewMode tutaj! */}
        <FlightFilters 
          airports={polishAirports} 
          selectedAirport={selectedAirport} 
          onSelectAirport={setSelectedAirport}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          viewMode={viewMode}       // <-- WAŻNE
          setViewMode={setViewMode} // <-- WAŻNE
        />

        <FlightTable flights={filteredFlights} viewMode={viewMode} />

      </Container>
    </div>
  );
}

export default App;