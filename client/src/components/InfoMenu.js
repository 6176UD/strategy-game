import React, { Component } from 'react';

class InfoMenu extends Component {
  render() {
    const unit = this.props.unit.props;
    const name = unit.name;
    if (name == 'Empty') {
      return (<div>Empty Tile</div>);
    }
    const health = unit.health;
    const moves = unit.moves;
    return (
      <div>
        <p>Name: {name}</p>
        <p>Health: {health}</p>
        <p>Moves: {moves}</p>
      </div>
    );
  }
}

export default InfoMenu;
