// @flow
import { all } from 'redux-saga/effects';
import projectsSaga from './project/project.saga';

export default function* root(): any {
  yield all([
    projectsSaga(),
  ]);
}
