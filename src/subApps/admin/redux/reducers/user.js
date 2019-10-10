// @flow
import type {
  AuthAction,
} from '../actions/types';
import type { Employees } from '../../types';

type State = {
  authUser: boolean,
  loading: boolean,
  userData: Employees,
}

const initialState: State = {
  authUser: false,
  loading: false,
  userData: null,
};

export default (
  state: State = initialState,
  action: AuthAction,
): State => {
  switch (action.type) {
    case 'CHECK_AUTH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'CHECK_AUTH_SUCCESS':
      return {
        ...state,
        userData: action.payload,
        loading: false,
        authUser: true,
      };
    case 'CHECK_AUTH_FAIL':
      return {
        ...state,
        loadingUser: false,
        loadingAuth: false,
        authUser: false,
      };
    default: return state;
  }
};
