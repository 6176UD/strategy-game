import React, { Component } from 'react';

import img from '../img/selector.png';

// ! FIXME figure this out
const SIZE = 40;

// Indicator to show the selected tile.
class UnitSelector extends Component {
  render() {
    const q = this.props.q, r = this.props.r;
    const x = SIZE * 3. / 2 * q;
    const y = SIZE * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
    const style = {
      position: 'absolute',
      left: `${x + SIZE * 15}px`,
      top: `${y + SIZE * 12}px`,
    };
    return (
      <div style={style}>
        <img
          src={img}
          width={SIZE * 2}
          height={SIZE * 2}
        />
      </div>
    );
  }
}

export default UnitSelector;
