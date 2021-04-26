const Unit = require('./Unit');

const stats = {
  name: 'Empty',
  maxHealth: 0,
  movesPerTurn: 0,
  canAttack: false
}

module.exports = class EmptyUnit extends Unit {
  constructor(battle, q, r) {
    super(stats, battle, 0, q, r);
  }

  static get stats() {
    return stats;
  }
}
