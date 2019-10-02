// @flow
import type { Saga } from 'redux-saga';
import { all } from 'redux-saga/effects';

// sagas
// import exampleSaga from './Example/sagas.js';

export default function* root(): Saga<void> {
  yield all([
    // exampleSaga(),
  ]);
}
