const chatModel = require('../models/chatModel');

// Contrôleur pour récupérer un Chat par ID
async function getChatById(req, res) {  
    try {
      const sender_id = req.params.sender_id;  
      const receiver_id = req.params.receiver_id;
      console.log(`Paramètres reçus : sender_id = ${sender_id}, receiver_id = ${receiver_id}`);

      const chat = await chatModel.getChatById(receiver_id, sender_id);
      if (chat.length > 0) {
        res.json({ chat });
      } else {
        res.status(404).json({ message: 'Aucun chat trouvé entre ces utilisateurs.' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du chat:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération du chat' });
    }
}

// Contrôleur pour envoyer un message d'un utilisateur sender_id vers un autre receiver_id
async function sendMessageById(req, res) {
    try {
        const receiver_id = req.params.receiver_id;
        const sender_id = req.params.sender_id;
        const content = req.body.content;  // Utilisation de req.body pour récupérer le contenu du message
        const msg = await chatModel.sendMessageById(receiver_id, sender_id, content);
        if (msg.affectedRows > 0) {  // Vérification du nombre de lignes affectées pour s'assurer de l'insertion
            res.json({ message: 'Message envoyé avec succès', msg });
        } else {
            res.status(404).json({ message: 'Le message n\'a pas pu être envoyé' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
    }
}

module.exports = {
    getChatById,
    sendMessageById,
};
