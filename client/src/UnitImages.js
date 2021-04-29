// ! FIXME: move this to a better place
import basePlayerImg from './img/base-player.png';
import baseEnemyImg from './img/base-enemy.png';
import peasantPlayerImg from './img/peasant-player.png';
import peasantEnemyImg from './img/peasant-enemy.png';
import scoutPlayerImg from './img/scout-player.png';
import scoutEnemyImg from './img/scout-enemy.png';
import footsoldierPlayerImg from './img/footsoldier-player.png';
import footsoldierEnemyImg from './img/footsoldier-enemy.png';

const UnitImages = {
  // Owns
  true: {
    'Base': basePlayerImg,
    'Peasant': peasantPlayerImg,
    'Scout': scoutPlayerImg,
    'Footsoldier': footsoldierPlayerImg
  },
  // Does not own
  false: {
    'Empty': null,
    'Base': baseEnemyImg,
    'Peasant': peasantEnemyImg,
    'Scout': scoutEnemyImg,
    'Footsoldier': footsoldierEnemyImg
  }
}

export default UnitImages;
