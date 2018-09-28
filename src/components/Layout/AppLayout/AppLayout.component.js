import React, { Component } from 'react';
import Ship from '../../Commons/Ship/Ship.component';
import { Board } from '../../Commons';


const defaultShips = [
  {
    noGrid: true,
    "size": 2,
    "direction": "h"
  },
  {
    noGrid: true,
    "size": 3,
    "direction": "h"
  },
  {
    noGrid: true,
    "size": 3,
    "direction": "h"
  },
  {
    noGrid: true,
    "size": 4,
    "direction": "h"
  },
  {
    noGrid: true,
    "size": 5,
    "direction": "h"
  },
  {
    noGrid: true,
    "size": 2,
    "direction": "v"
  },
  {
    noGrid: true,
    "size": 3,
    "direction": "v"
  },
  {
    noGrid: true,
    "size": 3,
    "direction": "v"
  },
  {
    noGrid: true,
    "size": 4,
    "direction": "v"
  },
  {
    noGrid: true,
    "size": 5,
    "direction": "v"
  },
];

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
      direction: 'h',
      modal: true,
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
    if (addedBoats.length === 5) {
      return true;
    }
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

  rotate(letter) {
    let newLetter = 'h';
    if (letter === 'h') {
      newLetter = 'v';
    }
    this.setState({ direction: newLetter });
  }

  render() {
    const { pages, addedBoats, direction, modal } = this.state;
    return (
      <div>
        {pages === 'init' && (
          <h1>Battle ship game</h1>
        )}
        {pages === 'create' && (
          <div>
            <h3>Create your borad</h3>
            <button onClick={() => this.rotate(direction)}>Rotate</button>
            <div style={{ display: 'flex', height: '8vh' }}>
              {defaultShips.filter(obj => obj.direction === direction).map((obj) => (
                <div onClick={() => this.choseBoat(obj.size, obj.direction)}>
                  <Ship {...obj} />
                </div>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <Board handleClick={this.addBoat} />
              <Board absolute>
                {addedBoats.map(obj => <Ship  {...obj} />)}
              </Board>
            </div>
            {addedBoats.length === 5 && (
              <button>Start the fight</button>
            )}
          </div>
        )}
        {pages === 'game' && (
          <div style={{ position: 'relative' }}>
            <Board />
            <Board absolute>
              {addedBoats.map(obj => <Ship  {...obj} />)}
            </Board>
          </div>
        )}
      </div>
    );
  }
}

export default App;
