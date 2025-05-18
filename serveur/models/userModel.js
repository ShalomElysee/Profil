const mydb = require('../config/database');
const crypto = require('crypto');


// Récupérer un utilisateur par son nom d'utilisateur
function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM proprietaires WHERE username = ? LIMIT 1';
        mydb.query(query, [username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(undefined);
                }
            }
        });
    });
}
// serveur/models/userModel.js

function getUserByNomPrenom(nom, prenom) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id_utilisateur FROM utilisateurs WHERE nom = ? AND prenom = ? LIMIT 1';
        mydb.query(query, [nom, prenom], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Renvoie l'utilisateur ou null si non trouvé
                resolve(results[0] || null);
            }
        });
    });
}



// Comparer un mot de passe en clair avec un mot de passe haché
async function comparePassword(plainPassword, hashedPassword) {
    const hash = crypto.createHash('md5');
    hash.update(plainPassword);
    const plainPasswordHashed = hash.digest('hex');
    return plainPasswordHashed === hashedPassword;
}

// Ajouter un utilisateur
function addUser(nom, prenom, username, password, phone_number, civilite) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        hash.update(password);
        password = hash.digest('hex');
        const query = 'INSERT INTO proprietaires (nom, prenom, username, password, phone_number, civilite) VALUES (?, ?, ?, ?, ?)';
        mydb.query(query, [nom, prenom, username, password, phone_number, civilite], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Supprimer un utilisateur par son ID
function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM proprietaires WHERE id_admin = ?';
        mydb.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Récupérer tous les utilisateurs
function getAllUsers() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id_admin, nom, prenom, username, nom, prenom, username FROM proprietaires';
        mydb.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Vérifier si un nom d'utilisateur existe déjà pour d'autres utilisateurs
function checkUsername(username, userId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS count FROM proprietaires WHERE username = ? AND id_admin != ?';
        mydb.query(query, [username, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const count = results[0].count;
                resolve(count > 0);
            }
        });
    });
}

// Mettre à jour les informations d'un utilisateur
function updateUser(userId, newUserData) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE proprietaires SET ? WHERE id_admin = ?';
        mydb.query(query, [newUserData, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Mettre à jour le mot de passe d'un utilisateur
function updateUserPassword(userId, password) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        hash.update(password);
        password = hash.digest('hex');
        const query = 'UPDATE proprietaires SET password = ? WHERE id_admin = ?';
        mydb.query(query, [password, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getUserByUsername,
    comparePassword,
    getUserByNomPrenom,
    addUser,
    deleteUserById,
    getAllUsers,
    checkUsername,
    updateUser,
    updateUserPassword
};
