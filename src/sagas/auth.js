import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

// actions
import { mainLoading } from '../actions/common'
import { USER_LOGIN, setAuthCredentials } from '../actions/user'

//services
import { match } from '../services/match'

// config
import config from '../../config.json'

export function* profileLoginProcess({payload: {name}}) {
  try {
    debugger;
    yield put(mainLoading(true))
    const result = yield call(match, {baseUrl: config.baseUrl, name: {
      name
    }})
    if(result && result.sessionId) {
      yield put(setAuthCredentials({name, sessionId: result.sessionId, isAuth: true}))
    }
    yield put(mainLoading(false))
  } catch (e) {
    yield put(mainLoading(false))
    yield call([console, console.log], e)
  }
}

export function* watchProfileLoginProcess() {
  yield takeLatest(USER_LOGIN, profileLoginProcess)
}
