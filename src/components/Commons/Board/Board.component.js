import React from 'react';

const array = new Array(100).fill('');

const Board = ({ absolute, children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(10, 1fr)',
    width: '100vw',
    gridGap: '2px',
    height: '100vh',
    backgroundColor: 'white',
    position: `${absolute ? 'absolute' : ''}`,
  }}>
    {!absolute && (
      array.map(obj => (
        <div style={{ backgroundColor: '#009fe1' }} />
      ))
    )}
    {absolute && (
      children
    )}
  </div>
);

export default Board;
