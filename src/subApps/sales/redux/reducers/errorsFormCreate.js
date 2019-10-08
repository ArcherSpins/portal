// @flow
import type { ReducerErrrorCreate } from '../actions/errorFormCreate';

type State = {
  errorsFormCreate: {
    [string]: {
      error: boolean,
      message: string
    }
  }
}

const INITIAL_STATE: State = {
  errorsFormCreate: {
    title: {
      error: false,
      message: '',
    },
    idSm: {
      error: false,
      message: '',
    },
    client: {
      error: false,
      message: '',
    },
    status: {
      error: false,
      message: '',
    },
    jobPostingURL: {
      error: false,
      message: '',
    },
    jobProposalURL: {
      error: false,
      message: '',
    },
  },
  errorAlert: {
    status: false,
    message: '',
  },
};

export default (state: State = INITIAL_STATE, action: ReducerErrrorCreate) => {
  const messageReq = 'Required...';
  let setErr = null;
  let deleteErr = null;

  switch (action.type) {
    case 'SET_ERROR_FORM':
      setErr = state.errorsFormCreate[action.payload.key];
      if (setErr) {
        setErr.error = true;
        setErr.message = action.payload.message || messageReq;
        return {
          ...state,
          errorsFormCreate: {
            ...state.errorsFormCreate,
            [action.payload.key]: setErr,
          },
        };
      }
      return state;
    case 'OPEN_ERROR_ALERT':
      return {
        ...state,
        errorAlert: {
          status: true,
          message: action.payload,
        },
      };
    case 'CLOSE_ERROR_ALERT':
      return {
        ...state,
        errorAlert: {
          status: false,
          message: '',
        },
      };
    case 'DELETE_ERROR_FORM':
      deleteErr = state.errorsFormCreate[action.payload.key];
      if (deleteErr) {
        deleteErr.error = false;
        deleteErr.message = '';
        return {
          ...state,
          errorsFormCreate: {
            ...state.errorsFormCreate,
            [action.payload.key]: deleteErr,
          },
        };
      }
      return state;
    default: return state;
  }
};
