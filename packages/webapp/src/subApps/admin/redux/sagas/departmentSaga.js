// @flow
import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
// import { push } from 'connected-react-router';
import {
  fetchAllDepartments,
} from '../api/departmentApi';

export function* getAllDepartments(): Saga<void> {
  try {
    yield put({ type: 'GET_ALL_DEPARTMENTS_REQUEST' });
    const result = yield call(fetchAllDepartments);

    yield put({
      type: 'GET_ALL_DEPARTMENTS_SUCCESS',
      payload: result,
    });
  } catch (err) {
    yield put({ type: 'GET_ALL_DEPARTMENTS_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}

export default function* watchGetDepartment(): Saga<void> {
  yield takeEvery('GET_ALL_DEPARTMENTS', getAllDepartments);
}
