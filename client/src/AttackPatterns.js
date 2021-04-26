import Hex from './Hex';

const CanAttackTarget = {
  'Peasant': (unit, q, r) => {
    return Hex.dist(unit.props.q, unit.props.r, q, r) === 1;
  }
}

export default CanAttackTarget;