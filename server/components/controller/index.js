const System = require('systemic');
const controller = require('./controller');

module.exports = new System({ name: 'controller' })
  .add('controller', controller())
  .dependsOn('config', 'logger')