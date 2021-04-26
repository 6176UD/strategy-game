module.exports = class Unit {
  constructor(name, maxHealth, movesPerTurn, canAttack, battle, playerNum, q, r) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.movesPerTurn = movesPerTurn;
    this.moves = 0;
    this.canAttack = canAttack;
    this.canAttackThisTurn = false;
    this.battle = battle;
    this.playerNum = playerNum;  // One of { 0, 1, 2 }
    this.q = q;
    this.r = r;
  }
}
