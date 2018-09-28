import React from 'react';

const Shoot = ({ x, y, direction, type, size, noGrid }) => {
  let end = 0;
  let rotate = { transform: `rotateZ(90deg) ${!noGrid ? `scale(${size})`: ''}` };
  let style = { gridRowStart: y, gridColumnStart: x };
  if (direction === 'h') {
    end = size + x;
    rotate = {};
    style = { gridRowStart: y, gridColumnStart: x };
  } else {
    end = size + y;
    style = { gridRowStart: y, gridColumnStart: x };
  }
  let missedURL = '../../../static/cross.png'
  if (type !== 'hit') {
    return (
      <div style={{...style, display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(115, 144, 156)'}} />
      );
  }
  if (noGrid) {
    return (
      <div style={{ width: `${size}0%` }}>
        <img style={{ width: '80%', marginTop: '-3px', ...rotate }} src={require(`../../../static/cross.png`)} />
      </div>
    );
  }
  return (
    <div style={{...style, display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'}}>
      <img style={{ width: '80%', marginTop: '-3px', ...rotate }} src={require(`../../../static/cross.png`)} />
    </div>
  );
};

export default Shoot;
