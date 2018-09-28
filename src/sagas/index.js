import { all, fork } from 'redux-saga/effects';
import {
  watchInit,
} from '.';

export default function* root() {
  yield all([
    fork(watchInit),
  ]);
}
