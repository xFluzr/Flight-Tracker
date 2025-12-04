import React from 'react';
import { Chip } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StatusChip = ({ status, delay }) => {
  let color = "default";
  let icon = <AccessTimeIcon />;

  if (status === 'Opóźniony' || delay > 15) {
    return (
      <Chip 
        icon={<ErrorOutlineIcon />} 
        label={`Opóźniony (+${delay} min)`} 
        color="error" 
        variant="filled" 
        className="font-bold animate-pulse" // Tailwind animation
      />
    );
  }

  switch (status) {
    case 'Wystartował':
      color = "success";
      icon = <FlightTakeoffIcon />;
      break;
    case 'Wylądował':
      color = "default"; // szary
      icon = <FlightLandIcon />;
      break;
    case 'Boarding':
      color = "warning";
      icon = <AccessTimeIcon />;
      break;
    case 'Oczekuje':
      return <Chip label="Oczekuje" variant="outlined" className="bg-slate-50" />;
    default:
      color = "primary";
  }

  return <Chip icon={icon} label={status} color={color} />;
};

export default StatusChip;