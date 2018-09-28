import React from 'react';

const Ship = ({ x, y, direction, size }) => {
  let end = 0;
  let style = { gridRowStart: y, gridColumnStart: x, background: 'red' };
  if (direction === 'h') {
    end = size + x;
    style = { gridRowStart: y, gridColumnStart: x, gridColumnEnd: end, background: 'red' };
  } else {
    end = size + y;
    style = { gridRowStart: y, gridColumnStart: x, gridRowEnd: end, background: 'red' };
  }
  return <div style={style} />
};

export default Ship;
