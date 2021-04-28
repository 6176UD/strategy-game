import React, { Component } from 'react';

import hexImg from '../img/hexagon.png';
import highlightImg from '../img/highlight.png';

// Radius of a tile
const SIZE = 40;

// Displays a unit tile. Does NOT handle any game logic.
class Unit extends Component {
  render() {
    const { q, r, name, img, hasTurn, canAttack, canAttackThisTurn, highlighted } = this.props;
    const x = SIZE * 3./2 * q;
    const y = SIZE * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
    const style = {
      position: 'absolute',
      left: `${x + SIZE * 12 + 180}px`,
      top: `${y + SIZE * 12}px`,
    };
    const hexStyle = { position: 'absolute' };
    const imgStyle = {
      pointerEvents: 'none',
      position: 'absolute',
      opacity: (name === 'Empty' || !hasTurn || canAttack === canAttackThisTurn) ? 1 : 0.5
    };
    const highlightStyle = {
      pointerEvents: 'none',
      position: 'absolute'
    }
    return (
      <div style={style}>
        {/* Background hexagon tile underneath */}
        <div style={hexStyle}>
          <img
            src={hexImg}
            alt=''
            width={SIZE * 2}
            height={SIZE * 2}
            onClick={() => this.props.handleClick(this.props.q, this.props.r)}
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
            />
          </div>
        }
        {/* If tile is highlighted, overlay a highlight image */}
        {highlighted &&
          <div style={highlightStyle}>
            <img
              src={highlightImg}
              alt=''
              width={SIZE * 2}
              height={SIZE * 2}
            />
          </div>
        }
      </div>
    );
  }
}

export default Unit;
