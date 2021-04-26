// ! FIXME: move this to a better place
import emptyImg from './img/empty.png';
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
    'Empty': emptyImg,
    'Base': baseEnemyImg,
    'Peasant': peasantEnemyImg
  }
}

export default UnitImages;
