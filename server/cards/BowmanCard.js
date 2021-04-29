const Card = require('./Card');
const BowmanUnit = require('../units/BowmanUnit')

const cost = 3;

module.exports = class BowmanCard extends Card {
  constructor() {
    super(BowmanUnit.stats, cost);
  }

  static get UnitClass() {
    return BowmanUnit;
  }
}
