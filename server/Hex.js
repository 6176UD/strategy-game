module.exports = class Hex {
  // Distance between (q1, r1) and (q2, r2)
  static dist(q1, r1, q2, r2) {
    return (abs(q1 - q2) + abs(q1 + r1 - q2 - r2) + abs(r1 - r2)) / 2;
  }
}
