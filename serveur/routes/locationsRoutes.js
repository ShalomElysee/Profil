const express = require('express');
const router = express.Router();
const loyerController = require('../controllers/loyerController');

// Route pour récupérer tous les loyers hors charges
router.get('/', loyerController.getAllLoyersHorsCharges);

// Route pour récupérer un loyer hors charges par ID
router.get('/:id', loyerController.getLoyerHorsChargesById);

module.exports = router;
