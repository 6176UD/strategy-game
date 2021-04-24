import React, { Component } from 'react';
import Unit from './Unit';
import Selector from './Selector';

// Import tile images
import emptyImg from '../img/empty.png';
import basePlayerImg from '../img/base-player.png';
import baseEnemyImg from '../img/base-enemy.png';

const NAME_TO_IMG = {
  // Owns
  true: {
    'Base': basePlayerImg
  },
  // Does not own
  false: {
    'Empty': emptyImg,
    'Base': baseEnemyImg,
  },
}

// ! FIXME TEMPORARY
const MAP_RADIUS = 7;

// Handles client-side battle logic.
class Battle extends Component {
  constructor() {
    super();
    // Mirror server by initalizing grid as empty units
    const grid = {};
    for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
      grid[q] = {};
      let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
      let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
      for (let r = r1; r <= r2; r++) {
        grid[q][r] = <Unit
          key = {[q, r]}
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
    this.state = {
      grid: grid,
      sel: false,
      action: 'sel'
    }

    // Bind functions
    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.handleUnitClick = this.handleUnitClick.bind(this);
  }

  // ! FIXME: Messy, slow, and non-reacty
  handleUnitUpdate(unit) {
    const img = NAME_TO_IMG[unit.owns][unit.name];
    console.log(this);
    const grid = this.state.grid;
    grid[unit.q][unit.r] = <Unit
      q={unit.q} r={unit.r}
      name={unit.name}
      health={unit.health}
      moves={unit.moves}
      owns={unit.owns}
      img={img}
      battleRef={this}
    />
    this.setState({ grid: grid });
  }

  handleUnitClick(q, r) {
    console.log(this);
    switch (this.state.action) {
      case 'sel':
        this.setState({
          sel: true,
          selq: q,
          selr: r
        });
        break;
      case 'move':
        break;
      case 'attack':
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
    if (this.state) {
      for (const [q, row] of Object.entries(this.state.grid)) {
        for (const [r, unit] of Object.entries(row)) {
          units.push(unit);
        }
      }
      console.log(this.state.sel);
      if (this.state.sel) {
        units.push(<Selector
          key='selector'
          q={this.state.selq} r={this.state.selr}
        />);
      }
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
