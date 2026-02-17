const dotenv = require('dotenv');
dotenv.config({
    path: '.env',
    quiet: true
});

const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const databaseConnect = require('./config/db');
const chatSocket = require('./sockets/chatSocket');       
const chatbotSocket = require('./sockets/chatbotSocket'); 

databaseConnect();

const PORT = process.env.PORT || 8585;

// ✅ Create HTTP server from express app
const server = http.createServer(app);

// ✅ Attach Socket.io to HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // change to your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// ✅ Initialize both sockets on same io instance
chatSocket(io);
chatbotSocket(io);

// ✅ Listen on server (not app)
server.listen(PORT, () => {
  console.log(`🚀 Server started → http://localhost:${PORT}`);
});