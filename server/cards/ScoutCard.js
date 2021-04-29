const Card = require('./Card');
const ScoutUnit = require('../units/ScoutUnit')

const cost = 2;

module.exports = class ScoutCard extends Card {
  constructor() {
    super(ScoutUnit.stats, cost);
  }

  static get UnitClass() {
    return ScoutUnit;
  }
}
