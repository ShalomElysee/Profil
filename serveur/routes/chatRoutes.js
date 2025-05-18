const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route pour récupérer le chat
router.get('/chat/:sender_id/:receiver_id', chatController.getChatById);  

// Route pour envoyer un message
router.post('/send/:sender_id/:receiver_id', chatController.sendMessageById); 

module.exports = router;
