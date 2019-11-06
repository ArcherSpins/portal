// @flow
import type { ErrorAction, ErrorState } from './error.flow-types';

const INITIAL_STATE = {};

const errorReducer = (
  state: ErrorState = INITIAL_STATE,
  action: ErrorAction,
): ErrorState => {
  switch (action.type) {
    case 'CLEAR_ERRORS':
      return {};
    case 'GET_ERRORS':
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
