// @flow
// $FlowFixMe
import { all } from 'redux-saga/effects';
import jobCurrentUserSaga from './jobgCurrentUserSaga';

export default function* root(): any {
  yield all([
    jobCurrentUserSaga(),
  ]);
}
