// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { Toast } from '@sfxdx/ui-kit';
import {
  fetchDealTypes,
  fetchDealTypeId,
  fetchDealTasks,
  fetchDealTaskId,
  fetchCreateDealTask,
  fetchUpdateDealTask,
  fetchDealLogs,
} from '../api/fetchDealTypesApi';

export function* getDealLogs(action: {
  type: 'GET_DEAL_LOGS_REQUEST',
  payload: {
    dealID: string
  }
}): Saga<void> {
  try {
    const response = yield call(fetchDealLogs, action.payload);
    yield put({ type: 'GET_DEAL_LOGS_SUCCESS', payload: response.reverse() });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'GET_DEAL_LOGS_SUCCESS', payload: [] });
  }
}

export function* getDealTypes(): Saga<void> {
  try {
    const response = yield call(fetchDealTypes);
    yield put({ type: 'GET_DEAL_TYPES_SUCCESS', payload: response });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'GET_DEAL_TYPES_FAIL' });
  }
}

export function* createDealTask(action: {
  type: 'CREATE_DEAL_TASK_REQUEST',
  payload: {
    dealID: string,
    typeID: string,
    description: string,
  }
}): Saga<void> {
  try {
    const response = yield call(fetchCreateDealTask, action.payload);
    yield put({ type: 'CREATE_DEAL_TASK_SUCCESS', payload: response });
    yield put({ type: 'GET_DEAL_LOGS_REQUEST', payload: { dealID: action.payload.dealID } });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'CREATE_DEAL_TASK_FAIL' });
  }
}

export function* updateDealTask(action: {
  type: 'UPDATE_DEAL_TASK_REQUEST',
  payload: {
    id: string,
    resolveComment: string
  }
}): Saga<void> {
  try {
    const response = yield call(fetchUpdateDealTask, action.payload);
    yield put({ type: 'UPDATE_DEAL_TASK_SUCCESS', payload: response });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'UPDATE_DEAL_TASK_FAIL' });
  }
}

export function* getDealsTasks(action: {
  type: 'GET_DEAL_TASKS_REQUEST',
  payload: string,
}): Saga<void> {
  try {
    const response = yield call(fetchDealTasks, { dealID: action.payload });
    yield put({ type: 'GET_DEAL_TASKS_SUCCESS', payload: response });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'GET_DEAL_TASKS_FAIL' });
  }
}

export function* getDealTaskId(action: {
  type: 'GET_DEAL_TASK_REQUEST',
  payload: string,
}): Saga<void> {
  try {
    const response = yield call(fetchDealTaskId, { id: action.payload });
    yield put({ type: 'GET_DEAL_TASK_SUCCESS', payload: response });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'GET_DEAL_TASK_FAIL' });
  }
}

export function* getDealTypeId(action: {
  type: 'GET_DEAL_TYPE_ID_REQUEST',
  payload: string,
}): Saga<void> {
  try {
    const response = yield call(fetchDealTypeId, { id: action.payload });
    yield put({ type: 'GET_DEAL_TYPE_ID_SUCCESS', payload: response });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'GET_DEAL_TYPE_ID_FAIL' });
  }
}

export default function* watchTypesSaga(): any {
  yield all([
    takeEvery('GET_DEAL_TYPES_REQUEST', getDealTypes),
    takeEvery('GET_DEAL_TYPE_ID_REQUEST', getDealTypeId),
    takeEvery('GET_DEAL_TASKS_REQUEST', getDealsTasks),
    takeEvery('GET_DEAL_TASK_REQUEST', getDealTaskId),
    takeEvery('CREATE_DEAL_TASK_REQUEST', createDealTask),
    takeEvery('UPDATE_DEAL_TASK_REQUEST', updateDealTask),
    takeEvery('GET_DEAL_LOGS_REQUEST', getDealLogs),
  ]);
}
