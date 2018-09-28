import React, { Component } from 'react';
import { Board } from '../../Commons';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Battle ship game</h1>
        <div style={{ position: 'relative' }}>
          <Board />
          <Board absolute>
            <div>ey</div>
          </Board>
        </div>
      </div>
    );
  }
}

export default App;
