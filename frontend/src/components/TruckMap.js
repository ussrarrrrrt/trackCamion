import React, { useEffect, useRef, useState } from 'react';
// Suppression des imports Mapbox
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// Suppression du token Mapbox
// mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

const TruckMap = ({ trucks, onTruckClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const locationMarker = useRef(null);
  const locationCircle = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (map.current) return;

    // Initialisation de la carte Leaflet
    map.current = L.map(mapContainer.current).setView([48.8566, 2.3522], 6); // Paris
    
    // Ajout de la couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.current);

    // Ajout des contrôles de navigation
    L.control.zoom().addTo(map.current);

    // Ajout du bouton de localisation
    L.control.locate({
      position: 'topright',
      strings: {
        title: "Afficher ma position"
      },
      locateOptions: {
        enableHighAccuracy: true
      }
    }).addTo(map.current);

    // Obtenir la localisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude, accuracy });
          
          // Centrer la carte sur la position de l'utilisateur
          map.current.setView([latitude, longitude], 13);
          
          // Ajouter un marqueur pour la position de l'utilisateur
          const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: '📍',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });
          
          // Supprimer l'ancien marqueur s'il existe
          if (locationMarker.current) {
            map.current.removeLayer(locationMarker.current);
          }
          if (locationCircle.current) {
            map.current.removeLayer(locationCircle.current);
          }
          
          // Ajouter le nouveau marqueur
          locationMarker.current = L.marker([latitude, longitude], { icon: userIcon })
            .addTo(map.current)
            .bindPopup("Vous êtes ici");
          
          // Ajouter un cercle pour montrer la précision
          locationCircle.current = L.circle([latitude, longitude], {
            radius: accuracy,
            color: '#3388ff',
            fillColor: '#3388ff',
            fillOpacity: 0.1
          }).addTo(map.current);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible d'obtenir votre position. Veuillez vérifier vos paramètres de localisation.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !trucks) return;

    // Supprimer les anciens marqueurs
    Object.values(markers.current).forEach(marker => map.current.removeLayer(marker));
    markers.current = {};

    // Ajouter les nouveaux marqueurs
    trucks.forEach(truck => {
      // Création d'une icône personnalisée
      const truckIcon = L.divIcon({
        className: 'truck-marker',
        html: '🚚',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      // Création du marqueur
      const marker = L.marker(
        [truck.currentLocation.lat, truck.currentLocation.lng],
        { icon: truckIcon }
      ).addTo(map.current);

      // Ajout du popup
      marker.bindPopup(`
        <div style="padding: 10px;">
          <h4>${truck.plate}</h4>
          <p><strong>Chauffeur:</strong> ${truck.driver.name}</p>
          <p><strong>Statut:</strong> ${getStatusText(truck.status)}</p>
          <p><strong>Vitesse:</strong> ${truck.speed} km/h</p>
          <p><strong>Destination:</strong> ${truck.currentTrip.destination}</p>
          <button id="truck-${truck.id}-btn" style="margin-top: 10px; padding: 5px 10px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Voir détails
          </button>
        </div>
      `);

      // Ajout de l'événement de clic sur le bouton
      marker.on('popupopen', () => {
        setTimeout(() => {
          const button = document.getElementById(`truck-${truck.id}-btn`);
          if (button) {
            button.addEventListener('click', () => onTruckClick(truck.id));
          }
        }, 0);
      });

      markers.current[truck.id] = marker;
    });
  }, [trucks, onTruckClick]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_route': return '#4caf50';
      case 'stopped': return '#ff9800';
      case 'arrived': return '#2196f3';
      case 'incident': return '#f44336';
      default: return '#9e9e9e';
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

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default TruckMap;