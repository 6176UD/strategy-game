import React, { Component } from 'react';
import Unit from './Unit';
import UnitSelector from './UnitSelector';
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
          battle={this}
        />;
      }
    }
    this.state = {
      grid: grid,
      unitSel: false,
      cardSel: false,
      turn: false,
      action: 'sel'
    }

    // Bind functions
    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.handleUnitClick = this.handleUnitClick.bind(this);
    this.handleEndTurnClick = this.handleEndTurnClick.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleSummonClick = this.handleSummonClick.bind(this);
  }

  handleUnitUpdate(unit) {
    const img = NAME_TO_IMG[unit.owns][unit.name];
    this.setState(prevState => {
      const grid = Object.assign({}, prevState.grid);
      grid[unit.q][unit.r] = <Unit
        q={unit.q} r={unit.r}
        name={unit.name}
        health={unit.health}
        movesPerTurn={unit.movesPerTurn}
        moves={unit.moves}
        canAttack={unit.canAttack}
        canAttackThisTurn={unit.canAttackThisTurn}
        owns={unit.owns}
        img={img}
        battle={this}
      />
      return { grid };
    })
  }

  handleUnitClick(q, r) {
    switch (this.state.action) {
      case 'sel':
        this.setState({
          unitSel: { q: q, r: r },
          cardSel: null,
        });
        break;
      case 'move':
        // Emit move, then deselect
        this.props.socket.emit('move', {
          q1: this.state.unitSel.q, r1: this.state.unitSel.r,
          q2: q, r2: r
        });
        this.setState({
          unitSel: null,
          action: 'sel'
        });
        break;
      case 'attack':
        // Emit attack, then deselect
        this.props.socket.emit('attack', {
          q1: this.state.unitSel.q, r1: this.state.unitSel.r,
          q2: q, r2: r
        });
        this.setState({
          unitSel: null,
          action: 'sel'
        });
        break;
      case 'summon':
        this.props.socket.emit('summon', {
          cardNum: this.state.cardSel,
          q 
        });
        break;
      default: break;
    }
  }

  handleEndTurnClick() {
    this.props.socket.emit('end-turn');
  }

  handleMoveClick() {
    this.setState({ action: 'move' });
  }

  handleAttackClick() {
    this.setState({ action: 'attack' });
  }

  handleCardClick(cardNum) {
    this.setState({
      unitSel: false,
      cardSel: cardNum
    });
  }

  handleSummonClick() {
    this.setState({ action: 'summon' });
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
      if (this.state.unitSel) {
        units.push(<UnitSelector
          key='unit-selector'
          q={this.state.unitSel.q} r={this.state.unitSel.r}
        />);
      }
    }
    return (
      <div>
        <p>Battle Zone! (WIP)</p>
        <p>{this.state.turn ? 'Your' : "Opponent's"} Turn</p>
        {this.state.turn && <button onClick={this.handleEndTurnClick}>End Turn</button>}
        {units}
        {this.state.unitSel &&
        <InfoMenu
          unit={this.state.grid[this.state.unitSel.q][this.state.unitSel.r]}
          turn={this.state.turn}
          battle={this}
        />}
      </div>
    );
  }
}

export default Battle;
