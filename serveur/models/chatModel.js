const mydb = require('../config/database');

// Récupérer le chat entre les deux ids
function getChatById(receiver_id, sender_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * FROM messages 
        WHERE (id_expediteur = ? AND id_destinataire = ?) 
        OR (id_expediteur = ? AND id_destinataire = ?)
        ORDER BY date_envoi ASC`;
        mydb.query(query, [sender_id, receiver_id, receiver_id, sender_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Envoie de message de sender_id vers receiver_id
function sendMessageById(receiver_id, sender_id, content) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO messages (id_expediteur, id_destinataire, contenu) VALUES (?, ?, ?)';
        mydb.query(query, [sender_id, receiver_id, content], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getChatById,
    sendMessageById,
};
