import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as ResolvedIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  LocalShipping as TruckIcon
} from '@mui/icons-material';
import { alerts, trucks } from '../data/mockData';

const AlertsNotifications = () => {
  const [alertsList, setAlertsList] = useState(alerts);
  const [filter, setFilter] = useState('all');

  const getTruckPlate = (truckId) => {
    const truck = trucks.find(t => t.id === truckId);
    return truck ? truck.plate : 'N/A';
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'retard':
        return <WarningIcon color="warning" />;
      case 'temperature':
        return <ErrorIcon color="error" />;
      case 'arret':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const getAlertText = (type) => {
    switch (type) {
      case 'retard':
        return 'Retard';
      case 'temperature':
        return 'Température';
      case 'arret':
        return 'Arrêt';
      default:
        return 'Autre';
    }
  };

  const filteredAlerts = alertsList.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return alert.resolved;
    if (filter === 'unresolved') return !alert.resolved;
    return alert.type === filter;
  });

  const handleResolveAlert = (alertId) => {
    setAlertsList(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const clearFilters = () => {
    setFilter('all');
  };

  const stats = {
    total: alertsList.length,
    unresolved: alertsList.filter(a => !a.resolved).length,
    resolved: alertsList.filter(a => a.resolved).length,
    errors: alertsList.filter(a => a.severity === 'error').length,
    warnings: alertsList.filter(a => a.severity === 'warning').length
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alertes & Notifications
      </Typography>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Total
                </Typography>
                <Typography variant="h4">
                  {stats.total}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Non résolues
                </Typography>
                <Typography variant="h4" color="error.main">
                  {stats.unresolved}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Résolues
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.resolved}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Erreurs
                </Typography>
                <Typography variant="h4" color="error.main">
                  {stats.errors}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Avertissements
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {stats.warnings}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <Typography color="textSecondary" gutterBottom>
                  Taux de résolution
                </Typography>
                <Typography variant="h4" color="info.main">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtres */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <FilterIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Filtres</Typography>
            </Box>
            <Button
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              variant="outlined"
              size="small"
            >
              Effacer
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type d'alerte</InputLabel>
                <Select
                  value={filter}
                  label="Type d'alerte"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="all">Toutes les alertes</MenuItem>
                  <MenuItem value="unresolved">Non résolues</MenuItem>
                  <MenuItem value="resolved">Résolues</MenuItem>
                  <MenuItem value="retard">Retards</MenuItem>
                  <MenuItem value="temperature">Température</MenuItem>
                  <MenuItem value="arret">Arrêts</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des alertes */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Alertes ({filteredAlerts.length})
          </Typography>
          
          {filteredAlerts.length === 0 ? (
            <Alert severity="info">
              Aucune alerte trouvée avec les filtres actuels.
            </Alert>
          ) : (
            <List>
              {filteredAlerts.map((alert) => (
                <ListItem
                  key={alert.id}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                    backgroundColor: alert.resolved ? 'action.hover' : 'background.paper'
                  }}
                >
                  <ListItemIcon>
                    {getAlertIcon(alert.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {alert.message}
                        </Typography>
                        <Chip 
                          label={getAlertText(alert.type)} 
                          color={getAlertColor(alert.severity)}
                          size="small"
                        />
                        {!alert.resolved && (
                          <Chip 
                            label="Non résolue" 
                            color="error" 
                            size="small"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Camion: {getTruckPlate(alert.truckId)} | 
                          {new Date(alert.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box display="flex" alignItems="center" gap={1}>
                    {!alert.resolved && (
                      <Tooltip title="Marquer comme résolue">
                        <IconButton
                          color="success"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          <ResolvedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Voir le camion">
                      <IconButton color="primary">
                        <TruckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AlertsNotifications; 