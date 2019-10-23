// @flow

import {
  put, takeEvery, call, all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchProjectTypes } from './project.api';
import ProjectActionTypes from './project.types';
// import { type ProjectAction } from './project.flow-types';

export function* getProjectTypes(): Saga<void> {
  try {
    const response = yield call(fetchProjectTypes);
    yield put({ type: ProjectActionTypes.GET_PROJECT_TYPES_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: ProjectActionTypes.GET_PROJECT_TYPES_FAIL });
  }
}

export default function* watchProjects(): any {
  yield all([
    takeEvery(ProjectActionTypes.GET_PROJECT_TYPES_REQUEST, getProjectTypes),
  ]);
}
