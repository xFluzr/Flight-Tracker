import React from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, ButtonGroup } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

const FlightFilters = ({ 
  airports, 
  selectedAirport, 
  onSelectAirport, 
  selectedDate, 
  onSelectDate, 
  viewMode,     // Odbieramy tryb
  setViewMode   // Odbieramy funkcję do zmiany trybu
}) => {
  
  const isDeparture = viewMode === 'departure';

  return (
    <Paper elevation={2} className="p-6 mb-8 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6">
      
      {/* 1. TYTUŁ I IKONA */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className={`p-3 rounded-full transition-colors duration-300 ${isDeparture ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
          {isDeparture ? <FlightTakeoffIcon fontSize="large" /> : <FlightLandIcon fontSize="large" />}
        </div>
        <div>
          <Typography variant="h5" className="font-bold text-slate-800">
            {isDeparture ? 'Tablica Odlotów' : 'Tablica Przylotów'}
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            Wyszukaj połączenie
          </Typography>
        </div>
      </div>

      {/* 2. PRZEŁĄCZNIK ODLOTY / PRZYLOTY (Nowość!) */}
      <div className="bg-slate-100 p-1 rounded-lg flex">
        <Button 
            variant={isDeparture ? "contained" : "text"}
            color={isDeparture ? "primary" : "inherit"}
            onClick={() => setViewMode('departure')}
            startIcon={<FlightTakeoffIcon />}
            className={isDeparture ? "bg-blue-600 shadow-md" : "text-slate-500"}
        >
            Odloty
        </Button>
        <Button 
            variant={!isDeparture ? "contained" : "text"}
            color={!isDeparture ? "success" : "inherit"}
            onClick={() => setViewMode('arrival')}
            startIcon={<FlightLandIcon />}
            className={!isDeparture ? "bg-green-600 shadow-md" : "text-slate-500"}
        >
            Przyloty
        </Button>
      </div>

      {/* 3. INPUTY DATY I LOTNISKA */}
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        <TextField
            label="Data lotu"
            type="date"
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            className="w-full sm:w-48 bg-white"
            InputLabelProps={{ shrink: true }}
        />

        <FormControl className="w-full sm:w-64 bg-white">
            <InputLabel id="airport-label">Wybierz Lotnisko</InputLabel>
            <Select
            labelId="airport-label"
            value={selectedAirport}
            label="Wybierz Lotnisko"
            onChange={(e) => onSelectAirport(e.target.value)}
            >
            {airports.map((airport) => (
                <MenuItem key={airport.code} value={airport.code}>
                <span className="font-bold mr-2">{airport.code}</span> {airport.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
      </div>
    </Paper>
  );
};

export default FlightFilters;