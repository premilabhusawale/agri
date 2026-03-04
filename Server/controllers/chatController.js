const Message = require("../models/Message");
const createRoom = require("../utils/createRoom");
const mongoose = require("mongoose");

// GET /chat/:user1/:user2 — full chat history between two users
exports.getChatHistory = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const roomId = createRoom(user1, user2);
    const messages = await Message.find({ chatRoom: roomId })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "name role");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /chat/conversations — all conversations for logged-in user (with unread counts)
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    // Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender receiver", "name role");

    // Build conversation map: key = other person's id
    const convMap = {};
    for (const msg of messages) {
      const sender = msg.sender;
      const receiver = msg.receiver;
      const otherId =
        sender._id.toString() === userId
          ? receiver._id.toString()
          : sender._id.toString();
      const otherUser =
        sender._id.toString() === userId ? receiver : sender;

      if (!convMap[otherId]) {
        convMap[otherId] = {
          _id: otherId,
          name: otherUser.name,
          role: otherUser.role,
          lastMsg: msg.message,
          lastTime: msg.createdAt,
          unread: 0,
        };
      }

      // Count unread messages sent TO me (receiver = me, not yet read)
      if (
        msg.receiver._id.toString() === userId &&
        !msg.isRead
      ) {
        convMap[otherId].unread += 1;
      }
    }

    res.status(200).json(Object.values(convMap));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /chat/read/:senderId — mark all messages from senderId as read
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { senderId } = req.params;

    await Message.updateMany(
      { sender: senderId, receiver: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
