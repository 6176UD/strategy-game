const Card = require('./Card');
const FootsoldierUnit = require('../units/FootsoldierUnit')

const cost = 3;

module.exports = class FootsoldierCard extends Card {
  constructor() {
    super(FootsoldierUnit.stats, cost);
  }

  static get UnitClass() {
    return FootsoldierUnit;
  }
}
