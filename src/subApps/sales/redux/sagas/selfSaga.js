// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchFetchInfo } from '../api/fetchSelfInfo';
import type { ManagerType } from '../../types';

export function* getSelfInfoSaga(action: {
  type: 'GET_SELF_INFO_REQUEST',
  payload?: (ManagerType) => void
}): Saga<void> {
  try {
    const response = yield call(fetchFetchInfo);
    if (action.payload && typeof action.payload === 'function') {
      action.payload(response);
    }
    yield put({ type: 'SET_ACTIVE_MANAGER', payload: response });
  } catch (error) {
    yield put({ type: 'GET_SELF_INFO_FAIL' });
  }
}

export default function* watchSelfInfoSaga(): any {
  yield all([
    takeEvery('GET_SELF_INFO_REQUEST', getSelfInfoSaga),
  ]);
}
