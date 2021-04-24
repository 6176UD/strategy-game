import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import Lobby from './components/Lobby';
import Waiting from './components/Waiting';
import Draft from './components/Draft';
import Battle from './components/Battle';

const socket = socketIOClient.connect('localhost:4001');

class App extends Component {
  constructor() {
    super();
    this.state = {
      roomStatus: ''
    };
  }

  componentDidMount() {
    socket.on('joined', () => this.setState({ joined: true }));
    socket.on('room-status', roomStatus => {
      this.setState({ roomStatus: roomStatus });
    });
  }

  render() {
    if (this.state.roomStatus === 'open') {
      return <Waiting socket={socket} />;
    } else if (this.state.roomStatus === 'draft') {
      return <Draft socket={socket} />;
    } else if (this.state.roomStatus === 'battle') {
      return <Battle socket={socket} />;
    } else {
      return <Lobby socket={socket} />;
    }
  }
}

export default App;
