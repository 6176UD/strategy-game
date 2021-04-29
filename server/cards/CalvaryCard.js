const Card = require('./Card');
const CalvaryUnit = require('../units/CalvaryUnit')

const cost = 4;

module.exports = class BowmanCard extends Card {
  constructor() {
    super(CalvaryUnit.stats, cost);
  }

  static get UnitClass() {
    return CalvaryUnit;
  }
}
