// @flow
import type { ManagerType } from '../../types';
import type { getEmployeesType } from '../actions/types';

type State = {
  employees: Array<ManagerType>,
  loading: boolean
}

const initialState: State = {
  employees: [],
  loading: false,
};

export default (state: State = initialState, action: getEmployeesType): State => {
  switch (action.type) {
    case 'GET_EMPLOYEES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_EMPLOYEES_SUCCESS':
      return {
        ...state,
        loading: false,
        employees: action.payload || [],
      };
    case 'GET_EMPLOYEES_FAIL':
      return {
        ...state,
        loading: false,
      };
    default: return state;
  }
};
