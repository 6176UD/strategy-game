const Unit = require('./Unit');

const stats = {
  name: 'Base',
  maxHealth: 20,
  movesPerTurn: 0,
  canAttack: false
}

module.exports = class Base extends Unit {
  constructor(battle, playerNum, q, r) {
    super(stats, battle, playerNum, q, r);
  }

  static get stats() {
    return stats;
  }
}
