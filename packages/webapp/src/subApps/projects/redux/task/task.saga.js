// @flow

import {
  put, takeEvery, call, all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { Toast } from '@sfxdx/ui-kit';
import { fetchTaskStatuses } from './task.api';
import TaskActionTypes from './task.types';
// import { type ProjectAction } from './project.flow-types';

export function* getTaskTypes(): Saga<void> {
  try {
    const response = yield call(fetchTaskStatuses);
    yield put({ type: TaskActionTypes.GET_TASKS_STATUSES_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: TaskActionTypes.GET_TASKS_STATUSES_FAIL });
    Toast.push({ message: err.message });
  }
}

export default function* watchTasks(): any {
  yield all([
    takeEvery(TaskActionTypes.GET_TASKS_STATUSES_REQUEST, getTaskTypes),
  ]);
}
