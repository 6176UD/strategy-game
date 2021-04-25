import React, { Component } from 'react';

import hexImg from '../img/hexagon.png';

const SIZE = 40;

// Displays a unit tile. Does NOT handle any game logic.
class Unit extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.battle.handleUnitClick(this.props.q, this.props.r);
  }

  render() {
    const q = this.props.q, r = this.props.r;
    const img = this.props.img;
    const x = SIZE * 3./2 * q;
    const y = SIZE * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
    const style = {
      position: 'absolute',
      left: `${x + SIZE * 15}px`,
      top: `${y + SIZE * 12}px`,
    };
    const imgStyle = {
      position: 'absolute'
    }
    return (
      <div style={style}>
        <div></div>
        <div style={imgStyle}>
          <img
            src={hexImg}
            width={SIZE * 2}
            height={SIZE * 2}
            onClick={this.handleClick}
          />
        </div>
        <div style={imgStyle}>
          <img
            src={img}
            width={SIZE * 2}
            height={SIZE * 2}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default Unit
