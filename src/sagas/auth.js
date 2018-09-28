import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

// actions
import { mainLoading } from '../actions/common'
import { USER_LOGIN, setAuthCredentials } from '../actions/user'

// config
import config from '../../config.json'

export function* profileLoginProcess({payload: {name}}) {
  try {
    yield put(mainLoading(true))
    const result = yield call(match, {baseUrl: config.baseUrl, name})
    if(result && result.sessionId) {
      yield put(setAuthCredentials({name, sessionId: result.sessionId, isAuth: true}))
      yield call(Router.push, '/mipepephone-productos', '/mi-pepephone/productos', { shallow: false })
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
