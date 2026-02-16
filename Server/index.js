const dotenv = require('dotenv');
dotenv.config({
    path: '.env',
    quiet: true
});

const app = require('./app');
const databaseConnect = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const chatSocket = require('./sockets/chatSocket');
const chatbotSocket = require('./sockets/chatbotSocket'); 

databaseConnect();

const PORT = process.env.PORT || 8585;

// 🔥 Create HTTP server
const server = http.createServer(app);

// 🔥 Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // change in production
    methods: ["GET", "POST"]
  }
});

// 🔥 Initialize chat socket
chatSocket(io);
chatbotSocket(io);

// 🚀 Start server
server.listen(PORT, () => {
  console.log(`🚀 Server started → http://localhost:${PORT}`);
});
