const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/ChatbotController');

router.post('/chatbot/ask', ChatbotController.askBot);
router.get('/chatbot/history/:userId', ChatbotController.getChatHistory);

module.exports = router;