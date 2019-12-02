// @flow
// $FlowFixMe
import { all } from 'redux-saga/effects';
import jobCurrentUserSaga from './jobsCurrentUserSaga';

export default function* root(): any {
  yield all([
    // $FlowFixMe
    jobCurrentUserSaga(),
  ]);
}
