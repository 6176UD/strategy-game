const Card = require('./Card');
const PikemanUnit = require('../units/PikemanUnit')

const cost = 3;

module.exports = class PikemanCard extends Card {
  constructor() {
    super(PikemanUnit.stats, cost);
  }

  static get UnitClass() {
    return PikemanUnit;
  }
}
