const Unit = require('./Unit');

module.exports = class Empty extends Unit {
  constructor(battle, q, r) {
    super('Empty', 1, 0, battle, 0, q, r);
  }

  // Cannot attack
  canAttack(q, r) {
    return false;
  }

  // Does not take damage
  takeDamage(dmg) {}
}
