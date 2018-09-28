const API_URI = 'http://hackathon.guidesmiths.com:4000/api'
const request = require('request-promise-native');
const debug = require('debug')

const options = {
    user: (name) => ({
        baseUrl: API_URI,
        uri: '/user',
        body: {
            name,
        },
        json: true,
            method: 'POST',
    }),
}

module.exports = () => {
  const start = ({ config, logger }, cb) => {

    const registerUser = (name) => {
        debug(`Creating user ${name}`);
        return request(options.user(name));
    }

    const api = {
        registerUser,
    }

    cb(null, api);
  };
  return { start };
};
