// @flow
import {
  put,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import { Toast } from 'ui-kit';
import type { Saga } from 'redux-saga';

export function* toggleErrorMessage(action: { payload: string }): Saga<void> {
  Toast.push({ message: String(action.payload), type: 'danger' });
  yield delay(4000);
  yield put({
    type: 'CLOSE_ERROR_MESSAGE',
  });
}

export default function* watchCalendar(): Saga<void> {
  yield takeEvery('SHOW_ERROR_MESSAGE', toggleErrorMessage);
}
