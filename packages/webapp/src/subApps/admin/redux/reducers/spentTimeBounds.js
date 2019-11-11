// @flow
import type { SpentTimeBoundsType } from '../../types';
import type { SpentTimeBoundsTypeAction } from '../actions/types';

type State = {
  spentTimeBounds: SpentTimeBoundsType,
  loading: boolean
}

const initialState: State = {
  spentTimeBounds: {},
  loading: false,
};

export default (state: State = initialState, action: SpentTimeBoundsTypeAction): State => {
  switch (action.type) {
    case 'GET_SPENT_TIME_BOUNDS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_SPENT_TIME_BOUNDS_SUCCESS':
      return {
        ...state,
        loading: false,
        spentTimeBounds: action.payload,
      };
    case 'GET_SPENT_TIME_BOUNDS_FAIL':
      return {
        ...state,
        loading: false,
      };
    default: return state;
  }
};
