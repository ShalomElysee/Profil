const mydb = require('../config/database');

// Récupérer une propriété par son ID
function getProprietesById(id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT p.*, u.nom AS nom_proprietaire, u.prenom AS prenom_proprietaire, u.civilite AS civilite_proprietaire
            FROM proprietes p
            LEFT JOIN utilisateurs u ON p.id_proprietaire = u.id_utilisateur
            WHERE p.id_propriete = ?
            LIMIT 1
        `;
        mydb.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0] || null);
            }
        });
    });
}

// Ajouter une propriété
function addProprietes(proprietesData) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO proprietes (id_proprietaire, type, titre, adresse, ville, code_postal, pays, type_de_location, loyer_hors_charges, superficie)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            proprietesData.id_proprietaire,
            proprietesData.type,
            proprietesData.titre,
            proprietesData.adresse,
            proprietesData.ville,
            proprietesData.code_postal,
            proprietesData.pays,
            proprietesData.type_de_location,
            proprietesData.loyer_hors_charges,
            proprietesData.superficie
        ];
        mydb.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Supprimer une propriété par son ID
function deleteProprietesById(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM proprietes WHERE id_propriete = ?';
        mydb.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Récupérer toutes les propriétés
function getAllProprietes() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT p.*, u.nom AS nom_proprietaire, u.prenom AS prenom_proprietaire, u.civilite AS civilite_proprietaire
            FROM proprietes p
            LEFT JOIN utilisateurs u ON p.id_proprietaire = u.id_utilisateur
        `;
        mydb.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Mettre à jour une propriété
function updateProprietes(id, updatedData) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE proprietes SET ? WHERE id_propriete = ?';
        mydb.query(query, [updatedData, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    addProprietes,
    deleteProprietesById,
    getAllProprietes,
    getProprietesById,
    updateProprietes
};
