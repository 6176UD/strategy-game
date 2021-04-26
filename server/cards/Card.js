module.exports = class Card {
  constructor(stats, cost) {
    Object.assign(this, stats);
    this.cost = cost;
  }
}
