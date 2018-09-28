const express = require('systemic-express/express');
const helmet = require('helmet');

const { join } = require('path');

const root = join(__dirname, '..', '..', '..');

module.exports = () => {
  const start = ({ app, config }, cb) => {
    app.use(helmet());
    app.use((req, res, next) => {
      res.header('Accept-Encoding', 'gzip,x-gzip');
      res.header('X-Content-Type-Options', 'text/javascript');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    app.use(express.static(join(root, 'static')));
    app.get('*.js', (req, res, next) => {
      req.url = `${req.url}.gz`;
      res.set('Content-Encoding', 'x-gzip');
      next();
    });

    app.use('/dist', express.static(join(root, 'dist')));
    app.get('/config', (req, res) => {
      res.json(config);
    });


    app.get('*', (req, res) => {
      res.sendFile(join(root, 'index.html'));
    });
    cb();
  };
  return { start };
};
