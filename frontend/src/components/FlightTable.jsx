import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Box 
} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PersonIcon from '@mui/icons-material/Person';
import StatusChip from './StatusChip';
import FlightDetailsModal from './FlightDetailsModal'; // Upewnij się, że masz ten plik

const FlightTable = ({ flights, viewMode }) => {
  
  // --- STAN DO OBSŁUGI MODALA (POP-UP) ---
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };
  // ----------------------------------------

  const isDeparture = viewMode === 'departure';
  const cityHeader = isDeparture ? "Dokąd (Kierunek)" : "Skąd (Wylot)";

  return (
    <>
      <TableContainer component={Paper} elevation={3} className="rounded-xl overflow-hidden min-h-[300px]">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          
          {/* NAGŁÓWKI TABELI */}
          <TableHead className="bg-slate-100">
            <TableRow>
              <TableCell className="font-bold text-slate-600">Czas</TableCell>
              <TableCell className="font-bold text-slate-600">{cityHeader}</TableCell>
              <TableCell className="font-bold text-slate-600">Nr Lotu</TableCell>
              <TableCell className="font-bold text-slate-600">Pasażerowie</TableCell> {/* NOWA KOLUMNA */}
              <TableCell className="font-bold text-slate-600">Status</TableCell>
              <TableCell className="font-bold text-slate-600">Samolot</TableCell>
            </TableRow>
          </TableHead>

          {/* TREŚĆ TABELI */}
          <TableBody>
            {flights.length > 0 ? (
              flights.map((flight) => {
                
                // Logika wizualna: czy lot zakończony?
                const isFinished = flight.status === 'Wystartował' || flight.status === 'Wylądował';
                
                // Logika wizualna: czy jest zmiana czasu?
                const hasTimeChange = flight.act && flight.act !== flight.sched;

                return (
                  <TableRow
                    key={flight.id}
                    onClick={() => handleRowClick(flight)} // Kliknięcie otwiera popup
                    className={`transition-colors duration-150 cursor-pointer ${
                        // Jeśli zakończony -> szary i wyblakły, jeśli aktywny -> biały i podświetlenie po najechaniu
                        isFinished ? 'bg-slate-100 opacity-60 grayscale' : 'bg-white hover:bg-blue-50'
                    }`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    
                    {/* 1. KOLUMNA CZASU */}
                    <TableCell component="th" scope="row">
                      <div className="flex flex-col justify-center">
                        {hasTimeChange ? (
                          <>
                            {/* Stary czas przekreślony */}
                            <span className="text-sm text-slate-400 line-through decoration-slate-400">
                              {flight.sched}
                            </span>
                            {/* Nowy czas czerwony i pulsujący */}
                            <span className="text-lg font-bold text-red-600 animate-pulse">
                              {flight.act}
                            </span>
                          </>
                        ) : (
                          // Normalny czas
                          <span className={`text-lg font-bold ${isFinished ? 'text-slate-500' : 'text-slate-800'}`}>
                            {flight.sched}
                          </span>
                        )}
                        <span className="text-xs text-slate-400 mt-1">
                          {isDeparture ? 'Wylot' : 'Przylot'}
                        </span>
                      </div>
                    </TableCell>

                    {/* 2. KOLUMNA KIERUNKU (MIASTO) - Bez ikony */}
                    <TableCell>
                        <Typography variant="h6" className={`font-semibold ${isFinished ? 'text-slate-500' : 'text-slate-800'}`}>
                          {flight.city}
                        </Typography>
                    </TableCell>

                    {/* 3. KOLUMNA NR LOTU */}
                    <TableCell>
                      <div className={`font-bold ${isFinished ? 'text-slate-600' : 'text-blue-900'}`}>
                          {flight.flightNo}
                      </div>
                      <div className="text-sm text-slate-500">{flight.airline}</div>
                    </TableCell>

                    {/* 4. KOLUMNA PASAŻERÓW */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                          <PersonIcon fontSize="small" className="text-slate-400"/>
                          {flight.passengers}
                      </div>
                    </TableCell>

                    {/* 5. KOLUMNA STATUSU */}
                    <TableCell>
                      <StatusChip status={flight.status} delay={flight.delay} />
                    </TableCell>

                    {/* 6. KOLUMNA SAMOLOTU */}
                    <TableCell>
                       <Box className="flex items-start text-sm gap-2">
                          <AirplanemodeActiveIcon fontSize="small" className="text-slate-400 mt-1"/>
                          <div>
                              <div className={`font-medium ${isFinished ? 'text-slate-500' : 'text-slate-700'}`}>
                                  {flight.plane}
                              </div>
                              <div className="text-xs text-slate-400 font-mono bg-slate-100 px-1 rounded inline-block">
                                  {flight.reg}
                              </div>
                          </div>
                      </Box>
                    </TableCell>

                  </TableRow>
                );
              })
            ) : (
              // Wiersz gdy brak danych
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-16">
                  <Typography variant="h6" className="text-slate-400 font-bold">
                    Brak lotów w wybranym dniu.
                  </Typography>
                  <Typography variant="body2" className="text-slate-400">
                    Spróbuj zmienić datę w kalendarzu.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* KOMPONENT MODALA (POP-UP) */}
      <FlightDetailsModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        flight={selectedFlight}
        viewMode={viewMode}
      />
    </>
  );
};

export default FlightTable;