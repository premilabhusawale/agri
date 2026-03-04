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

const PORT = Number(process.env.PORT) || 8585;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

chatSocket(io);
chatbotSocket(io);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} in use, retrying on ${PORT + 1}...`);
    server.listen(PORT + 1);
  }
});

server.listen(PORT, () => {
  console.log(`Server started → http://localhost:${server.address().port}`);
});