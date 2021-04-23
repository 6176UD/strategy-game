// This is where all your game logic is

exports.addPlayer = (socket, name) => {

  // TODO: Handle player join

  socket.emit('joined');
};

exports.removePlayer = socket => {
  
  // TODO: Handle player disconnect

}

exports.update = socket => {
  
  // TODO: Update game state

  const data = {
    // Init data here
  };

  // Populate data with game information the client needs to know

  socket.emit('update', data);
}