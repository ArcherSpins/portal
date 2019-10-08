// @flow
// $FlowFixMe
import { all } from 'redux-saga/effects';
import dealsSaga from './dealsSaga';
import employeesSaga from './employeesSaga';
import columnsSaga from './columnsDataSaga';
import selfInfoSaga from './selfSaga';
import channelSaga from './channelSaga';
import sourcesSaga from './sourcesSaga';
import commentSaga from './commentsSaga';
import dealParameter from './parametersSaga';
import contactSaga from './contactsSaga';

export default function* root(): any {
  yield all([
    dealsSaga(),
    employeesSaga(),
    columnsSaga(),
    selfInfoSaga(),
    channelSaga(),
    sourcesSaga(),
    commentSaga(),
    dealParameter(),
    contactSaga(),
  ]);
}
