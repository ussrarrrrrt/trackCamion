import React, { useState } from 'react';
import { 
  Grid, 
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
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Visibility as VisibilityIcon,
  LocalShipping as TruckIcon,
  Speed as SpeedIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TruckMap from '../components/TruckMap';
import { trucks } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTruck, setSelectedTruck] = useState(null);

  const handleTruckClick = (truckId) => {
    navigate(`/truck/${truckId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_route': return 'success';
      case 'stopped': return 'warning';
      case 'arrived': return 'info';
      case 'incident': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'en_route': return 'En route';
      case 'stopped': return 'Arrêté';
      case 'arrived': return 'Arrivé';
      case 'incident': return 'Incident';
      default: return 'Inconnu';
    }
  };

  const stats = {
    total: trucks.length,
    enRoute: trucks.filter(t => t.status === 'en_route').length,
    stopped: trucks.filter(t => t.status === 'stopped').length,
    arrived: trucks.filter(t => t.status === 'arrived').length
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard - Suivi en Temps Réel
      </Typography>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TruckIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Camions
                  </Typography>
                  <Typography variant="h4">
                    {stats.total}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SpeedIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    En Route
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats.enRoute}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <LocationIcon color="warning" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Arrêtés
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.stopped}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <LocationIcon color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Arrivés
                  </Typography>
                  <Typography variant="h4" color="info.main">
                    {stats.arrived}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Carte */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Position des Camions
          </Typography>
          <TruckMap trucks={trucks} onTruckClick={handleTruckClick} />
        </CardContent>
      </Card>

      {/* Tableau des camions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Liste des Camions
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Immatriculation</TableCell>
                  <TableCell>Chauffeur</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Vitesse</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Dernière mise à jour</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trucks.map((truck) => (
                  <TableRow key={truck.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {truck.plate}
                      </Typography>
                    </TableCell>
                    <TableCell>{truck.driver.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(truck.status)} 
                        color={getStatusColor(truck.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <SpeedIcon sx={{ mr: 1, fontSize: 16 }} />
                        {truck.speed} km/h
                      </Box>
                    </TableCell>
                    <TableCell>{truck.currentTrip.destination}</TableCell>
                    <TableCell>
                      {new Date(truck.lastGPSUpdate).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Voir détails">
                        <IconButton 
                          size="small" 
                          onClick={() => handleTruckClick(truck.id)}
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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

export default Dashboard; 