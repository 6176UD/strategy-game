const Unit = require('./Unit');
const Hex = require('../Hex');

const stats = {
  name: 'Calvary',
  maxHealth: 10,
  movesPerTurn: 4,
  canAttack: true
}

module.exports = class CalvaryUnit extends Unit {
  constructor(battle, playerNum, q, r) {
    super(stats, battle, playerNum, q, r);
  }

  static get stats() {
    return stats;
  }

  canAttackTarget(q, r) {
    return Hex.dist(this.q, this.r, q, r) <= 1;
  }

  attack(q, r) {
    this.battle.dealDamage(q, r, 6);
  }
}
