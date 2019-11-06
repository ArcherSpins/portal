// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchEmployees } from '../api/fetchEmployees';
import type { EmployeeType } from '../../types';

export function* getEmployeesSaga(action: {
  type: 'GET_EMPLOYEES_REQUEST',
  payload?: {
    search: string,
    returnEmployees: (Array<EmployeeType>) => void
  },
}): Saga<void> {
  try {
    const response = yield call(fetchEmployees, {
      search: action.payload ? action.payload.search : '',
    });
    if (action.payload && typeof action.payload.returnEmployees === 'function') {
      // $FlowFixMe
      action.payload.returnEmployees(response);
    }
    yield put({ type: 'GET_EMPLOYEES_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'GET_EMPLOYEES_FAIL' });
  }
}

export default function* watchDealsSaga(): any {
  yield all([
    takeEvery('GET_EMPLOYEES_REQUEST', getEmployeesSaga),
  ]);
}
