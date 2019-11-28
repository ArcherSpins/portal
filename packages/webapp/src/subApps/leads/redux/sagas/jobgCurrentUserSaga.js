// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  fetchJobForCurrentUser,
} from '../api/fetchJobForCurrentUserApi';

export function* getJobForCurrentUser(action: {
  type: 'FETCH_JOB_FOR_CURRENT_USER_REQUEST',
  payload: {
    from: Date,
    to: Date
  }
}): Saga<void> {
  try {
    console.log(action);
    const data = yield call(fetchJobForCurrentUser, action.payload);
    yield put({
      type: 'FETCH_JOB_FOR_CURRENT_USER_SUCCESS',
      payload: data,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FETCH_JOB_FOR_CURRENT_USER_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}

export function* getBlockingJobSForCurrentUser(action: {
  type: 'FETCH_BLOCKING_JOB_FOR_CURRENT_USER_REQUEST',
  payload: {
    from: Date,
    to: Date
  }
}): Saga<void> {
  try {
    const data = yield call(fetchJobForCurrentUser, action.payload);
    yield put({
      type: 'FETCH_BLOCKING_JOB_FOR_CURRENT_USER_SUCCESS',
      payload: data,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FETCH_BLOCKING_JOB_FOR_CURRENT_USER_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}


export default function* watchSaga(): Saga<void> {
  yield all([
    takeEvery('FETCH_JOB_FOR_CURRENT_USER_REQUEST', getJobForCurrentUser),
    takeEvery('FETCH_BLOCKING_JOB_FOR_CURRENT_USER_REQUEST', getBlockingJobSForCurrentUser),
  ]);
}
