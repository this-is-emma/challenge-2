const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //Homeword point 1 - Emit new message on new user connects and disconnects:
  console.log('a user connected');
  socket.broadcast.emit('chat message', 'A new user joined the chat');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', 'A user has left the chat');
  });


  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
