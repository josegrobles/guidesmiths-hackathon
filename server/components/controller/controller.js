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
    match: body => ({
        baseUrl: API_URI,
        uri: '/battleship/createOrJoin',
        body,
        json: true,
        method: 'POST',
    }),
    matchList: () => ({
        baseUrl: API_URI,
        uri: '/battleship/list',
        json: true,
    }),
}

module.exports = () => {
  const start = ({ config, logger }, cb) => {

    const registerUser = (name) => {
        debug(`Creating user ${name}`);
        return request(options.user(name));
    }

    const registerMatch = match => {
        debug(`Creating match ${match.sessionId}`);
        return request(options.match(match));
    }

    const getMatchList = () => request(options.matchList())

    const api = {
        registerUser,
        registerMatch,
        getMatchList
    }

    cb(null, api);
  };
  return { start };
};
