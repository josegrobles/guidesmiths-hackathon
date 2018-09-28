const R = require('ramda');

module.exports = () => {
  const start = ({ config, logger }, cb) => {

    const getGrid = (shoots, user) => {
      const emptyGrid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      for (let i = 0; i < shoots.length; i++) {
        let shoot = shoots[i];
        if (shoot.user === user) {
          emptyGrid[shoot.x][shoot.y] = shoot.type;
        }
      }
      return emptyGrid;
    };

    const SIZE = 7;
    const INDEX_SIZE = SIZE - 1;

    const getNulls = () => {
      const res = [];
      for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
          let value = grid[i][j];
          if (value === null)
            res.push({ x: j, y: i })
        }
      }
      console.log('res.length', res.length)
      return res;
    };

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomShoot = () => {
      let shoot = getRandomItem(getNulls());
      return shoot;
    }

    const getHits = () => R.filter(x => x.type === 'hit', shoots)

    let candidates = null;

    const getCandidates = (coords) => {
      const res = { v: [], h: [] };
      if (coords === { x: 0, y: 0 }) {
        res.h.push({ x: 1, y: 0 });
        res.v.push({ x: 0, y: 1 });
      } else if (coords === { x: INDEX_SIZE, y: INDEX_SIZE }) {
        res.h.push({ x: INDEX_SIZE - 1, y: INDEX_SIZE });
        res.v.push({ x: INDEX_SIZE, y: INDEX_SIZE - 1 });
      } else {
        if (coords.x === 0) res.h.push({ x: 1, y: coords.y });
        if (coords.y === 0) res.v.push({ x: coords.x, y: 1 })
        if (coords.x === INDEX_SIZE) res.h.push({ x: INDEX_SIZE - 1, y: coords.y });
        if (coords.y === INDEX_SIZE) res.v.push({ x: coords.x, y: INDEX_SIZE - 1 })

        if (coords.x !== 0 && coords.x !== INDEX_SIZE && coords.y !== 0 && coords.y !== INDEX_SIZE) {
          res.h.push({ x: coords.x + 1, y: coords.y })
          res.h.push({ x: coords.x - 1, y: coords.y })
          res.v.push({ x: coords.x, y: coords.y - 1 })
          res.v.push({ x: coords.x, y: coords.y + 1 })
        }
      }
      return res;
    };

    const calculateShoot = (_shoots, user) => {
      grid = getGrid(_shoots, user);
      shoots = _shoots;

      let coords;
      const lastShoot = shoots.slice(-1)[0];
      const lastHit = getHits().slice(-1)[0];
      console.log(!lastShoot)
      if (!lastShoot) {
        coords = randomShoot();
      } else {
        console.log(lastShoot)
        const lastShootType = lastShoot.type;
        if (lastShootType === 'hit') {
          if (lastShoot.destroy) {
            candidates = null;
            coords = randomShot();
          } else {
            if (candidates === null) {
              candidates = getCandidates({ x: lastShoot.x, y: lastShoot.y });
              console.log('candidates', candidates)
              coords = candidates.v.pop();
            } else {
              coords = {
                x: lastShoot.x + (lastShoot.x - lastHit.x),
                y: lastShoot.y + (lastShoot.y - lastHit.y),
              };
            }
          }
        } else {   // miss
          if (candidates) {
            if (candidates.v.length > 0) coords = candidates.v.pop();
            else if (candidates.h.length > 0) coords = candidates.h.pop();
            else coords = randomShoot();
          } else {
            coords = randomShoot();
          }
        }
      }
      console.log(coords)
      return coords;
    };

    const api = {
      calculateShoot,
    }

    cb(null, api);
  };
  return { start };
};
