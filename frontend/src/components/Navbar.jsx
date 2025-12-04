// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
// WAŻNE: Tutaj odbieramy propsy viewMode i setViewMode
const Navbar = ({ viewMode, setViewMode }) => {
  
  // Funkcja zmieniająca kolor aktywnego przycisku
  const isActive = (mode) => 
    viewMode === mode ? "text-blue-300 bg-blue-800" : "text-gray-400 hover:text-white";

  return (
    <AppBar position="static" className="bg-slate-900 shadow-md">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AirplanemodeActiveIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PolskiRadar
          </Typography>

          <div className="flex-grow flex gap-2 ml-4">
            {/* Przycisk ODLOTY */}
            <Button 
                onClick={() => setViewMode('departure')} // <-- TO MUSI TU BYĆ
                startIcon={<FlightTakeoffIcon />}
                className={isActive('departure')}
            >
                Odloty
            </Button>

            {/* Przycisk PRZYLOTY */}
            <Button 
                onClick={() => setViewMode('arrival')}   // <-- TO MUSI TU BYĆ
                startIcon={<FlightLandIcon />}
                className={isActive('arrival')}
            >
                Przyloty
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;