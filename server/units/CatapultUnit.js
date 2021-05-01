const Unit = require('./Unit');
const Hex = require('../Hex');

const stats = {
  name: 'Catapult',
  maxHealth: 10,
  movesPerTurn: 1,
  canAttack: true
}

module.exports = class CatapultUnit extends Unit {
  constructor(battle, playerNum, q, r) {
    super(stats, battle, playerNum, q, r);
  }

  static get stats() {
    return stats;
  }

  canAttackTarget(q, r) {
    const d = Hex.dist(this.q, this.r, q, r);
    return 3 <= d && d <= 4;
  }

  attack(q, r) {
    this.battle.dealDamage(q, r, 6);
    for (const [qadj, radj] of Hex.neighbours(q, r)) {
      this.battle.dealDamage(qadj, radj, 4);
    }
  }
}
