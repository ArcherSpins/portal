// @flow
// $FlowFixMe
import { all } from 'redux-saga/effects';
import employeeSaga from './employeesSaga';
import departmentSaga from './departmentSaga';
import positionSaga from './positionSaga';
import calendarSaga from './calendarSaga';
import appSaga from './appSaga';
import spentTimeBoundsSaga from './spentTimeBoundsSaga';
import citiesSaga from './cities';

export default function* root(): any {
  yield all([
    // $FlowFixMe
    employeeSaga(),
    // $FlowFixMe
    departmentSaga(),
    // $FlowFixMe
    positionSaga(),
    // $FlowFixMe
    calendarSaga(),
    // $FlowFixMe
    appSaga(),
    // $FlowFixMe
    spentTimeBoundsSaga(),
    // $FlowFixMe
    citiesSaga(),
  ]);
}
