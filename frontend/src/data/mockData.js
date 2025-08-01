export const trucks = [
  {
    id: 1,
    plate: "AB-123-CD",
    brand: "Mercedes",
    model: "Actros 1845",
    maxWeight: 40000,
    inServiceDate: "2022-03-15",
    currentLocation: { lat: 48.8566, lng: 2.3522 }, // Paris
    speed: 65,
    status: "en_route",
    lastGPSUpdate: new Date().toISOString(),
    driver: {
      id: 1,
      name: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      license: "C1E",
      licenseExpiry: "2025-12-31"
    },
    currentTrip: {
      id: 1,
      departure: "Paris",
      destination: "Lyon",
      departureTime: "2024-01-15T08:00:00Z",
      estimatedArrival: "2024-01-15T14:30:00Z",
      status: "en_route",
      remainingDistance: 280,
      route: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 46.2276, lng: 2.2137 },
        { lat: 45.7640, lng: 4.8357 }
      ]
    },
    cargo: {
      type: "Électronique",
      weight: 2500,
      temperature: 18,
      lotNumber: "LOT-2024-001"
    }
  },
  {
    id: 2,
    plate: "EF-456-GH",
    brand: "Volvo",
    model: "FH16 750",
    maxWeight: 44000,
    inServiceDate: "2021-11-20",
    currentLocation: { lat: 43.2965, lng: 5.3698 }, // Marseille
    speed: 0,
    status: "stopped",
    lastGPSUpdate: new Date().toISOString(),
    driver: {
      id: 2,
      name: "Marie Martin",
      phone: "+33 6 98 76 54 32",
      license: "C1E",
      licenseExpiry: "2024-08-15"
    },
    currentTrip: {
      id: 2,
      departure: "Marseille",
      destination: "Nice",
      departureTime: "2024-01-15T06:00:00Z",
      estimatedArrival: "2024-01-15T08:30:00Z",
      status: "arrived",
      remainingDistance: 0,
      route: [
        { lat: 43.2965, lng: 5.3698 },
        { lat: 43.7102, lng: 7.2620 }
      ]
    },
    cargo: {
      type: "Produits frais",
      weight: 1800,
      temperature: 4,
      lotNumber: "LOT-2024-002"
    }
  },
  {
    id: 3,
    plate: "IJ-789-KL",
    brand: "Scania",
    model: "R 500",
    maxWeight: 40000,
    inServiceDate: "2023-06-10",
    currentLocation: { lat: 45.7578, lng: 4.8320 }, // Lyon
    speed: 75,
    status: "en_route",
    lastGPSUpdate: new Date().toISOString(),
    driver: {
      id: 3,
      name: "Pierre Durand",
      phone: "+33 6 55 44 33 22",
      license: "C1E",
      licenseExpiry: "2026-03-20"
    },
    currentTrip: {
      id: 3,
      departure: "Lyon",
      destination: "Bordeaux",
      departureTime: "2024-01-15T09:00:00Z",
      estimatedArrival: "2024-01-15T16:00:00Z",
      status: "en_route",
      remainingDistance: 320,
      route: [
        { lat: 45.7578, lng: 4.8320 },
        { lat: 44.8378, lng: -0.5792 }
      ]
    },
    cargo: {
      type: "Vêtements",
      weight: 3000,
      temperature: 20,
      lotNumber: "LOT-2024-003"
    }
  }
];

export const drivers = [
  {
    id: 1,
    name: "Jean Dupont",
    phone: "+33 6 12 34 56 78",
    license: "C1E",
    licenseExpiry: "2025-12-31",
    status: "active",
    totalTrips: 156,
    totalDistance: 45000,
    rating: 4.8
  },
  {
    id: 2,
    name: "Marie Martin",
    phone: "+33 6 98 76 54 32",
    license: "C1E",
    licenseExpiry: "2024-08-15",
    status: "active",
    totalTrips: 89,
    totalDistance: 28000,
    rating: 4.6
  },
  {
    id: 3,
    name: "Pierre Durand",
    phone: "+33 6 55 44 33 22",
    license: "C1E",
    licenseExpiry: "2026-03-20",
    status: "active",
    totalTrips: 203,
    totalDistance: 62000,
    rating: 4.9
  }
];

export const trips = [
  {
    id: 1,
    truckId: 1,
    driverId: 1,
    departure: "Paris",
    destination: "Lyon",
    departureTime: "2024-01-15T08:00:00Z",
    estimatedArrival: "2024-01-15T14:30:00Z",
    status: "en_route",
    delay: 0,
    cargo: "Électronique"
  },
  {
    id: 2,
    truckId: 2,
    driverId: 2,
    departure: "Marseille",
    destination: "Nice",
    departureTime: "2024-01-15T06:00:00Z",
    estimatedArrival: "2024-01-15T08:30:00Z",
    status: "arrived",
    delay: -15,
    cargo: "Produits frais"
  },
  {
    id: 3,
    truckId: 3,
    driverId: 3,
    departure: "Lyon",
    destination: "Bordeaux",
    departureTime: "2024-01-15T09:00:00Z",
    estimatedArrival: "2024-01-15T16:00:00Z",
    status: "en_route",
    delay: 25,
    cargo: "Vêtements"
  }
];

export const alerts = [
  {
    id: 1,
    type: "retard",
    severity: "warning",
    truckId: 3,
    message: "Retard de 25 minutes sur le trajet Lyon-Bordeaux",
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 2,
    type: "temperature",
    severity: "error",
    truckId: 2,
    message: "Température hors norme dans la cargaison (8°C au lieu de 4°C)",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    resolved: false
  },
  {
    id: 3,
    type: "arret",
    severity: "info",
    truckId: 1,
    message: "Arrêt prolongé détecté (plus de 30 minutes)",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    resolved: true
  }
]; 