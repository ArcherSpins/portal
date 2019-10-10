// @flow
import type { Employee } from '../../types';
import type {
  EmployeesAllType,
  EmployeeByIdAction,
} from '../actions/types';

type State = {
  employees: Array<Employee>,
  loadingEmployees: boolean,
  error: boolean,
  count: number | string,
  employeeById: Employee,
  loadingEmployeeById: boolean,
}

const initialState: State = {
  employees: [],
  loadingEmployees: false,
  error: false,
  count: 0,
  employeeById: null,
  loadingEmployeeById: false,
};

export default (
  state: State = initialState,
  action: EmployeesAllType | EmployeeByIdAction,
): State => {
  switch (action.type) {
    case 'GET_EMPLOYEES_SUCCESS':
      return {
        ...state,
        employees: action.payload ? action.payload.employees : [],
        count: action.payload ? action.payload.count : 0,
        loadingEmployees: false,
        error: false,
      };
    case 'GET_EMPLOYEES_REQUEST':
      return {
        ...state,
        loadingEmployees: true,
        error: false,
      };
    case 'GET_EMPLOYEES_FAIL':
      return {
        ...state,
        loadingEmployees: false,
        error: true,
      };
    case 'GET_EMPLOYEE_BY_ID_REQUEST':
      return {
        ...state,
        loadingEmployeeById: true,
      };
    case 'GET_EMPLOYEE_BY_ID_SUCCESS':
      return {
        ...state,
        employeeById: action.payload,
        loadingEmployeeById: false,
      };
    case 'GET_EMPLOYEE_BY_ID_FAIL':
      return {
        ...state,
        loadingEmployeeById: false,
      };
    case 'UPDATE_EMPLOYEE_REQUEST':
      return {
        ...state,
        loadingEmployeeById: true,
      };
    case 'UPDATE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        loadingEmployeeById: false,
        employeeById: action.payload,
      };
    case 'UPDATE_EMPLOYEE_FAIL':
      return {
        ...state,
        loadingEmployeeById: false,
      };
    default:
      return state;
  }
};
