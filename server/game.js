const MAP_RADIUS = 4;
const roomKeys = {}
const rooms = {}

/*
 * Add player to room.
 * Return false if room is full.
*/
exports.addPlayer = (socket, roomKey) => {
  let reversed = false;
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

exports.startBattle = roomKey => {
  const room = rooms[roomKey];
  room.status = 'battle';
  room.grid = {};
  for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
    room.grid.q = {};
    let r1 = max(-MAP_RADIUS, -q - MAP_RADIUS);
    let r2 = min(MAP_RADIUS, -q + MAP_RADIUS);
    for (let r = r1; r <= r2; r++) {
      // ! FIXME
      room.grid.q.r = Empty(roomKey, 'none lmao', q, r);
    }
  }

  // Send update to players in room
  for (const player of Object.values(room.players)) {
    player.socket.emit('room-status', room.status);
    player.socket.emit('unit', {
      'q': 0, // ! FIXME what is edge of grid
      'r': 0, // ! FIXME what is edge of grid
      'name': 'player-base',
      'health': 0, // ! FIXME
      'reversed': player.reversed
    });
  }
}

// FIXME this should be in its own room class, but too lazy rn
exports.dealDamage = (roomKey, q, r, dmg) => {
  const room = rooms[roomKey];
  if (q in room.grid && r in room.grid[q][r]) {
    room.grid[q][r].takeDamage(dmg);
    if (room.grid[q][r].health < 1) {
      room.grid = new Empty(roomKey, 'none lmao', q, r);
    }
    for (const entry of Object.entries(room.players)) {
      socket.emit('unit', {
        'q': q,
        'r': r,
        'name': grid[q][r].name,
        'health': grid[q][r].health,
        'movesPerTurn': grid[q][r].movesPerTurn,
        'moves': grid[q][r].moves,
        'owns': grid[q][r].player === entry[0],
        'reversed': entry[1].reversed
      });
    }
  }
}
