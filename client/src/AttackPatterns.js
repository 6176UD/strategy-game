import Hex from './Hex';

// Functions take in unit rather than unit coordinates in case Aidan wants to add Bard
const CanAttackTarget = {
  'Peasant': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Scout': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Goblin': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Footsoldier': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Bowman': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 4;
  },
  'Pikeman': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 2;
  },
  'Cavalry': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Catapult': (unit, q, r) => {
    const d = Hex.dist(unit.props.q, unit.props.r, q, r);
    return 3 <= d && d <= 4;
  }
}

export default CanAttackTarget;
