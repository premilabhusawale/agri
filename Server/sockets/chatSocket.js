const Message = require("../models/Message");
const User = require("../models/User");
const createRoom = require("../utils/createRoom");

const chatSocket = (io) => {
  // Track userId -> socketId mapping for targeted notifications
  const userSocketMap = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register socket with userId so we can send targeted notifications
    socket.on("registerUser", (userId) => {
      userSocketMap[userId] = socket.id;
      // Also join a personal room (userId) for targeted events
      socket.join(userId);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Join Room (for two-way chat)
    socket.on("joinRoom", ({ user1, user2 }) => {
      const roomId = createRoom(user1, user2);
      socket.join(roomId);
      console.log("Joined:", roomId);
    });

    // Send Message
    socket.on("sendMessage", async (data) => {
      try {
        const { sender, receiver, message } = data;

        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
          socket.emit("error", { message: "User not found" });
          return;
        }

        // ✅ Allow CUSTOMER <-> ADMIN (admin = farmer)
        const valid =
          (senderUser.role === "CUSTOMER" && receiverUser.role === "ADMIN") ||
          (senderUser.role === "ADMIN" && receiverUser.role === "CUSTOMER");

        if (!valid) {
          socket.emit("error", { message: "Only CUSTOMER <-> ADMIN chat is allowed" });
          return;
        }

        const roomId = createRoom(sender, receiver);

        const newMessage = await Message.create({
          sender,
          receiver,
          message,
          chatRoom: roomId,
        });

        // Populate sender info for the response
        await newMessage.populate("sender receiver", "name role");

        // Emit to the shared chat room (both users see it if they're in the room)
        io.to(roomId).emit("receiveMessage", newMessage);

        // Also emit a notification to the receiver's personal room
        // (this fires even if receiver is NOT on the messages page)
        io.to(receiver).emit("newMessageNotification", {
          _id: newMessage._id,
          sender: {
            _id: senderUser._id,
            name: senderUser.name,
            role: senderUser.role,
          },
          message: newMessage.message,
          createdAt: newMessage.createdAt,
        });

      } catch (err) {
        console.error("sendMessage error:", err.message);
        socket.emit("error", { message: "Something went wrong" });
      }
    });

    socket.on("disconnect", () => {
      // Clean up userSocketMap
      for (const [userId, sockId] of Object.entries(userSocketMap)) {
        if (sockId === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      console.log("User disconnected");
    });
  });
};

module.exports = chatSocket;