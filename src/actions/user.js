export const USER_LOGIN = 'USER_LOGIN';
export const IS_AUTH = 'IS_AUTH';
export const SET_IS_AUTH = 'SET_IS_AUTH';
export const UPDATE_IS_AUTH = 'UPDATE_IS_AUTH';
export const SET_AUTH_CREDENTIALS = 'SET_AUTH_CREDENTIALS';

export function userLogin(name) {
  return {
    type: USER_LOGIN,
    payload: {
      name
    }
  };
}

export function isAuth({path = null, asPath = null} = {}) {
  if(path || asPath) {
    return {
      type: IS_AUTH,
      payload: {
        path: path,
        asPath: asPath
      }
    };
  } else {
    return {
      type: IS_AUTH
    };
  }
}

export function updateIsAuth() {
  return {
    type: UPDATE_IS_AUTH
  }
}

export function setIsAuth() {
  return {
    type: SET_IS_AUTH
  }
}

export function setAuthCredentials({user, sessionId}) {
  return {
    type: SET_AUTH_CREDENTIALS,
    payload: {
      name: name,
      sessionId: sessionId
    }
  };
}
