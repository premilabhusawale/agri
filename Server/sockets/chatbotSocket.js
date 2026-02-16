const ChatbotMessage = require('../models/ChatbotMessage');
const askGroq = require('../utils/groqBot');
const User = require('../models/User');

const chatbotSocket = (io) => {
  io.on('connection', (socket) => {

    socket.on('askBot', async ({ userId, question }) => {
      try {
        if (!userId || !question) {
          socket.emit('botError', { message: 'userId and question are required' });
          return;
        }

        const user = await User.findById(userId);
        if (!user) {
          socket.emit('botError', { message: 'User not found' });
          return;
        }

        // ✅ pass language
        const answer = await askGroq(question, user.role, user.language);
        await ChatbotMessage.create({ user: userId, question, answer });
        socket.emit('botReply', { question, answer });

      } catch (err) {
        socket.emit('botError', { message: err.message });
      }
    });

  });
};

module.exports = chatbotSocket;