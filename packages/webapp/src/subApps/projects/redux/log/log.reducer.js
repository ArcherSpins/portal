// @flow
import type { LogAction, LogState } from './log.flow-types';

const INITIAL_STATE = {
  logs: [],
  loading: false,
};

const logReducer = (
  state: LogState = INITIAL_STATE,
  action: LogAction,
): LogState => {
  switch (action.type) {
    case 'SET_LOG_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_LOG':
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        loading: false,
      };
    // case "DELETE_LOG_BY_MILESTONE":
    //   return {
    //     ...state,
    //     logs: state.logs.filter(log => log.milestoneId !== action.payload)
    //   };
    case 'EDIT_LOG':
      return {
        ...state,
        logs: state.logs.map((log) => {
          if (log.id === action.payload.id) {
            return action.payload;
          }
          return log;
        }),
        loading: false,
      };
    case 'GET_ALL_LOGS':
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default logReducer;
