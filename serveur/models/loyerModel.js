const mydb = require('../config/database');

// Récupérer le loyer hors charges par ID
function getProprietesByProprietaire(idProprietaire) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT loyer_hors_charges, frequence_de_paiment, type_de_location FROM proprietes WHERE id_proprietaire = ?';
        mydb.query(query, [idProprietaire], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Assurez-vous que les valeurs sont converties en nombres
                results.forEach(result => {
                    result.loyer_hors_charges = parseFloat(result.loyer_hors_charges); // Convertir en nombre
                });
                resolve(results);
            }
        });
    });
}


module.exports = {
    getProprietesByProprietaire,
};