const Card = require('./Card');
const PeasantUnit = require('../units/PeasantUnit')

const cost = 1;

module.exports = class PeasantCard extends Card {
  constructor() {
    super(PeasantUnit.stats, cost);
  }

  static get UnitClass() {
    return PeasantUnit;
  }
}
