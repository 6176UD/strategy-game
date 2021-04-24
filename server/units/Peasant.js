const Unit = require('./Unit');
const Hex = require('../Hex');

module.exports = class Peasant extends Unit {
  constructor(battle, playerNum, q, r) {
    super('Peasant', 3, 1, battle, playerNum, q, r);
  }

  // Melee unit
  canAttack(q, r) {
    return Hex.dist(this.q, this.r, q, r) == 1;
  }

  // Attacks targeting the tile (q, r);
  attack(q, r) {
    battle.dealDamage(q, r, 2);
  }
}
