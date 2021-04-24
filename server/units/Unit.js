module.exports = class Unit {
  constructor(name, health, movesPerTurn, canAttack, battle, playerNum, q, r) {
    this.name = name;
    this.health = health;
    this.movesPerTurn = movesPerTurn;
    this.moves = 0;
    this.canAttack = canAttack;
    this.canAttackThisTurn = false;
    this.battle = battle;
    this.playerNum = playerNum;  // One of { 0, 1, 2 }
    this.q = q;
    this.r = r;
  }

  // Moves the unit to q, r
  move(q, r) {
    this.q = q;
    this.r = r;
  }

  resetMoves() {
    this.moves = this.movesPerTurn;
  }

  resetAttack() {
    this.canAttackThisTurn = this.canAttack;
  }

  takeDamage(dmg) {
    this.health -= dmg;
  }
}
