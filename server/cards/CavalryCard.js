const Card = require('./Card');
const CavalryUnit = require('../units/CavalryUnit')

const cost = 4;

module.exports = class BowmanCard extends Card {
  constructor() {
    super(CavalryUnit.stats, cost);
  }

  static get UnitClass() {
    return CavalryUnit;
  }
}
