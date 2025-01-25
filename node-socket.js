const { io } = require('socket.io-client');

const socket = io('https://sio.zeenopay.com/chat', { transports: ['websocket'] });

socket.on('connect', () => {
  socket.emit("message", { message: "Hello, world!" });
  console.log('Connected to the server');
});

socket.on('notif', (message) => {
  console.log('Received message:', message);
});

socket.on('message', (message) => {
  console.log('Received message:', message);
});

socket.onAny((event, ...args) => {
  console.log(`Received event: ${event}, args:`, args);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
