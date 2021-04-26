const Card = require('./Card');
const { stats } = require('../units/PeasantUnit')

const cost = 1;

module.exports = class PeasantCard extends Card {
  constructor() {
    super(stats, cost);
  }
}
