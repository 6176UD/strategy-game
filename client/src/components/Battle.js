import React, { Component } from 'react';
import Unit from './Unit';
import Selector from './Selector';

// Import tile images
import emptyImg from '../img/empty.png';
import basePlayerImg from '../img/base-player.png';
import selectorImg from '../img/selector.png';

const NAME_TO_IMG = {
  // Owns
  true: {
    'Base': basePlayerImg
  },
  // Does not own
  false: {
    'Empty': emptyImg,
    'Base': basePlayerImg,
  },
}

// ! FIXME TEMPORARY
const MAP_RADIUS = 7;

// Handles client-side battle logic.
class Battle extends Component {
  constructor() {
    super();
    // Mirror server by initalizing grid as empty units
    this.grid = {};
    for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
      this.grid[q] = {};
      let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
      let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
      for (let r = r1; r <= r2; r++) {
        this.grid[q][r] = <Unit
          q={q} r={r}
          name='Empty'
          health=''
          moves={0}
          owns={false}
          img={emptyImg}
          battleRef={this}
        />;
      }
    }
    // Init with no selected unit
    this.sel = false;
    this.action = 'sel';
  }

  handleUnitUpdate(unit) {
    console.log(unit.owns);
    const img = NAME_TO_IMG[unit.owns][unit.name];
    this.grid[unit.q][unit.r] = <Unit
      q={unit.q} r={unit.r}
      name={unit.name}
      health={unit.health}
      moves={unit.moves}
      owns={unit.owns}
      img={img}
      battleRef={this}
    />
  }

  handleUnitClick(q, r) {
    switch (this.action) {
      case 'sel':
        this.sel = true;
        this.selq = q;
        this.selr = r;
        break;
      case 'move':
        this.sel = false;
        break;
      case 'attack':
        this.sel = false;
        break;
      default: break;
    }
  }

  componentDidMount() {
    this.props.socket.on('unit-update', data => {
      console.log(data);
      this.handleUnitUpdate(data);
    });
  }

  render() {
    const units = [];
    for (const [q, row] of Object.entries(this.grid)) {
      for (const [r, unit] of Object.entries(row)) {
        units.push(unit);
      }
    }
    if (this.sel) {
      units.push(<Selector
        q={this.selq} r={this.selr}
        img={selectorImg}
      />);
    }
    return (
      <div>
        {/* TODO */}
        <p>Battle Zone! (WIP)</p>
        {units}
      </div>
    );
  }
}

export default Battle;
