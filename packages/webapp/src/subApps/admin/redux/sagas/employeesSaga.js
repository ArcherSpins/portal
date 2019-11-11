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
  fetchEmployee,
  fetchEmployees,
  fetchUpdateEmployee,
  fetchCreateEmployee,
  fetchDeleteEmployee,
} from '../api/employeeApi';
import type { GetEmployeeAction } from '../actions/types';
import type { Employees } from '../../types';

export function* getEmployeeById(action: GetEmployeeAction): Saga<void> {
  try {
    const { payload } = action;
    if (payload) {
      const employee = yield call(fetchEmployee, { id: payload });
      yield put({
        type: 'GET_EMPLOYEE_BY_ID_SUCCESS',
        payload: employee,
      });
    } else {
      yield put({ type: 'GET_EMPLOYEE_BY_ID_FAIL' });
    }
  } catch (err) {
    yield put({ type: 'GET_EMPLOYEE_BY_ID_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    history.push(EMPLOYEES_ROUTE);
  }
}

export function* getEmployees(action: {
  type: 'GET_EMPLOYEES_REQUEST',
  payload?: {
    search: string,
    limit: string,
    offset: string
  }
}): Saga<void> {
  try {
    // $FlowFixMe
    const employees = yield call(fetchEmployees, action.payload);
    yield put({
      type: 'GET_EMPLOYEES_SUCCESS',
      payload: {
        employees: employees.employees.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }

          return 0;
        }),
        count: employees.count,
      },
    });
  } catch (err) {
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    yield put({ type: 'GET_EMPLOYEES_FAIL' });
  }
}

export function* updateEmployee(action: {
  type: 'UPDATE_EMPLOYEE_REQUEST', payload: Employees
}): Saga<void> {
  try {
    const response = yield call(fetchUpdateEmployee, action.payload);
    yield put({ type: 'UPDATE_EMPLOYEE_SUCCESS', payload: response });
  } catch (err) {
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    yield put({ type: 'UPDATE_EMPLOYEE_FAIL' });
  }
}

export function* createEmployee(action: {
  type: 'CREATE_EMPLOYEE_REQUEST', payload: Employees
}): Saga<void> {
  try {
    yield call(fetchCreateEmployee, action.payload);
    yield put({ type: 'CREATE_EMPLOYEE_SUCCESS' });
    history.push(EMPLOYEES_ROUTE);
  } catch (err) {
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
    yield put({ type: 'CREATE_EMPLOYEE_FAIL' });
  }
}

export function* deleteEmployee(action: {
  type: 'DELETE_EMPLOYEE_REQUEST', payload: string
}): Saga<void> {
  try {
    yield put({ type: 'DELETE_EMPLOYEE_SUCCESS' });
    yield call(fetchDeleteEmployee, { id: action.payload });
    yield put({ type: 'DELETE_EMPLOYEE_SUCCESS' });
    history.push(EMPLOYEES_ROUTE);
  } catch (err) {
    yield put({ type: 'DELETE_EMPLOYEE_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}

export default function* watchEmployee(): Saga<void> {
  yield all([
    takeEvery('GET_EMPLOYEE_BY_ID_REQUEST', getEmployeeById),
    takeEvery('GET_EMPLOYEES_REQUEST', getEmployees),
    takeEvery('UPDATE_EMPLOYEE_REQUEST', updateEmployee),
    takeEvery('CREATE_EMPLOYEE_REQUEST', createEmployee),
    takeEvery('DELETE_EMPLOYEE_REQUEST', deleteEmployee),
  ]);
}
