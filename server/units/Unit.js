class Unit extends Tile {
  constructor(name, health, movesPerTurn, roomKey, player, q, r) {
    this.name = name;
    this.health = health;
    this.movesPerTurn = movesPerTurn;
    this.moves = 0;
    this.roomKey = roomKey;
    this.player = player;
    this.q = q;
    this.r = r;
  }

  takeDamage(dmg) {
    this.health -= dmg;
  }
}
