import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.send('API du système de gestion de flotte est en ligne!');
});

// Créer le serveur HTTP et Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Un client est connecté');
  
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Démarrer le serveur
httpServer.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});