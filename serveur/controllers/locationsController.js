// serveur/controllers/proprietesController.js

const proprietesModel = require('../models/proprietesModel');
const userModel = require('../models/userModel');

// Ajouter une propriété
async function addProprietes(req, res) {
    try {
        const proprietesData = req.body;

        // Vérification des champs obligatoires
        const requiredFields = [
            'civilite', 'nom_proprietaire', 'prenom_proprietaire', 'type', 'titre', 'adresse', 'ville', 
            'code_postal', 'pays', 'type_de_location', 'loyer_hors_charges', 'superficie'
        ];

        for (const field of requiredFields) {
            if (!proprietesData[field]) {
                return res.json({ success: false, message: `Le champ ${field} est obligatoire.` });
            }
        }

        // Vérification de la civilité
        const validCivilites = ['M', 'Mme'];
        if (!validCivilites.includes(proprietesData.civilite)) {
            return res.json({
                success: false,
                message: 'La civilité est invalide. Valeurs valides : M, Mme.'
            });
        }

        // Vérification du type
        const validTypes = ['Appartement', 'Maison', 'Place_de_Parking', 'Garage'];
        if (!validTypes.includes(proprietesData.type)) {
            return res.json({
                success: false,
                message: 'Le type de propriété est invalide. Types valides : Appartement, Maison, Place_de_Parking, Garage.'
            });
        }

        // Vérification du type de location
        const validLocations = ['meuble', 'non_meuble'];
        if (!validLocations.includes(proprietesData.type_de_location)) {
            return res.json({
                success: false,
                message: 'Le type de location est invalide. Types valides : meuble, non_meuble.'
            });
        }

        // Vérification du code postal (5 chiffres)
        if (!/^\d{5}$/.test(proprietesData.code_postal)) {
            return res.json({
                success: false,
                message: 'Le code postal doit être un nombre à 5 chiffres.'
            });
        }

        // Vérification du loyer hors charges (nombre positif)
        if (isNaN(proprietesData.loyer_hors_charges) || proprietesData.loyer_hors_charges <= 0) {
            return res.json({
                success: false,
                message: 'Le loyer hors charges doit être un nombre positif.'
            });
        }

        // Vérification de la superficie (nombre positif)
        if (isNaN(proprietesData.superficie) || proprietesData.superficie <= 0) {
            return res.json({
                success: false,
                message: 'La superficie doit être un nombre positif.'
            });
        }

        // Vérification du propriétaire
        const proprietaire = await userModel.getUserByNomPrenom(proprietesData.nom_proprietaire, proprietesData.prenom_proprietaire);
        if (!proprietaire) {
            return res.json({
                success: false,
                message: `Propriétaire "${proprietesData.nom_proprietaire} ${proprietesData.prenom_proprietaire}" non trouvé.`
            });
        }

        // Ajout de l'ID du propriétaire
        proprietesData.id_proprietaire = proprietaire.id_utilisateur;

        // Suppression des champs inutiles avant l'insertion
        delete proprietesData.nom_proprietaire;
        delete proprietesData.prenom_proprietaire;

        // Insertion de la propriété
        const result = await proprietesModel.addProprietes(proprietesData);
        res.json({ success: true, message: 'Propriété ajoutée avec succès', proprietesId: result.insertId });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la propriété :', error);
        res.json({ success: false, message: 'Erreur lors de l\'ajout de la propriété.', error: error.message });
    }
}

// Récupérer toutes les propriétés
async function getAllProprietes(req, res) {
    try {
        const properties = await proprietesModel.getAllProprietes();
        res.json({ success: true, properties });
    } catch (error) {
        console.error('Erreur lors de la récupération des propriétés :', error);
        res.json({ success: false, message: 'Erreur lors de la récupération des propriétés.', error: error.message });
    }
}

// Récupérer une propriété par ID
async function getProprietesById(req, res) {
    try {
        const id = req.params.id;
        const proprietes = await proprietesModel.getProprietesById(id);
        if (proprietes) {
            res.json({ success: true, proprietes });
        } else {
            res.json({ success: false, message: 'Propriété non trouvée.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la propriété :', error);
        res.json({ success: false, message: 'Erreur lors de la récupération de la propriété.', error: error.message });
    }
}

// Mise à jour d'une propriété
async function updateProprietes(req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // Mise à jour de la propriété
        const result = await proprietesModel.updateProprietes(id, updatedData);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Propriété mise à jour avec succès' });
        } else {
            res.json({ success: false, message: 'Propriété non trouvée.' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la propriété :', error);
        res.json({ success: false, message: 'Erreur lors de la mise à jour de la propriété.', error: error.message });
    }
}

// Supprimer une propriété
async function deleteProprietes(req, res) {
    try {
        const id = req.params.id;
        const result = await proprietesModel.deleteProprietesById(id);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Propriété supprimée avec succès' });
        } else {
            res.json({ success: false, message: 'Propriété non trouvée.' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la propriété :', error);
        res.json({ success: false, message: 'Erreur lors de la suppression de la propriété.', error: error.message });
    }
}

module.exports = {
    addProprietes,
    getProprietesById,
    getAllProprietes,
    updateProprietes,
    deleteProprietes,
};
