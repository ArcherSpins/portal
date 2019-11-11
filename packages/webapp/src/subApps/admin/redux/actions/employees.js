// @flow
import type { Employees } from '../../types';
import type {
  GetEmployeeByIdType,
  GetEmployeeIdFailType,
  EmployeesAllType,
  CreateOrUpdateEmployeeType,
} from './types';

export const getEmployeeId = (id: string) => ({
  type: 'GET_EMPLOYEE_BY_ID_REQUEST',
  payload: id,
});

export const getEmployeeRequestById = () => ({
  type: 'GET_EMPLOYEE_BY_ID_REQUEST',
});

export const getEmployeeIdSuccess = (data: Employees): GetEmployeeByIdType => ({
  type: 'GET_EMPLOYEE_BY_ID_SUCCESS',
  payload: data,
});

export const getEmployeeIdFail = (): GetEmployeeIdFailType => ({
  type: 'GET_EMPLOYEE_BY_ID_FAIL',
});

export const createEmployee = (data: Employees): CreateOrUpdateEmployeeType => ({
  type: 'CREATE_EMPLOYEE_REQUEST',
  payload: data,
});


export const requestEmployees = (params?: {
  search?: string,
  offset?: number,
  limit?: number
}): EmployeesAllType => ({
  type: 'GET_EMPLOYEES_REQUEST',
  // $FlowFixMe
  payload: params || {},
});

export const updateEmployee = (data: Employees): CreateOrUpdateEmployeeType => ({
  type: 'UPDATE_EMPLOYEE_REQUEST',
  payload: data,
});

export const deleteEmployee = (id: string): {
  type: 'DELETE_EMPLOYEE_REQUEST',
  payload: string
} => ({
  type: 'DELETE_EMPLOYEE_REQUEST',
  payload: id,
});
