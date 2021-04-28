import React, { Component } from 'react';

class CardInfoMenu extends Component {
  render() {
    const { owns, hasTurn, name, maxHealth, movesPerTurn, canAttack, cost, resources } = this.props.card.props;
    return (
      <div>
        <p>Summon {name} ({owns ? 'Player' : 'Enemy'})</p>
        <p>Health: {maxHealth}</p>
        {(movesPerTurn > 0) ?
          <p>Moves: {movesPerTurn}</p> : <p>Cannot move</p>
        }
        <p>{canAttack ? 'Can' : 'Cannot'} attack</p>
        <p>Cost: {cost} {cost == 1 ? 'resource' : 'resources'}</p>
        {owns && hasTurn && cost <= resources &&
          <button onClick={this.props.handleSummonClick}>Summon</button>
        }
      </div>
    );
  }
}

export default CardInfoMenu;
