import { all, fork } from 'redux-saga/effects';
import {
  watchProfileLoginProcess,
} from './auth';

export default function* rootSagas() {
  yield all([
    fork(watchProfileLoginProcess),
  ]);
}
