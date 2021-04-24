const MAP_RADIUS = 7;

// Helper class for hexagon math
const Hex = require('./Hex');

// Import units
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
    this.grid[0][MAP_RADIUS - 1] = new Base(this, 1, 0, MAP_RADIUS - 1);
    this.emitUnitUpdate(this.grid[0][MAP_RADIUS - 1]);
    this.grid[0][-MAP_RADIUS + 1] = new Base(this, 2, 0, -MAP_RADIUS + 1);
    this.emitUnitUpdate(this.grid[0][-MAP_RADIUS + 1]);

    // ! TESTING peasants
    this.grid[0][MAP_RADIUS - 2] = new Peasant(this, 1, 0, MAP_RADIUS - 2);
    this.grid[0][-MAP_RADIUS + 2] = new Peasant(this, 2, 0, -MAP_RADIUS + 2);
    this.grid[0][MAP_RADIUS - 2].resetMoves();
    this.grid[0][-MAP_RADIUS + 2].resetMoves();
    console.log(this.grid[0][MAP_RADIUS - 2].moves);
    this.emitUnitUpdate(this.grid[0][MAP_RADIUS - 2]);
    this.emitUnitUpdate(this.grid[0][-MAP_RADIUS + 2]);

    // Player 1's turn
    this.turn = 1;
    this.emitTurnUpdate(1);

    // Listen for input from players
    for (const player of Object.values(this.room.players)) {
      player.socket.on('move', data => {
        if (!('q1' in data) || !('r1' in data) || !('q2' in data) || !('r2' in data)) return;
        this.handleMove(player.num, data.q1, data.r1, data.q2, data.r2)
      });
    }
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

  // Emits that it is now player x's turn
  emitTurnUpdate(x) {
    for (const player of Object.values(this.room.players)) {
      player.socket.emit('turn-update', player.num == x);
    }
  }

  // Called by units when they attack
  dealDamage(q, r, dmg) {
    if (q in this.grid && r in this.grid[q]) {
      if (this.grid[q][r].name == 'Empty') return;
      this.grid[q][r].takeDamage(dmg);
      if (this.grid[q][r].health < 1) {
        this.grid[q][r] = new Empty(this, q, r);
      }
      this.emitUnitUpdate(this.grid[q][r])
    }
  }

  // Called when client moves a unit
  // ! FIXME just handling a lot of stuff instead of in the class because no time
  handleMove(playerNum, q1, r1, q2, r2) {
    if (!(q1 in this.grid) || !(r1 in this.grid[q1])
      || !(q2 in this.grid) || !(r2 in this.grid[q2])) return;
    
    if (playerNum == 2) {
      q1 = -q1, r1 = -r2, q2 = -q2, r2 = -r2;
    }
    if (this.grid[q2][r2].name != 'Empty'
      || this.turn != playerNum
      || this.grid[q1][r1].playerNum != playerNum
      || Hex.dist(q1, r1, q2, r2) > this.grid[q1][r1].moves) return;

    const unit = this.grid[q1][r1];
    unit.q = q2, unit.r = r2;
    unit.move -= Hex.dist(q1, r1, q2, r2);
    this.grid[q1][r1] = new Empty(this, q1, r1);
    this.grid[q2][r2] = unit;
    this.emitUnitUpdate(this.grid[q1][r1]);
    this.emitUnitUpdate(this.grid[q2][r2]);

    // ! TESTING: auto pass turn after move
    this.handlePassTurn();
  }

  // Just testing right now. Will be called when client passes turn.
  handlePassTurn() {
    this.turn = (this.turn % 2) + 1;
    this.emitTurnUpdate(this.turn);

    for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
      let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
      let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
      for (let r = r1; r <= r2; r++) {
        if (this.grid[q][r].playerNum == this.turn) {
          this.grid[q][r].resetMoves();
          // ! FIXME: this should just be mirrored by the frontend to reduce emits
          this.emitUnitUpdate(this.grid[q][r]);
        }
      }
    }
  }
}
