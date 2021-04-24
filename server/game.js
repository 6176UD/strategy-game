const roomKeys = {}
const rooms = {}

/*
 * Add player to room.
 * Return false if room is full.
*/
exports.addPlayer = (socket, roomKey) => {
  if (roomKey in rooms) {
    if (rooms[roomKey].status == 'open') {
      // Room already has one player; begin game
      rooms[roomKey].status = 'draft';
    } else {
      return false;  // Room is full
    }
  } else {
      // Room has no players; initialize it
      rooms[roomKey] = {
        'players': {},
        'status': 'open'
      }
  }
  // Add player to room
  const room = rooms[roomKey];
  roomKeys[socket.id] = roomKey;
  room.players[socket.id] = {
    'socket': socket
  };
  for (const player of Object.values(room.players)) {
    player.socket.emit('room-status', room.status);
  }
  return true; // Successfully joined room
};

/*
 * Removes player from any rooms they're in.
*/
exports.removePlayer = socket => {
  // If player is not in room, nothing to do
  if (!(socket.id in roomKeys)) return;

  // Delete player
  const roomKey = roomKeys[socket.id];
  const room = rooms[roomKey];
  delete room.players[socket.id];

  if (room.status === 'open') {
    // Only player in room left; delete room
    delete rooms[roomKey];
  } else {
    // Room is now open to join
    // Update room status for other player
    room.status = 'open';
    for (const player of Object.values(room.players)) {
      player.socket.emit('room-status', room.status);
    }
  }
  delete roomKeys[socket.id];

  // ! DEBUGGING
  // if (roomKey in rooms) {
  //   for (const x of Object.entries(rooms[roomKey])) {
  //     console.log(x);
  //   }
  // }
}

exports.rooms = rooms;
