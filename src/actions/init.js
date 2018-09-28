export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

export function setError(message) {
  return {
    type: SET_ERROR,
    payload: {
      message
    }
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

export function hideError() {
  return {
    type: HIDE_ERROR
  };
}
