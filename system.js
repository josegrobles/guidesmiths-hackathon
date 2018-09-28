const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'guidesmiths-hackathon' }).bootstrap(join(__dirname, 'server', 'components'));
