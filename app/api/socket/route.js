import { Server } from 'socket.io';

let io; // Declare a global variable for the Socket.IO instance

const SocketHandler = (req, res) => {
  if (!io) { // Initialize only if not already initialized
    console.log('Initializing Socket.IO server...');
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle message reception and broadcasting
      socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message); // Broadcast message to all clients
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  res.end(); // End the request, no need to send a response body
};

export const GET = SocketHandler;
