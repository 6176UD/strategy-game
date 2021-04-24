import React, { Component } from 'react';

// ! FIXME figure this out
const SIZE = 100;

// Indicator to show the selected tile.
class Selector extends Component {
  render() {
    const q = this.props.q, r = this.props.r;
    const img = this.props.img;
    const x = SIZE * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = SIZE * 3./2 * r;
    const style = `position:absolute;
                   left:${x}px
                   top:${y}px`;
    return (
      <div style={style}>
        <img src={img} />;
        {/* FIXME coordinates and scaling */}
      </div>
    );
  }
}

export default Selector;
