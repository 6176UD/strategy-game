const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const game = require('./game.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  // !FIXME TEMPORARY
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 4001;
app.set('port', port);

app.use(express.static(path.resolve(__dirname, '../client')));

io.on('connection', async socket => {
  console.info('New client connected');
  console.info('Connection:', socket.request.connection._peername);

  socket.on('join', async data => {
    const roomKey = data.roomKey.toString();
    if (roomKey.length > 20) {
      // This person is trying to hack room keys >:(
      console.warn('ATTENTION: Scummy person detected!');
      return;
    }
    if (!game.addPlayer(socket, roomKey)) {
      console.info(`A player tried to join room "${roomKey}" but it was full!`)
      socket.emit('room-full');
      return;  // Room is full
    }
    console.info(`A player joined room "${roomKey}"`);

    socket.on('action', data => {
      // TODO: handle player action
    });
  });

  socket.on('disconnect', () => {
    game.removePlayer(socket);
    console.info('Client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));