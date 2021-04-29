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
  'Calvary': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) <= 1;
  },
}

export default CanAttackTarget;
