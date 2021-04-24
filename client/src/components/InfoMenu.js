import React, { Component } from 'react';

class InfoMenu extends Component {
  constructor(props) {
    super(props);
    this.handleMoveClick = this.handleMoveClick.bind(this);
  }

  handleMoveClick() {
    this.props.battleRef.handleMoveClick();
  }

  render() {
    const unit = this.props.unit.props;
    const turn = this.props.turn;
    const owns = unit.owns;
    const name = unit.name;
    if (name == 'Empty') {
      return (<div><p>Empty Tile</p></div>);
    }
    const health = unit.health;
    const moves = unit.moves;
    return (
      <div>
        <p>Name: {name} ({owns ? 'Player' : 'Enemy'})</p>
        <p>Health: {health}</p>
        {turn && owns && moves && <p>Moves: {moves}</p>}
        {turn && owns && moves && <button onClick={this.handleMoveClick}>Move</button>}
      </div>
    );
  }
}

export default InfoMenu;
