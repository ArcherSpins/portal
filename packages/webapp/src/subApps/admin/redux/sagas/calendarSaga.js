// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  fetchCalendarData,
} from '../api/calendarApi';

export function* getCalendarDataSaga(action: {
  type: 'GET_CALENDAR_REQUEST',
  payload: string
}): Saga<void> {
  try {
    const calendar = yield call(fetchCalendarData, { year: action.payload });
    yield put({
      type: 'GET_CALENDAR_SUCCESS',
      payload: calendar,
    });
  } catch (err) {
    yield put({ type: 'GET_CALENDAR_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}

export default function* watchCalendar(): Saga<void> {
  yield all([
    takeEvery('GET_CALENDAR_REQUEST', getCalendarDataSaga),
  ]);
}
