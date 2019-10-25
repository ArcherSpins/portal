// @flow
import { all } from 'redux-saga/effects';
import projectsSaga from './project/project.saga';
import taskSaga from './task/task.saga';

export default function* root(): any {
  yield all([
    projectsSaga(),
    taskSaga(),
  ]);
}
