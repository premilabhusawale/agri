const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const Authenticate = require("../middleware/Authenticate");

// Get full chat history between two users
router.get("/chat/:user1/:user2", chatController.getChatHistory);

// Get all conversations for the logged-in user (with unread counts)
router.get("/chat/conversations", Authenticate, chatController.getConversations);

// Mark all messages from a specific sender as read
router.put("/chat/read/:senderId", Authenticate, chatController.markAsRead);

module.exports = router;
