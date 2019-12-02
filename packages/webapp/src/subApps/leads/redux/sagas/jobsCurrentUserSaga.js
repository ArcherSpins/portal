// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  fetchJobsForCurrentUser,
  fetchBlockingJobsCurrentUser,
} from '../api/fetchJobForCurrentUserApi';
import { fetchJobsForCurrentUserSuccess, fetchBlockingJobsCurrentUserSuccess } from '../actions';

export function* getJobForCurrentUser(action: {
  type: 'FETCH_JOBS_FOR_CURRENT_USER_REQUEST',
  payload: {
    from: Date,
    to: Date
  }
}): Saga<void> {
  try {
    const data = yield call(fetchJobsForCurrentUser, action.payload);
    fetchJobsForCurrentUserSuccess(data);
  } catch (err) {
    yield put({ type: 'FETCH_JOBS_FOR_CURRENT_USER_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}

export function* getBlockingJobSForCurrentUser(action: {
  type: 'FETCH_BLOCKING_JOBS_FOR_CURRENT_USER_REQUEST',
  payload: {
    from: Date,
    to: Date
  }
}): Saga<void> {
  try {
    const data = yield call(fetchBlockingJobsCurrentUser, action.payload);
    fetchBlockingJobsCurrentUserSuccess(data);
  } catch (err) {
    yield put({ type: 'FETCH_BLOCKING_JOBS_FOR_CURRENT_USER_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}


export default function* watchSaga(): Saga<void> {
  yield all([
    takeEvery('FETCH_JOBS_FOR_CURRENT_USER_REQUEST', getJobForCurrentUser),
    takeEvery('FETCH_BLOCKING_JOBS_FOR_CURRENT_USER_REQUEST', getBlockingJobSForCurrentUser),
  ]);
}
