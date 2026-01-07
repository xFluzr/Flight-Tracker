import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FlightFilters from './components/FlightFilters';
import FlightTable from './components/FlightTable';
import { Container, CircularProgress, Alert } from '@mui/material';

const FALLBACK_AIRPORTS = [
  { code: 'WAW', name: 'Warszawa Chopin' },
  { code: 'KRK', name: 'Kraków Balice' },
  { code: 'GDN', name: 'Gdańsk Rębiechowo' },
  { code: 'WRO', name: 'Wrocław Strachowice' },
  { code: 'POZ', name: 'Poznań Ławica' },
  { code: 'KTW', name: 'Katowice Pyrzowice' },
];

const App = () => {
  const [airportsList, setAirportsList] = useState([]); 
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [viewMode, setViewMode] = useState('departure');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedAirport, setSelectedAirport] = useState('WAW'); 

  // Pobieranie lotnisk
  useEffect(() => {
    const fetchAirports = async () => {
        try {
            const response = await fetch('http://localhost:5032/api/airports');
            if (!response.ok) throw new Error("Problem z API");
            const data = await response.json();
            
            if (data.length === 0) {
                setAirportsList(FALLBACK_AIRPORTS);
                return;
            }
            const mappedAirports = data.map(a => ({
                code: a.kodIata,
                name: `${a.miasto} ${a.nazwa}`
            }));
            setAirportsList(mappedAirports);
        } catch (err) {
            console.warn("Błąd lotnisk, używam domyślnych.", err);
            setAirportsList(FALLBACK_AIRPORTS);
        }
    };
    fetchAirports();
  }, []);

  // Pobieranie lotów
  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const dbType = viewMode === 'departure' ? 'odlot' : 'przylot';
      const url = `http://localhost:5032/api/flights?date=${selectedDate}&type=${dbType}&airport=${selectedAirport}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Błąd połączenia z bazą lotów');
      const data = await response.json();

      const mappedFlights = data.map((item) => ({
        id: item.id,
        sched: item.godzinaPlanowana,
        act: item.godzinaRzeczywista || item.godzinaPlanowana,
        city: item.kierunekMiasto,
        flightNo: item.numerLotu,
        airline: item.linia,
        status: item.statusLotu,
        delay: item.opoznienieMinuty,
        plane: item.samolotModel,
        reg: item.rejestracja,
      baseAirport: item.lotniskoBazowe,
   capacity: item.maksMiejsc,       
    passengers: item.liczbaPasazerow,
    occupancy: item.zapelnienie
      }));

      setFlights(mappedFlights);
    } catch (err) {
      console.error(err);
      setFlights([]); 
      if (err.message !== 'Nie udało się połączyć z bazą lotów') {
          setError('Błąd pobierania danych.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [selectedDate, viewMode, selectedAirport]);

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <Navbar viewMode={viewMode} setViewMode={setViewMode} />
      <Container maxWidth="xl" className="mt-8">
        <FlightFilters 
          airports={airportsList}
          selectedAirport={selectedAirport}
          onSelectAirport={setSelectedAirport}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {error && <Alert severity="warning" className="mb-4">{error}</Alert>}
        
        {loading ? (
          <div className="flex justify-center p-10"><CircularProgress /></div>
        ) : (
          <FlightTable flights={flights} viewMode={viewMode} />
        )}
      </Container>
    </div>
  );
};

export default App;