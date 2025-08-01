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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip,
  Rating
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { drivers, trips } from '../data/mockData';

const DriversManagement = () => {
  const [driversList, setDriversList] = useState(drivers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    license: '',
    licenseExpiry: '',
    status: 'active'
  });

  const handleOpenDialog = (driver = null) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData({
        name: driver.name,
        phone: driver.phone,
        license: driver.license,
        licenseExpiry: driver.licenseExpiry.split('T')[0],
        status: driver.status
      });
    } else {
      setEditingDriver(null);
      setFormData({
        name: '',
        phone: '',
        license: '',
        licenseExpiry: '',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDriver(null);
  };

  const handleSubmit = () => {
    if (editingDriver) {
      // Modifier le chauffeur existant
      setDriversList(prev => prev.map(driver => 
        driver.id === editingDriver.id 
          ? { ...driver, ...formData, licenseExpiry: formData.licenseExpiry + 'T00:00:00Z' }
          : driver
      ));
    } else {
      // Ajouter un nouveau chauffeur
      const newDriver = {
        id: Math.max(...driversList.map(d => d.id)) + 1,
        ...formData,
        licenseExpiry: formData.licenseExpiry + 'T00:00:00Z',
        totalTrips: 0,
        totalDistance: 0,
        rating: 0
      };
      setDriversList(prev => [...prev, newDriver]);
    }
    handleCloseDialog();
  };

  const getDriverTrips = (driverId) => {
    return trips.filter(trip => trip.driverId === driverId);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Actif' : 'Inactif';
  };

  const isLicenseExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestion des Chauffeurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Ajouter un chauffeur
        </Button>
      </Box>

      {/* Tableau des chauffeurs */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Liste des Chauffeurs ({driversList.length})
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom & Prénom</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Permis</TableCell>
                  <TableCell>Expiration</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Trajets</TableCell>
                  <TableCell>Distance totale</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {driversList.map((driver) => (
                  <TableRow key={driver.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                          {driver.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.license}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography 
                          variant="body2" 
                          color={isLicenseExpired(driver.licenseExpiry) ? 'error' : 'inherit'}
                        >
                          {new Date(driver.licenseExpiry).toLocaleDateString()}
                        </Typography>
                        {isLicenseExpired(driver.licenseExpiry) && (
                          <Chip 
                            label="Expiré" 
                            color="error" 
                            size="small" 
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(driver.status)} 
                        color={getStatusColor(driver.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{driver.totalTrips}</TableCell>
                    <TableCell>{driver.totalDistance.toLocaleString()} km</TableCell>
                    <TableCell>
                      <Rating value={driver.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Tooltip title="Voir détails">
                          <IconButton size="small" color="primary">
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifier">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog(driver)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog pour ajouter/modifier un chauffeur */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingDriver ? 'Modifier le chauffeur' : 'Ajouter un chauffeur'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom & Prénom"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numéro de téléphone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type de permis"
                value={formData.license}
                onChange={(e) => setFormData(prev => ({ ...prev, license: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date d'expiration"
                type="date"
                value={formData.licenseExpiry}
                onChange={(e) => setFormData(prev => ({ ...prev, licenseExpiry: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={formData.status}
                  label="Statut"
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <MenuItem value="active">Actif</MenuItem>
                  <MenuItem value="inactive">Inactif</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.phone || !formData.license || !formData.licenseExpiry}
          >
            {editingDriver ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriversManagement; 