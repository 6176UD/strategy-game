const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const game = require('./game.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 4001;
app.set('port', port);

app.use(express.static(path.resolve(__dirname, '../client')));

let interval;
io.on('connection', async socket => {
  console.info('New client connected');
  console.info('Connection:', socket.request.connection._peername);

  socket.on('join', async data => {
    // TODO: Handle player join
    // const name = data.name.toString();
    // console.log(name);

    // game.addPlayer(socket, name);
    // console.info(`${name} joined!`);

    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => game.update(socket), 1000 / 10);

    socket.on('input', data => {
      game.setInput(socket, data);
    });
  });

  socket.on('disconnect', () => {

    // TODO: Handle player disconnect
    
    // game.removePlayer(socket);
    console.info('Client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
