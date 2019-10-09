// @flow
import type { Department } from '../../types';
import type { RequestAllDepartment } from '../actions/types';

type State = {
  departments: Array<Department>,
  loading: boolean,
  error: boolean
}

const initialState: State = {
  departments: [],
  loading: false,
  error: false,
};

export default (state: State = initialState, action: RequestAllDepartment) => {
  switch (action.type) {
    case 'GET_ALL_DEPARTMENTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_ALL_DEPARTMENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        departments: action.payload,
        error: false,
      };
    case 'GET_ALL_DEPARTMENTS_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default: return state;
  }
};
