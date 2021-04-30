import React, { Component } from 'react';

import hexImg from '../img/hexagon.png';
import highlightImg from '../img/highlight.png';

// ! REEEEE
const NUM_CARDS = 5;
const SIZE = {
  true: 50,
  false: 30
}

// Like Unit but for cards
// ! FIXME repeated code :(
class Card extends Component {
  render() {
    const { img, owns, resources, cost, idx, highlighted } = this.props;
    const style = {
      position: 'fixed',
      left: `${owns ? 15 : 2 * SIZE[true] + 20}px`,
      bottom: `${(2 * SIZE[owns] - 10) * (NUM_CARDS - idx) + (owns ? 15 : 30)}px`,
    }
    const hexStyle = { position: 'absolute' };
    const imgStyle = {
      pointerEvents: 'none',
      position: 'absolute',
      imageRendering: 'pixelated',
      opacity: cost <= resources ? 1 : 0.5
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
            width={SIZE[owns] * 2}
            height={SIZE[owns] * 2}
            onClick={() => this.props.handleClick(owns, idx)}
          />
        </div>
        {/* In the case of an Empty tile, do not display if img is null */}
        {img &&
          <div style={imgStyle}>
            <img
              src={img}
              alt=''
              width={SIZE[owns] * 2}
              height={SIZE[owns] * 2}
            />
          </div>
        }
        {/* If card is highlighted, overlay a highlight image */}
        {highlighted &&
          <div style={highlightStyle}>
            <img
              src={highlightImg}
              alt=''
              width={SIZE[owns] * 2}
              height={SIZE[owns] * 2}
            />
          </div>
        }
      </div>
    );
  }
}

export default Card;
