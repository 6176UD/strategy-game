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
    const { q, r, img } = this.props;
    const x = SIZE * 3./2 * q;
    const y = SIZE * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
    // TODO this scaling doesn't make much sense, do some math later to clean it up
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
        {/* Background hexagon tile underneath */}
        <div style={imgStyle}>
          <img
            src={hexImg}
            alt=''
            width={SIZE * 2}
            height={SIZE * 2}
            onClick={this.handleClick}
          />
        </div>
        {/* In the case of an Empty tile, do not display if img is null */}
        {img &&
          <div style={imgStyle}>
            <img
              src={img}
              alt=''
              width={SIZE * 2}
              height={SIZE * 2}
              onClick={this.handleClick}
            />
          </div>
        }
      </div>
    );
  }
}

export default Unit;
