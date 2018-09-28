import { all, fork } from 'redux-saga/effects';
import {
  watchInitGame,
} from '.';

export default function* root() {
  yield all([
    fork(watchInitGame),
  ]);
}
