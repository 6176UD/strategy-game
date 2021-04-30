import React, { Component } from 'react';

import hexImg from '../img/hexagon.png';
// TODO update based on who controls it
import resourceImg from '../img/resource-zone.png';
import aetherCrackImg from '../img/aether-crack.png';
import aetherFountainImg from '../img/aether-fountain.png';
import highlightImg from '../img/highlight.png';

// Radius of a tile
const SIZE = 40;

// ! Just storing this here because I'm lazy
// ! Will ~~probably~~ hopefully figure out an alternative soon
const JS_SUCKS_LMAO = [[-5, 5], [-4, 5], [-4, 4], [-3, 4], [3, 1], [4, 1], [4, 0], [5, 0], [-5, 0], [-4, 0], [-4, -1], [-3, -1], [3, -4], [4, -4], [4, -5], [5, -5], [-1, 1], [0, 1], [-1, 0], [0, 0], [1, 0], [0, -1], [1, -1]];
const RESOURCE_TILES = {};
for (const x of JS_SUCKS_LMAO) {
  if (!(x[0] in RESOURCE_TILES)) RESOURCE_TILES[x[0]] = {};
  RESOURCE_TILES[x[0]][x[1]] = null;
}

// Displays a unit tile. Does NOT handle any game logic.
class Unit extends Component {
  render() {
    const { q, r, name, img, hasTurn, canAttack, canAttackThisTurn, highlighted } = this.props;
    const isResourceZone = q in RESOURCE_TILES && r in RESOURCE_TILES[q];
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
      imageRendering: 'pixelated',
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
            src={isResourceZone ? resourceImg : hexImg}
            alt=''
            width={SIZE * 2}
            height={SIZE * 2}
            onClick={() => this.props.handleClick(this.props.q, this.props.r)}
          />
        </div>
        {/* If the tile is empty and is a resource zone, display it */}
        {!img && isResourceZone &&
          <div style={imgStyle}>
            <img
              src={(q === 0 && r === 0) ? aetherFountainImg : aetherCrackImg}
              alt=''
              width={SIZE * 2}
              height={SIZE * 2}
            />
          </div>
        }
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
