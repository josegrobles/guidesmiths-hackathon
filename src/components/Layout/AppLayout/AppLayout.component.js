import React, { Component } from 'react';
import Ship from '../../Commons/Ship/Ship.Component';
import { Board } from '../../Commons';


const mockShips = [
  {
    "x": 1,
    "y": 1,
    "size": 4,
    "direction": "h"
  },
  {
    "x": 2,
    "y": 2,
    "size": 5,
    "direction": "h"
  },
  {
    "x": 3,
    "y": 3,
    "size": 3,
    "direction": "h"
  },
  {
    "x": 4,
    "y": 4,
    "size": 3,
    "direction": "h"
  },
  {
    "x": 5,
    "y": 5,
    "size": 2,
    "direction": "h"
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      pages: 'create',
      addedBoats: [],
      chooseBoat: {},
    };
    this.addBoat = this.addBoat.bind(this);
  }

  choseBoat(size, direction) {
    this.setState({
      chooseBoat: { size, direction },
    });
  }

  addBoat(index) {
    const { chooseBoat, addedBoats } = this.state;
    console.log(index);
    const divider = index / 10;
    const dividerString = divider.toString();
    let x = 0;
    let y = 0;
    if (!dividerString.split('.')[1]) {
      x = divider;
      y = divider;
    } else {
      y = Number(dividerString.split('.')[0]) + 1;
      x = Number(dividerString.split('.')[1]) + 1;
    }
    this.setState({
      addedBoats: [...addedBoats, { ...chooseBoat, x, y }],
    });
  }

  render() {
    const { pages, addedBoats } = this.state;
    return (
      <div>
        {pages === 'init' && (
          <h1>Battle ship game</h1>
        )}
        {pages === 'create' && (
          <div>
            <h3>Create your borad</h3>
            <div style={{ position: 'relative' }}>
              <Board handleClick={this.addBoat} />
              <Board absolute>
                {addedBoats.map(obj => <Ship  {...obj} />)}
              </Board>
            </div>
            <div>
              <button onClick={() => this.choseBoat(2, 'h')}>2 ship</button>
              <button onClick={() => this.choseBoat(3, 'h')}>3 ship</button>
              <button onClick={() => this.choseBoat(3, 'h')}>3 ship</button>
              <button onClick={() => this.choseBoat(4, 'h')}>4 ship</button>
              <button onClick={() => this.choseBoat(5, 'h')}>5 ship</button>
            </div>
          </div>
        )}
        {pages === 'game' && (
          <div style={{ position: 'relative' }}>
            <Board />
            <Board absolute>
              {mockShips.map(obj => <Ship  {...obj} />)}
            </Board>
          </div>
        )}
      </div>
    );
  }
}

export default App;
