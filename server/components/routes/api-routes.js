const express = require('systemic-express/express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { join } = require('path');

const root = join(__dirname, '..', '..', '..');

module.exports = () => {
  const start = ({ app, config, controller }, cb) => {
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.use((req, res, next) => {
      res.header('Accept-Encoding', 'gzip,x-gzip');
      res.header('X-Content-Type-Options', 'text/javascript');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    app.use(express.static(join(root, 'static')));
 

    app.use('/dist', express.static(join(root, 'dist')));
    app.get('/config', (req, res) => {
      res.json(config);
    });

    app.post('/user', (req, res, next) => {
      const name = req.body.name || '';

      return controller.registerUser(name).then(user => res.json(user)).catch(console.log);
    })

    app.post('/match', (req, res, next) => {
      const name = req.body.name || ''; 
      const shipPosition = req.body.positions || [];
      const gameId = "777777";
      const sessionId = req.body.sessionId || String(Math.floor(Math.random() * 1000000));

      const match = {
        name,
        gameId,
        sessionId,
        shipPosition
      }

      return controller.registerMatch(match).then(match => res.json(match)).catch(err => {
        return res.json({error: err.error})
      });
    })

    app.get('/match/list', (req, res, next) => controller.getMatchList().then(matchList => res.json(matchList)).catch(err => {
      return res.json({error: err.error})
    }))

    app.get('/match', (req, res, next) => {
      const sessionId = req.query.sessionId;
      const name = req.query.name;
      const password = req.query.password;

      const match = {
        sessionId,
        name,
        password
      }

      return controller.getMatch(match).then(match => res.json(match)).catch(err => {
        return res.json({error: err.error})
      })
    })

    app.post('/match/shoot', (req, res, next) => {
      const sessionId = req.body.sessionId;
      const name = req.body.name;
      const password = req.body.password;
      const x = req.body.x ? parseInt(req.body.x) : 1;
      const y = req.body.y ? parseInt(req.body.y) : 1;

      const auto = req.body.auto ? req.body.auto : false

      if(auto) {
         return controller.bot(sessionId, name, password).then(({x,y}) => {
           console.log(x,y)
            const shoot = {
              sessionId,
              name,
              password,
              x,
              y
            }
            return controller.shoot(shoot).then(shoot => res.json(shoot)).catch(err => {
              return res.json({error: err.error})
            })
        })
      }

      const shoot = {
        sessionId,
        name,
        password,
        x,
        y
      }

      console.log(shoot)

      return controller.shoot(shoot).then(shoot => res.json(shoot)).catch(err => {
        return res.json({error: err.error})
      })
    })

    app.get('*', (req, res) => {
      res.sendFile(join(root, 'index.html'));
    });
    cb();
  };
  return { start };
};
