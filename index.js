// setup express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// setup socket.io
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`user ${socket.id} is connected!`);

  socket.on('message', data => {
    socket.broadcast.emit('message:chat', data)
  })

  socket.on('typing', data => {
    socket.broadcast.emit('message:typing', data)
  })

  socket.on('stopTyping', data => {
    socket.broadcast.emit('message:stopTyping', data)
  })

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} has left!`)
  })
});

server.listen(3000, () => {
  console.log('listening on 3000');
});