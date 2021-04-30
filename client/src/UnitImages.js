// ! FIXME: move this to a better place
import basePlayerImg from './img/base-player.png';
import baseEnemyImg from './img/base-enemy.png';
import peasantPlayerImg from './img/peasant-player.png';
import peasantEnemyImg from './img/peasant-enemy.png';
import scoutPlayerImg from './img/scout-player.png';
import scoutEnemyImg from './img/scout-enemy.png';
import goblinPlayerImg from './img/goblin-player.png';
import goblinEnemyImg from './img/goblin-enemy.png';
import footsoldierPlayerImg from './img/footsoldier-player.png';
import footsoldierEnemyImg from './img/footsoldier-enemy.png';
import bowmanPlayerImg from './img/bowman-player.png';
import bowmanEnemyImg from './img/bowman-enemy.png';
import pikemanPlayerImg from './img/pikeman-player.png';
import pikemanEnemyImg from './img/pikeman-enemy.png';
import cavalryPlayerImg from './img/cavalry-player.png';
import cavalryEnemyImg from './img/cavalry-enemy.png';

const UnitImages = {
  // Owns
  true: {
    'Base': basePlayerImg,
    'Peasant': peasantPlayerImg,
    'Scout': scoutPlayerImg,
    'Goblin': goblinPlayerImg,
    'Footsoldier': footsoldierPlayerImg,
    'Bowman': bowmanPlayerImg,
    'Pikeman': pikemanPlayerImg,
    'Cavalry': cavalryPlayerImg
  },
  // Does not own
  false: {
    'Empty': null,
    'Base': baseEnemyImg,
    'Peasant': peasantEnemyImg,
    'Scout': scoutEnemyImg,
    'Goblin': goblinEnemyImg,
    'Footsoldier': footsoldierEnemyImg,
    'Bowman': bowmanEnemyImg,
    'Pikeman': pikemanEnemyImg,
    'Cavalry': cavalryEnemyImg
  }
}

export default UnitImages;
