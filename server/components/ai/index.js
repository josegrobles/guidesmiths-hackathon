const System = require('systemic');
const ai = require('./ai');

module.exports = new System({ name: 'ai' })
  .add('ai', ai())
  .dependsOn('config', 'logger')