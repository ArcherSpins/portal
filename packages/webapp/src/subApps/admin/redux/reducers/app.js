// @flow
import type {
  ErrorMessageType,
  SearchEmployeesAction,
} from '../actions/types';

type State = {
  errorStatus: boolean,
  errorMessage: string,
  searchEmployees: string
}

const initialState: State = {
  errorStatus: false,
  errorMessage: '',
  searchEmployees: '',
};

export default (
  state: State = initialState,
  action: ErrorMessageType | SearchEmployeesAction,
): State => {
  switch (action.type) {
    case 'SHOW_ERROR_MESSAGE':
      return {
        ...state,
        errorStatus: true,
        errorMessage: action.payload,
      };
    case 'CLOSE_ERROR_MESSAGE':
      return {
        ...state,
        errorStatus: false,
        errorMessage: '',
      };
    case 'ON_CHANGE_SEARCH_EMPLOYEES':
      return {
        ...state,
        searchEmployees: action.payload,
      };
    default: return state;
  }
};
