// ! FIXME: move this to a better place
import basePlayerImg from './img/base-player.png';
import baseEnemyImg from './img/base-enemy.png';
import peasantPlayerImg from './img/peasant-player.png';
import peasantEnemyImg from './img/peasant-enemy.png';

const UnitImages = {
  // Owns
  true: {
    'Base': basePlayerImg,
    'Peasant': peasantPlayerImg
  },
  // Does not own
  false: {
    'Empty': null,
    'Base': baseEnemyImg,
    'Peasant': peasantEnemyImg
  }
}

export default UnitImages;
