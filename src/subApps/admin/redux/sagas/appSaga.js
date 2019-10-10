// @flow
import {
  put,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

export function* toggleErrorMessage(): Saga<void> {
  yield delay(4000);
  yield put({
    type: 'CLOSE_ERROR_MESSAGE',
  });
}

export default function* watchCalendar(): Saga<void> {
  yield takeEvery('SHOW_ERROR_MESSAGE', toggleErrorMessage);
}
