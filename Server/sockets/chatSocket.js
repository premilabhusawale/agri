const Message = require("../models/Message");
const User = require("../models/User");
const createRoom = require("../utils/createRoom");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join Room
    socket.on("joinRoom", ({ user1, user2 }) => {
      const roomId = createRoom(user1, user2);
      socket.join(roomId);
      console.log("Joined:", roomId);
    });

    // Send Message
    socket.on("sendMessage", async (data) => {
      const { sender, receiver, message } = data;

      const senderUser = await User.findById(sender);
      const receiverUser = await User.findById(receiver);

      // Allow only CUSTOMER <-> FARMER
      const valid =
        (senderUser.role === "CUSTOMER" &&
          receiverUser.role === "FARMER") ||
        (senderUser.role === "FARMER" &&
          receiverUser.role === "CUSTOMER");

      if (!valid) return;

      const roomId = createRoom(sender, receiver);

      const newMessage = await Message.create({
        sender,
        receiver,
        message,
        chatRoom: roomId,
      });

      io.to(roomId).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = chatSocket;
