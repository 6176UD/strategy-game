const MAP_RADIUS = 7;

// Import units
const Unit = require('./units/Unit');
const Empty = require('./units/Empty');
const Base = require('./units/Base');
const Peasant = require('./units/Peasant');

module.exports = class Battle {
  constructor(room) {
    this.room = room;
    // Build hex grid of empty tiles
    this.grid = {};
    for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
      this.grid[q] = {};
      let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
      let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
      for (let r = r1; r <= r2; r++) {
        this.grid[q][r] = new Empty(this, q, r);
      }
    }

    // Init player bases
    this.grid[0][MAP_RADIUS] = new Base(this, 1, 0, MAP_RADIUS);
    this.emitUnitUpdate(this.grid[0][MAP_RADIUS]);
    this.grid[0][-MAP_RADIUS] = new Base(this, 2, 0, -MAP_RADIUS);
    this.emitUnitUpdate(this.grid[0][-MAP_RADIUS]);
  }

  // Sends update to players in room that a unit on a tile has been updated
  emitUnitUpdate(unit) {
    for (const player of Object.values(this.room.players)) {
      let q = unit.q, r = unit.r;
      // Rotate grid 180 degrees for player 2
      if (player.num == 2) {
        q = -q;
        r = -r;
      }
      player.socket.emit('unit-update', {
        'q': q,
        'r': r,
        'name': unit.name,
        'health': unit.health,
        'moves': unit.moves,
        'owns': player.num === unit.playerNum
      });
    }
  }

  // Called by units when they attack
  dealDamage(q, r, dmg) {
    if (q in this.grid && r in this.grid[q]) {
      if (room.grid[q][r].name == 'Empty') return;
      room.grid[q][r].takeDamage(dmg);
      if (room.grid[q][r].health < 1) {
        room.grid[q][r] = new Empty(this, q, r);
      }
      this.emitUnitUpdate(room.grid[q][r])
    }
  }
}
