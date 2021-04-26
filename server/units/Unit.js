module.exports = class Unit {
  constructor(stats, battle, playerNum, q, r) {
    Object.assign(this, stats);
    this.health = this.maxHealth;
    this.moves = 0;
    this.canAttackThisTurn = false;
    this.battle = battle;
    this.playerNum = playerNum;  // One of { 0, 1, 2 }
    this.q = q;
    this.r = r;
  }
}
