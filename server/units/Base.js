const Unit = require('./Unit');

module.exports = class Base extends Unit {
  constructor(battle, playerNum, q, r) {
    super('Base', 20, 0, false, battle, playerNum, q, r);
  }
}
