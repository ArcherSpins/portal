// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchParametersData } from '../api/fetchParametersApi';
import type { ParameterType } from '../../types';

export function* getParameterSaga(action: {
  type: 'GET_DEAL_PARAMETERS_REQUEST',
  payload?: (Array<ParameterType>) => void
}): Saga<void> {
  try {
    const response = yield call(fetchParametersData);
    if (action.payload && typeof action.payload === 'function') {
      action.payload(response);
    }
  } catch (error) {
    yield put({ type: 'GET_DEAL_PARAMETERS_FAIL' });
  }
}

export default function* watchParameterSaga(): any {
  yield all([
    takeEvery('GET_DEAL_PARAMETERS_REQUEST', getParameterSaga),
  ]);
}
