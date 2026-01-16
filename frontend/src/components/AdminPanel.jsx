import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Typography, TextField, Button, 
  FormControl, InputLabel, Select, MenuItem, Grid, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ open: false, msg: '', type: 'success' });
  const [flightsList, setFlightsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Stan początkowy formularza
  const initialFormState = {
    nrLotu: '', liniaKod: '', samolotRej: '', lotniskoBazowe: 'WAW',
    kierunekMiasto: '', kierunekKod: '', typOperacji: 'odlot',
    dataLotu: new Date().toISOString().slice(0, 10),
    godzinaPlanowana: '12:00', liczbaPasazerow: 150
  };

  const [formData, setFormData] = useState(initialFormState);

  // Pobieranie listy lotów
  const fetchAllFlights = async () => {
    try {
      const response = await fetch('http://localhost:5032/api/flights?airport=&type=&date='); 
      const data = await response.json();
      const sorted = data.sort((a, b) => b.id - a.id);
      setFlightsList(sorted);
    } catch (err) {
      console.error("Błąd pobierania listy", err);
    }
  };

  useEffect(() => {
    fetchAllFlights();
  }, []);

  // Obsługa pól formularza
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (flight) => {
    setEditingId(flight.id);
    setFormData({
        nrLotu: flight.numerLotu,
        liniaKod: flight.kodLinii || "",      
        samolotRej: flight.rejestracja,
        lotniskoBazowe: flight.lotniskoBazowe,
        kierunekMiasto: flight.kierunekMiasto,
        kierunekKod: flight.kodKierunku || "",
        typOperacji: flight.typOperacji,
        dataLotu: flight.dataLotu,
        godzinaPlanowana: flight.godzinaPlanowana,
        liczbaPasazerow: flight.liczbaPasazerow
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        godzinaPlanowana: formData.godzinaPlanowana.length === 5 ? formData.godzinaPlanowana + ":00" : formData.godzinaPlanowana
    };

    try {
        let response;
        if (editingId) {
            response = await fetch(`http://localhost:5032/api/flights/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch('http://localhost:5032/api/flights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            setNotification({ open: true, msg: editingId ? 'Zaktualizowano!' : 'Dodano lot!', type: 'success' });
            fetchAllFlights();
            if (!editingId) setFormData(initialFormState);
            if (editingId) handleCancelEdit();
        } else {
            const errorText = await response.text();
            setNotification({ open: true, msg: `Błąd: ${errorText}`, type: 'error' });
        }
    } catch (err) {
        setNotification({ open: true, msg: 'Błąd połączenia z serwerem', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
      if(!window.confirm("Czy na pewno chcesz usunąć ten lot?")) return;
      try {
        const response = await fetch(`http://localhost:5032/api/flights/${id}`, { method: 'DELETE' });
        if(response.ok) {
            setNotification({ open: true, msg: 'Lot usunięty', type: 'info' });
            fetchAllFlights();
        } else {
            const errorText = await response.text();
            setNotification({ open: true, msg: `Błąd usuwania: ${errorText}`, type: 'error' });
        }
      } catch(err) {
          setNotification({ open: true, msg: 'Błąd połączenia', type: 'error' });
      }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-8">
      <Container maxWidth="xl">
        
        <div className="flex justify-between items-center mb-6">
            <Typography variant="h4" className="font-bold text-slate-700">
                Panel Zarządzania
            </Typography>
            <Button variant="outlined" onClick={() => navigate('/')}>
                Wróć do Tablicy
            </Button>
        </div>

        <Grid container spacing={4}>
            
            {/* FORMULARZ */}
            <Grid item xs={12}>
                <Paper className="p-6 rounded-xl shadow-md">
                    <Typography variant="h6" className={`mb-4 font-bold ${editingId ? 'text-orange-600' : 'text-blue-600'}`}>
                        {editingId ? `Edycja Lotu #${editingId}` : 'Dodaj Nowy Lot'}
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField fullWidth size="small" label="Nr Lotu" name="nrLotu" value={formData.nrLotu} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField fullWidth size="small" label="Rejestracja" name="samolotRej" value={formData.samolotRej} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField fullWidth size="small" label="Kod Linii (3 znaki)" name="liniaKod" value={formData.liniaKod} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Operacja</InputLabel>
                                    <Select name="typOperacji" value={formData.typOperacji} label="Operacja" onChange={handleChange}>
                                        <MenuItem value="odlot">Odlot</MenuItem>
                                        <MenuItem value="przylot">Przylot</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <TextField fullWidth size="small" label="Lotnisko Baza" name="lotniskoBazowe" value={formData.lotniskoBazowe} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField fullWidth size="small" label="Kierunek (Miasto)" name="kierunekMiasto" value={formData.kierunekMiasto} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField fullWidth size="small" label="Kod IATA (3 znaki)" name="kierunekKod" value={formData.kierunekKod} onChange={handleChange} />
                            </Grid>

                            <Grid item xs={12} sm={4} md={3}>
                                <TextField fullWidth size="small" type="date" label="Data" name="dataLotu" value={formData.dataLotu} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <TextField fullWidth size="small" type="time" label="Godzina" name="godzinaPlanowana" value={formData.godzinaPlanowana} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <TextField fullWidth size="small" type="number" label="Pasażerowie" name="liczbaPasazerow" value={formData.liczbaPasazerow} onChange={handleChange} />
                            </Grid>

                            <Grid item xs={12} md={3} className="flex gap-2">
                                <Button type="submit" variant="contained" fullWidth color={editingId ? "warning" : "primary"}>
                                    {editingId ? "Zapisz Zmiany" : "Dodaj Lot"}
                                </Button>
                                {editingId && (
                                    <Button variant="outlined" color="inherit" onClick={handleCancelEdit}>
                                        Anuluj
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

            {/* TABELA */}
            <Grid item xs={12}>
                <Paper className="p-6 rounded-xl shadow-md overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h6" className="text-slate-600">Baza Lotów</Typography>
                        <IconButton onClick={fetchAllFlights}><RefreshIcon /></IconButton>
                    </div>

                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data/Godz</TableCell>
                                    <TableCell>Linia / Lot</TableCell> {/* Zmieniony nagłówek */}
                                    <TableCell>Trasa</TableCell>
                                    <TableCell>Rejestracja</TableCell>
                                    <TableCell>Pasażerowie</TableCell>
                                    <TableCell align="right">Akcje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flightsList.map((flight) => (
                                    <TableRow key={flight.id} hover selected={editingId === flight.id}>
                                        <TableCell>
                                            <div className="font-bold">{flight.godzinaPlanowana}</div>
                                            <div className="text-xs text-slate-400">{flight.dataLotu}</div>
                                        </TableCell>
                                        
                                        {/* --- ZMIANA: DODANO LOGO LINII --- */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {flight.liniaLogo ? (
                                                    <img 
                                                        src={flight.liniaLogo} 
                                                        alt={flight.linia} 
                                                        className="w-8 h-8 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                                                        ?
                                                    </div>
                                                )}
                                                
                                                <div>
                                                    <div className="font-bold text-blue-800">{flight.numerLotu}</div>
                                                    <div className="text-xs text-slate-500">{flight.linia}</div>
                                                </div>
                                            </div>

                                            <Chip 
                                                label={flight.typOperacji} 
                                                size="small" 
                                                color={flight.typOperacji === 'odlot' ? 'primary' : 'success'} 
                                                variant="outlined"
                                                className="mt-1 h-5 text-[10px]"
                                            />
                                        </TableCell>
                                        {/* ---------------------------------- */}

                                        <TableCell>
                                            <span className="text-slate-500 text-xs">
                                                {flight.typOperacji === 'odlot' ? flight.lotniskoBazowe : flight.kierunekMiasto} 
                                                {' -> '} 
                                            </span>
                                            <span className="font-semibold block">
                                                {flight.typOperacji === 'odlot' ? flight.kierunekMiasto : flight.lotniskoBazowe}
                                            </span>
                                        </TableCell>
                                        <TableCell>{flight.rejestracja}</TableCell>
                                        <TableCell>{flight.liczbaPasazerow}</TableCell>
                                        <TableCell align="right">
                                            <div className="flex justify-end gap-1">
                                                <IconButton color="primary" onClick={() => handleEditClick(flight)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDelete(flight.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>

        </Grid>
      </Container>

      <Snackbar open={notification.open} autoHideDuration={4000} onClose={() => setNotification({...notification, open: false})}>
        <Alert severity={notification.type}>{notification.msg}</Alert>
      </Snackbar>
    </div>
  );
};

export default AdminPanel;