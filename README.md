# Application de Suivi de Camions - Frontend

## 🚚 Vue d'ensemble

Cette application web permet le suivi en temps réel d'une flotte de camions transportant des marchandises. Elle offre une interface moderne et intuitive pour les gestionnaires de flotte.

## ✨ Fonctionnalités principales

### 📊 Dashboard
- **Carte interactive** : Visualisation en temps réel de tous les camions
- **Statistiques** : Vue d'ensemble de la flotte (total, en route, arrêtés, arrivés)
- **Tableau des camions** : Liste complète avec statuts, vitesses et destinations
- **Navigation rapide** : Accès direct aux détails de chaque camion

### 🚛 Détails d'un camion
- **Informations générales** : Immatriculation, marque, modèle, poids maximal
- **Données chauffeur** : Nom, téléphone, permis de conduire
- **Trajet en cours** : Départ, destination, ETA, progression, vitesse
- **Marchandises** : Type, poids, température, numéro de lot
- **Carte détaillée** : Itinéraire et position en temps réel

### 🛣️ Liste des trajets
- **Filtres avancés** : Par camion, chauffeur, statut, date
- **Informations complètes** : Départ, destination, ETA, retards
- **Statuts visuels** : Codes couleur pour les différents états
- **Gestion des retards** : Affichage et suivi des délais

### 👨‍💼 Gestion des chauffeurs
- **Liste complète** : Tous les chauffeurs avec leurs informations
- **Ajout/Modification** : Interface intuitive pour la gestion
- **Validation** : Vérification des permis expirés
- **Statistiques** : Trajets effectués, distance totale, notes

### 🚨 Alertes & Notifications
- **Alertes temps réel** : Retards, problèmes de température, arrêts
- **Filtres par type** : Erreurs, avertissements, informations
- **Gestion des incidents** : Marquage comme résolus
- **Statistiques** : Taux de résolution, répartition par type

## 🛠️ Technologies utilisées

- **React 18** : Framework principal
- **Material-UI (MUI)** : Composants UI modernes
- **React Router** : Navigation entre les pages
- **Mapbox GL** : Cartes interactives
- **Socket.io Client** : Communication temps réel (préparé)

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Démarrer l'application en mode développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Variables d'environnement
Pour utiliser les cartes Mapbox, créez un fichier `.env` :
```
REACT_APP_MAPBOX_TOKEN=votre_token_mapbox
```

## 📱 Interface utilisateur

### Design responsive
- **Desktop** : Interface complète avec toutes les fonctionnalités
- **Tablet** : Adaptation automatique des layouts
- **Mobile** : Navigation optimisée pour petits écrans

### Thème et couleurs
- **Couleur principale** : Bleu (#1976d2)
- **Couleur secondaire** : Rouge (#dc004e)
- **Arrière-plan** : Gris clair (#f5f5f5)

## 🔧 Configuration

### Données de test
L'application utilise des données de test dans `src/data/mockData.js` :
- 3 camions avec positions GPS
- 3 chauffeurs avec informations complètes
- 3 trajets en cours
- 3 alertes actives

### Personnalisation
- Modifiez les données dans `mockData.js` pour vos besoins
- Ajustez les couleurs dans `App.js` (thème Material-UI)
- Personnalisez les styles dans `index.css`

## 🔌 Intégration backend

L'application est préparée pour l'intégration avec un backend :
- **Socket.io** : Pour les mises à jour temps réel
- **API REST** : Pour la récupération des données
- **WebSocket** : Pour les alertes instantanées

### Points d'intégration
1. Remplacez les données mock par des appels API
2. Configurez Socket.io pour les mises à jour GPS
3. Implémentez l'authentification si nécessaire

## 📊 Fonctionnalités avancées

### Temps réel
- Mise à jour automatique des positions GPS
- Alertes instantanées
- Synchronisation des statuts

### Filtres et recherche
- Recherche par immatriculation
- Filtres par statut et date
- Tri intelligent des données

### Export et rapports
- Export des données (préparé)
- Génération de rapports
- Historique des trajets

## 🐛 Dépannage

### Problèmes courants
1. **Carte ne s'affiche pas** : Vérifiez le token Mapbox
2. **Erreurs de dépendances** : Supprimez `node_modules` et réinstallez
3. **Problèmes de port** : Changez le port dans `package.json`

### Support
Pour toute question ou problème, consultez la documentation ou contactez l'équipe de développement.

## 📈 Évolutions futures

- [ ] Intégration avec GPS en temps réel
- [ ] Notifications push
- [ ] Rapports avancés
- [ ] Application mobile
- [ ] Intelligence artificielle pour la prédiction
- [ ] Intégration avec systèmes ERP

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Développé avec** ❤️ pour la logistique moderne 
