import React, { Component } from 'react';
import Unit from './Unit';
import Selector from './Selector';
import InfoMenu from './InfoMenu';

// Import tile images
import emptyImg from '../img/empty.png';
import basePlayerImg from '../img/base-player.png';
import baseEnemyImg from '../img/base-enemy.png';
import peasantPlayerImg from '../img/peasant-player.png';
import peasantEnemyImg from '../img/peasant-enemy.png';

const NAME_TO_IMG = {
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
      turn: false,
      action: 'sel'
    }

    // Bind functions
    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.handleUnitClick = this.handleUnitClick.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);
  }

  handleUnitUpdate(unit) {
    const img = NAME_TO_IMG[unit.owns][unit.name];
    this.setState(prevState => {
      const grid = Object.assign({}, prevState.grid);
      grid[unit.q][unit.r] = <Unit
        q={unit.q} r={unit.r}
        name={unit.name}
        health={unit.health}
        moves={unit.moves}
        owns={unit.owns}
        img={img}
        battleRef={this}
      />
      return { grid };
    })
  }

  handleUnitClick(q, r) {
    switch (this.state.action) {
      case 'sel':
        this.setState({
          sel: true,
          selq: q, selr: r
        });
        break;
      case 'move':
        // Emit move, then deselect
        this.props.socket.emit('move', {
          q1: this.state.selq, r1: this.state.selr,
          q2: q, r2: r
        });
        this.setState({
          sel: false,
          action: 'sel'
        });
        break;
      case 'attack':
        break;
      default: break;
    }
  }

  handleMoveClick() {
    this.setState({ action: 'move' });
  }

  componentDidMount() {
    this.props.socket.on('unit-update', data => {
      console.log(data);
      this.handleUnitUpdate(data);
    });
    this.props.socket.on('turn-update', b => {
      this.setState({ turn: b });
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
        <p>Battle Zone! (WIP)</p>
        <p>{this.state.turn ? 'Your' : "Opponent's"} Turn</p>
        {units}
        {this.state.sel &&
        <InfoMenu
          unit={this.state.grid[this.state.selq][this.state.selr]}
          turn={this.state.turn}
          battleRef={this}
        />}
      </div>
    );
  }
}

export default Battle;
