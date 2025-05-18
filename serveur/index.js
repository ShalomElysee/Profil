// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Chargement des variables d'environnement depuis un fichier .env
dotenv.config();

// Importation des routes
const connexionRoutes = require('./routes/connexionRoutes');
const userRoutes = require('./routes/userRoutes');
const loyerRoutes = require('./routes/loyerRoutes');
const chatRoutes = require('./routes/chatRoutes')

// Initialisation de l'application Express
const app = express();

// Utilisation de CORS pour permettre les requêtes cross-origin
app.use(cors());

// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static('public'));

// Analyse du corps des requêtes en JSON
app.use(bodyParser.json());

// Définition du port à utiliser
const PORT = process.env.PORT || 4000;

// Définition des routes
app.use('/connexion', connexionRoutes);
app.use('/user', userRoutes);
app.use('/loyers', loyerRoutes);
app.use('/chats', chatRoutes);

// Page d'accueil par défaut
app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur le serveur backend 🚀</h1><p>Le serveur est en cours d\'exécution.</p>');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
