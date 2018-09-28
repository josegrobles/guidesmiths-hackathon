import React from 'react';

const Ship = ({ x, y, direction, size, noGrid }) => {
  let end = 0;
  let rotate = { transform: `rotateZ(90deg) ${!noGrid ? `scale(${size})`: ''}` };
  let style = { gridRowStart: y, gridColumnStart: x };
  if (direction === 'h') {
    end = size + x;
    rotate = {};
    style = { gridRowStart: y, gridColumnStart: x, gridColumnEnd: end };
  } else {
    end = size + y;
    style = { gridRowStart: y, gridColumnStart: x, gridRowEnd: end };
  }
  if (noGrid) {
    return (
      <div style={{ width: `100%` }}>
        <img style={{ width: '100%', ...rotate }} src={require(`../../../static/ship_${size}.png`)} />
      </div>
    );
  }
  return (
    <div style={{...style, display: 'flex',
  justifyContent: 'center',
      alignItems: 'center'}}>
      <img style={{ width: '100%', ...rotate }} src={require(`../../../static/ship_${size}.png`)} />
    </div>
  );
};

export default Ship;
