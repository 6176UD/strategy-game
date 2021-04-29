const Card = require('./Card');
const GoblinUnit = require('../units/GoblinUnit')

const cost = 2;

module.exports = class GoblinCard extends Card {
  constructor() {
    super(GoblinUnit.stats, cost);
  }

  static get UnitClass() {
    return GoblinUnit;
  }
}
