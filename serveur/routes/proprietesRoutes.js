const express = require('express');
const proprietesController = require('../controllers/proprietesController');
const router = express.Router();

router.post('/addProprietes', proprietesController.addProprietes);
router.delete('/deleteProprietes/:id', proprietesController.deleteProprietes);
router.get('/getAllProprietes', proprietesController.getAllProprietes);
router.put('/updateProprietes/:id', proprietesController.updateProprietes);
router.get('/getPropriete/:id', proprietesController.getProprietesById);  // Correction ici

module.exports = router;
