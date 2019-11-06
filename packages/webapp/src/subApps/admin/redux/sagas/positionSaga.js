// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import history from 'utils/history';
import { EMPLOYEES_ROUTE } from 'subApps/admin/routes';
import {
  fetchPositions,
} from '../api/positionApi';

export function* getPositionsSaga(): Saga<void> {
  try {
    const positions = yield call(fetchPositions);
    yield put({
      type: 'GET_POSITIONS_SUCCESS',
      payload: positions,
    });
  } catch (err) {
    yield put({ type: 'GET_POSITIONS_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    history.push(EMPLOYEES_ROUTE);
  }
}

export default function* watchEmployee(): Saga<void> {
  yield all([
    takeEvery('GET_POSITIONS_REQUEST', getPositionsSaga),
  ]);
}
