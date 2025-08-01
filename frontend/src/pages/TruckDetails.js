import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocalShipping as TruckIcon,
  Person as PersonIcon,
  Route as RouteIcon,
  Inventory as CargoIcon,
  Speed as SpeedIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Thermostat as ThermostatIcon
} from '@mui/icons-material';
import TruckMap from '../components/TruckMap';
import { trucks } from '../data/mockData';

const TruckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const truck = trucks.find(t => t.id === parseInt(id));

  if (!truck) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error">
          Camion non trouvé
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Retour au Dashboard
        </Button>
      </Box>
    );
  }

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

  const calculateProgress = () => {
    const totalDistance = 500; // Distance totale estimée
    const remaining = truck.currentTrip.remainingDistance;
    return ((totalDistance - remaining) / totalDistance) * 100;
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4">
          Détails du Camion {truck.plate}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Informations générales */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TruckIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Informations Générales</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Immatriculation" 
                    secondary={truck.plate}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Marque / Modèle" 
                    secondary={`${truck.brand} ${truck.model}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Poids maximal autorisé" 
                    secondary={`${truck.maxWeight} kg`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Date de mise en service" 
                    secondary={new Date(truck.inServiceDate).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Statut actuel" 
                    secondary={
                      <Chip 
                        label={getStatusText(truck.status)} 
                        color={getStatusColor(truck.status)}
                        size="small"
                      />
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Informations chauffeur */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Informations Chauffeur</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Nom & Prénom" 
                    secondary={truck.driver.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Numéro de téléphone" 
                    secondary={truck.driver.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Permis de conduire" 
                    secondary={`${truck.driver.license} - Expire le ${new Date(truck.driver.licenseExpiry).toLocaleDateString()}`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Trajet en cours */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <RouteIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Trajet en Cours</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Lieu de départ" 
                        secondary={truck.currentTrip.departure}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Destination" 
                        secondary={truck.currentTrip.destination}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Date & heure de départ" 
                        secondary={new Date(truck.currentTrip.departureTime).toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Estimation d'arrivée (ETA)" 
                        secondary={new Date(truck.currentTrip.estimatedArrival).toLocaleString()}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Progression du trajet
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress()} 
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {truck.currentTrip.remainingDistance} km restants
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="subtitle2" gutterBottom>
                        Vitesse actuelle
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <SpeedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          {truck.speed} km/h
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Informations marchandises */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CargoIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Informations Marchandises</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Type de marchandise" 
                    secondary={truck.cargo.type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Quantité / Poids" 
                    secondary={`${truck.cargo.weight} kg`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ThermostatIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Température requise" 
                    secondary={`${truck.cargo.temperature}°C`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Numéro de lot" 
                    secondary={truck.cargo.lotNumber}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte avec itinéraire */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Carte avec Itinéraire
              </Typography>
              <TruckMap trucks={[truck]} onTruckClick={() => {}} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TruckDetails; 