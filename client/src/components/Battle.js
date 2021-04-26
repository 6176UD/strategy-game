import React, { Component } from 'react';

import Unit from './Unit';
import UnitSelector from './UnitSelector';
import InfoMenu from './InfoMenu';

import Hex from '../Hex';
import UnitImages from '../UnitImages';
import CanAttackTarget from '../AttackPatterns';

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
          key={[q, r]}
          name='Empty'
          q={q} r={r}
          battle={this}
        />;
      }
    }
    this.state = {
      grid: grid,
      unitSel: null,
      cardSel: null,
      turn: false,
      action: 'sel'
    }

    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.handleTurnUpdate = this.handleTurnUpdate.bind(this);
    this.handleUnitSelect = this.handleUnitSelect.bind(this);
    this.handleUnitMove = this.handleUnitMove.bind(this);
    this.handleUnitAttack = this.handleUnitAttack.bind(this);
    this.handleUnitSummon = this.handleUnitSummon.bind(this);
    this.handleUnitClick = this.handleUnitClick.bind(this);
    this.handleEndTurnClick = this.handleEndTurnClick.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleSummonClick = this.handleSummonClick.bind(this);
  }

  // Server update handling
  // ==================================================================================

  handleUnitUpdate(unit) {
    this.setState(prevState => {
      const grid = Object.assign({}, prevState.grid);
      grid[unit.q][unit.r] = <Unit
        key={[unit.q, unit.r]}
        q={unit.q} r={unit.r}
        name={unit.name}
        health={unit.health}
        maxHealth={unit.maxHealth}
        movesPerTurn={unit.movesPerTurn}
        moves={unit.moves}
        canAttack={unit.canAttack}
        canAttackThisTurn={unit.canAttackThisTurn}
        owns={unit.owns}
        battle={this}
        img={UnitImages[unit.owns][unit.name]}
      />
      return { grid };
    });
  }

  handleTurnUpdate(turn) {
    // Update grid, resetting moves and attack of all units belonging to the active player.
    this.setState(prevState => {
      const grid = Object.assign({}, prevState.grid);
      for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
        let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
        let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
        for (let r = r1; r <= r2; r++) {
          const unit = grid[q][r];
          if (unit.props.name !== 'Empty' && unit.props.owns === turn) {
            grid[q][r] = <Unit
              key={[q, r]}
              {...unit.props}
              moves={unit.props.movesPerTurn}
              canAttackThisTurn={unit.props.canAttack}
            />
          }
        }
      }
      return { grid, turn };
    });
  }

  // Helper functions for handleUnitClick
  // ==================================================================================

  handleUnitSelect(q, r) {
    this.setState({
      unitSel: { q: q, r: r },
      cardSel: null,
    });
  }

  handleUnitMove(q, r) {
    this.props.socket.emit('move', {
      q1: this.state.unitSel.q, r1: this.state.unitSel.r,
      q2: q, r2: r
    });
    this.setState({
      unitSel: null,
      action: 'sel'
    });
  }

  handleUnitAttack(q, r) {
    this.props.socket.emit('attack', {
      q1: this.state.unitSel.q, r1: this.state.unitSel.r,
      q2: q, r2: r
    });
    this.setState({
      unitSel: null,
      action: 'sel'
    });
  }

  // TODO not fully implemented
  handleUnitSummon(q, r) {
    this.props.socket.emit('summon', {
      cardNum: this.state.cardSel,
      q: q, r: r 
    });
  }

  // Click handling
  // ==================================================================================

  handleUnitClick(q, r) {
    switch (this.state.action) {
      case 'sel':
        this.handleUnitSelect(q, r);
        break;
      case 'move':
        this.handleUnitMove(q, r);
        break;
      case 'attack':
        this.handleUnitAttack(q, r);
        break;
      case 'summon':
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
      unitSel: null,
      cardSel: cardNum
    });
  }

  handleSummonClick() {
    this.setState({ action: 'summon' });
  }

  // ==================================================================================

  componentDidMount() {
    this.props.socket.on('unit-update', data => {
      this.handleUnitUpdate(data);
    });
    this.props.socket.on('turn-update', b => {
      this.handleTurnUpdate(b);
    });
  }

  render() {
    const { grid, unitSel, action, turn } = this.state;
    const gridComponents = [];
    for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
      let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
      let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
      for (let r = r1; r <= r2; r++) {
        // Add each unit on the grid to be rendered
        gridComponents.push(grid[q][r]);

        // If a unit is selected highlight it.
        // If moving a unit, highlight all tiles it can move to.
        // If attacking with a unit, highlight all tiles it can attack.
        if (unitSel) {
          const unit = grid[unitSel.q][unitSel.r];
          if ((unitSel && unitSel.q === q && unitSel.r === r)
            || (action === 'move'
                && unit.props.name === 'Empty'
                && Hex.dist(unitSel.q, unitSel.r, q, r) <= unit.props.moves)
            || (action === 'attack' && CanAttackTarget[unit.props.name](unit, q, r))) {
            gridComponents.push(<UnitSelector key={['selector', q, r]} q={q} r={r} />);
          }
        }
      }
    }
    return (
      <div>
        <p>Battle Zone! (WIP)</p>
        <p>{turn ? 'Your' : "Opponent's"} Turn</p>
        {turn && <button onClick={this.handleEndTurnClick}>End Turn</button>}
        {gridComponents}
        {unitSel &&
        <InfoMenu
          unit={grid[unitSel.q][unitSel.r]}
          turn={turn}
          battle={this}
        />}
      </div>
    );
  }
}

export default Battle;
