const express = require('express');
const connexionController = require('../controllers/connexionController');
const router = express.Router();


router.post('/login', connexionController.loginUser);// Connexion d'un utilisateur

// Exportation du module
module.exports = router;