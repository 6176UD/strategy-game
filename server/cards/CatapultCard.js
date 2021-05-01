const Card = require('./Card');
const CatapultUnit = require('../units/CatapultUnit')

const cost = 8;

module.exports = class CatapultCard extends Card {
  constructor() {
    super(CatapultUnit.stats, cost);
  }

  static get UnitClass() {
    return CatapultUnit;
  }
}
