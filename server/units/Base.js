const Unit = require('./Unit');

module.exports = class Base extends Unit {
  constructor(battle, playerNum, q, r) {
    super('Base', 20, 0, battle, playerNum, q, r);
  }

  // Cannot attack
  canAttack(q, r) {
    return false;
  }
}
