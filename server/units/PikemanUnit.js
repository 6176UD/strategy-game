const Unit = require('./Unit');
const Hex = require('../Hex');

const stats = {
  name: 'Pikeman',
  maxHealth: 7,
  movesPerTurn: 3,
  canAttack: true
}

module.exports = class BowmanUnit extends Unit {
  constructor(battle, playerNum, q, r) {
    super(stats, battle, playerNum, q, r);
  }

  static get stats() {
    return stats;
  }

  canAttackTarget(q, r) {
    return Hex.dist(this.q, this.r, q, r) <= 2;
  }

  attack(q, r) {
    this.battle.dealDamage(q, r, 5);
  }
}
