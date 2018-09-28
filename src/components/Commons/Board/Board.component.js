import React from 'react';

const array = new Array(49).fill('');

const absoluteStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridTemplateRows: 'repeat(7, 1fr)',
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
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridTemplateRows: 'repeat(7, 1fr)',
  width: '100vw',
  gridGap: '2px',
  height: '375px',
  backgroundColor: '#6cc1ea',
};

const Board = ({ absolute, children, handleClick }) => (
  <div style={absolute ? absoluteStyle : defaultStyle}>
    {!absolute && (
      array.map((obj, index) => (
        <div key={`${index}-key`} onClick={(evt) => {
          evt.preventDefault();
          const newIndex = index  + 1;
          handleClick(newIndex);
        }} style={{ backgroundColor: '#009fe1' }} />
      ))
    )}
    {absolute && (
      children
    )}
  </div>
);

export default Board;
