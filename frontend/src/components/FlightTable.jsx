import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Box 
} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import StatusChip from './StatusChip';

const FlightTable = ({ flights, viewMode }) => {
  
  const isDeparture = viewMode === 'departure';
  const cityHeader = isDeparture ? "Dokąd (Kierunek)" : "Skąd (Wylot)";

  return (
    <TableContainer component={Paper} elevation={3} className="rounded-xl overflow-hidden min-h-[300px]">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-slate-100">
          <TableRow>
            <TableCell className="font-bold text-slate-600">Czas</TableCell>
            <TableCell className="font-bold text-slate-600">{cityHeader}</TableCell>
            <TableCell className="font-bold text-slate-600">Nr Lotu</TableCell>
            <TableCell className="font-bold text-slate-600">Status</TableCell>
            <TableCell className="font-bold text-slate-600">Samolot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.length > 0 ? (
            flights.map((flight) => {
              const isDelayed = flight.delay > 5;
              return (
                <TableRow
                  key={flight.id}
                  className="hover:bg-slate-50 transition-colors duration-150"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* Czas */}
                  <TableCell component="th" scope="row">
                    <div className="flex flex-col">
                      <span className={`text-lg font-bold ${isDelayed ? 'text-red-500 line-through decoration-2' : 'text-slate-800'}`}>
                        {flight.sched}
                      </span>
                      {isDelayed && (
                        <span className="text-lg font-bold text-red-600 animate-pulse">
                          {flight.act}
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        {isDeparture ? 'Wylot' : 'Przylot'}
                      </span>
                    </div>
                  </TableCell>

                  {/* Kierunek (City) */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {isDeparture ? 
                            <FlightLandIcon className="text-slate-400" fontSize="small"/> : 
                            <FlightTakeoffIcon className="text-slate-400" fontSize="small"/> 
                        }
                        <Typography variant="h6" className="text-slate-800 font-semibold">
                        {flight.city}
                        </Typography>
                    </div>
                  </TableCell>

                  {/* Nr Lotu */}
                  <TableCell>
                    <div className="font-bold text-blue-900">{flight.flightNo}</div>
                    <div className="text-sm text-slate-500">{flight.airline}</div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusChip status={flight.status} delay={flight.delay} />
                  </TableCell>

                  {/* Samolot */}
                  <TableCell>
                     <Box className="flex items-start text-sm gap-2">
                        <AirplanemodeActiveIcon fontSize="small" className="text-slate-400 mt-1"/>
                        <div>
                            <div className="font-medium text-slate-700">{flight.plane}</div>
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
              <TableCell colSpan={5} align="center" className="py-16">
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
  );
};

export default FlightTable;