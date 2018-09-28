import { SET_AUTH_CREDENTIALS } from '../actions/user'

const initialUser = {
  isAuth: false
};

export function user(state = initialUser, { type, payload }) {
  switch (type) {
    case SET_AUTH_CREDENTIALS:
      return {
        ...state,
        name: payload.name,
        sessionId: payload.sessionId,
        isAuth: payload.isAuth
      };
    default:
      return state;
  }
}

