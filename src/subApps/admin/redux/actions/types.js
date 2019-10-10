// @flow
import type {
  Employees,
  Department,
  Position,
  CalendarType,
  SpentTimeBoundsType,
  CityType,
} from '../../types';

export type EmployeesAction = {
  type: 'REQUEST_GET_ALL_EMPLOYEES_SUCCESS' | 'REQUEST_GET_ALL_EMPLOYEES_FAIL' | 'REQUEST_GET_ALL_EMPLOYEES',
  payload?: {
    employees: Array<Employees>,
    count: number,
  },
}

export type LoginRequestAction = {
  type: 'LOGIN_REQUEST',
  payload: { username: string, password: string }
};

export type GetEmployeeAction = {
  type: 'GET_EMPLOYEE_BY_ID_REQUEST',
  payload: string | number
}

export type AuthAction =
  | LoginRequestAction
  | { type: 'LOGIN_SUCCESS', payload: { token: string, user: Employees } }
  | { type: 'LOGIN_FAIL', payload: { error: string } }
  | { type: 'CHECK_AUTH_REQUEST' }
  | { type: 'CHECK_AUTH_FAIL', payload: { error: string } }
  | { type: 'CHECK_AUTH_SUCCESS', payload: { user: Employees } }
  | { type: 'LOGOUT_SUCCESS' }

export type GetEmployeeByIdType = {
  type: 'GET_EMPLOYEE_BY_ID_SUCCESS',
  payload: Employees,
}

export type GetEmployeeIdFailType = {
  type: 'GET_EMPLOYEE_BY_ID_FAIL',
}

export type GetEmployeeRequestByIdType = {
  type: 'GET_EMPLOYEE_BY_ID_REQUEST',
}

export type LogoutRequestType = {
  type: 'LOGOUT_REQUEST'
}

// reset password

export type InitialResetPassword = {
  type: 'SET_INITIAL_RESET_PASSWORD_SUCCESS' |
        'SET_INITIAL_RESET_PASSWORD_FAIL' |
        'INITIAL_RESET_PASSWORD',
  payload?: string
}

// all employees

export type EmployeesAllType = {
  type: 'GET_EMPLOYEES' |
        'GET_EMPLOYEES_REQUEST' |
        'GET_EMPLOYEES_SUCCESS' |
        'GET_EMPLOYEES_FAIL',
  payload?: {
    employees?: Array<Employees>,
    count?: number,
    search?: string,
    offset?: number,
    limit?: number
  }
}

export type CreateOrUpdateEmployeeType = {
  type: 'CREATE_EMPLOYEE_REQUEST' | 'UPDATE_EMPLOYEE_REQUEST' |
        'UPDATE_EMPLOYEE_SUCCESS' | 'UPDATE_EMPLOYEE_FAIL',
  payload: Employees,
}

// department

export type RequestAllDepartment = {
  type: 'GET_ALL_DEPARTMENTS_REQUEST' |
        'GET_ALL_DEPARTMENTS_SUCCESS' |
        'GET_ALL_DEPARTMENTS_FAIL',
  payload?: Array<Department>
}

// reset password

export type ResetPassword = {
  type: 'REQUEST_RESET_PASSWORD',
  payload?: {
    password: string,
    token: string
  }
}

// position

export type PositionType = {
  type: 'GET_POSITIONS_REQUEST' |
        'GET_POSITIONS_SUCCESS' |
        'GET_POSITIONS_FAIL',
  payload?: Array<Position>
}

export type CalendarActionType = {
  type: 'GET_CALENDAR_SUCCESS' |
        'GET_CALENDAR_REQUEST' |
        'GET_CALENDAR_FAIL',
  payload?: Array<CalendarType>
}

// errors actions

export type ErrorMessageType = {
  type: 'SHOW_ERROR_MESSAGE' |
        'CLOSE_ERROR_MESSAGE',
  payload?: string
}


export type SpentTimeBoundsTypeAction = {
  type: 'GET_SPENT_TIME_BOUNDS_REQUEST' |
        'GET_SPENT_TIME_BOUNDS_SUCCESS' |
        'GET_SPENT_TIME_BOUNDS_FAIL' |
        'UPDATE_SPENT_TIME_BOUNDS_REQUEST' |
        'UPDATE_SPENT_TIME_BOUNDS_SUCCESS' |
        'UPDATE_SPENT_TIME_BOUNDS_FAIL',
  payload?: SpentTimeBoundsType
}


export type EmployeeByIdAction =
  GetEmployeeByIdType |
  GetEmployeeIdFailType |
  GetEmployeeRequestByIdType |
  CreateOrUpdateEmployeeType;

export type CitiesTypeAction = {
  type: 'GET_ALL_CITIES_SUCCESS' |
        'GET_ALL_CITIES_REQUEST' |
        'GET_ALL_CITIES_FAIL',
  payload?: Array<CityType>
}

export type SearchEmployeesAction = {
  type: 'ON_CHANGE_SEARCH_EMPLOYEES',
  payload: string
}
