class Empty extends Unit {
  constructor(roomKey, player, q, r) {
    super('Empty', 1, roomKey, player, q, r);
  }

  // Cannot attack
  canAttack(q, r) {
    return false;
  }

  attack(q, r) {
    return;
  }

  takeDamage(dmg) {
  }
}