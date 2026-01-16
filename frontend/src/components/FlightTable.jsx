import React, { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Box, TableSortLabel 
} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PersonIcon from '@mui/icons-material/Person';
import StatusChip from './StatusChip';
import FlightDetailsModal from './FlightDetailsModal';

function descendingComparator(a, b, orderBy) {
  const valA = a[orderBy] || '';
  const valB = b[orderBy] || '';

  if (orderBy === 'passengers' || orderBy === 'delay') {
      if (Number(valB) < Number(valA)) return -1;
      if (Number(valB) > Number(valA)) return 1;
      return 0;
  }

  if (valB < valA) return -1;
  if (valB > valA) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const FlightTable = ({ flights, viewMode }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('sched');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const isDeparture = viewMode === 'departure';
  const cityHeader = isDeparture ? "Dokąd (Kierunek)" : "Skąd (Wylot)";

  const headCells = [
    { id: 'sched', label: 'Czas' },
    { id: 'city', label: cityHeader },
    { id: 'flightNo', label: 'Linia / Nr Lotu' }, // Zmiana nazwy kolumny
    { id: 'passengers', label: 'Pasażerowie' },
    { id: 'status', label: 'Status' },
    { id: 'plane', label: 'Samolot' },
  ];

  const sortedFlights = useMemo(() => {
     return [...flights].sort(getComparator(order, orderBy));
  }, [flights, order, orderBy]);
  console.log(flights)
  return (
    <>
      <TableContainer component={Paper} elevation={3} className="rounded-xl overflow-hidden min-h-[300px]">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-slate-100">
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  className="font-bold text-slate-600"
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedFlights.length > 0 ? (
              sortedFlights.map((flight) => {
                const isFinished = flight.status === 'Wystartował' || flight.status === 'Wylądował';
                const hasTimeChange = flight.act && flight.act !== flight.sched;

                return (
                  <TableRow
                    key={flight.id}
                    onClick={() => handleRowClick(flight)}
                    className={`transition-colors duration-150 cursor-pointer ${
                        isFinished ? 'bg-slate-100 opacity-60 grayscale' : 'bg-white hover:bg-blue-50'
                    }`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* CZAS */}
                    <TableCell component="th" scope="row">
                      <div className="flex flex-col justify-center">
                        {hasTimeChange ? (
                          <>
                            <span className="text-sm text-slate-400 line-through decoration-slate-400">
                              {flight.sched}
                            </span>
                            <span className="text-lg font-bold text-red-600 animate-pulse">
                              {flight.act}
                            </span>
                          </>
                        ) : (
                          <span className={`text-lg font-bold ${isFinished ? 'text-slate-500' : 'text-slate-800'}`}>
                            {flight.sched}
                          </span>
                        )}
                        <span className="text-xs text-slate-400 mt-1">
                          {isDeparture ? 'Wylot' : 'Przylot'}
                        </span>
                      </div>
                    </TableCell>

                    {/* MIASTO */}
                    <TableCell>
                        <Typography variant="h6" className={`font-semibold ${isFinished ? 'text-slate-500' : 'text-slate-800'}`}>
                          {flight.city}
                        </Typography>
                    </TableCell>

                    {/* NR LOTU + LOGO (ZMIANA TUTAJ) */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* Wyświetlanie Loga */}
                        {flight.airlineLogo ? (
                            <img 
                                src={flight.airlineLogo} 
                                alt={flight.airline} 
                                className="w-8 h-8 object-contain"
                            />
                        ) : (
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-500 font-bold">
                                ?
                            </div>
                        )}
                        
                        <div>
                            <div className={`font-bold ${isFinished ? 'text-slate-600' : 'text-blue-900'}`}>
                                {flight.flightNo}
                            </div>
                            <div className="text-sm text-slate-500">{flight.airline}</div>
                        </div>
                      </div>
                    </TableCell>

                    {/* PASAŻEROWIE */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                          <PersonIcon fontSize="small" className="text-slate-400"/>
                          {flight.passengers}
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <StatusChip status={flight.status} delay={flight.delay} />
                    </TableCell>

                    {/* SAMOLOT */}
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
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-16">
                  <Typography variant="h6" className="text-slate-400 font-bold">
                    Brak lotów w wybranym dniu.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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