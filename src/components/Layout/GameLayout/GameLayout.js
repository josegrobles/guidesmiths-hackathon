import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      tables: [],
      chooseBoat: {},
      shoots: [],
      direction: 'h',
      modal: true,
    };
    this.interval = this.interval.bind(this);
    this.addBoat = this.addBoat.bind(this);
  }

  async addBoat(index) {
    const divider = index / 5;
    const dividerString = divider.toString();
    let x = index % 7;
    let y = index % 7 === 0 ? Math.trunc(index / 7) : Math.trunc(index / 7) + 1;
    console.log(index, x,y)
    try {
      const reqShoot = await fetch('http://localhost:5000/match/shoot', {
        method: 'post',
        body: JSON.stringify({
          sessionId: '510598',
          name: 'pe1ww3',
          password: 'bCmgQ_Vzz',
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

  async interval() {
    const { password, name, sessionId } = this.props;
    try {
      const reqMatchStatus = await fetch(`http://localhost:5000/match?sessionId=510598&name=pe1ww3&password=bCmgQ_Vzz`);
      const { tables, shoots, turn } = await reqMatchStatus.json();
      console.log(tables);
      console.log(shoots);
      this.setState({ tables: tables.pe1ww3, shoots, turn });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      const reqMatchStatus = await fetch(`http://localhost:5000/match?sessionId=510598&name=pe1ww3&password=bCmgQ_Vzz`);
      const { tables, shoots, turn } = await reqMatchStatus.json();
      console.log(tables);
      console.log(shoots);
      this.setState({ tables: tables.pe1ww3, shoots, turn });
    } catch (e) {
      console.log(e);
    }
    setInterval(() => this.interval(), 1000);
  }

  render() {
    const { pages, tables, direction, modal, shoots, turn } = this.state;
    return (
      <div>
        <h2>Turn: {turn}</h2>
        <div style={{ position: 'relative' }}>
          <Board handleClick={this.addBoat} />
          <Board absolute>
            {shoots.filter(obj => obj.name === 'pe1ww3').map(obj => <Shoot  {...obj} />)}
          </Board>
        </div>
        <br />
        <br />
        <br />
        <div style={{ position: 'relative' }}>
          <Board />
          <Board absolute>
            {tables.map(obj => <Ship  {...obj} />)}
            {shoots.filter(obj => obj.name !== 'pe1ww3').map(obj => <Shoot  {...obj} />)}
          </Board>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  password: state.user.password,
  name: state.user.name,
  sessionId: state.user.sessionId,
});

export default connect()(App);
