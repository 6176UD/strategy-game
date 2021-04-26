import React, { Component } from 'react';

import hexImg from '../img/hexagon.png';
import highlightImg from '../img/highlight.png';

const SIZE = 50;

// Like Unit but for cards
// ! FIXME repeated code :(
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { img, owns, resources, cost, idx, highlighted } = this.props;
    const style = {
      position: 'fixed',
      left: `15px`,
      bottom: `${(2 * SIZE - 10) * (idx + 1) + 15}px`,
    }
    const hexStyle = { position: 'absolute' };
    const imgStyle = {
      pointerEvents: 'none',
      position: 'absolute',
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
            width={SIZE * 2}
            height={SIZE * 2}
            onClick={() => this.props.handleClick(owns, idx)}
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
        {/* If card is highlighted, overlay a highlight image */}
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

export default Card;
