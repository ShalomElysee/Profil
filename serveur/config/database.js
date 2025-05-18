// serveur/config/database.js
const mysql = require('mysql2');
const dbconfig = require('./dbconfig.json');

// Création de la connexion à la base de données
const mydb = mysql.createPool({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    port: dbconfig.port
});

// Vérification de la connexion
mydb.getConnection((err, connection) => {
    if (err) {
        console.error("Erreur lors de la connexion à la base de données :", err);
    } else {
        console.log("Connecté à la base de données MySQL avec succès.");
        connection.release(); // Libérer la connexion
    }
});

module.exports = mydb;
