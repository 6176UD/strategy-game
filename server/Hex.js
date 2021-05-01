module.exports = class Hex {
  // Distance between (q1, r1) and (q2, r2)
  static dist(q1, r1, q2, r2) {
    return (Math.abs(q1 - q2) + Math.abs(q1 + r1 - q2 - r2) + Math.abs(r1 - r2)) / 2;
  }
  
  // Return all neighbouring tiles to q, r
  static neighbours(q, r) {
    return [[q + 1, r], [q, r + 1], [q - 1, r], [q, r - 1], [q + 1, r - 1], [q - 1, r + 1]];
  }
}
