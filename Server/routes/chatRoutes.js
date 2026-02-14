const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/chat/:user1/:user2", chatController.getChatHistory);

module.exports = router;
