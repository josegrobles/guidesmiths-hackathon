import React, { Component } from 'react';
import Ship from '../../Commons/Ship/Ship.component';
import { Board, Shoot } from '../../Commons';


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
      user: '',
      password: '',
      shoots: [],
      tables: [],
      sessionId: '',
      turn: '',
    };
    this.handleUser = this.handleUser.bind(this);
    this.addBoat = this.addBoat.bind(this);
    this.interval = this.interval.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.shootBoat = this.shootBoat.bind(this);
  }

  choseBoat(size, direction) {
    this.setState({
      chooseBoat: { size, direction },
    });
  }

  async interval({ password, sessionId }) {
    try {
      const reqMatchStatus = await fetch(`/match?sessionId=${sessionId}&name=${this.state.user}&password=${password}`);
      const { tables, shoots, turn } = await reqMatchStatus.json();
      console.log(tables);
      console.log(shoots);
      this.setState({ tables: tables[this.state.user], shoots, turn, pages: 'game' });
    } catch (e) {
      console.log(e);
    }
  }

  handleUser({ target }) {
    this.setState({ user: target.value });
  }

  addBoat(index) {
    const { chooseBoat, addedBoats } = this.state;
    if (addedBoats.length === 5) {
      return true;
    }
    let x = index % 7;
    let y = index % 7 === 0 ? Math.trunc(index / 7) : Math.trunc(index / 7) + 1;
    console.log(index, x,y)
    this.setState({
      addedBoats: [...addedBoats, { ...chooseBoat, x, y }],
    });

  }

  async shootBoat(index) {
    const divider = index / 5;
    const dividerString = divider.toString();
    let x = index % 7;
    let y = index % 7 === 0 ? Math.trunc(index / 7) : Math.trunc(index / 7) + 1;
    console.log(index, x,y)
    try {
      const reqShoot = await fetch('/match/shoot', {
        method: 'post',
        body: JSON.stringify({
          sessionId: this.state.sessionId,
          name: this.state.user,
          password: this.state.password,
          x: x,
          y: y,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch(e) {
      console.log(e);
    }
  }


  rotate(letter) {
    let newLetter = 'h';
    if (letter === 'h') {
      newLetter = 'v';
    }
    this.setState({ direction: newLetter });
  }

  async createMatch() {
    const { addedBoats, user } = this.state;
    const payload = {
      positions: addedBoats,
      name: user,
    };
    //this.props.userLogin(payload);
    const reqShoot = await fetch('/match', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await reqShoot.json();
    this.setState({...response, pages: 'game'});
    setInterval(() => this.interval({...response}), 1000);
  }

  render() {
    const { pages, addedBoats, direction, modal, shoots, tables, turn, sessionId, password } = this.state;
    return (
      <div>
        {pages === 'create' && (
          <div>
            <h3 style={{ textAlign: 'center', margin: 0, padding: '10px 0', backgroundColor: '#FFF' }}>Bay of pigs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px', backgroundColor: '#FFF' }}>
              <label>Tell us your name</label>
              <input style={{
                margin: '20px 10px',
                padding: '10px 10px',
                background: '#cac8c8',
                borderRadius: '5px',
              }} onChange={this.handleUser} />
              <button style={{
                  margin: '20px 10px',
                  padding: '10px 10px',
                  background: 'rgb(255, 255, 255)',
                  borderRadius: '5px',
                  border: '1px solid rgb(202, 200, 200)',
                }} onClick={() => this.rotate(direction)}>Rotate</button>
            </div>
            <div style={{ display: 'flex', height: '8vh', padding: '0 20px', backgroundColor: '#FFF' }}>
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
              <button style={{
                margin: '20px 10px',
                padding: '10px 10px',
                background: '#cac8c8',
                borderRadius: '5px',
              }} onClick={this.createMatch}>Start the fight</button>
            )}
          </div>
        )}
        {pages === 'game' && (
          <div>
            <h2>Turn: {turn}</h2>
            <p>{sessionId}</p>
            <p>{password}</p>
            <div style={{ position: 'relative' }}>
              <Board handleClick={this.shootBoat} />
              <Board absolute>
                {shoots.filter(obj => obj.name === this.state.user).map(obj => <Shoot  {...obj} />)}
              </Board>
            </div>
            <br />
            <br />
            <br />
            <div style={{ position: 'relative' }}>
              <Board />
              <Board absolute>
                {tables.map(obj => <Ship  {...obj} />)}
                {shoots.filter(obj => obj.name !== this.state.user).map(obj => <Shoot  {...obj} />)}
              </Board>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
