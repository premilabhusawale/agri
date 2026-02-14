const Message = require("../models/Message");
const createRoom = require("../utils/createRoom");

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
