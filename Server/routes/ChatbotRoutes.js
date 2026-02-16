const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/ChatbotController');

router.post('/ask', ChatbotController.askBot);
router.get('/history/:userId', ChatbotController.getChatHistory);

module.exports = router;