import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography, Grid, Divider, LinearProgress, Box 
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import StatusChip from './StatusChip';

const FlightDetailsModal = ({ open, onClose, flight, viewMode }) => {
  if (!flight) return null;

  const isDeparture = viewMode === 'departure';

  const getProgressColor = (val) => {
    if (val > 90) return "error";
    if (val > 60) return "primary";
    return "success";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        
      {/* NAGŁÓWEK */}
      <DialogTitle className="bg-slate-50 flex justify-between items-center border-b">
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                {/* Logo również w nagłówku modala */}
                {flight.airlineLogo && (
                    <img src={flight.airlineLogo} alt="logo" className="h-6 w-auto object-contain" />
                )}
                <Typography variant="h5" component="div" className="font-bold text-slate-800">
                    {flight.airline}
                </Typography>
            </div>
            
            <Typography variant="subtitle1" className="text-slate-500 flex items-center gap-2 mt-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm font-mono font-bold">
                    {flight.flightNo}
                </span>
                <span>• {flight.plane} ({flight.reg})</span>
            </Typography>
        </div>
        <StatusChip status={flight.status} delay={flight.delay} />
      </DialogTitle>

      <DialogContent className="mt-4">
        
        {/* --- NOWE: ZDJĘCIE SAMOLOTU --- */}
        <div className="mb-6 rounded-lg overflow-hidden shadow-sm border border-slate-200">
            {flight.planePhoto ? (
                <img 
                    src={flight.planePhoto} 
                    alt={flight.plane} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                />
            ) : (
                <div className="w-full h-32 bg-slate-100 flex items-center justify-center text-slate-400">
                    <Typography variant="caption">Brak zdjęcia samolotu</Typography>
                </div>
            )}
        </div>
        {/* ----------------------------- */}

        {/* TRASA */}
        <Grid container spacing={2} className="mb-6 text-center items-center">
            <Grid item xs={5}>
                <Typography variant="h4" className="font-bold text-slate-700">
                    {isDeparture ? flight.baseAirport : flight.city}
                </Typography>
                <Typography variant="caption" className="text-slate-400 uppercase tracking-wider">
                    {isDeparture ? 'Wylot' : 'Źródło'}
                </Typography>
            </Grid>
            
            <Grid item xs={2} className="text-slate-300">
                {isDeparture ? <FlightTakeoffIcon fontSize="large"/> : <FlightLandIcon fontSize="large"/>}
            </Grid>

            <Grid item xs={5}>
                <Typography variant="h4" className="font-bold text-blue-600">
                    {isDeparture ? flight.city : flight.baseAirport}
                </Typography>
                <Typography variant="caption" className="text-slate-400 uppercase tracking-wider">
                    {isDeparture ? 'Cel' : 'Przylot'}
                </Typography>
            </Grid>
        </Grid>

        <Divider className="mb-4" />

        <div className="space-y-4">
            {/* CZAS */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                    <EventIcon className="text-slate-400" />
                    <div>
                        <Typography variant="body2" className="text-slate-500">Planowo</Typography>
                        <Typography variant="h6" className="font-bold">{flight.sched}</Typography>
                    </div>
                </div>
                
                {flight.act && flight.act !== flight.sched && (
                     <div className="text-right">
                        <Typography variant="body2" className="text-red-500 font-bold animate-pulse">
                            Aktualnie
                        </Typography>
                        <Typography variant="h6" className="font-bold text-red-600">
                            {flight.act}
                        </Typography>
                     </div>
                )}
            </div>

            {/* PASAŻEROWIE */}
            <div className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2 text-slate-600">
                        <PersonIcon />
                        <span className="font-bold uppercase tracking-wide text-sm">Pasażerowie</span>
                    </div>
                    
                    <div className="text-right">
                         <span className="text-3xl font-black text-slate-800">
                            {flight.passengers}
                         </span>
                         <span className="text-xl text-slate-400 font-medium ml-1">
                            / {flight.capacity}
                         </span>
                    </div>
                </div>
                
                {/* Pasek postępu */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                            variant="determinate" 
                            value={flight.occupancy || 0} 
                            color={getProgressColor(flight.occupancy)}
                            className="h-4 rounded-full"
                        />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary" className="font-bold">
                            {Math.round(flight.occupancy)}%
                        </Typography>
                    </Box>
                </Box>
            </div>
        </div>
      </DialogContent>

      <DialogActions className="p-4 border-t bg-slate-50">
        <Button onClick={onClose} variant="contained" className="bg-slate-800">
          Zamknij
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlightDetailsModal;