import Hex from './Hex';

// Functions take in unit rather than unit coordinates in case Aidan wants to add Bard
const CanAttackTarget = {
  'Peasant': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Scout': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
  'Footsoldier': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  }
}

export default CanAttackTarget;