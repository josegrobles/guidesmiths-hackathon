import React from 'react';

const array = new Array(100).fill('');

const absoluteStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  width: '100vw',
  gridGap: '2px',
  height: '375px',
  backgroundColor: 'transparent',
  position: 'absolute',
  pointerEvents: 'none',
  top: 0,
};

const defaultStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  width: '100vw',
  gridGap: '2px',
  height: '375px',
  backgroundColor: 'white',
};

const Board = ({ absolute, children, handleClick }) => (
  <div style={absolute ? absoluteStyle : defaultStyle}>
    {!absolute && (
      array.map((obj, index) => (
        <div onClick={() => handleClick(index)} style={{ backgroundColor: '#009fe1' }} />
      ))
    )}
    {absolute && (
      children
    )}
  </div>
);

export default Board;
