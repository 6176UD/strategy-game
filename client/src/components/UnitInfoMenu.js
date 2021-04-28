import React, { Component } from 'react';

class UnitInfoMenu extends Component {
  render() {
    const { owns, name, health, maxHealth, moves, movesPerTurn, canAttack, canAttackThisTurn } = this.props.unit.props;
    const turn = this.props.turn;

    // ! FOR TESTING ZONES
    // return (<p>{this.props.unit.props.q}, {this.props.unit.props.r}</p>);

    if (name === 'Empty') {
      return (<div><p>Empty Tile</p></div>);
    }
    return (
      <div>

        <p>Unit: {name} ({owns ? 'Player' : 'Enemy'})</p>
        <p>Health: {health} / {maxHealth}</p>
        {(movesPerTurn > 0) ?
          <div>
            <p>Moves per turn: {movesPerTurn}</p>
            {(turn === owns) && <p>Moves: {moves}</p>}
            {turn && owns && (moves > 0) &&
              <button onClick={this.props.handleMoveClick} >Move</button>}
          </div> : <p>Cannot move</p>
        }
        {canAttack ?
          <div>
            {(turn === owns) ?
              ((canAttackThisTurn) ?
                <p>Can attack this turn</p> : <p>Cannot attack this turn</p>
              ) : <p>Can attack next turn</p>
            }
            {turn && owns && canAttackThisTurn &&
              <button onClick={this.props.handleAttackClick}>Attack</button>
            }
          </div> : <p>Cannot attack</p>
        }
      </div>
    );
  }
}

export default UnitInfoMenu;
