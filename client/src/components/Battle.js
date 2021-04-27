import React, { Component } from 'react';

import Unit from './Unit';
import Card from './Card';
import InfoMenu from './InfoMenu';

import Hex from '../Hex';
import UnitImages from '../UnitImages';
import CanAttackTarget from '../AttackPatterns';

const MAP_RADIUS = 7;
const NUM_CARDS = 5;

// Handles client-side battle logic.
class Battle extends Component {
  constructor() {
    super();

    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.handleResourcesUpdate = this.handleResourcesUpdate.bind(this);
    this.handleTurnUpdate = this.handleTurnUpdate.bind(this);
    this.handleUnitSelect = this.handleUnitSelect.bind(this);
    this.deselect = this.deselect.bind(this);
    this.handleUnitMove = this.handleUnitMove.bind(this);
    this.handleUnitAttack = this.handleUnitAttack.bind(this);
    this.handleUnitSummon = this.handleUnitSummon.bind(this);
    this.handleUnitClick = this.handleUnitClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleEndTurnClick = this.handleEndTurnClick.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleSummonClick = this.handleSummonClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

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
          handleClick={this.handleUnitClick}
        />;
      }
    }
    this.state = {
      grid: grid,
      cards: {
        true: Array(NUM_CARDS).fill(null),
        false: Array(NUM_CARDS).fill(null)
      },
      resources: 0,
      unitSel: null,
      cardSel: null,
      turn: false,
      action: 'sel'
    }
  }

  // Server update handling
  // ==================================================================================

  handleUnitUpdate(unit) {
    this.setState(prevState => {
      const grid = Object.assign({}, prevState.grid);
      grid[unit.q][unit.r] = <Unit
        key={[unit.q, unit.r]}
        {...unit}
        hasTurn={prevState.turn === unit.owns}
        higlighted={false}
        img={UnitImages[unit.owns][unit.name]}
        handleClick={this.handleUnitClick}
      />
      return { grid };
    });
  }

  handleCardUpdate(card) {
    this.setState(prevState => {
      const cards = Object.assign({}, prevState.cards);
      cards[card.owns][card.idx] = <Card
        key={'card' + (card.owns ? 'player' : 'enemy') + card.idx}
        {...card}
        higlighted={false}
        img={UnitImages[card.owns][card.name]}
        handleClick={this.handleCardClick}
      />
      return { cards };
    });
  }

  handleResourcesUpdate(resources) {
    // Update resources object as well as resources props of cards
    this.setState(prevState => {
      const cards = Object.assign({}, prevState.cards);
      for (const b of [true, false]) {
        for (const card of cards[b]) {
          cards[b][card.props.idx] = <Card
            key={'card' + (card.props.owns ? 'player' : 'enemy') + card.props.idx}
            {...card.props}
            resources={resources[b]}
          />
        }
      }
      return { cards, resources };
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
          const needsReset = unit.props.name !== 'Empty' && unit.props.owns === turn;
          grid[q][r] = <Unit
            key={[q, r]}
            {...unit.props}
            hasTurn={turn === unit.props.owns}
            moves={needsReset ? unit.props.movesPerTurn : unit.props.moves}
            canAttackThisTurn={needsReset ? unit.props.canAttack : unit.props.canAttackThisTurn}
          />
        }
      }
      return { grid, turn };
    });
    // unitSel is invalid now that grid has changed
    this.deselect();
  }

  // Helper functions for handleUnitClick
  // ==================================================================================

  handleUnitSelect(q, r) {
    this.setState({
      unitSel: this.state.grid[q][r],
      cardSel: null,
    });
  }

  deselect() {
    this.setState({
      unitSel: null,
      cardSel: null,
      action: 'sel'
    });
  }

  handleUnitMove(q, r) {
    this.props.socket.emit('move', {
      q1: this.state.unitSel.props.q, r1: this.state.unitSel.props.r,
      q2: q, r2: r
    });
    this.deselect();
  }

  handleUnitAttack(q, r) {
    this.props.socket.emit('attack', {
      q1: this.state.unitSel.props.q, r1: this.state.unitSel.props.r,
      q2: q, r2: r
    });
    this.deselect();
  }

  // TODO not fully implemented
  handleUnitSummon(q, r) {
    this.props.socket.emit('summon', {
      cardNum: this.state.cardSel.num,
      q: q, r: r 
    });
    this.deselect();
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
        this.handleUnitSummon(q, r);
        break;
      default: break;
    }
  }

  handleCardClick(owns, idx) {
    this.deselect();
    this.setState({ cardSel: this.state.cards[owns][idx] });
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

  handleSummonClick() {
    this.setState({ action: 'summon' });
  }

  // Key shortcuts
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.deselect();
    } else if (this.state.turn && e.key === 'Enter') {
      this.handleEndTurnClick();
    } else if (this.state.turn && this.state.action === 'sel') {
      const { unitSel } = this.state;
      if (unitSel && unitSel.props.owns) {
        if (e.key === 'g' &&  unitSel.props.moves > 0) {
          this.handleMoveClick();
        } else if (e.key === 'a' && unitSel.props.canAttackThisTurn) {
          this.handleAttackClick();
        }
      }
      const { cardSel, resources } = this.state;
      if (cardSel && cardSel.props.owns
          && cardSel.props.cost <= resources[true]) {
          this.handleSummonClick();
      }
    }
  }

  // ==================================================================================

  componentDidMount() {
    this.props.socket.on('unit-update', unit => {
      this.handleUnitUpdate(unit);
    });
    this.props.socket.on('card-update', card => {
      this.handleCardUpdate(card);
    });
    this.props.socket.on('resources-update', resources => {
      this.handleResourcesUpdate(resources);
    });
    this.props.socket.on('turn-update', b => {
      this.handleTurnUpdate(b);
    });
    // Listen for key events
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { grid, cards, resources, unitSel, cardSel, action, turn } = this.state;
    const gridComponents = [];
    for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
      let r1 = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);
      let r2 = Math.min(MAP_RADIUS, -q + MAP_RADIUS);
      for (let r = r1; r <= r2; r++) {
        const unit = grid[q][r]

        // If a unit is selected highlight it.
        // If moving a unit, highlight all tiles it can move to.
        // If attacking with a unit, highlight all tiles it can attack.
        if ((unitSel && unitSel.props.q === q && unitSel.props.r === r)
          || (action === 'move'
              && unit.props.name === 'Empty'
              && Hex.dist(unitSel.props.q, unitSel.props.r, q, r) <= unitSel.props.moves)
          || (action === 'attack' && CanAttackTarget[unitSel.props.name](unitSel, q, r))) {
          gridComponents.push(<Unit
            key={[unit.props.q, unit.props.r]}
            {...unit.props}
            highlighted={true}
          />);
        } else {
          // Otherwise, add each unit on the grid as-is to be rendered
          gridComponents.push(unit);
        }
      }
    }
    const cardComponents = [];
    for (const b of [true, false]) {
      for (const card of cards[b]) {
        if (card === null) continue;
        if (cardSel === card) {
          cardComponents.push(<Card
            key={'card' + (card.props.owns ? 'player' : 'enemy') + card.props.idx}
            {...card.props}
            highlighted={true}
          />);
        } else {
          cardComponents.push(card);
        }
      }
    }
    return (
      <div>
        <p>Battle Zone! (WIP)</p>
        <p>{turn ? 'Your' : "Opponent's"} Turn</p>
        <p>Your resources: {resources[true]}</p>
        <p>Opponent resources: {resources[false]}</p>
        {turn && <button onClick={this.handleEndTurnClick}>End Turn</button>}
        {unitSel &&
        <InfoMenu
          unit={grid[unitSel.props.q][unitSel.props.r]}
          turn={turn}
          handleMoveClick={this.handleMoveClick}
          handleAttackClick={this.handleAttackClick}
        />}
        {gridComponents}
        {cardComponents}
      </div>
    );
  }
}

export default Battle;
