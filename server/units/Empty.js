const Unit = require('./Unit');

module.exports = class Empty extends Unit {
  constructor(battle, q, r) {
    super('Empty', 0, 0, false, battle, 0, q, r);
  }

  // Does not take damage
  takeDamage(dmg) {}
}
