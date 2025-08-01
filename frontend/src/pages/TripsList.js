import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { trips, trucks, drivers } from '../data/mockData';

const TripsList = () => {
  const [filters, setFilters] = useState({
    truck: '',
    driver: '',
    status: '',
    date: ''
  });

  const getTruckPlate = (truckId) => {
    const truck = trucks.find(t => t.id === truckId);
    return truck ? truck.plate : 'N/A';
  };

  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'N/A';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_route': return 'success';
      case 'arrived': return 'info';
      case 'delayed': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'en_route': return 'En route';
      case 'arrived': return 'Arrivé';
      case 'delayed': return 'Retardé';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
  };

  const filteredTrips = trips.filter(trip => {
    const truckPlate = getTruckPlate(trip.truckId);
    const driverName = getDriverName(trip.driverId);
    const tripDate = new Date(trip.departureTime).toLocaleDateString();

    return (
      (!filters.truck || truckPlate.toLowerCase().includes(filters.truck.toLowerCase())) &&
      (!filters.driver || driverName.toLowerCase().includes(filters.driver.toLowerCase())) &&
      (!filters.status || trip.status === filters.status) &&
      (!filters.date || tripDate === filters.date)
    );
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      truck: '',
      driver: '',
      status: '',
      date: ''
    });
  };

  const formatDelay = (delay) => {
    if (delay === 0) return 'À l\'heure';
    if (delay > 0) return `+${delay} min`;
    return `${delay} min`;
  };

  const getDelayColor = (delay) => {
    if (delay <= 0) return 'success';
    if (delay <= 15) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liste des Trajets
      </Typography>

      {/* Filtres */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <FilterIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Filtres</Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Camion"
                value={filters.truck}
                onChange={(e) => handleFilterChange('truck', e.target.value)}
                placeholder="Immatriculation..."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Chauffeur"
                value={filters.driver}
                onChange={(e) => handleFilterChange('driver', e.target.value)}
                placeholder="Nom du chauffeur..."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={filters.status}
                  label="Statut"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value="">Tous</MenuItem>
                  <MenuItem value="en_route">En route</MenuItem>
                  <MenuItem value="arrived">Arrivé</MenuItem>
                  <MenuItem value="delayed">Retardé</MenuItem>
                  <MenuItem value="cancelled">Annulé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          
          <Box mt={2}>
            <Button
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              variant="outlined"
            >
              Effacer les filtres
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tableau des trajets */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Trajets ({filteredTrips.length})
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Camion</TableCell>
                  <TableCell>Chauffeur</TableCell>
                  <TableCell>Date départ</TableCell>
                  <TableCell>Départ</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>ETA</TableCell>
                  <TableCell>Retard</TableCell>
                  <TableCell>Marchandise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTrips.map((trip) => (
                  <TableRow key={trip.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {getTruckPlate(trip.truckId)}
                      </Typography>
                    </TableCell>
                    <TableCell>{getDriverName(trip.driverId)}</TableCell>
                    <TableCell>
                      {new Date(trip.departureTime).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{trip.departure}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(trip.status)} 
                        color={getStatusColor(trip.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(trip.estimatedArrival).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={formatDelay(trip.delay)} 
                        color={getDelayColor(trip.delay)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{trip.cargo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TripsList; 