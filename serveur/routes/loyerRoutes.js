const express = require('express');
const router = express.Router();
const loyerController = require('../controllers/loyerController');

// Route pour récupérer toutes les propriétés d'un propriétaire
router.get('/:idProprietaire', loyerController.getProprietesByProprietaire);

module.exports = router;