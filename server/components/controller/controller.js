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
    registerMatch: body => ({
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
    getMatch: qs => ({
        baseUrl: API_URI,
        qs,
        uri: '/battleship/getState',
        json: true,
    }),
    shoot: body => ({
        baseUrl: API_URI,
        body,
        uri: '/battleship/shoot',
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

    const registerMatch = match => {
        debug(`Creating match ${match.sessionId}`);
        return request(options.registerMatch(match));
    }

    const getMatchList = () => request(options.matchList())

    const getMatch = match => request(options.getMatch(match))

    const shoot = shoot => request(options.shoot(shoot))

    const api = {
        registerUser,
        registerMatch,
        getMatchList,
        getMatch,
        shoot
    }

    cb(null, api);
  };
  return { start };
};
