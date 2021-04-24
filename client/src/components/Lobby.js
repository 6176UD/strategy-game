import React, { Component } from 'react';

class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      roomKey: ''
    }
  }

  handleKeyChange = event => {
    this.setState({ roomKey: event.target.value });
  }

  handleJoin = event => {
    event.preventDefault();
    this.props.socket.emit('join', {
      roomKey: this.state.roomKey,
    });
  }

  componentDidMount() {
    this.props.socket.on('room-full', () => alert(`Sorry, the room "${this.state.roomKey}" is full!`));
  }

  render() {
    return (
      <div>
        <p>Enter a room key to create/join a room</p>
        <form onSubmit={this.handleJoin}>
          <label>
            Room Key:<br />
            <input
              type='text'
              maxLength='20'
              value={this.state.name}
              onChange={this.handleKeyChange} /><br />
          </label><br />
          <input type='submit' value='Join Room' />
        </form>
      </div>
    );
  }
}

export default Lobby;
