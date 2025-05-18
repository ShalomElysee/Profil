const loyerModel = require('../models/loyerModel');

// Contrôleur pour récupérer un loyer hors charges par ID
async function getProprietesByProprietaire(req, res) {
    try {
        const idProprietaire = req.params.idProprietaire;
        const proprietes = await loyerModel.getProprietesByProprietaire(idProprietaire);
        if (proprietes.length > 0) {
            res.json({ proprietes });
        } else {
            res.status(404).json({ message: 'Aucune propriété trouvée pour ce propriétaire' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des propriétés :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des propriétés' });
    }
}

module.exports = {
    getProprietesByProprietaire,
};