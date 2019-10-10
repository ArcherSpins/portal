// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  fetchSpentTimeBounds,
  fetchUpdateSpentTimeBounds,
} from '../api/spentTimeBoundsApi';
import type { SpentTimeBoundsType } from '../../types';

export function* getSpentTimeBounds(): Saga<void> {
  try {
    const result = yield call(fetchSpentTimeBounds);
    yield put({
      type: 'GET_SPENT_TIME_BOUNDS_SUCCESS',
      payload: result,
    });
  } catch (err) {
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    yield put({ type: 'GET_SPENT_TIME_BOUNDS_FAIL' });
  }
}

export function* updateSpentTimeBounds(action: {
  type: 'UPDATE_SPENT_TIME_BOUNDS_REQUEST',
  payload: SpentTimeBoundsType,
}): Saga<void> {
  try {
    yield call(fetchUpdateSpentTimeBounds, action.payload);
    yield put({ type: 'GET_SPENT_TIME_BOUNDS_REQUEST' });
  } catch (err) {
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    yield put({ type: 'UPDATE_SPENT_TIME_BOUNDS_FAIL' });
  }
}

export default function* watchCalendar(): Saga<void> {
  yield all([
    takeEvery('GET_SPENT_TIME_BOUNDS_REQUEST', getSpentTimeBounds),
    takeEvery('UPDATE_SPENT_TIME_BOUNDS_REQUEST', updateSpentTimeBounds),
  ]);
}
